import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { Globals } from './globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(
    private globals: Globals,
    private router: Router,
  ){}
  title = 'mapsApp';

  get isApiKeyReady(): boolean{
    return this.globals.mapBoxApiKey !== undefined && this.globals.mapBoxApiKey !== '';
  }
  
  saveApiKey(apiKey: string) {
    if(!apiKey)
      throw 'Enter a valid API key';

    this.globals.mapBoxApiKey = apiKey;
    this.router.navigateByUrl('/maps');
  }

  goToStandAlone(){
    this.globals.mapBoxApiKey = 'standalone';
    this.router.navigateByUrl('/alone');
  }
}
