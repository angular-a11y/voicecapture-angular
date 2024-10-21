import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VoiceCaptureLegacy } from './voicecapture-angular.component.legacy';

@NgModule({
  declarations: [VoiceCaptureLegacy],
  imports: [CommonModule],
  exports: [VoiceCaptureLegacy],
})
export class VoiceCaptureModule {}
