import assert from "node:assert/strict";
import { beforeEach, test } from "node:test";
import { createNavigationFeedbackGate } from "../src/lib/interaction-feedback/navigation.ts";
import { createFeedbackPlayer, requestVibration } from "../src/lib/interaction-feedback/player.ts";
import { getPreferenceSnapshot, savePreferences } from "../src/lib/interaction-feedback/preferences.ts";

let contexts;
let pulses;
let records;
let storageBlocked;
class AudioMock {
  state = "running";
  currentTime = 0;
  destination = {};
  oscillators = [];
  constructor() { contexts.push(this); }
  async resume() { this.state = "running"; }
  async close() { this.state = "closed"; }
  createOscillator() {
    const voice = { frequency: { exponentialRampToValueAtTime(value) { voice.sweptTo = value; } }, connect() {}, disconnect() {}, start() { voice.started = true; }, stop(time) { voice.stopped = true; voice.endTime = time; } };
    this.oscillators.push(voice);
    return voice;
  }
  createGain() {
    return { gain: { setValueAtTime() {}, linearRampToValueAtTime() {}, exponentialRampToValueAtTime() {} }, connect() {}, disconnect() {} };
  }
}

beforeEach(() => {
  contexts = []; pulses = []; records = new Map(); storageBlocked = false;
  globalThis.document = { hidden: false };
  globalThis.window = new EventTarget();
  globalThis.AudioContext = AudioMock;
  Object.defineProperty(globalThis, "navigator", { configurable: true, value: { vibrate: duration => { pulses.push(duration); return true; } } });
  globalThis.localStorage = {
    getItem(key) { if (storageBlocked) throw new Error("Blocked"); return records.get(key) ?? null; },
    setItem(key, value) { if (storageBlocked) throw new Error("Blocked"); records.set(key, value); },
  };
  savePreferences({ sound: false, haptics: false });
});

test("preferences default off, stay independent and reject malformed stored values", () => {
  assert.deepEqual(JSON.parse(getPreferenceSnapshot()), { sound: false, haptics: false, storageAvailable: true });
  savePreferences({ sound: true, haptics: false });
  assert.deepEqual(JSON.parse(getPreferenceSnapshot()), { sound: true, haptics: false, storageAvailable: true });
  records.set("mosaic.interaction-feedback.v1", '{"sound":"true","haptics":true}');
  assert.deepEqual(JSON.parse(getPreferenceSnapshot()), { sound: false, haptics: true, storageAvailable: true });
  records.set("mosaic.interaction-feedback.v1", "broken");
  assert.equal(JSON.parse(getPreferenceSnapshot()).sound, false);
});

test("blocked storage keeps a usable in-memory preference and reports its limitation", () => {
  storageBlocked = true;
  savePreferences({ sound: true, haptics: true });
  assert.deepEqual(JSON.parse(getPreferenceSnapshot()), { sound: true, haptics: true, storageAvailable: false });
});

test("creating a player or playing with defaults never creates audio or a positive vibration", async () => {
  const player = createFeedbackPlayer();
  assert.equal(contexts.length, 0);
  await player.play("confirmed", { sound: false, haptics: false });
  assert.equal(contexts.length, 0);
  assert.ok(pulses.every(duration => duration === 0));
});

test("haptics use feature detection, tolerate API failures and work independently of sound", async () => {
  const player = createFeedbackPlayer();
  await player.play("confirmed", { sound: false, haptics: true });
  assert.equal(pulses.at(-1), 50);
  await player.play("incorrect", { sound: false, haptics: true });
  assert.equal(pulses.at(-1), 60);
  assert.equal(contexts.length, 0);
  navigator.vibrate = undefined;
  assert.equal(requestVibration(50), "unsupported");
  navigator.vibrate = () => { throw new Error("Denied"); };
  assert.equal(requestVibration(50), "rejected");
  assert.equal(await player.play("correct", { sound: true, haptics: true }), true);
});

test("rapid actions reuse one audio context, stop prior voices and close resources", async () => {
  const player = createFeedbackPlayer();
  await player.play("correct", { sound: true, haptics: false });
  const previous = [...contexts[0].oscillators];
  await player.play("incorrect", { sound: true, haptics: false });
  assert.equal(contexts.length, 1);
  assert.ok(previous.every(voice => voice.stopped));
  assert.equal(contexts[0].oscillators.length, 4);
  player.close();
  assert.equal(contexts[0].state, "closed");
});

test("stopping while audio permission is pending prevents delayed playback", async () => {
  let resume;
  globalThis.AudioContext = class extends AudioMock {
    state = "suspended";
    resume() { return new Promise(resolve => { resume = () => { this.state = "running"; resolve(); }; }); }
  };
  const player = createFeedbackPlayer();
  const playback = player.play("confirmed", { sound: true, haptics: true });
  player.stop();
  resume();
  assert.equal(await playback, false);
  assert.equal(contexts[0].oscillators.length, 0);
});

test("hidden documents do not play and unavailable audio never throws into the learning action", async () => {
  const player = createFeedbackPlayer();
  document.hidden = true;
  assert.equal(await player.play("confirmed", { sound: true, haptics: true }), false);
  assert.equal(contexts.length, 0);
  document.hidden = false;
  globalThis.AudioContext = class { constructor() { throw new Error("Blocked"); } };
  assert.equal(await player.play("correct", { sound: true, haptics: false }), false);
});


test("swiping produces one soft pitch sweep, no haptic pulse, and respects mute", async () => {
  const player = createFeedbackPlayer();
  await player.play("swipe", { sound: false, haptics: true });
  assert.equal(contexts.length, 0);
  assert.ok(pulses.every(duration => duration === 0));
  await player.play("swipe", { sound: true, haptics: true });
  assert.equal(contexts[0].oscillators.length, 1);
  assert.equal(contexts[0].oscillators[0].frequency.value, 640);
  assert.equal(contexts[0].oscillators[0].sweptTo, 160);
  assert.ok(pulses.every(duration => duration === 0));
});

test("a wheel-only visit without browser user activation does not queue a later swipe sound", async () => {
  navigator.userActivation = { hasBeenActive: false };
  const player = createFeedbackPlayer();
  assert.equal(await player.play("swipe", { sound: true, haptics: false }), false);
  assert.equal(contexts.length, 0);
});


test("page and flip use distinct related sweeps without vibration", async () => {
  const player = createFeedbackPlayer();
  const profiles = [];
  for (const kind of ["swipe", "page", "flip"]) {
    await player.play(kind, { sound: true, haptics: true });
    const voice = contexts[0].oscillators.at(-1);
    profiles.push([voice.frequency.value, voice.sweptTo, voice.endTime]);
  }
  assert.deepEqual(profiles, [[640, 160, .15], [820, 260, .11], [460, 120, .18]]);
  assert.ok(pulses.every(duration => duration === 0));
});

test("navigation feedback requires initialized active user-driven change and consumes it once", () => {
  const gate = createNavigationFeedbackGate();
  assert.equal(gate.consume(true, true, true), false);
  gate.startDrag();
  assert.equal(gate.consume(undefined, true, true), false);
  assert.equal(gate.consume(true, false, true), false);
  assert.equal(gate.consume(true, true, false), false);
  assert.equal(gate.consume(true, true, true), true);
  assert.equal(gate.consume(true, true, true), false);
  gate.startDrag(); gate.cancel();
  assert.equal(gate.consume(true, true, true), false);
});

test("input intent survives event microtasks but expires before an unrelated later transition", async () => {
  const gate = createNavigationFeedbackGate();
  gate.armForEvent();
  await Promise.resolve();
  assert.equal(gate.consume(true, true, true), true);
  gate.armForEvent();
  await new Promise(resolve => setTimeout(resolve, 5));
  assert.equal(gate.consume(true, true, true), false);
});
