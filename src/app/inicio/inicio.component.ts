import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Clasevuelo } from '../modelo/clasevuelo';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerIntl, MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { AsyncPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { InterDestino } from '../modelo/interDestino';
import { CatalogosService } from '../_services/catalogos.service';
import { InterDestino2 } from '../modelo/interDestino2';
import { InterDataRptaDestino } from '../modelo/InterDataRptaDestino';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [MatTabsModule, MatNativeDateModule, MatButtonToggleModule, MatFormFieldModule, MatSelectModule, MatAutocompleteModule, MatDatepickerModule, MatInputModule, FormsModule, ReactiveFormsModule, AsyncPipe],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {
  listaClasesVuelo: Clasevuelo[] = [];
  idIdaVuela: string = '';
  idClase: string = '';
  filteredOptionsOrigen: Observable<InterDestino2[]> | undefined;
  filteredOptionsDestino: Observable<InterDestino2[]> | undefined;

  arregloRespDestinos !:InterDataRptaDestino;

  myControlOrigen = new FormControl<string | InterDestino2>('');
  myControlDestino = new FormControl<string | InterDestino2>('');

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  constructor(private _adapter: DateAdapter<any>,
    private _intl: MatDatepickerIntl,
    @Inject(MAT_DATE_LOCALE) private _locale: string, private catalogoService: CatalogosService) {
    this.iniciaClaseVuelo();
    this.idIdaVuela = '1';
    this.idClase = '1';
    
  }

  ngOnInit(): void {
    this._locale = 'fr';
    this._adapter.setLocale(this._locale);
    
    this.catalogoService.listarDestinos('').subscribe(resp => {
      //console.log(resp);
      this.arregloRespDestinos =  resp;
      this.cargaDatosSeleccionDestinoOrigen();
    });
  }

  cargaDatosSeleccionDestinoOrigen(){
    this.filteredOptionsDestino = this.myControlDestino.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.descripcion;
        return name ? this._filter(name as string) : this.arregloRespDestinos.dataRpta.slice();
      })
    );

    this.filteredOptionsOrigen = this.myControlOrigen.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.descripcion;
        return name ? this._filter(name as string) : this.arregloRespDestinos.dataRpta.slice();
      })
    );
  }

  private _filter(name: string): InterDestino2[] {
    const filterValue = name.toLowerCase();

    return this.arregloRespDestinos.dataRpta.filter(option => option.descripcion.toLowerCase().includes(filterValue));
  }

  displayFnOrigen(destino: InterDestino2): string {
    return destino && destino.descripcion ? destino.descripcion + '(' + destino.codigoIata + ')' + ' - ' + destino.pais.nombre  : '';
  }
  displayFnDestino(destino: InterDestino2): string {
    return destino && destino.descripcion ? destino.descripcion + '(' + destino.codigoIata + ')' + ' - ' + destino.pais.nombre  : '';
  }

  iniciaClaseVuelo() {
    let claseVuelo: Clasevuelo = new Clasevuelo();
    claseVuelo.CodigoClase = '1';
    claseVuelo.NombreClase = 'Economica';

    this.listaClasesVuelo[0] = claseVuelo;

    claseVuelo = new Clasevuelo();
    claseVuelo.CodigoClase = '2';
    claseVuelo.NombreClase = 'Premiun Economica';

    this.listaClasesVuelo[1] = claseVuelo;

    claseVuelo = new Clasevuelo();
    claseVuelo.CodigoClase = '3';
    claseVuelo.NombreClase = 'Premiun Ejecutiva';

    this.listaClasesVuelo[2] = claseVuelo;
  }
}