import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';

import { LngLatLike, Map, Marker } from 'mapbox-gl';
import { Globals } from '../../../globals';

@Component({
  selector: 'maps-mini-map',
  templateUrl: './mini-map.component.html',
  styles: `
    div{
      width:100%;
      height: 150px;
      margin:0;
      background-color: 'aliceblue';
    }
  `
})

export class MiniMapComponent implements AfterViewInit{
  
  @Input() 
  public lngLat?: [number, number];

  @ViewChild('miniMap') divMap?: ElementRef;

  public map?: Map;

  constructor(private globals: Globals){}

  ngAfterViewInit(): void {
    if ( !this.divMap?.nativeElement )
      throw 'Map div not found';

    if ( !this.lngLat )
      throw 'Coordinates can\'t be null';

    this.map = new Map({
      accessToken: this.globals.mapBoxApiKey,
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/outdoors-v12',
      center: this.lngLat,
      zoom: 15,
      interactive: false
    });

    const marker = new Marker({
      color:  '#xxxxxx'.replace(/x/g, y => (Math.random() * 16 | 0).toString(16))
    }).setLngLat(this.lngLat as LngLatLike)
      .addTo(this.map);
  }
}