export interface Disaster {
    id?: string;
    title: string;
    location: string;
    imageUrl: string;
    progress: number;
    collectedAmount: number;
    targetAmount?: number;
    endDate?: string;
    donatorsCount?: number;
    description?: string;
    fundraiserName?: string;
    isEmergency?: boolean;
}
