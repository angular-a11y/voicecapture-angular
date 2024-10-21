# voicecapture-angular

`voicecapture-angular` is an Angular library designed to provide seamless voice capture and transcription capabilities for web applications. With an easy-to-use API, `voicecapture-angular` allows developers to integrate voice recognition features effortlessly, enabling users to interact with applications using their voice. The library offers customizable options for handling voice input and transcription, making it a flexible solution for enhancing user interfaces.

## Installation

To install `voicecapture-angular`, run the following command:

```bash
npm install voicecapture-angular
```

## Usage Example

```typescript
import { Component } from '@angular/core';
import { signal, WritableSignal } from 'signals';
import { VoiceCapture } from 'voicecapture-angular';

@Component({
  selector: 'app-voicecapture-example',
  templateUrl: './voicecapture-example.component.html',
})
export class VoiceCaptureExampleComponent {
  isVoiceCaptureExample: WritableSignal<boolean> = signal(false);
  voiceTextTranscript!: string;

  openVoiceCapture() {
    this.isVoiceCaptureExample.set(true);
  }

  returnVoiceTranscript(transcript: string) {
    this.voiceTextTranscript = transcript;
  }
}
```

### HTML Template

```html
<button (click)="openVoiceCapture()">
  Open VoiceCapture Example
</button>

<voicecapture-angular
  [start]="isVoiceCaptureExample"
  (voiceTranscript)="returnVoiceTranscript($event)"
/>

@if(voiceTextTranscript) {
  <h2>Transcript Results</h2>
  <p>{{ voiceTextTranscript }}</p>
  <label for="voiceTextInput">Input Example:</label>
  <input
    id="voiceTextInput"
    type="text"
    [(ngModel)]="voiceTextTranscript"
    placeholder="Texto do Voice Transcript"
  />

  <label for="voiceTextArea" >Textarea Example:</label>
  <textarea
    id="voiceTextArea"
    [(ngModel)]="voiceTextTranscript"
    placeholder="Texto do Voice Transcript"
  ></textarea>

  <button (click)="alertExampleButton()">
    {{ voiceTextTranscript }}
  </button>
}
```

## Component Setup

In the `VoiceCaptureExampleComponent`, a `WritableSignal<boolean>` named `isVoiceCaptureExample` is defined, initialized to `false`. The `openVoiceCapture` method sets `isVoiceCaptureExample` to `true`, which triggers the voice capture process.

## Inputs

### @Input() start: WritableSignal<boolean>

Controls the initiation of voice capture.

### @Input() lang: string = 'en'

Language of voice capture, this default is en.

### @Input() mode: string = 'fullscreen'

Mode of voice capture, this default is `fullscreen` other value `float`.

**Example**: Start capturing voice input.

```html
<voicecapture-angular [start]="isVoiceCaptureExample" />
```

### Outputs

### (voiceTranscript)

An event that emits the transcribed voice input. 

**Example**: Capture and use the transcribed text.

```typescript
returnVoiceTranscript(transcript: string) {
  this.voiceTextTranscript = transcript;
}
```

## Features

- **Real-time Voice Transcription**: Instantly capture and display voice input as text.
- **Editable Transcripts**: Users can modify the transcribed text through input fields or text areas.
- **Customizable Events**: Easily handle transcription results with customizable output events.
