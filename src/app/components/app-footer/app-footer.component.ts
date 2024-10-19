import { Component, OnInit } from '@angular/core';
import { AppVersionComponent } from '../app-version/app-version.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [AppVersionComponent],
  templateUrl: './app-footer.component.html',
  styleUrls: ['./app-footer.component.scss'],
})
export class AppFooterComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
