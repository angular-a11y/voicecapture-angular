import { Component, signal, WritableSignal } from '@angular/core';
import { VoiceCapture } from '../../../projects/voicecapture-angular/src/public-api';
import { FormsModule } from '@angular/forms';
import { NucleusBox } from 'nucleus-angular';

@Component({
    selector: 'example-voicecapture',
    imports: [VoiceCapture, FormsModule, NucleusBox],
    templateUrl: './example.component.html',
    styleUrl: './example.component.scss'
})
export class VoiceCaptureExample {
  isVoiceCaptureExample: WritableSignal<boolean> = signal(false);
  voiceTextTranscript!: string;
  langSelect = 'en';
  modeSelect = 'fullscreen';

  openVoiceCapture(mode: string) {
    this.modeSelect = mode;
    this.isVoiceCaptureExample.set(true);
  }

  returnVoiceTranscript(transcript: string) {
    this.voiceTextTranscript = transcript;
  }
}
