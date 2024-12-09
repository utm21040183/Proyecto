
export interface IGrade {
    id_metric:string;
    grade: number;
    id_judge:string;
}


export interface IGrades {
    id_group:string;
    round:number;
    id_event:string;
    grades:IGrades;
}

export interface ITeams {
    name: string;
    id_members:string;
    leader:string;
    round:number;
    grades:IGrades;
}

export interface IMetric {
    description: string; // Describe la métrica.
    max_points: number;  // Define los puntos máximos asignables a esta métrica.
}

export interface IEvent {
    title: string;       // Título del evento.
    maxRound: number;    // Número máximo de rondas en el evento.
    metrics: IMetric[];  // Lista de métricas asociadas al evento.
}

export interface IUser {
    name: string;
    email: string;
    CURP: string;
    password: string;
    rol: string;
}
