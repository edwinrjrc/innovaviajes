import { Injectable } from '@angular/core';
import { ConsultaViaje } from '../modelo/consultaViaje';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RptaVuelosEncontrados } from '../modelo/dataRptaVuelos';

@Injectable({
  providedIn: 'root'
})
export class ViajeService {

  constructor(protected http: HttpClient) { }

  consultarVuelo(consultaViaje: ConsultaViaje){
    let cabece = new HttpHeaders();
    cabece.set('Content-Type', 'application/json; charset=utf-8');

    let params = new HttpParams();
    params = params.set('tipoViaje', consultaViaje.TipoViaje);
    params = params.append('codigoIataOrigen', consultaViaje.CodigoIataOrigen);
    params = params.append('codigoIataDestino', consultaViaje.CodigoIataDestino);
    params = params.append('claseVuelo', consultaViaje.ClaseVuelo);
    params = params.append('fechaIda', consultaViaje.FechaIda.toLocaleDateString());
    params = params.append('fechaVuelta', consultaViaje.FechaVuelta.toLocaleDateString());
    params = params.append('adultos', consultaViaje.Adultos);
    params = params.append('ninos', consultaViaje.Ninos);
    params = params.append('infantes', consultaViaje.Infantes);

    console.log(params);
    
    return this.http.get<RptaVuelosEncontrados>(`${environment.apiUrl}/iv-service-viajes/viajeService/vuelosCotizacion`, {headers : cabece, params:params } );
  }
}
