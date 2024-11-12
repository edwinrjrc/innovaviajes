import { Component, Input } from '@angular/core';
import { DecimalPipe, DatePipe } from '@angular/common';
import { OfertasEncontradas } from '../modelo/ofertasEncontradas';

@Component({
  selector: 'app-ofertavuelo',
  standalone: true,
  imports: [DecimalPipe, DatePipe],
  templateUrl: './ofertavuelo.component.html',
  styleUrl: './ofertavuelo.component.css'
})
export class OfertavueloComponent {
  @Input() ofertaEncontrada!: OfertasEncontradas;
  precioAdulto = 10098.21;

  constructor(){
    this.precioAdulto = 10098.21;
  }
}
