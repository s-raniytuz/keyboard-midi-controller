export type ControllerEventType = {
  key: string;
  frequency: number;
  note: string;
  velocity: number;
};

export type ControllerOutputType = (keyProps: ControllerEventType) => void;

export type ControllerTriggerType = (e: KeyboardEvent) => void;

export type ControllerFrequencyBindingObjectType = {
  [key: string]: { keyboard: number; note: string; frequency: number };
};
