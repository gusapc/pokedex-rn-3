export interface TeamMember {
    pokemonId: string;
    name: string;
}

export interface Team {
    id: string;
    trainerName: string;
    trainerPhotoUrl: string;
    members: TeamMember[];
}