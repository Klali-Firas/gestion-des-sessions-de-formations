export interface Formation {
    id: number;
    titre: string;
    description: string;
    chargeHoraire: number;
    programme: string;
    difficulte: "débutant" | "intermédiare" | "avancé";
    tags: string[];
    categorie: string[];
    imageRefernce: string;
}
