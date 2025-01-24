import { Component } from '@angular/core';
import { NucleusAngularApp } from 'nucleus-angular';
import { VoiceCaptureExample } from './example/example.component';

import pkg from '../../package.json';
import pkgNPM from '../../projects/voicecapture-angular/package.json';
import { ExampleComponent } from './app.example';
@Component({
    selector: 'app-root',
    imports: [
        NucleusAngularApp,
        VoiceCaptureExample,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  public appVersion;
  public angularVersion;
  public configNucleus: {
    name: string;
    github: string;
    npm: string;
    appVersion: string;
    angularVersion: string;
    stepsInstall: Array<{ name: string; language: string; content: string }>;
  };

  constructor() {
    this.appVersion = pkgNPM.version;
    this.angularVersion = pkg.dependencies?.['@angular/core'].replace('^', '');
    this.configNucleus = {
      name: 'voicecapture-angular',
      github: 'https://github.com/angular-a11y/voicecapture-angular',
      npm: 'https://www.npmjs.com/package/voicecapture-angular',
      appVersion: this.appVersion,
      angularVersion: this.angularVersion,
      stepsInstall: [
        {
          name: 'Install',
          language: 'bash',
          content: 'npm install voicecapture-angular',
        },
        {
          name: 'Usage',
          language: 'tsx',
          content: ExampleComponent,
        },
      ],
    };
  }
}
