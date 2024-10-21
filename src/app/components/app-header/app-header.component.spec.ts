import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppHeaderComponent } from './app-header.component';

describe('AppHeaderComponent', () => {
  let component: AppHeaderComponent;
  let fixture: ComponentFixture<AppHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the logo link with correct attributes', () => {
    const logoLink = fixture.debugElement.query(By.css('.logo')).nativeElement;
    expect(logoLink.href).toBe('https://www.npmjs.com/package/voicecapture-angular');
    expect(logoLink.getAttribute('target')).toBe('_blank');
  });

  it('should render the Angular logo SVG with correct attributes', () => {
    const svgElement = fixture.debugElement.query(By.css('.angular-logo')).nativeElement;
    expect(svgElement.getAttribute('width')).toBe('80');
    expect(svgElement.getAttribute('xmlns')).toBe('http://www.w3.org/2000/svg');
    expect(svgElement.getAttribute('viewBox')).toBe('0 0 232 239');
    expect(svgElement.getAttribute('fill')).toBe('none');
    expect(svgElement.getAttribute('class')).toContain('angular-logo');
  });
});
