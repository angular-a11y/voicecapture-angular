import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCodeComponent } from './app-code.component';

describe('AppCodeComponent', () => {
  let component: AppCodeComponent;
  let fixture: ComponentFixture<AppCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppCodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
