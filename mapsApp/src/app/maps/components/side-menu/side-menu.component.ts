import { Component } from '@angular/core';
import { Globals } from '../../../globals';

interface MenuIntem {
  name: string,
  route: string
}

@Component({
  selector: 'maps-side-menu',
  templateUrl: './side-menu.component.html',
  styles: `
    li.list-group-item{
      cursor: pointer;
      transition: 0.3s all;
      font-size:80%;
    }

    li.list-group-item.active{
        cursor: default;
    }
  `
})
export class SideMenuComponent {

  constructor(private globals: Globals){}

  public menuItems: MenuIntem[] = [
    { route: '/maps/fullscreen', name: 'FullScreen' },
    { route: '/maps/markers', name: 'Markers' },
    { route: '/maps/properties', name: 'Properties' },
    { route: '/maps/zoomrange', name: 'Zoom Range' },
  ];

  removeApiKey(){
    this.globals.mapBoxApiKey = undefined;
  }

}
