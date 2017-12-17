/**
 * Created by jesseonolememen on 11/08/2017.
 */
import strings from '../Config/Localization';
import Constants from '../Config/Constants';

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

export const getPrice = ({ totalCost, taxPercentage, currency, count = 1 }) => {
  return `${getCurrencySymbol(currency)}${calculateTax(taxPercentage, totalCost, count, true).toFixed(2)}`;
};

export const getWithoutSymbolPrice = ({ totalCost, taxPercentage, currency, count }) => {
    return `${calculateTax(taxPercentage, totalCost, count, true)}`;
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
        return `${getCurrencySymbol(_currency)}${cost.toFixed(2)}`;
    }
};

export const getSubtotalWithoutCount = ({ products }) => {
    if (products != undefined) {
        let reqs = products.length;
        let cost = 0;
        let _currency = 'EUR';

        products.forEach(({ taxPercentage, totalCost, currency }) => {
            _currency = currency;
            cost += calculateTax(taxPercentage, totalCost, 1, true);
            reqs--;
        });

        if (reqs == 0) {
            return `${getCurrencySymbol(_currency)}${cost}`;
        }
    } else {
        return null
    }
};

export const getSubtotalWithoutCountAsInt = ({ products }) => {
    if (products != undefined) {
        let reqs = products.length;
        let cost = 0;
        products.forEach(({ taxPercentage, totalCost }) => {
            cost += calculateTax(taxPercentage, totalCost, 1, true);
            reqs--;
        });

        if (reqs == 0) {
            return cost;
        }
    } else {
        return 0
    }
};

export const getApplePayLastKey = (products) => {
    let cost = getSubtotalWithoutCount({ products });

    return {
        label: `${strings.formatString(strings.payCompany, Constants.COMPANY_NAME)}`,
        amount: `${cost}`
    }
};

export const getProductsForApplePay = (cart) => {
    if (cart.products) {
        let _products = cart.products.map(product => {
            return {
                label: product.name,
                amount: `${getWithoutSymbolPrice(product)}`,
                detail: product.description,
                identifier: product._id
            }
        });

        _products.push(getApplePayLastKey(cart.products));

        return _products;
    } else {
        return [];
    }
};

export const getCurrency = ({ products }, asSymbol) => {
    if (products != undefined) {
        return asSymbol ? getCurrencySymbol(products[products.length - 1].currency) : products[products.length - 1].currency;
    } else {
        return null
    }
};