export interface Disaster {
    id?: string;
    title: string;
    location: string;
    imageUrl: string;
    progress: number;
    collectedAmount: number;
    isEmergency?: boolean;
}
