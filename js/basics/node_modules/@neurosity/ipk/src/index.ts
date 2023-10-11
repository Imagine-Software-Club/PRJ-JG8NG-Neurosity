const kinesis = {
  rest: {},
  artifactDetector: {},
  leftArm: {},
  rightArm: {},
  leftHandPinch: {},
  rightHandPinch: {},
  tongue: {},
  jumpingJacks: {},
  leftFoot: {},
  rightFoot: {},
  leftThumbFinger: {},
  leftIndexFinger: {},
  leftMiddleFinger: {},
  leftRingFinger: {},
  leftPinkyFinger: {},
  rightThumbFinger: {},
  rightIndexFinger: {},
  rightMiddleFinger: {},
  rightRingFinger: {},
  rightPinkyFinger: {},
  mentalMath: {},
  bitingALemon: {},
  push: {},
  pull: {},
  lift: {},
  drop: {},
  moveLeft: {},
  moveRight: {},
  moveForward: {},
  moveBackward: {},
  rotateLeft: {},
  rotateRight: {},
  rotateClockwise: {},
  rotateCounterClockwise: {},
  disappear: {}
};

const channelNames = {
  CP6: {},
  F6: {},
  C4: {},
  CP4: {},
  CP3: {},
  F5: {},
  C3: {},
  CP5: {}
};

export const metrics = {
  kinesis,
  predictions: kinesis,
  signalQuality: channelNames,
  signalQualityV2: {
    timestamp: {},
    overall: {},
    byChannel: {}
  },
  accelerometer: {
    timestamp: {},
    acceleration: {},
    inclination: {},
    orientation: {},
    pitch: {},
    roll: {},
    x: {},
    y: {},
    z: {}
  },
  awareness: {
    creativity: {},
    comprehension: {},
    focus: {},
    meditation: {},
    calm: {}
  },
  brainwaves: {
    raw: {},
    rawUnfiltered: {},
    frequency: {},
    powerByBand: {},
    psd: {}
  },
  emotion: {
    joy: {},
    sadness: {},
    anger: {},
    surprise: {},
    excitement: {},
    disappointment: {},
    fear: {},
    love: {},
    stress: {},
    interest: {}
  },
  facialExpression: {
    smile: {},
    laugh: {},
    frown: {},
    blink: {},
    winkLeft: {},
    winkRight: {}
  }
};

export * from "./bluetooth";

export default {
  metrics
};
