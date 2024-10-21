import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VoiceCapture } from './voicecapture-angular.component';

@NgModule({
  imports: [CommonModule, VoiceCapture],
  exports: [VoiceCapture],
})
export class VoicecaptureModule {}
