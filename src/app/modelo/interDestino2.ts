import { Pais } from "./interPais";

export interface InterDestino2{
    idUsuarioRegistro: Number;
    fechaRegistro: Date;
    idUsuarioModificacion: Number;
    fechaModificacion: Date;
    id: Number;
    idContinente: Number;
    pais: Pais;
    codigoIata: string;
    idTipoDestino: Number;
    descripcion: string;
}