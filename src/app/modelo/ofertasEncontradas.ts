import { PrecioOferta } from "./precioOferta";
import { RutaTramo } from "./rutaTramo";

export interface OfertasEncontradas{
    listaRutaTramos: RutaTramo[];
    precioOfertaDto: PrecioOferta;
}