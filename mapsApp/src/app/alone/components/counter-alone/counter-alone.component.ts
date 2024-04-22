import { Component, Input } from '@angular/core';

@Component({
  selector: 'counter-alone',
  standalone: true,
  imports: [], //Import CommonMudule para trabajar con propiedaes comunes de angular como *ngIf
  templateUrl: './counter-alone.component.html',
  styleUrl: './counter-alone.component.css'
})
export class CounterAloneComponent {

  @Input()
  public counter: number = 16;

}
