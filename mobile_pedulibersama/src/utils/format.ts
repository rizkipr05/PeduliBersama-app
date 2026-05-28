export const formatRupiah = (angka: number): string => {
    if (angka >= 1000000000) {
        return `Rp ${(angka / 1000000000).toFixed(1)}M`;
    }
    if (angka >= 1000000) {
        return `Rp ${(angka / 1000000).toFixed(1)}jt`;
    }
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(angka);
};
