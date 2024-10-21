import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { AppCodeComponent } from '../app-code/app-code.component';

@Component({
  selector: 'app-modal-install',
  standalone: true,
  templateUrl: './modal-install.component.html',
  styleUrl: './modal-install.component.scss',
  encapsulation: ViewEncapsulation.None,
  imports: [AppCodeComponent],
})
export class ModalinstallComponent {
  @Input() active: boolean = false;
  @Output() closeModal = new EventEmitter<void>();

  onCloseModal(): void {
    this.closeModal.emit();
  }

  codeExample: string = `// Example Component
import { Component } from '@angular/core';
import { signal, WritableSignal } from 'signals';
import { VoiceWave } from 'voicecapture-angular';

@Component({
  selector: 'app-voicewave-example',
  template: \`
  <button (click)="openVoiceWave()">
    Open VoiceWave Example
  </button>

  <voicecapture-angular
    [start]="isVoiceWaveExample"
    (voiceTranscript)="returnVoiceTranscript($event)"
  />

  @if(voiceTextTranscript) {
    <h2>Transcript Results</h2>
    <p class="voice-text">{{ voiceTextTranscript }}</p>
  }
\`,
})
export class VoiceWaveExampleComponent {
  isVoiceWaveExample: WritableSignal<boolean> = signal(false);
  voiceTextTranscript!: string;

  openVoiceWave() {
    this.isVoiceWaveExample.set(true);
  }

  returnVoiceTranscript(transcript: string) {
    this.voiceTextTranscript = transcript;
  }
}`;
}
