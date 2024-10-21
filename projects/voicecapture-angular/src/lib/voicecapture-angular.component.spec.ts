import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoiceCapture } from './voicecapture-angular.component';

describe('VoiceCapture', () => {
  let component: VoiceCapture;
  let fixture: ComponentFixture<VoiceCapture>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoiceCapture],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoiceCapture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
