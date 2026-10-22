import assert from "node:assert/strict";
import { registerHooks } from "node:module";
import test from "node:test";
registerHooks({ resolve(specifier, context, next) {
  if (specifier.startsWith(".") && !/\.[a-z]+$/i.test(specifier)) return next(`${specifier}.ts`, context);
  return next(specifier, context);
} });
const { orderStudyRound } = await import('../src/lib/study-session/ordering.ts');
const { ensureStudyQueue, sessionEntries } = await import('../src/lib/study-session/study-queue.ts');
const { createSession, filterSession, restoreSession, createSessionStore } = await import('../src/lib/study-session/session.ts');
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

test('migration preserves the current presentation, order and interactions; reload and back retain prior answers',()=>{
  const original={...createSession(cards),currentCardId:'c0',pages:{c0:1},answers:{c1:'b'},sides:{c2:1}};
  const queue=ensureStudyQueue(original,cards,sections,selected,empty());
  assert.deepEqual(queue.order,original.order);assert.equal(queue.id,original.id);
  assert.equal(queue.currentEntryId,`${original.id}:c0`);
  assert.equal(queue.pages[`${original.id}:c0`],1);
  assert.equal(queue.answers[`${original.id}:c1`],'b');
  assert.equal(queue.sides[`${original.id}:c2`],1);
  assert.deepEqual(restoreSession(JSON.stringify(queue),cards),queue);
});

test('continuous queue survives hundreds of forward moves with bounded retained history and distinct round presentations',()=>{
  let state=ensureStudyQueue(createSession(cards),cards,sections,selected,empty(),true);
  const root=state.id; const presentations=new Set();
  for(let i=0;i<300;i++){
    const entries=sessionEntries(state), index=entries.findIndex(e=>e.id===state.currentEntryId);
    assert.ok(entries[index+1]);presentations.add(entries[index].id);
    state=ensureStudyQueue({...state,currentEntryId:entries[index+1].id,currentCardId:entries[index+1].cardId},cards,sections,selected,empty());
    assert.equal(state.id,root);assert.ok(state.queue.length<=Math.max(cards.length,20)+cards.length+2);
    if(i%20===0)assert.deepEqual(restoreSession(JSON.stringify(state),cards),state);
  }
  assert.equal(presentations.size,300);
});

test('backtracking uses existing entries and never appends or changes their identities; one-card rounds still cannot farm awards',()=>{
  const list=[cards[2]], ids=new Map([['c2','one']]);
  const store=createProgressStore(list,ids,'guest',()=>({getItem:()=>null,setItem:()=>{}}));store.subscribe(()=>{});
  let state=ensureStudyQueue(createSession(list),list,ids,['one'],store.getSnapshot().data,true);
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

test('filtering, remote completion/reset, inventory changes and denied storage preserve ownership and resume',()=>{
  const data=empty();let state=ensureStudyQueue(createSession(cards),cards,sections,selected,data,true);
  const current=state.currentEntryId, cardId=state.currentCardId;
  award(data,cardId,10);
  const allowed=new Set(cards.filter(c=>cardPercentage(data,c.id)<100).map(c=>c.id));
  const view=filterSession(state,selected,sections,allowed);
  assert.ok(view.queue.every(e=>e.cardId!==cardId));assert.equal(state.currentEntryId,current);
  assert.deepEqual(filterSession(state,[],sections,allowed).queue,[]);
  assert.equal(filterSession(state,selected,sections).currentEntryId,current);
  const changed=restoreSession(JSON.stringify(state),cards.filter(c=>c.id!==cardId));
  assert.ok(changed.queue.every(e=>e.cardId!==cardId));
  const denied=createSessionStore(cards,'guest',()=>{throw new Error('denied')});denied.subscribe(()=>{});
  denied.update(s=>ensureStudyQueue(s,cards,sections,selected,data,true));
  assert.equal(denied.getSnapshot().storageAvailable,false);assert.ok(denied.getSnapshot().session.queue.length);
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
