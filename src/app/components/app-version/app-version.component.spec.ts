import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AppVersionComponent } from './app-version.component';
import { By } from '@angular/platform-browser';

describe('AppVersionComponent', () => {
  let component: AppVersionComponent;
  let fixture: ComponentFixture<AppVersionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AppVersionComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render Angular version', () => {
    component.angularVersion = '12.3.4'; // Mocking angularVersion
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.app-version:nth-child(1)').textContent).toContain('Angular');
    expect(compiled.querySelector('.app-version:nth-child(1) b').textContent).toContain('12.3.4');
  });

  it('should render app version', () => {
    component.appVersion = '1.0.0'; // Mocking appVersion
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.app-version:nth-child(2) span').textContent).toContain('voicecapture-angular');
    expect(compiled.querySelector('.app-version:nth-child(2) b').textContent).toContain('1.0.0');
  });

  it('should display Angular and app version in correct format', () => {
    component.angularVersion = '12.3.4'; // Mocking angularVersion
    component.appVersion = '1.0.0'; // Mocking appVersion
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.app-version:nth-child(1)').textContent).toContain('Angular');
    expect(compiled.querySelector('.app-version:nth-child(1) b').textContent).toContain('12.3.4');
    expect(compiled.querySelector('.app-version:nth-child(2) span').textContent).toContain('voicecapture-angular');
    expect(compiled.querySelector('.app-version:nth-child(2) b').textContent).toContain('1.0.0');
  });

  it('should update Angular version dynamically', () => {
    component.angularVersion = '12.3.4'; // Mocking angularVersion
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.app-version:nth-child(1) b').textContent).toContain('12.3.4');

    component.angularVersion = '13.0.0'; // Updating angularVersion
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.app-version:nth-child(1) b').textContent).toContain('13.0.0');
  });

  it('should update app version dynamically', () => {
    component.appVersion = '1.0.0'; // Mocking appVersion
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.app-version:nth-child(2) b').textContent).toContain('1.0.0');

    component.appVersion = '2.0.0'; // Updating appVersion
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.app-version:nth-child(2) b').textContent).toContain('2.0.0');
  });
});
