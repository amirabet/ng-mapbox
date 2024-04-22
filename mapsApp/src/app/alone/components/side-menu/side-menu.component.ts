import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

import { Globals } from '../../../globals';

interface MenuIntem {
  name: string,
  route: string
}

@Component({
  standalone: true,
  selector: 'side-menu',
  imports: [
    CommonModule,
    RouterModule,
    RouterLink,
  ],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css',
})
export class SideMenuComponent {

  constructor( private globals: Globals ){}

  public menuItems: MenuIntem[] = [
    { route: '/maps/fullscreen', name: 'FullScreen' },
    { route: '/maps/markers', name: 'Markers' },
    { route: '/maps/properties', name: 'Properties' },
    { route: '/maps/zoomrange', name: 'Zoom Range' },
    { route: '/alone', name: 'Alone Page' },
  ];

  removeApiKey(){
    this.globals.mapBoxApiKey = undefined;
  }
}
