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
  [clipboard]="true"
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

In the `VoiceCaptureExampleComponent`, a `WritableSignal<boolean>` named `isVoiceCaptureExample` is defined and initialized to `false`. The `openVoiceCapture` method sets `isVoiceCaptureExample` to `true`, triggering the voice capture process. The `enableClipboard` property is used to enable clipboard integration.

## Inputs

| Input       | Type                  | Default     | Description                                                                                  |
|-------------|-----------------------|-------------|----------------------------------------------------------------------------------------------|
| `start`     | `WritableSignal<boolean>` | `false`     | Controls the initiation of voice capture.                                                    |
| `lang`      | `string`              | `"en"`      | Specifies the language for speech recognition (e.g., `"pt"` for Portuguese).                |
| `mode`      | `string`              | `"fullscreen"` | Defines the display mode: `"float"` for inline, `"fullscreen"` for full-screen.              |
| `clipboard` | `boolean`             | `false`     | Enables copying the final transcript text to the clipboard automatically.                    |

### Example with Clipboard:

```html
<voicecapture-angular [start]="isVoiceCaptureExample" [clipboard]="true" />
```

## Outputs

| Output              | Payload     | Description                                                                                     |
|---------------------|-------------|-------------------------------------------------------------------------------------------------|
| `voiceTranscript`   | `string`    | Emitted with the transcribed voice input.                                                       |

## Features

- **Real-time Voice Transcription**: Instantly capture and display voice input as text.
- **Editable Transcripts**: Users can modify the transcribed text through input fields or text areas.
- **Clipboard Integration**: Automatically copies the final transcript to the clipboard, streamlining user workflows.
- **Customizable Events**: Easily handle transcription results with customizable output events.
