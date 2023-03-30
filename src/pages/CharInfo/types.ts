type OriginType = {
    name: string;
};

export interface SelectedCharInfo {
    image: string;
    name: string;
    gender: string;
    species: string;
    status: string;
    origin: OriginType;
    type: string;
}

export interface CharInfoProps {
    data: Partial<SelectedCharInfo>;
}
