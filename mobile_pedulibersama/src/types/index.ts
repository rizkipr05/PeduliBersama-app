export interface User {
    id: number;
    email: string;
    name: string;
    role: string;
    donations?: Donation[];
}

export interface Disaster {
    id: number;
    title: string;
    description?: string;
    location?: string;
    status: string;
    photos?: { photoUrl: string; caption?: string }[];
    needs?: { itemName: string; quantity: number; unit: string }[];
    
    // Frontend mapped properties / placeholders
    imageUrl?: string;
    progress?: number;
    collectedAmount?: number;
    targetAmount?: number;
    isEmergency?: boolean;
    endDate?: string;
    donatorsCount?: number;
    fundraiserName?: string;
}

export interface Donation {
    id: number;
    userId: number;
    disasterId: number;
    nominal: number;
    paymentMethod: string;
    status: 'PENDING' | 'VERIFIED' | 'REJECTED';
    createdAt: string;
    paymentUrl?: string;
    snapToken?: string;
    disaster?: Disaster;
    user?: User;
}
