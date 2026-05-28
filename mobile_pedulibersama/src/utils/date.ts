export const getDaysLeft = (endDateStr?: string): number => {
    if (!endDateStr) return 0;
    
    // Parse format standar
    const endDate = new Date(endDateStr);
    const today = new Date();
    
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays > 0 ? diffDays : 0;
};
