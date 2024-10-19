import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoiceWave } from './voicewave-angular.component';

describe('VoiceWave', () => {
  let component: VoiceWave;
  let fixture: ComponentFixture<VoiceWave>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VoiceWave],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoiceWave);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
