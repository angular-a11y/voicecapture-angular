import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  WritableSignal,
  signal,
  effect,
} from '@angular/core';
import { translates } from './voicecapture-angular.translate';

@Component({
  selector: 'voicecapture',
  standalone: true,
  templateUrl: './voicecapture-angular.component.html',
  imports: [CommonModule],
  styleUrls: [
    './voicecapture-angular.component.scss',
    './voicecapture-angular.variables.scss',
  ],
})
export class VoiceCapture implements OnInit {
  @Input() start: WritableSignal<boolean> = signal(false);
  @Input() lang: string = 'en-US';
  @Input() mode: string = 'fullscreen';
  @Output() voiceTranscript = new EventEmitter<string>();

  finalTranscript: string = '';
  recognizing: boolean = false;
  ignoreOnEnd: boolean = false;
  recognition: any = null;
  animationButton: boolean = false;
  translations: { [key: string]: { [key: string]: string } } = translates;

  constructor(private cdr: ChangeDetectorRef) {
    effect(
      () => {
        if (this.start()) {
          this.activateVoice();
        } else {
          this.deactivateVoice();
        }
      },
      { allowSignalWrites: true }
    );
  }

  ngOnInit(): void {
    this.setupVoiceRecognition();
  }

  activateVoice(): void {
    if (!this.recognizing && this.recognition) {
      this.recognition.lang = this.lang;
      this.recognizing = true;
      this.finalTranscript = '';
      this.recognition.start();
    }
  }

  deactivateVoice(): void {
    this.start.set(false);
    if (this.recognizing && this.recognition) {
      this.recognizing = false;
      this.animationButton = false;
      this.recognition.stop();
    }
  }

  setupVoiceRecognition(): void {
    if (!('webkitSpeechRecognition' in window)) {
      console.warn(
        'SpeechRecognition not supported, please update your browser.'
      );
      return;
    }

    this.recognition = new (window as any).webkitSpeechRecognition();
    this.recognition.continuous = false;
    this.recognition.lang = this.lang;
    this.recognition.interimResults = true;

    this.recognition.onstart = () => {
      this.recognizing = true;
      this.updateText('speakNow');
      this.animationButton = true;
      this.cdr.markForCheck();
    };

    this.recognition.onerror = (event: any) => {
      this.animationButton = false;
      this.handleError(event.error);
      this.cdr.markForCheck();
    };

    this.recognition.onend = () => {
      this.recognizing = false;

      if (!this.ignoreOnEnd && this.finalTranscript) {
        this.updateText('');
        this.deactivateVoice();
      }

      this.animationButton = false;
      this.cdr.markForCheck();
    };

    this.recognition.onresult = (event: any) => {
      this.handleResults(event);
    };
  }

  private handleError(error: string): void {
    switch (error) {
      case 'no-speech':
        console.warn(this.getTranslation('noSpeech'));
        this.ignoreOnEnd = true;
        break;
      case 'audio-capture':
        console.warn(this.getTranslation('audioCapture'));
        this.ignoreOnEnd = true;
        break;
      case 'not-allowed':
        this.updateText('enableMicrophone');
        this.ignoreOnEnd = true;
        break;
      default:
        console.warn('Unknown error:', error);
        break;
    }
  }

  private handleResults(event: any): void {
    let interimTranscript = '';

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        this.finalTranscript += event.results[i][0].transcript;
      } else {
        interimTranscript += event.results[i][0].transcript;
      }
    }

    this.updateText(interimTranscript || this.finalTranscript);

    if (this.finalTranscript) {
      this.voiceTranscript.emit(this.finalTranscript);
      this.deactivateVoice();
    }
  }

  private updateText(key: string): void {
    const textElement = document.querySelector('.voicecapture .text-tip');
    if (textElement) {
      textElement.textContent = this.getTranslation(key);
    }
  }

  private getTranslation(key: string): string {
    const translationsForLang =
      this.translations[this.lang] || this.translations['en-US'];
    return translationsForLang[key] || key;
  }
}
