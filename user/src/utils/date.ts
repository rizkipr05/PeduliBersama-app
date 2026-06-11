/**
 * Fungsi getDaysLeft:
 * Menghitung selisih hari antara tanggal hari ini dan target tanggal berakhir (endDate).
 * Mengembalikan angka 0 jika tanggal target sudah terlewat (tidak bisa bernilai negatif).
 */
export const getDaysLeft = (endDate?: string): number => {
    if (!endDate) return 0;
    
    // Asumsi endDate berformat "DD MMM YYYY" atau ISO string
    const end = new Date(endDate);
    const now = new Date();
    
    // Jika tidak valid
    if (isNaN(end.getTime())) return 0;

    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays > 0 ? diffDays : 0;
};

/**
 * Memformat tanggal ke format lokal Indonesia (misal: "12 Okt 2024")
 */
export const formatDateIndo = (dateString: string | Date): string => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '-';
    
    return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
};

/**
 * Memformat waktu ke format lokal Indonesia (misal: "14:30")
 */
export const formatTimeIndo = (dateString: string | Date): string => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '-';
    
    return date.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit'
    });
};
