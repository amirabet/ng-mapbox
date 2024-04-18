import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';

import { LngLat, Map } from 'mapbox-gl';
import { Globals } from '../../../globals';


@Component({
  templateUrl: './zoom-range-page.component.html',
  styles: `
    #map {
      width: 100vw;
      height:100vh;
      background-color: aliceblue;
    }

    .floating-range {
      bottom: 20px;
      left: 20px;
      width: 300px;
    }

    .floating-content {
      display:flex;
      align-items:center;
    }
  `
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {

  @ViewChild('map') divMap?: ElementRef;

  public zoom: number = 13;
  public map?: Map;
  public lngLat: LngLat = new LngLat(2.7569, 42.1255);//{ "lng": 2.7513799949398674, "lat": 42.126013689106856 }

  constructor(private globals: Globals){}

  ngAfterViewInit(): void {

    if (!this.divMap)
      throw 'Falta el elemento HTML contenedor del mapa';

    this.map = new Map({
      accessToken: this.globals.mapBoxApiKey,
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/navigation-night-v1', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });

    this.mapListeners();
  }

  ngOnDestroy(): void {
    /*
    * Eliminamos el mapa para borrar todos sus listeners
    */
    this.map?.remove();
  }


  mapListeners(){
    if(!this.map)
      throw 'Falta el mapa';

    this.map.on('zoom', ev => {
      this.zoom = this.map!.getZoom();
    }); 

    this.map.on('zoomed', ev => {
      if (this.map!.getZoom() < 18)
        return;

      this.map!.zoomTo(18);
    }); 

    this.map.on('moveend', () => {
      this.lngLat = this.map!.getCenter();
    });
  }

  zoomIn(){
    this.map?.zoomIn();
  }

  zoomOut(){
    this.map?.zoomOut();
  }

  onZoomChanged(value: string){
    this.zoom = Number(value);
    this.map!.zoomTo(this.zoom);
  }

}

