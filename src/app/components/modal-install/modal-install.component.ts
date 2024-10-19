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
import VoiceWaveAngularModule from 'voicewave-angular';

@Component({
  selector: 'app-window-example',
  template: \`
<button class="button-voicewave-example" type="button" (click)="openVoiceWave()">
  Open VoiceWave Example
</button>

<voicewave-angular />\`,
})
export class WindowExampleComponent {
  isVoiceWaveExample: WritableSignal<boolean> = signal(false);

  openVoiceWave() {
    this.isVoiceWaveExample.set(true);
  }
}`;
}
