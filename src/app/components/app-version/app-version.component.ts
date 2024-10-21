import { Component, OnInit } from '@angular/core';

import pkg from '../../../../package.json';
import pkgNPM from '../../../../projects/voicecapture-angular/package.json';

@Component({
  selector: 'app-version',
  standalone: true,
  templateUrl: './app-version.component.html',
  styleUrls: ['./app-version.component.scss']
})
export class AppVersionComponent implements OnInit {

  public appVersion
  public angularVersion

  constructor() {
    this.appVersion = pkgNPM.version
    this.angularVersion = pkg.dependencies?.["@angular/core"].replace('^', '')
  }

  ngOnInit(): void {
  }

}
