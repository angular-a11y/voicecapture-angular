import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VoiceCapture } from './voicecapture-angular.component.legacy';

@NgModule({
  declarations: [VoiceCapture],
  imports: [CommonModule],
  exports: [VoiceCapture],
})
export class VoiceCaptureModule {}
