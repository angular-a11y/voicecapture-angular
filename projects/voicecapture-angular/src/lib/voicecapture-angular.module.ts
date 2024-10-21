import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VoiceCapture } from './voicecapture-angular.component';

@NgModule({
  declarations: [VoiceCapture],
  exports: [VoiceCapture],
  imports: [CommonModule],
})
export class VoicecaptureModule {}
