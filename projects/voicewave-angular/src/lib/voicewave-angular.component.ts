import {
  Component,
  OnInit,
  DoCheck,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
} from '@angular/core';

@Component({
  selector: 'voicewave',
  standalone: true,
  templateUrl: './voicewave-angular.component.html',
  styleUrls: ['./voicewave-angular.component.scss'],
})
export class VoiceWave implements OnInit, DoCheck {
  @Input() show: boolean = false;
  @Output() updateVoice = new EventEmitter<any>();
  final_transcript: string = '';
  recognizing: boolean = false;
  ignore_onend: any;
  recognition: any;
  animationButton: boolean = false;
  root = <any>window.document;

  constructor(private _cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.voiceSetup();
    this.show ? this.activeVoice() : this.desactiveVoice();
  }

  ngDoCheck(): void {
    this.show ? this.activeVoice() : this.desactiveVoice();
  }

  disableVoice() {
    this.updateVoice.next(false);
  }

  activeVoice() {
    if (!this.recognizing) {
      this.recognizing = true;
      this.final_transcript = '';
      this.recognition.start();
    }
  }

  desactiveVoice() {
    if (this.recognizing) {
      this.recognizing = false;
      this.animationButton = false;
      this.recognition.stop();
    }
  }

  voiceSetup() {
    if (!('webkitSpeechRecognition' in window)) {
      console.log('atualize SpeechRecognition');
    } else {
      this.recognition = new (<any>window).webkitSpeechRecognition();

      this.recognition.continuous = false;
      this.recognition.interimResults = true;

      this.final_transcript = '';
      this.ignore_onend = false;
      this.root.querySelector('.voicewave p').textContent = 'Ative o microfone';

      this.recognition.onstart = () => {
        this.recognizing = true;
        this.root.querySelector('.voicewave p').textContent = 'Fale agora';
        this.animationButton = true;
        console.log('onstart voice');
        this._cdr.detectChanges();
      };

      this.recognition.onerror = (event: any) => {
        this.animationButton = false;
        if (event.error === 'no-speech') {
          console.log('onerror voice no-speech');
          this.ignore_onend = true;
        }
        if (event.error === 'audio-capture') {
          console.log('onerror audio-capture');
          this.ignore_onend = true;
        }
        if (event.error === 'not-allowed') {
          this.root.querySelector('.voicewave p').textContent =
            'Ative o microfone';
          this.ignore_onend = true;
        }
        this._cdr.detectChanges();
      };

      this.recognition.onend = () => {
        this.recognizing = false;
        if (this.ignore_onend) {
          return;
        }
        if (!this.final_transcript) {
          return;
        }
        this.root.querySelector('.voicewave .exit').click();
        this.root.querySelector('.voicewave p').textContent = '';
      };

      this.recognition.onresult = (event: any) => {
        var interim_transcript = '';
        for (var i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            this.final_transcript += event.results[i][0].transcript;
          } else {
            interim_transcript += event.results[i][0].transcript;
          }
        }
        if (interim_transcript) {
          this.root.querySelector('.voicewave p').textContent =
            interim_transcript;
        }
        if (this.final_transcript) {
          this.root.querySelector('body').removeAttribute('style');
          console.log(this.final_transcript);
          this.recognition.stop();
        }
      };
    }
  }
}
