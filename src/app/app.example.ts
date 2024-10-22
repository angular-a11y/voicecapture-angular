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
    [start]="isVoiceState"
    (voiceTranscript)="voiceTranscript($event)"
  />

  @if(voiceTextTranscript) {
    <h2>Transcript Results</h2>
    <p>{{ voiceTextTranscript }}</p>
  }
\`,
})
export class VoiceCaptureExampleComponent {
  isVoiceState: WritableSignal<boolean> = signal(false);
  voiceTextTranscript!: string;

  openVoiceCapture() {
    this.isVoiceState.set(true);
  }

  voiceTranscript(transcript: string) {
    this.voiceTextTranscript = transcript;
  }
}`;
