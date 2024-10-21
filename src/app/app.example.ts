export const ExampleComponent = `// Example Component
import { Component } from '@angular/core';
import { signal, WritableSignal } from 'signals';
import { VoiceCapture } from 'voicecapture-angular';

@Component({
  selector: 'app-voicecapture-example',
  imports: [VoiceCapture],
  template: \`
  <button (click)="openVoiceCapture()">
    Open VoiceCapture Example
  </button>

  <voicecapture-angular
    [start]="isVoiceCaptureExample"
    (voiceTranscript)="returnVoiceTranscript($event)"
  />

  @if(voiceTextTranscript) {
    <h2>Transcript Results</h2>
    <p class="voice-text">{{ voiceTextTranscript }}</p>
  }
\`,
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
}`;
