import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AppFooterComponent } from './app-footer.component';

describe('AppFooterComponent', () => {
  let component: AppFooterComponent;
  let fixture: ComponentFixture<AppFooterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ AppFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the correct footer structure', () => {
    const footerElement: HTMLElement = fixture.nativeElement;
    expect(footerElement.querySelector('.footer')).toBeTruthy();

    const linkElement: HTMLAnchorElement | null = footerElement.querySelector('a');
    expect(linkElement).toBeTruthy();
    if (linkElement) {
      expect(linkElement.getAttribute('href')).toBe('https://github.com/angular-a11y/voicewave-angular');
      expect(linkElement.getAttribute('target')).toBe('_blank');
    }

    const appVersionComponent = footerElement.querySelector('app-version');
    expect(appVersionComponent).toBeTruthy();

    const svgElement: SVGSVGElement | null = footerElement.querySelector('svg');
    expect(svgElement).toBeTruthy();
    if (svgElement) {
      expect(svgElement.getAttribute('viewBox')).toBe('0 0 25 25');
      expect(svgElement.getAttribute('width')).toBe('30');
      expect(svgElement.getAttribute('xmlns')).toBe('http://www.w3.org/2000/svg');
    }

    expect(footerElement.textContent).toContain('@lucasferreiralimax');
  });
});
