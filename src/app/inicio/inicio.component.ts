import { Component, inject, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Clasevuelo } from '../modelo/clasevuelo';
import { Observable, OperatorFunction } from 'rxjs';
import { map, startWith, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { AsyncPipe, formatDate, JsonPipe } from '@angular/common';
import { CatalogosService } from '../_services/catalogos.service';
import { InterDestino2 } from '../modelo/interDestino2';
import { InterDataRptaDestino } from '../modelo/InterDataRptaDestino';
import { ConsultaViaje } from '../modelo/consultaViaje';
import { ViajeService } from '../_services/viaje.service';
import { OfertavueloComponent } from "../ofertavuelo/ofertavuelo.component";
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDatepickerModule, NgbNavModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { VuelosEncontrados } from '../modelo/vueltosEncontrados';


@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [MatAccordion, MatExpansionModule, MatButtonToggleModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, AsyncPipe, OfertavueloComponent, NgbDatepickerModule, JsonPipe, NgbNavModule, NgbTypeaheadModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {
  active = 1;
  listaClasesVuelo: Clasevuelo[] = [];
  filteredOptionsOrigen!: Observable<InterDestino2[]>;
  filteredOptionsDestino!: Observable<InterDestino2[]>;

  arregloRespDestinos !:InterDataRptaDestino;

  myControlAdultos = new FormControl('');
  myControlNinos = new FormControl('');
  myControlInfantes = new FormControl('');

  valorCombo2!: InterDestino2;
  idIdaVuela: string = '';
  idClase: string = '';

  varOrigen!: string;

  modelOrigen!: InterDestino2;
  modelDestino!: InterDestino2;
  formatter2 = (result: InterDestino2) => result.nombreAeropuertoMostrar.toUpperCase();

  modelTipoVuelo: any;
  modelClaseVuelo: any;

  vuelosEncontrados!: VuelosEncontrados;

  modelNroAdultos :number =1;
  modelNroNinos :number =0;
  modelNroInfantes :number = 0;

  precioAdulto = 10098.21;

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  calendar = inject(NgbCalendar);
	formatter = inject(NgbDateParserFormatter);

	hoveredDate: NgbDate | null = null;
	fromDate: NgbDate | null = this.calendar.getToday();
	toDate: NgbDate | null = this.calendar.getNext(this.calendar.getToday(), 'd', 10);

 
	onDateSelection(date: NgbDate) {
		if (!this.fromDate && !this.toDate) {
			this.fromDate = date;
		} else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
			this.toDate = date;
		} else {
			this.toDate = null;
			this.fromDate = date;
		}
	}

  /*
  constructor(private _adapter: DateAdapter<any>,
    private _intl: MatDatepickerIntl,
    @Inject(MAT_DATE_LOCALE) private _locale: string, private catalogoService: CatalogosService, private viajeService:ViajeService) {
    this.iniciaClaseVuelo();
    this.idIdaVuela = '1';
    this.idClase = '1';
    
    this.controlAdultos.setValue('1');
    this.controlNinos.setValue('0');
    this.controlInfantes.setValue('0');
  }*/

    constructor(private catalogoService: CatalogosService, private viajeService:ViajeService) {
      this.iniciaClaseVuelo();
      this.idIdaVuela = '1';
      this.idClase = '1';
    }

  ngOnInit(): void {
    /*this._locale = 'fr';
    this._adapter.setLocale(this._locale);*/
    
    this.catalogoService.listarDestinos('').subscribe(resp => {
      this.arregloRespDestinos =  resp;
      //this.cargaDatosSeleccionDestinoOrigen();
    });

    this.modelTipoVuelo = 1;
    this.modelClaseVuelo = 1;
    this.precioAdulto = 10098.20;

    this.vuelosEncontrados = {idUsuarioRegistro:0,fechaRegistro:new Date(),idUsuarioModificacion:0,fechaModificacion:new Date(),idEstadoRegistro:0,ofertasEncontradas:[]};
  }

  /*
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
  }*/

  private _filter(name: string): InterDestino2[] {
    const filterValue = name.toLowerCase();

    return this.arregloRespDestinos.dataRpta.filter(option => option.nombreAeropuertoMostrar.toLowerCase().includes(filterValue));
  }

  displayFnOrigen(destino: InterDestino2): string {
    return destino && destino.nombreAeropuertoMostrar ? destino.nombreAeropuertoMostrar  : 'Vacio';
  }
  displayFnDestino(destino: InterDestino2): string {
    return destino && destino.nombreAeropuertoMostrar ? destino.nombreAeropuertoMostrar  : 'Vacio';
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

  consultarVuelo(){

    let consultaViaje: ConsultaViaje = new ConsultaViaje();

    if (this.fromDate){
      consultaViaje.FechaIda = new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day);
    }
    if (this.toDate){
      consultaViaje.FechaVuelta = new Date(this.toDate.year, this.toDate.month - 1, this.toDate.day);;
    }
    
    consultaViaje.CodigoIataDestino = this.modelDestino.codigoIata;
    consultaViaje.CodigoIataOrigen = this.modelOrigen.codigoIata;
    consultaViaje.Adultos = Number(this.myControlAdultos.value);
    consultaViaje.Ninos = Number(this.myControlNinos.value);
    consultaViaje.Infantes = Number(this.myControlInfantes.value);
    consultaViaje.ClaseVuelo = this.modelClaseVuelo;
    consultaViaje.TipoViaje = this.modelTipoVuelo;

    this.viajeService.consultarVuelo(consultaViaje).subscribe(resp => {
      this.vuelosEncontrados = resp.dataRpta;
      console.log(this.vuelosEncontrados);
    });
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
		const parsed = this.formatter.parse(input);
		return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
	}

  isInside(date: NgbDate) {
		return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
	}

  isHovered(date: NgbDate) {
		return (
			this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
		);
	}

  isRange(date: NgbDate) {
		return (
			date.equals(this.fromDate) ||
			(this.toDate && date.equals(this.toDate)) ||
			this.isInside(date) ||
			this.isHovered(date)
		);
	}
  search: OperatorFunction<string, readonly InterDestino2[]> = (text$: Observable<String>) =>
		text$.pipe(
			debounceTime(200),
			distinctUntilChanged(),
			map((term) =>
				term === null ? [] : this.arregloRespDestinos.dataRpta.filter((v) => v.nombreAeropuertoMostrar.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10),
			),
		);
}