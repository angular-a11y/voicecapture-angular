import { Component, ElementRef, Input, AfterViewInit, ViewEncapsulation } from '@angular/core';
import hljs from 'highlight.js';

@Component({
  selector: 'app-code',
  standalone: true,
  imports: [],
  templateUrl: './app-code.component.html',
  styleUrl: './app-code.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AppCodeComponent implements AfterViewInit {
  @Input() language: string = '';

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    const codeElement = this.el.nativeElement.querySelector('code');
    if (this.language) {
      codeElement.className = this.language;
    }
    hljs.highlightElement(codeElement);
  }
}
