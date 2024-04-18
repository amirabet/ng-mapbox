import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import { LngLat, Map } from 'mapbox-gl';

import { Globals } from '../../../globals';



@Component({
  templateUrl: './full-screen-page.component.html',
  styles: `
    div {
      width: 100vw;
      height:100vh;
      background-color: aliceblue;
    }
  `
})
export class FullScreenPageComponent implements AfterViewInit {

  @ViewChild('map') divMap?: ElementRef;

  public lngLat: LngLat = new LngLat(2.7569, 42.1255);

  constructor(private globals: Globals){}

  ngAfterViewInit(): void {

    if (!this.divMap)
      throw 'Falta el elemento HTML contenedor del mapa';

    const map = new Map({
      accessToken: this.globals.mapBoxApiKey,
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/720grados/clv3xqq7400fo01qz29mx0995',//mapbox://styles/mapbox/outdoors-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: 5, // starting zoom
    });
  }

}
