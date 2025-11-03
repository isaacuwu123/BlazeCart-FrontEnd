export const useCurrency = () => {
    const formatCurrency = value => {
        const number = parseFloat(value) || 0;
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
        }).format(number);
    };

    return { formatCurrency };
};
