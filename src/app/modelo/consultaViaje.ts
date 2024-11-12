export class ConsultaViaje{
    private tipoViaje!: string;
    private codigoIataOrigen!: string;
    private codigoIataDestino!: string;
    private claseVuelo!: string;
    private fechaIda!: Date;
    private fechaVuelta!: Date;
    private adultos!: number;
    private ninos!: number;
    private infantes!: number;

    
    public get TipoViaje() : string {
        return this.tipoViaje
    }

    public set TipoViaje(v : string) {
        this.tipoViaje = v;
    }

    public get CodigoIataOrigen() : string {
        return this.codigoIataOrigen;
    }
    
    public set CodigoIataOrigen(v : string) {
        this.codigoIataOrigen = v;
    }
    
    public get CodigoIataDestino() : string {
        return this.codigoIataDestino;
    }

    
    public set CodigoIataDestino(v : string) {
        this.codigoIataDestino = v;
    }
    
    
    public get ClaseVuelo() : string {
        return this.claseVuelo;
    }
    
    public set ClaseVuelo(v : string) {
        this.claseVuelo = v;
    }
    
    public get FechaIda() : Date {
        return this.fechaIda;
    }
    
    public set FechaIda(v : Date) {
        this.fechaIda = v;
    }
    
    public get FechaVuelta() : Date {
        return this.fechaVuelta;
    }
    
    public set FechaVuelta(v : Date) {
        this.fechaVuelta = v;
    }
    
    public get Adultos() : number {
        return this.adultos;
    }
    
    public set Adultos(v : number) {
        this.adultos = v;
    }
    
    public get Ninos() : number {
        return this.ninos;
    }
    
    public set Ninos(v : number) {
        this.ninos = v;
    }
    
    public get Infantes() : number {
        return this.infantes;
    }
    
    public set Infantes(v : number) {
        this.infantes = v;
    }
    
}