import { KeyboardMidiController } from "../keyboardMidiController";
import {
  ControllerEventType,
  ControllerFrequencyBindingObjectType,
  ControllerOutputType,
} from "../types";

const frequencyObject: { [key: string]: number } = {
  z: 261.63,
  s: 277.18,
  x: 293.66,
  d: 311.13,
  c: 329.63,
  v: 349.23,
  g: 369.99,
  b: 392.0,
  h: 415.3,
  n: 440,
  j: 466.16,
  m: 493.88,
  q: 523.25,
  2: 554.37,
  w: 587.33,
  3: 622.25,
  e: 659.25,
  r: 698.46,
  5: 739.99,
  t: 783.99,
  6: 830.61,
  y: 880,
  7: 932.33,
  u: 987.77,
};

const baseFrequency = 440;
const firstOctave = 4;
const secondOctave = 5;

const controllerFrequencyObject: ControllerFrequencyBindingObjectType = {
  z: {
    frequency: ((1.1892 / 2) * baseFrequency) / 2 ** (4 - firstOctave),
    note: "C" + firstOctave,
  },
  q: {
    frequency: ((1.1892 / 2) * baseFrequency) / 2 ** (4 - secondOctave),
    note: "C" + secondOctave,
  },

  s: {
    frequency: ((1.2599 / 2) * baseFrequency) / 2 ** (4 - firstOctave),
    note: "C#" + firstOctave,
  },
  2: {
    frequency: ((1.2599 / 2) * baseFrequency) / 2 ** (4 - secondOctave),
    note: "C#" + secondOctave,
  },

  x: {
    frequency: ((1.3348 / 2) * baseFrequency) / 2 ** (4 - firstOctave),
    note: "D" + firstOctave,
  },
  w: {
    frequency: ((1.3348 / 2) * baseFrequency) / 2 ** (4 - secondOctave),
    note: "D" + secondOctave,
  },

  d: {
    frequency: ((1.4142 / 2) * baseFrequency) / 2 ** (4 - firstOctave),
    note: "D#" + firstOctave,
  },
  3: {
    frequency: ((1.4142 / 2) * baseFrequency) / 2 ** (4 - secondOctave),
    note: "D#" + secondOctave,
  },

  c: {
    frequency: ((1.4983 / 2) * baseFrequency) / 2 ** (4 - firstOctave),
    note: "E" + firstOctave,
  },
  e: {
    frequency: ((1.4983 / 2) * baseFrequency) / 2 ** (4 - secondOctave),
    note: "E" + secondOctave,
  },

  v: {
    frequency: ((1.5874 / 2) * baseFrequency) / 2 ** (4 - firstOctave),
    note: "F" + firstOctave,
  },
  r: {
    frequency: ((1.5874 / 2) * baseFrequency) / 2 ** (4 - secondOctave),
    note: "F" + secondOctave,
  },

  g: {
    frequency: ((1.6818 / 2) * baseFrequency) / 2 ** (4 - firstOctave),
    note: "F#" + firstOctave,
  },
  5: {
    frequency: ((1.6818 / 2) * baseFrequency) / 2 ** (4 - secondOctave),
    note: "F#" + secondOctave,
  },

  b: {
    frequency: ((1.7818 / 2) * baseFrequency) / 2 ** (4 - firstOctave),
    note: "G" + firstOctave,
  },
  t: {
    frequency: ((1.7818 / 2) * baseFrequency) / 2 ** (4 - secondOctave),
    note: "G" + secondOctave,
  },

  h: {
    frequency: ((1.88775 / 2) * baseFrequency) / 2 ** (4 - firstOctave),
    note: "G#" + firstOctave,
  },
  6: {
    frequency: ((1.88775 / 2) * baseFrequency) / 2 ** (4 - secondOctave),
    note: "G#" + secondOctave,
  },

  n: {
    frequency: baseFrequency / 2 ** (4 - firstOctave),
    note: "A" + firstOctave,
  },
  y: {
    frequency: baseFrequency / 2 ** (4 - secondOctave),
    note: "A" + secondOctave,
  },

  j: {
    frequency: (1.0595 * baseFrequency) / 2 ** (4 - firstOctave),
    note: "A#" + firstOctave,
  },
  7: {
    frequency: (1.0595 * baseFrequency) / 2 ** (4 - secondOctave),
    note: "A#" + secondOctave,
  },

  m: {
    frequency: (1.1225 * baseFrequency) / 2 ** (4 - firstOctave),
    note: "B" + firstOctave,
  },
  u: {
    frequency: (1.1225 * baseFrequency) / 2 ** (4 - secondOctave),
    note: "B" + secondOctave,
  },
};

test("C4", () => {
  expect(controllerFrequencyObject.z.frequency).toBeCloseTo(
    frequencyObject.z,
    1
  );
});

test("C#4", () => {
  expect(controllerFrequencyObject.s.frequency).toBeCloseTo(
    frequencyObject.s,
    1
  );
});

test("D4", () => {
  expect(controllerFrequencyObject.x.frequency).toBeCloseTo(
    frequencyObject.x,
    1
  );
});

test("D#4", () => {
  expect(controllerFrequencyObject.d.frequency).toBeCloseTo(
    frequencyObject.d,
    1
  );
});

test("E4", () => {
  expect(controllerFrequencyObject.c.frequency).toBeCloseTo(
    frequencyObject.c,
    1
  );
});

test("F4", () => {
  expect(controllerFrequencyObject.v.frequency).toBeCloseTo(
    frequencyObject.v,
    1
  );
});

test("F#4", () => {
  expect(controllerFrequencyObject.g.frequency).toBeCloseTo(
    frequencyObject.g,
    1
  );
});

test("G4", () => {
  expect(controllerFrequencyObject.b.frequency).toBeCloseTo(
    frequencyObject.b,
    1
  );
});

test("G#4", () => {
  expect(controllerFrequencyObject.h.frequency).toBeCloseTo(
    frequencyObject.h,
    1
  );
});

test("A4", () => {
  expect(controllerFrequencyObject.n.frequency).toBeCloseTo(
    frequencyObject.n,
    1
  );
});

test("A#4", () => {
  expect(controllerFrequencyObject.j.frequency).toBeCloseTo(
    frequencyObject.j,
    1
  );
});

test("B4", () => {
  expect(controllerFrequencyObject.m.frequency).toBeCloseTo(
    frequencyObject.m,
    1
  );
});

test("C5", () => {
  expect(controllerFrequencyObject.q.frequency).toBeCloseTo(
    frequencyObject.q,
    1
  );
});

test("C#5", () => {
  expect(controllerFrequencyObject[2].frequency).toBeCloseTo(
    frequencyObject[2],
    1
  );
});

test("D5", () => {
  expect(controllerFrequencyObject.w.frequency).toBeCloseTo(
    frequencyObject.w,
    1
  );
});

test("D#5", () => {
  expect(controllerFrequencyObject[3].frequency).toBeCloseTo(
    frequencyObject[3],
    1
  );
});

test("E5", () => {
  expect(controllerFrequencyObject.e.frequency).toBeCloseTo(
    frequencyObject.e,
    1
  );
});

test("F5", () => {
  expect(controllerFrequencyObject.r.frequency).toBeCloseTo(
    frequencyObject.r,
    1
  );
});

test("F#5", () => {
  expect(controllerFrequencyObject[5].frequency).toBeCloseTo(
    frequencyObject[5],
    1
  );
});

test("G5", () => {
  expect(controllerFrequencyObject.t.frequency).toBeCloseTo(
    frequencyObject.t,
    1
  );
});

test("G#5", () => {
  expect(controllerFrequencyObject[6].frequency).toBeCloseTo(
    frequencyObject[6],
    1
  );
});

test("A5", () => {
  expect(controllerFrequencyObject.y.frequency).toBeCloseTo(
    frequencyObject.y,
    1
  );
});

test("A#5", () => {
  expect(controllerFrequencyObject[7].frequency).toBeCloseTo(
    frequencyObject[7],
    1
  );
});

test("B5", () => {
  expect(controllerFrequencyObject.u.frequency).toBeCloseTo(
    frequencyObject.u,
    1
  );
});
