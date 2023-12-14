export interface Session {
    id?: number;
    formation: number;
    formateurs: number[];
    candidats: number[];
    dateDeb: Date;
    dateFin: Date;
    planning: string;
}
