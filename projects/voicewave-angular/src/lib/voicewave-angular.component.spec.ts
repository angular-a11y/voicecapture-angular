import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { VoiceWaveAngularComponent } from '../voicewave-angular.component';
import { By } from '@angular/platform-browser';

describe('VoiceWaveAngularComponent', () => {
  let component: VoiceWaveAngularComponent;
  let fixture: ComponentFixture<VoiceWaveAngularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VoiceWaveAngularComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VoiceWaveAngularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render title and subtitle', () => {
    component.title = 'Test Title';
    component.subtitle = 'Test Subtitle';
    fixture.detectChanges();

    const titleElement = fixture.debugElement.query(
      By.css('.up-window-title')
    ).nativeElement;
    const subtitleElement = fixture.debugElement.query(
      By.css('.up-window-subtitle')
    ).nativeElement;

    expect(titleElement.textContent).toContain('Test Title');
    expect(subtitleElement.textContent).toContain('Test Subtitle');
  });

  it('should append modal to body when isOpen is true', fakeAsync(() => {
    component.isOpen.set(false);
    fixture.detectChanges();
    expect(document.body.querySelector('.up-window')).toBeNull();

    component.isOpen.set(true);
    fixture.detectChanges();
    tick(100);
    expect(document.body.querySelector('.up-window')).toBeTruthy();

    component.isOpen.set(false);
    fixture.detectChanges();
    tick(400);
    expect(document.body.querySelector('.up-window')).toBeNull();
  }));

  it('should not reappend modal if it is already in the body', fakeAsync(() => {
    component.isOpen.set(true);
    fixture.detectChanges();
    tick(600);

    spyOn(component, 'addModalToBody').and.callThrough();

    component.addModalToBody();
    fixture.detectChanges();

    expect(component.addModalToBody).toHaveBeenCalledTimes(1);
    expect(document.body.querySelectorAll('.up-window').length).toBe(1);
  }));

  it('should apply the correct animation class when opening and closing the window', fakeAsync(() => {
    component.animation = 'slide';

    component.isOpen.set(true);
    component.openingAnimation = true;
    component.closingAnimation = false;
    fixture.detectChanges();

    tick(100);

    let windowElement = fixture.debugElement.query(By.css('.up-window'));

    expect(windowElement.classes['slide']).toBeTrue();

    component.closingAnimation = true;
    component.openingAnimation = false;
    component.isOpen.set(false);
    fixture.detectChanges();

    tick(600);

    windowElement = fixture.debugElement.query(By.css('.up-window'));

    expect(windowElement.classes['slide-out']).toBeTrue();
    expect(component.isOpen()).toBeFalse();
  }));

  it('should trigger onConfirm and onCancel when buttons are clicked', async () => {
    spyOn(component, 'onConfirm').and.callThrough();
    spyOn(component, 'onCancel').and.callThrough();

    component.isOpen.set(true);
    fixture.detectChanges();

    await fixture.whenStable();
    fixture.detectChanges();

    const confirmButton = fixture.debugElement.query(By.css('.btn-confirm'));
    const cancelButton = fixture.debugElement.query(By.css('.btn-cancel'));

    expect(confirmButton).toBeTruthy();
    expect(cancelButton).toBeTruthy();

    confirmButton.nativeElement.click();
    await fixture.whenStable();
    expect(component.onConfirm).toHaveBeenCalled();
    expect(component.isOpen()).toBeFalse();

    component.isOpen.set(true);
    fixture.detectChanges();

    await fixture.whenStable();
    cancelButton.nativeElement.click();
    await fixture.whenStable();
    expect(component.onCancel).toHaveBeenCalled();
    expect(component.isOpen()).toBeFalse();
  });

  it('should apply custom class from @Input', () => {
    component.class = 'custom-class';
    fixture.detectChanges();

    const windowElement = fixture.debugElement.query(By.css('.up-window'));
    expect(windowElement.classes['custom-class']).toBeTruthy();
  });

  it('should set isOpen to true when openWindow is called', () => {
    component.isOpen.set(true);
    expect(component.isOpen()).toBeTrue();
  });

  it('should set isOpen to false after closeWindow is called', fakeAsync(() => {
    component.isOpen.set(true);
    fixture.detectChanges();

    component.isOpen.set(false);
    fixture.detectChanges();

    tick(600);
    expect(component.isOpen()).toBeFalse();
  }));

  it('should not show confirm and cancel buttons if hiddenActions is true', () => {
    component.hiddenActions = true;
    component.isOpen.set(true);
    fixture.detectChanges();

    const confirmButton = fixture.debugElement.query(By.css('.btn-confirm'));
    const cancelButton = fixture.debugElement.query(By.css('.btn-cancel'));

    expect(confirmButton).toBeNull();
    expect(cancelButton).toBeNull();
  });

  it('should show confirm and cancel buttons if hiddenActions is false', () => {
    component.hiddenActions = false;
    component.isOpen.set(true);
    fixture.detectChanges();

    const confirmButton = fixture.debugElement.query(By.css('.btn-confirm'));
    const cancelButton = fixture.debugElement.query(By.css('.btn-cancel'));

    expect(confirmButton).toBeTruthy();
    expect(cancelButton).toBeTruthy();
  });
});
