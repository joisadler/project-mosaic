import assert from "node:assert/strict";
import { registerHooks } from "node:module";
import test from "node:test";
registerHooks({ resolve(specifier, context, next) {
  if (specifier.startsWith(".") && !/\.[a-z]+$/i.test(specifier)) return next(`${specifier}.ts`, context);
  return next(specifier, context);
} });
const { orderStudyRound } = await import('../src/lib/study-session/ordering.ts');
const { ensureStudyQueue, sessionEntries } = await import('../src/lib/study-session/study-queue.ts');
const { createSession, filterSession, createSessionStore } = await import('../src/lib/study-session/session.ts');
const { createProgressStore, cardPercentage, REPEAT_DELAY_MS } = await import('../src/lib/learning-progress/progress.ts');
const cards = Array.from({length:12},(_,i)=> i%3===0 ? {id:`c${i}`,type:'info',pages:['one','two']} : i%3===1 ? {id:`c${i}`,type:'quiz',options:[{id:'a'},{id:'b'}]} : {id:`c${i}`,type:'flip'});
const sections = new Map(cards.map((card,i)=>[card.id,i%2?'two':'one']));
const selected = ['one','two'];
const empty = () => ({version:1,confirmations:{},reviews:{},visit:0,lastCardId:null,lastSeen:{}});
function award(data,id,count=1,active=true) {
  for(let i=0;i<count;i++) { const presentationId=`${crypto.randomUUID()}:${id}`; data.confirmations[presentationId]={id:crypto.randomUUID(),presentationId,cardId:id,sectionId:sections.get(id),active,createdAt:i,updatedAt:i,visit:0}; }
}
const order = (progress=empty(),recent=[],list=cards,chosen=selected) => orderStudyRound(list,sections,chosen,progress,recent,REPEAT_DELAY_MS+1,()=>0.5);

test('rounds mix 2:1 softly, never repeat rare partial cards, and include all eligible cards exactly once',()=>{
  const data=empty(); for(const card of cards.slice(0,3)) award(data,card.id);
  const result=order(data);
  assert.equal(result.length,12); assert.equal(new Set(result).size,12);
  assert.deepEqual(result.slice(0,9).map(id=>cardPercentage(data,id)>0),[false,false,true,false,false,true,false,false,true]);
  assert.ok(result.slice(9).every(id=>cardPercentage(data,id)===0));
  for(const card of cards.slice(0,3)) assert.equal(result.filter(id=>id===card.id).length,1);
});

test('section/type balance, recent boundary spacing, and random tie breaks preserve unique inventory',()=>{
  const result=order();
  assert.equal(new Set(result.slice(0,6).map(id=>cards.find(c=>c.id===id).type)).size,3);
  assert.equal(result.slice(0,6).filter(id=>sections.get(id)==='one').length,3);
  const recent=result.slice(-5), next=order(empty(),recent);
  assert.ok(next.slice(0,7).every(id=>!recent.includes(id)));
  assert.notEqual(next[0],recent.at(-1));
  const other=orderStudyRound(cards,sections,selected,empty(),[],0,()=>Math.random());
  assert.deepEqual(new Set(other),new Set(result));
});

const unequalCards = [100,120,136].flatMap((count,section)=>Array.from({length:count},(_,index)=>({
  id:`section-${section}-card-${index}`,type:'info',pages:['one','two'],
})));
const unequalSections = new Map(unequalCards.map(card=>[card.id,card.id.split('-').slice(0,2).join('-')]));
const unequalSelected = ['section-0','section-1','section-2'];
function assertSpread(ids) {
  for(let index=0;index+15<=ids.length;index++) {
    assert.equal(new Set(ids.slice(index,index+15).map(id=>unequalSections.get(id))).size,3,`subsection missing from slots ${index+1}–${index+15}`);
  }
}

test('unequal subsection inventories remain distributed through the entire round, including its tail',()=>{
  const result=orderStudyRound(unequalCards,unequalSections,unequalSelected,empty(),[],0,()=>0.5);
  assert.equal(result.length,356);assert.equal(new Set(result).size,356);
  assertSpread(result);
});

test('a new runtime generates a complete balanced round instead of restoring a previous prefix',()=>{
  const open=()=>{const store=createSessionStore(unequalCards,'guest');store.subscribe(()=>{});
    store.update(s=>ensureStudyQueue(s,unequalCards,unequalSections,unequalSelected,empty()));return store;};
  const first=open(), before=first.getSnapshot().session;
  first.update(s=>({...s,currentEntryId:s.queue[20].id,currentCardId:s.queue[20].cardId,pages:{[s.queue[20].id]:1}}));
  const second=open().getSnapshot().session;
  assert.notEqual(second.id,before.id);assert.equal(second.currentEntryId,second.queue[0].id);
  assert.equal(second.queue.length,356);assert.equal(new Set(second.queue.map(e=>e.cardId)).size,356);
  assert.deepEqual(second.pages,{});assertSpread(second.queue.map(e=>e.cardId));
  assert.equal(first.getSnapshot().session.currentEntryId,before.queue[20].id);
});

test('fresh generation uses durable recent exposures and leaves progress unchanged',()=>{
  const data=empty(), recent=cards.slice(0,5).map(c=>c.id);
  data.visit=5;data.lastCardId=recent.at(-1);data.lastSeen=Object.fromEntries(recent.map((id,index)=>[id,index+1]));
  const before=structuredClone(data);
  const state=ensureStudyQueue(createSession(cards),cards,sections,selected,data);
  assert.ok(!recent.includes(state.currentCardId));
  assert.deepEqual(data,before);
  assert.equal(ensureStudyQueue(state,cards,sections,selected,data),state);
  const one=ensureStudyQueue(createSession([cards[0]]),[cards[0]],sections,selected,data);
  assert.equal(one.currentCardId,cards[0].id);
});

test('completion, canceled history, selection, empty and one-card pools are safe',()=>{
  const data=empty(); award(data,'c0',10);award(data,'c1',1,false);
  assert.ok(!order(data).includes('c0'));assert.ok(order(data).includes('c1'));
  assert.ok(order(data,[],cards,['one']).every(id=>sections.get(id)==='one' && id!=='c0'));
  assert.deepEqual(order(data,[],cards,[]),[]);
  assert.deepEqual(order(empty(),['c0'],[cards[0]]),['c0']);
  for(const card of cards)award(data,card.id,10);
  assert.deepEqual(order(data),[]);
});

test('ordering uses the existing repeat rule for tie preference without withholding study content',()=>{
  const list=cards.slice(0,2), data=empty();award(data,'c0');award(data,'c1');
  data.confirmations[Object.keys(data.confirmations)[0]].createdAt=REPEAT_DELAY_MS;
  data.lastSeen.c0=1;
  const result=orderStudyRound(list,sections,selected,data,[],REPEAT_DELAY_MS+1,()=>0.5);
  assert.deepEqual(result,['c1','c0']);
});

test('ordinary preparation keeps live presentation IDs, pages, selected feedback and flip sides',()=>{
  const prepared=ensureStudyQueue(createSession(cards),cards,sections,selected,empty());
  const original={...prepared,pages:{[`${prepared.id}:c0`]:1},answers:{[`${prepared.id}:c1`]:'b'},sides:{[`${prepared.id}:c2`]:1}};
  assert.equal(ensureStudyQueue(original,cards,sections,selected,empty()),original);
});

test('continuous queue survives hundreds of forward moves with bounded retained history and distinct round presentations',()=>{
  let state=ensureStudyQueue(createSession(cards),cards,sections,selected,empty());
  const root=state.id; const presentations=new Set();
  for(let i=0;i<300;i++){
    const entries=sessionEntries(state), index=entries.findIndex(e=>e.id===state.currentEntryId);
    assert.ok(entries[index+1]);presentations.add(entries[index].id);
    state=ensureStudyQueue({...state,currentEntryId:entries[index+1].id,currentCardId:entries[index+1].cardId},cards,sections,selected,empty());
    assert.equal(state.id,root);assert.ok(state.queue.length<=Math.max(cards.length,20)+cards.length+2);
    if(i%20===0)assert.equal(ensureStudyQueue(state,cards,sections,selected,empty()),state);
  }
  assert.equal(presentations.size,300);
});

test('backtracking uses existing entries and never appends or changes their identities; one-card rounds still cannot farm awards',()=>{
  const list=[cards[2]], ids=new Map([['c2','one']]);
  const store=createProgressStore(list,ids,'guest',()=>({getItem:()=>null,setItem:()=>{}}));store.subscribe(()=>{});
  let state=ensureStudyQueue(createSession(list),list,ids,['one'],store.getSnapshot().data);
  const first=state.queue[0];store.review('c2',first.id,{answerSeen:true});store.toggle(list[0],first.id,['c2'],1);
  for(let i=0;i<10;i++){
    const index=state.queue.findIndex(e=>e.id===state.currentEntryId);const next=state.queue[index+1];
    state=ensureStudyQueue({...state,currentEntryId:next.id,currentCardId:next.cardId},list,ids,['one'],store.getSnapshot().data);
    store.review('c2',next.id,{answerSeen:true});store.toggle(list[0],next.id,['c2'],2+i);
  }
  assert.equal(cardPercentage(store.getSnapshot().data,'c2'),10);
  const previous=state.queue[state.queue.findIndex(e=>e.id===state.currentEntryId)-1];
  const back=ensureStudyQueue({...state,currentEntryId:previous.id},list,ids,['one'],store.getSnapshot().data);
  assert.deepEqual(back.queue,state.queue);
  assert.equal(back.currentEntryId,previous.id);
});

test('filtering and completion preserve live identities while unresolved ownership stays empty',()=>{
  const data=empty();let state=ensureStudyQueue(createSession(cards),cards,sections,selected,data);
  const current=state.currentEntryId, cardId=state.currentCardId;
  award(data,cardId,10);
  const allowed=new Set(cards.filter(c=>cardPercentage(data,c.id)<100).map(c=>c.id));
  const view=filterSession(state,selected,sections,allowed);
  assert.ok(view.queue.every(e=>e.cardId!==cardId));assert.equal(state.currentEntryId,current);
  assert.deepEqual(filterSession(state,[],sections,allowed).queue,[]);
  assert.equal(filterSession(state,selected,sections).currentEntryId,current);
  const changed=ensureStudyQueue(createSession(cards.filter(c=>c.id!==cardId)),cards.filter(c=>c.id!==cardId),sections,selected,data);
  assert.ok(changed.queue.every(e=>e.cardId!==cardId));
  const denied=createSessionStore(cards,'guest');denied.subscribe(()=>{});
  denied.update(s=>ensureStudyQueue(s,cards,sections,selected,data));
  assert.ok(denied.getSnapshot().session.queue.length);
  const pending=createSessionStore(cards,null);pending.subscribe(()=>{});assert.equal(pending.getSnapshot().session,null);
});

test('discarding old exposure history preserves awards and repeat-spacing evidence',()=>{
  const store=createProgressStore(cards,sections,'guest',()=>({getItem:()=>null,setItem:()=>{}}));store.subscribe(()=>{});
  const first=`${crypto.randomUUID()}:c2`, next=`${crypto.randomUUID()}:c0`;
  store.review('c2',first,{answerSeen:true});store.toggle(cards[2],first,cards.map(c=>c.id),1);
  store.review('c0',next,{pages:[0]});const before=structuredClone(store.getSnapshot().data);
  store.retainReviews(new Set([next]));const after=store.getSnapshot().data;
  assert.deepEqual(Object.keys(after.reviews),[next]);
  assert.deepEqual(after.confirmations,before.confirmations);assert.equal(after.visit,before.visit);assert.deepEqual(after.lastSeen,before.lastSeen);
});

function advanceSelected(state, chosen, count) {
  for (let i=0;i<count;i++) {
    const view=filterSession(state,chosen,sections);
    const index=view.queue.findIndex(entry=>entry.id===view.currentEntryId);
    const next=view.queue[index+1];
    state=ensureStudyQueue({...state,currentEntryId:next.id,currentCardId:next.cardId},cards,sections,chosen,empty());
  }
  return state;
}

test('expanding a live narrow round mixes newly selected sections without replacing presentations',()=>{
  let narrow=ensureStudyQueue(createSession(cards),cards,sections,['one'],empty());
  narrow=advanceSelected(narrow,['one'],7);
  const current=narrow.currentEntryId, index=narrow.queue.findIndex(entry=>entry.id===current);
  const round=current.slice(0,36);
  const planned=narrow.queue.slice(index+1).filter(entry=>entry.id.startsWith(round+':'));
  for (const entry of narrow.queue) {
    const card=cards.find(card=>card.id===entry.cardId);
    if (card.type==='info') narrow.pages[entry.id]=1;
    if (card.type==='quiz') narrow.answers[entry.id]='b';
    if (card.type==='flip') narrow.sides[entry.id]=1;
  }
  const expanded=ensureStudyQueue(narrow,cards,sections,selected,empty());
  const currentRound=expanded.queue.filter(entry=>entry.id.startsWith(round+':'));
  assert.deepEqual(new Set(currentRound.map(entry=>entry.cardId)),new Set(cards.map(card=>card.id)));
  assert.equal(expanded.id,narrow.id);assert.equal(expanded.currentEntryId,current);
  assert.deepEqual(expanded.queue.slice(0,index+1),narrow.queue.slice(0,index+1));
  assert.deepEqual(new Set(currentRound.filter(entry=>planned.some(saved=>saved.id===entry.id)).map(entry=>entry.id)),new Set(planned.map(entry=>entry.id)));
  assert.deepEqual(expanded.pages,narrow.pages);assert.deepEqual(expanded.answers,narrow.answers);assert.deepEqual(expanded.sides,narrow.sides);
  assert.ok(expanded.queue.slice(index+1,index+4).some(entry=>sections.get(entry.cardId)==='two'));
  assert.equal(ensureStudyQueue(expanded,cards,sections,selected,empty()),expanded);
  const partial=empty();award(partial,expanded.currentCardId);
  assert.equal(ensureStudyQueue(expanded,cards,sections,selected,partial),expanded);
});

test('expanding a fresh selection interleaves retained hidden entries with their original presentation IDs',()=>{
  const narrow=ensureStudyQueue(createSession(cards),cards,sections,['one'],empty());
  const index=narrow.queue.findIndex(entry=>entry.id===narrow.currentEntryId);
  const planned=narrow.queue.slice(index+1).filter(entry=>sections.get(entry.cardId)==='one');
  const expanded=ensureStudyQueue(narrow,cards,sections,selected,empty());
  assert.equal(expanded.currentEntryId,narrow.currentEntryId);
  assert.deepEqual(new Set(expanded.queue.map(entry=>entry.id)),new Set(narrow.queue.map(entry=>entry.id)));
  assert.deepEqual(expanded.queue.slice(index+1).filter(entry=>sections.get(entry.cardId)==='one'),planned);
  assert.ok(expanded.queue.slice(index+1,index+4).some(entry=>sections.get(entry.cardId)==='two'));
  const narrowed=ensureStudyQueue(expanded,cards,sections,['one'],empty());
  assert.deepEqual(narrowed.queue,expanded.queue);
});

test('new inventory and reset eligibility join the current round while completed cards remain excluded',()=>{
  const state=ensureStudyQueue(createSession(cards),cards,sections,selected,empty());
  const added=[{id:'added',type:'info',pages:['new']},{id:'done',type:'flip'}];
  const inventory=[...cards,...added], membership=new Map([...sections,['added','three'],['done','three']]);
  const data=empty();award(data,'done',10);
  const expanded=ensureStudyQueue(state,inventory,membership,[...selected,'three'],data);
  const view=filterSession(expanded,[...selected,'three'],membership,new Set(inventory.filter(card=>cardPercentage(data,card.id)<100).map(card=>card.id)));
  assert.equal(expanded.currentEntryId,state.currentEntryId);
  assert.ok(view.queue.some(entry=>entry.cardId==='added'));assert.ok(!view.queue.some(entry=>entry.cardId==='done'));
  const reset=ensureStudyQueue(expanded,inventory,membership,[...selected,'three'],empty());
  assert.ok(reset.queue.some(entry=>entry.cardId==='done'));
  assert.equal(new Set(reset.queue.map(entry=>entry.id)).size,reset.queue.length);
  assert.equal(ensureStudyQueue(reset,inventory,membership,[...selected,'three'],empty()),reset);
});

test('expanding a one-card buffer stays bounded through later live rounds and backward navigation',()=>{
  const membership=new Map(cards.map((card,index)=>[card.id,index===0?'one':'two']));
  let state=ensureStudyQueue(createSession(cards),cards,membership,['one'],empty());
  const narrow=filterSession(state,['one'],membership);
  const next=narrow.queue[narrow.queue.findIndex(entry=>entry.id===narrow.currentEntryId)+1];
  state=ensureStudyQueue({...state,currentEntryId:next.id,currentCardId:next.cardId},cards,membership,selected,empty());
  for(let i=0;i<100;i++) {
    const current=state.queue.findIndex(entry=>entry.id===state.currentEntryId);
    assert.ok(state.queue[current+1]);
    assert.equal(new Set(state.queue.map(entry=>entry.id)).size,state.queue.length);
    assert.ok(state.queue.length<=Math.max(cards.length,20)+2*cards.length+2);
    const following=state.queue[current+1];
    state=ensureStudyQueue({...state,currentEntryId:following.id,currentCardId:following.cardId},cards,membership,selected,empty());
  }
  const earliest=state.queue[0];
  const back=ensureStudyQueue({...state,currentEntryId:earliest.id,currentCardId:earliest.cardId},cards,membership,selected,empty());
  assert.deepEqual(back.queue,state.queue);
});
