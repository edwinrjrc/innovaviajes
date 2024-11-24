import { Aerolinea } from "./aerolinea";
import { TramoEscala } from "./tramoEscala";

export interface HorarioVuelo{
    fechaSalidaVuelo: Date;
    fechaLlegadaVuelo: Date;
    aerolineaDto: Aerolinea;
    escalas: TramoEscala[];
    inEscalas: Number;
    numeroEscalas: Number;
}