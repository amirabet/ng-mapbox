import { Component } from '@angular/core';

import { Globals } from './globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private globals: Globals){}
  title = 'mapsApp';

  get isApiKeyReady(): boolean{
    return this.globals.mapBoxApiKey !== undefined && this.globals.mapBoxApiKey !== '';
  }
  
  saveApiKey(apiKey: string) {
    if(!apiKey)
      throw 'Enter a valid API key';

    this.globals.mapBoxApiKey = apiKey;
  }
}
