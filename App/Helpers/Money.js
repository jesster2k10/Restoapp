/**
 * Created by jesseonolememen on 11/08/2017.
 */
export const getCurrencySymbol = (currencyCode) => {
    switch (currencyCode) {
        case 'EUR':
            return '€';
        case 'USD':
            return '$';
        case 'GBP':
            return '£';
        case 'CHF':
            return 'CHF';
        case 'INR':
            return '₹';
        default:
            return `${currencyCode} `;
    }
};

export const calculateTax = (taxPercentage, cost, count, returnTotalCost) => {
    const tax = ((taxPercentage / 100) * cost).toFixed(2);

    if (count != undefined || count > 0) {
        return returnTotalCost ? Number(tax) + (count * cost) : tax;
    }

    return returnTotalCost ? Number(tax) + cost : tax;
};

export const getPrice = ({ totalCost, taxPercentage, currency, count }) => {
  return `${getCurrencySymbol(currency)}${calculateTax(taxPercentage, totalCost, count, true)}`;
};

export const getSubtotal = ({ products }) => {
    let reqs = products.length;
    let cost = 0;
    let _currency = 'EUR';

    products.forEach(({ taxPercentage, totalCost, count, currency }) => {
        _currency = currency;
        cost += calculateTax(taxPercentage, totalCost, count, true);
        reqs--;
    });

    if (reqs == 0) {
        return `${getCurrencySymbol(_currency)}${cost}`;
    }
};