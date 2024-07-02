export type ControllerEventType = {
  key: string;
  frequency: number;
  note: string;
};

export type ControllerOutputType = (keyProps: ControllerEventType) => void;

export type ControllerTriggerType = (e: KeyboardEvent) => void;

export type ControllerFrequencyBindingObjectType = {
  [key: string]: { note: string; frequency: number };
};
