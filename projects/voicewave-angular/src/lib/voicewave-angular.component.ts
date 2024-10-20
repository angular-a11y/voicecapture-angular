import {
  Component,
  OnInit,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'voicewave',
  standalone: true,
  templateUrl: './voicewave-angular.component.html',
  styleUrls: [
    './voicewave-angular.component.scss',
    './voicewave-angular.variables.scss',
  ],
})
export class VoiceWave implements OnInit, OnChanges {
  @Input() show: boolean = false;
  @Output() updateVoice = new EventEmitter<boolean>();

  finalTranscript: string = '';
  recognizing: boolean = false;
  ignoreOnEnd: boolean = false;
  recognition: any = null;
  animationButton: boolean = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.setupVoiceRecognition();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['show']) {
      this.show ? this.activateVoice() : this.deactivateVoice();
    }
  }

  disableVoice(): void {
    this.updateVoice.emit(false);
  }

  activateVoice(): void {
    if (!this.recognizing && this.recognition) {
      this.recognizing = true;
      this.finalTranscript = '';
      this.recognition.start();
    }
  }

  deactivateVoice(): void {
    if (this.recognizing && this.recognition) {
      this.recognizing = false;
      this.animationButton = false;
      this.recognition.stop();
    }
  }

  setupVoiceRecognition(): void {
    if (!('webkitSpeechRecognition' in window)) {
      console.warn('SpeechRecognition not supported, please update your browser.');
      return;
    }

    this.recognition = new (window as any).webkitSpeechRecognition();
    this.recognition.continuous = false;
    this.recognition.lang = 'pt-BR';
    this.recognition.interimResults = true;

    this.recognition.onstart = () => {
      this.recognizing = true;
      this.updateText('Speak now');
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
        document.querySelector('.voicewave .exit')?.dispatchEvent(new Event('click'));
      }
    };

    this.recognition.onresult = (event: any) => {
      this.handleResults(event);
    };
  }

  private handleError(error: string): void {
    switch (error) {
      case 'no-speech':
        console.warn('No speech detected.');
        this.ignoreOnEnd = true;
        break;
      case 'audio-capture':
        console.warn('Audio capture problem.');
        this.ignoreOnEnd = true;
        break;
      case 'not-allowed':
        this.updateText('Enable the microphone');
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
      document.body.removeAttribute('style');
      console.log(this.finalTranscript);
      this.recognition?.stop();
    }
  }

  private updateText(text: string): void {
    const textElement = document.querySelector('.voicewave p');
    if (textElement) {
      textElement.textContent = text;
    }
  }
}
