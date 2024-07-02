<img src="https://i.imgur.com/1yvhcup.png" width="700px"/>
<br>
<br>

An easy-to-use library made for emulating a MIDI device with your keyboard.  
Typescript and Javascript compatible.

## ⬇️ Installation

    npm i keyboard-midi-controller

## ✌️ Getting Started

First, you have to import the library:

    import { KeyboardMidiController } from 'keyboard-midi-controller'

<br>

The library exposes the "KeyboardMidiController" class, which needs to be instantiated.

    const controller = new KeyboardMidiController()

<br>

To make the controller usable, you need to connect it to your page

    controller.link()

<br>

Now, if you open developer tools and press a key, you should be able to see logs such as these:

    Attack Event > {key: 'z', frequency: 261.624, note: 'C4'}
    Release Event > {key: 'z', frequency: 261.624, note: 'C4'}

## 🦾 Tailoring it to your needs

    controllerOutputAttack: ControllerOutputType;

    controllerOutputRelease: ControllerOutputType;

To access attack and release event objects, you have to pass a callback function to controllerOutputAttack and controllerOutputRelease

    const myAttackCallback: ControllerOutputType = (e: ControllerEvent) {
        console.log(`my attack event note: ${e.note}`)
    }
    const myReleaseCallback: ControllerOutputType = (e: ControllerEvent) {
        console.log(`my release event note: ${e.note}`)
    }

    controller.controllerOutputAttack = myAttackCallback
    controller.controllerOutputRelease = myReleaseCallback

<br>

Your custom callback will override the functions' default behaviour. To return the default behaviour back set a field to undefined.

    controller.controllerOutputAttack = undefined

## ❇️ Basics

### Base Frequency

    baseFrequency: number = 440

A field that is used to calculate frequencies of all notes. By default it is set to 440hz.

baseFrequency can not be lower than 1 and higher than 20000

    controller.baseFrequency = 1000

### Octaves

    firstOctave: number = 4
    secondOctave: number = 5

Octave fields control the octave that you play in and take part in frequency calculation.

An octave can not have a value lower than 1 and higher than 7

    controller.firstOctave = 3

### Constructor

    constructor(
        controllerOutputAttack?: ControllerOutputType,
        controllerOutputRelease?: ControllerOutputType,
        baseFrequency: number = 440,
        firstOctave: number = 4,
        secondOctave: number = 5
    )

## ✴️ Additional options

### Event Trigger

    keydownTrigger: ControllerTriggerType
    keyupTrigger: ControllerTriggerType

A trigger is a function that constructs an object of type ControllerEvent and passes it to the corresponding output function. Triggers are directly connected to event listeners.

If you want to change the default behaviour and use the controller in a custom way, you can set a trigger field to your function.

Be aware that a controller needs to be restarted in order for a new trigger to work.

    const customTrigger: ControllerTriggerType = (e: KeyboardEvent) {
        console.log("this is my custom trigger")
    }

    controller.keydownTrigger = customTrigger

    controller.restart()

### Auto Restart

    autoRestart: boolean = false

If is set to true, autoRestart makes the controller restart automatically whenever a trigger is changed. By default is set to false.

## 🧠 Methods

### Link and Unlink

    controller.link()

    controller.unlink()

Link and unlink are responsible for connecting and disconencting controllers from a webpage.

In order to work, a controller must be linked.

### Restart

    controller.restart()

Restarts a controller and connects new triggers to event listeners.

Has to be called when you change a trigger.

### Reset

    controller.reset()

Returns a controller to its default state.

## 🌓 Types

### ControllerEventType

    type ControllerEventType = {
        key: string;
        frequency: number;
        note: string;
    };

### ControllerOutputType

    type ControllerOutputType = (keyProps: ControllerEventType) => void

### ControllerTriggerType

    type ControllerTriggerType = (e: KeyboardEvent) => void

### ControllerFrequencyBindingObjectType

    type ControllerFrequencyBindingObjectType = {
        [key: string]: { note: string; frequency: number }
    }
