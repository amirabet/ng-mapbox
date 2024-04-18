import { Component, ElementRef, ViewChild } from '@angular/core';
import { Map, LngLat, Marker } from 'mapbox-gl';
import { Globals } from '../../../globals';

interface MarkerAndColor {
  marker: Marker;
  color: string;
}

interface PlainMarker {
  color: string;
  lngLat: number[];
}

@Component({
  templateUrl: './markers-page.component.html',
  styles: `
    #map {
      width: 100vw;
      height:100vh;
      background-color: aliceblue;
    }

    .list-group {
      top:10px;
      right:10px;
      font-size:70%;
    }

    button {
      position: fixed;
      bottom: 30px;
      right: 10px;
      box-shadow: 1px 1px 0px rgba(255, 255, 255, 0.2);
    }
  `
})
export class MarkersPageComponent {

  @ViewChild('map') divMap?: ElementRef;

  private _LOCAL_STORAGE_MARKERS_KEY: string = "markers";

  public markers: MarkerAndColor[] = [];

  public map?: Map;
  public currentLngLat: LngLat = new LngLat(2.7569, 42.1255);

  constructor(private globals: Globals){}

  ngAfterViewInit(): void {

    if (!this.divMap)
      throw 'Falta el elemento HTML contenedor del mapa';

    this.map = new Map({
      accessToken: this.globals.mapBoxApiKey,
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/dark-v11', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: 13, // starting zoom
    });

    this.readFromLocalStorage();

  }

  createMarker() {
    if (!this.map)
      return;

    const color = '#xxxxxx'.replace(/x/g, y => (Math.random() * 16 | 0).toString(16));
    const lngLat = this.map.getCenter();

    this.addMarker(lngLat, color);
  }

  addMarker(lngLat: LngLat, color: string): void {
    if (!this.map)
      return;

    //const markerHtml = document.createElement('div');
    //markerHtml.innerHTML = "CM!";

    const marker = new Marker(
      {
        color: color,
        //element: markerHtml => custom html!
        draggable: true,
      }).setLngLat(lngLat)
      .addTo(this.map);

    this.markers.push({ marker: marker, color: color });

    this.saveTolocalStorage();

    marker.on('dragend', () => this.saveTolocalStorage());
  }

  deleteMarker(index: number) {
    this.markers[index].marker.remove();
    this.markers.splice(index, 1);
  }

  goToMarkerLocation(index: number) {
    if (!this.map)
      return;

    const lngLat = this.markers[index].marker.getLngLat();

    this.map.flyTo({
      zoom: 14,
      center: lngLat
    });
  }

  saveTolocalStorage() {
    const plainMarkers: PlainMarker[] = this.markers.map(({ color, marker }) => {
      return {
        color: color,
        lngLat: marker.getLngLat().toArray()
      }
    });

    localStorage.setItem(this._LOCAL_STORAGE_MARKERS_KEY, JSON.stringify(plainMarkers));
  }

  readFromLocalStorage() {
    const plainMarkersString = localStorage.getItem(this._LOCAL_STORAGE_MARKERS_KEY) ?? '[]';
    const plainMarkers: PlainMarker[] = JSON.parse(plainMarkersString); //! OJO poteniclamente inseguro, no tenemos control del formato guardado

    plainMarkers.forEach ( ({ color, lngLat }) => {
      const [ lng, lat ] = lngLat;
      const coords = new LngLat(lng, lat);

      this.addMarker(coords, color);
    })
  }
}


