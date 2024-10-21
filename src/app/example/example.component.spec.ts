import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoiceCaptureExample } from './example.component';

describe('VoiceCaptureExample', () => {
  let component: VoiceCaptureExample;
  let fixture: ComponentFixture<VoiceCaptureExample>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoiceCaptureExample]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoiceCaptureExample);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
