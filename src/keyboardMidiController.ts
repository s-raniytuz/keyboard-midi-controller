import {
  ControllerEventType,
  ControllerOutputType,
  ControllerTriggerType,
  ControllerFrequencyBindingObjectType,
} from "./types";

export class KeyboardMidiController {
  private _baseFrequency: number;
  private _firstOctave: number;
  private _secondOctave: number;
  private _velocity: number;
  private _isLinked: boolean;
  private _autoRestart: boolean;
  private _frequencyMappingObject: ControllerFrequencyBindingObjectType;
  private _bindedKeys: string[];
  private _keydownTrigger: ControllerTriggerType;
  private _keyupTrigger: ControllerTriggerType;
  private _linkedKeydownTrigger: ControllerTriggerType | undefined;
  private _linkedKeyupTrigger: ControllerTriggerType | undefined;
  private _controllerOutputAttack: ControllerOutputType;
  private _controllerOutputRelease: ControllerOutputType;

  constructor(
    controllerOutputAttack?: ControllerOutputType,
    controllerOutputRelease?: ControllerOutputType,
    baseFrequency: number = 440,
    firstOctave: number = 4,
    secondOctave: number = 5,
    velocity: number = 100
  ) {
    this.baseFrequency = baseFrequency;
    this.firstOctave = firstOctave;
    this.secondOctave = secondOctave;
    this.velocity = velocity;
    this._isLinked = false;
    this.autoRestart = false;
    this._frequencyMappingObject = {
      z: {
        keyboard: 1,
        frequency: 1.1892 / 2,
        note: "C",
      },
      q: {
        keyboard: 2,
        frequency: 1.1892 / 2,
        note: "C",
      },

      s: {
        keyboard: 1,
        frequency: 1.2599 / 2,
        note: "C#",
      },
      2: {
        keyboard: 2,
        frequency: 1.2599 / 2,
        note: "C#",
      },

      x: {
        keyboard: 1,
        frequency: 1.3348 / 2,
        note: "D",
      },
      w: {
        keyboard: 2,
        frequency: 1.3348 / 2,
        note: "D",
      },

      d: {
        keyboard: 1,
        frequency: 1.4142 / 2,
        note: "D#",
      },
      3: {
        keyboard: 2,
        frequency: 1.4142 / 2,
        note: "D#",
      },

      c: {
        keyboard: 1,
        frequency: 1.4983 / 2,
        note: "E",
      },
      e: {
        keyboard: 2,
        frequency: 1.4983 / 2,
        note: "E",
      },

      v: {
        keyboard: 1,
        frequency: 1.5874 / 2,
        note: "F",
      },
      r: {
        keyboard: 2,
        frequency: 1.5874 / 2,
        note: "F",
      },

      g: {
        keyboard: 1,
        frequency: 1.6818 / 2,
        note: "F#",
      },
      5: {
        keyboard: 2,
        frequency: 1.6818 / 2,
        note: "F#",
      },

      b: {
        keyboard: 1,
        frequency: 1.7818 / 2,
        note: "G",
      },
      t: {
        keyboard: 2,
        frequency: 1.7818 / 2,
        note: "G",
      },

      h: {
        keyboard: 1,
        frequency: 1.88775 / 2,
        note: "G#",
      },
      6: {
        keyboard: 2,
        frequency: 1.88775 / 2,
        note: "G#",
      },

      n: {
        keyboard: 1,
        frequency: 1,
        note: "A",
      },
      y: {
        keyboard: 2,
        frequency: 1,
        note: "A",
      },

      j: {
        keyboard: 1,
        frequency: 1.0595,
        note: "A#",
      },
      7: {
        keyboard: 2,
        frequency: 1.0595,
        note: "A#",
      },

      m: {
        keyboard: 1,
        frequency: 1.1225,
        note: "B",
      },
      u: {
        keyboard: 2,
        frequency: 1.1225,
        note: "B",
      },
    };

    this._bindedKeys = Object.keys(this._frequencyMappingObject);

    this._keydownTrigger = (e: KeyboardEvent) => {
      if (!e.repeat && this._bindedKeys.includes(e.key.toLowerCase())) {
        if (this._frequencyMappingObject[e.key.toLowerCase()].keyboard === 1) {
          this._controllerOutputAttack({
            key: e.key,
            frequency: Number(
              (
                (this._frequencyMappingObject[e.key.toLowerCase()].frequency *
                  this.baseFrequency) /
                2 ** (4 - this.firstOctave)
              ).toFixed(3)
            ),
            note:
              this._frequencyMappingObject[e.key.toLowerCase()].note +
              String(this.firstOctave),
            velocity: this.velocity,
          });
        } else {
          this._controllerOutputAttack({
            key: e.key,
            frequency: Number(
              (
                (this._frequencyMappingObject[e.key.toLowerCase()].frequency *
                  this.baseFrequency) /
                2 ** (4 - this.secondOctave)
              ).toFixed(3)
            ),
            note:
              this._frequencyMappingObject[e.key.toLowerCase()].note +
              String(this.secondOctave),
            velocity: this.velocity,
          });
        }
      }
    };

    this._keyupTrigger = (e: KeyboardEvent) => {
      if (!e.repeat && this._bindedKeys.includes(e.key.toLowerCase())) {
        if (this._frequencyMappingObject[e.key.toLowerCase()].keyboard === 1) {
          this._controllerOutputAttack({
            key: e.key,
            frequency: Number(
              (
                (this._frequencyMappingObject[e.key.toLowerCase()].frequency *
                  this.baseFrequency) /
                2 ** (4 - this.firstOctave)
              ).toFixed(3)
            ),
            note:
              this._frequencyMappingObject[e.key.toLowerCase()].note +
              String(this.firstOctave),
            velocity: this.velocity,
          });
        } else {
          this._controllerOutputAttack({
            key: e.key,
            frequency: Number(
              (
                (this._frequencyMappingObject[e.key.toLowerCase()].frequency *
                  this.baseFrequency) /
                2 ** (4 - this.secondOctave)
              ).toFixed(3)
            ),
            note:
              this._frequencyMappingObject[e.key.toLowerCase()].note +
              String(this.secondOctave),
            velocity: this.velocity,
          });
        }
      }
    };

    this._linkedKeydownTrigger = undefined;
    this._linkedKeyupTrigger = undefined;

    if (!controllerOutputAttack) {
      this._controllerOutputAttack = (keyProps: ControllerEventType) => {
        console.log("Attack Event", keyProps);
      };
    } else {
      this._controllerOutputAttack = controllerOutputAttack;
    }

    if (!controllerOutputRelease) {
      this._controllerOutputRelease = (keyProps: ControllerEventType) => {
        console.log("Release Event", keyProps);
      };
    } else {
      this._controllerOutputRelease = controllerOutputRelease;
    }
  }

  set baseFrequency(newBaseFrequency: number) {
    if (newBaseFrequency > 0 && newBaseFrequency <= 20000) {
      this._baseFrequency = newBaseFrequency;
    } else if (newBaseFrequency < 0) {
      throw new Error(
        "Base frequency boundaries exceeded. Base frequency can not be lower than 0"
      );
    } else {
      throw new Error(
        "Base frequency boundaries exceeded. Base frequency can not be higher than 30000"
      );
    }
  }
  get baseFrequency(): number {
    return this._baseFrequency;
  }

  set firstOctave(newFirstOctave: number) {
    if (newFirstOctave >= 1 && newFirstOctave <= 7) {
      this._firstOctave = newFirstOctave;
    } else if (newFirstOctave < 1) {
      throw new Error(
        "Octave out of range. Please select an octave between 1 and 7"
      );
    } else {
      throw new Error(
        "Octave out of range. Please select an octave between 1 and 7"
      );
    }
  }
  get firstOctave(): number {
    return this._firstOctave;
  }

  set secondOctave(newSecondOctave: number) {
    if (newSecondOctave >= 1 && newSecondOctave <= 7) {
      this._secondOctave = newSecondOctave;
    } else if (newSecondOctave < 1) {
      throw new Error(
        "Octave out of range. Please select an octave between 1 and 7"
      );
    } else {
      throw new Error(
        "Octave out of range. Please select an octave between 1 and 7"
      );
    }
  }
  get secondOctave(): number {
    return this._secondOctave;
  }

  set velocity(newVelocity: number) {
    if (newVelocity >= 0 && newVelocity <= 100) {
      this._velocity = newVelocity;
    } else {
      throw new Error(
        "Velocity out of range. Please enter a value between 0 and 100"
      );
    }
  }
  get velocity(): number {
    return this._velocity;
  }

  get isLinked(): boolean {
    return this._isLinked;
  }

  get autoRestart(): boolean {
    return this._autoRestart;
  }
  set autoRestart(restartOption: boolean) {
    this._autoRestart = restartOption;
  }

  set keydownTrigger(handleKeydown: ControllerTriggerType) {
    if (handleKeydown != this._keydownTrigger) {
      this._keydownTrigger = handleKeydown;
      if (this._autoRestart) {
        this.restart();
      }
    } else {
      throw new Error(
        "The new keydown trigger is equal to the keydown trigger stored in the controller. Pass a new function to update the trigger."
      );
    }
  }
  get keydownTrigger(): (e: KeyboardEvent) => void {
    return this._keydownTrigger;
  }

  set keyupTrigger(handleKeyup: (e: KeyboardEvent) => void) {
    if (handleKeyup != this._keyupTrigger) {
      this._keyupTrigger = handleKeyup;
      if (this._autoRestart) {
        this.restart();
      }
    } else {
      throw new Error(
        "The new keyup trigger is equal to the keyup trigger stored in the controller. Pass a new function to update the trigger."
      );
    }
  }
  get keyupTrigger(): ControllerTriggerType {
    return this._keyupTrigger;
  }

  get linkedKeydownTrigger(): ControllerTriggerType | undefined {
    return this._linkedKeydownTrigger;
  }

  get linkedKeyupTrigger(): ControllerTriggerType | undefined {
    return this._linkedKeyupTrigger;
  }

  set controllerOutputAttack(
    newOutputAttack: ControllerOutputType | undefined
  ) {
    if (newOutputAttack) {
      this._controllerOutputAttack = newOutputAttack;
    } else {
      this._controllerOutputAttack = (keyProps: ControllerEventType) => {
        console.log("Attack Event", keyProps);
      };
    }
  }
  get controllerOutputAttack(): ControllerOutputType {
    return this._controllerOutputAttack;
  }

  set controllerOutputRelease(
    newOutputRelease: ControllerOutputType | undefined
  ) {
    if (newOutputRelease) {
      this._controllerOutputRelease = newOutputRelease;
    } else {
      this._controllerOutputRelease = (keyProps: ControllerEventType) => {
        console.log("Release Event", keyProps);
      };
    }
  }
  get controllerOutputRelease(): ControllerOutputType {
    return this._controllerOutputRelease;
  }

  link() {
    if (this._isLinked === false) {
      document.addEventListener("keydown", this._keydownTrigger);
      this._linkedKeydownTrigger = this._keydownTrigger;

      document.addEventListener("keyup", this._keyupTrigger);
      this._linkedKeyupTrigger = this._keyupTrigger;

      this._isLinked = true;
    } else {
      if (
        this._keydownTrigger != this._linkedKeydownTrigger ||
        this._keyupTrigger != this._linkedKeyupTrigger
      ) {
        throw new Error(
          "The controller is already linked. To use a new trigger function unlink the controller and link it again, or use .restart()"
        );
      } else {
        throw new Error("The controller is already linked");
      }
    }
  }

  unlink() {
    if (
      this._isLinked === true &&
      this._linkedKeydownTrigger &&
      this._linkedKeyupTrigger
    ) {
      document.removeEventListener("keydown", this._linkedKeydownTrigger);
      document.removeEventListener("keyup", this._linkedKeyupTrigger);
      this._linkedKeydownTrigger = undefined;
      this._linkedKeyupTrigger = undefined;
      this._isLinked = false;
    }
  }

  reset() {
    if (this._isLinked) {
      this.unlink();
    }
    this._baseFrequency = 220;
    this._firstOctave = 1;
    this._secondOctave = 2;
    this._keydownTrigger = (e: KeyboardEvent) => {
      console.log(`Keydown event: ${e.key}`);
    };
    this._keyupTrigger = (e: KeyboardEvent) => {
      console.log(`Keyup event: ${e.key}`);
    };
    this._autoRestart = false;
    this._controllerOutputAttack = (keyProps: ControllerEventType) => {
      console.log("Attack Event", keyProps);
    };
    this._controllerOutputRelease = (keyProps: ControllerEventType) => {
      console.log("Release Event", keyProps);
    };
  }

  restart() {
    if (
      this.isLinked &&
      this._linkedKeydownTrigger &&
      this._linkedKeyupTrigger
    ) {
      // Both keydown and keyup functions are different from the linked ones
      if (
        this._linkedKeydownTrigger != this._keydownTrigger &&
        this._linkedKeyupTrigger != this._keyupTrigger
      ) {
        document.removeEventListener("keydown", this._linkedKeydownTrigger);
        document.removeEventListener("keyup", this._linkedKeyupTrigger);

        document.addEventListener("keydown", this._keydownTrigger);
        document.addEventListener("keyup", this._keyupTrigger);
        this._linkedKeydownTrigger = this._keydownTrigger;
        this._linkedKeyupTrigger = this._keyupTrigger;
      }
      // Only the keydown function is different from the linked one
      else if (
        this._linkedKeydownTrigger != this._keydownTrigger &&
        this._linkedKeyupTrigger == this._keyupTrigger
      ) {
        document.removeEventListener("keydown", this._linkedKeydownTrigger);

        document.addEventListener("keydown", this._keydownTrigger);
        this._linkedKeydownTrigger = this._keydownTrigger;
      }
      // Only the keyup function is different from the linked one
      else if (
        this._linkedKeydownTrigger == this._keydownTrigger &&
        this._linkedKeyupTrigger != this._keyupTrigger
      ) {
        document.removeEventListener("keyup", this._linkedKeyupTrigger);

        document.addEventListener("keyup", this._keyupTrigger);
        this._linkedKeyupTrigger = this._keyupTrigger;
      }
      // Both functions are unchanged
      else {
        throw new Error(
          "Both keydown and keyup triggers are already linked, restart can not be performed. Change 'keydownTrigger' or 'keyupTrigger' and try again."
        );
      }
    } else if (!this.isLinked) {
      throw new Error(
        "The controller is not linked. 'restart()' can be performed only on linked controllers. Use 'link()' on a controller before 'restart()'"
      );
    } else {
      throw new Error(
        "An unknown error has occured. If this error keeps occuring, consider resetting the controller."
      );
    }
  }
}
