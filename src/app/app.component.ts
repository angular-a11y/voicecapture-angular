import { Component, Renderer2, signal, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DarkmodeComponent } from 'darkmode-angular';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { ModalinstallComponent } from './components/modal-install/modal-install.component';
import { AppFooterComponent } from './components/app-footer/app-footer.component';
import { FormsModule } from '@angular/forms';
import { VoiceCapture } from '../../projects/voicecapture-angular/src/public-api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    AppHeaderComponent,
    ModalinstallComponent,
    DarkmodeComponent,
    AppFooterComponent,
    VoiceCapture,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private renderer: Renderer2) {}

  codeString: string = 'npm install voicecapture-angular';
  isModalActive: boolean = false;
  isVoiceCaptureExample: WritableSignal<boolean> = signal(false);
  voiceTextTranscript!: string;
  langSelect = 'en-US';

  openModal(): void {
    this.isModalActive = true;
    this.renderer.addClass(document.body, 'modal-active');
  }

  closeModal(): void {
    this.isModalActive = false;
    this.renderer.removeClass(document.body, 'modal-active');
  }

  openVoiceCapture() {
    this.isVoiceCaptureExample.set(true);
  }

  returnVoiceTranscript(transcript: string) {
    this.voiceTextTranscript = transcript;
  }

  alertExampleButton() {
    alert(this.voiceTextTranscript);
  }
}
