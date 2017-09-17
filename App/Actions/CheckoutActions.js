/**
 * Created by jesseonolememen on 15/08/2017.
 */
import * as Types from '../Config/ActionTypes';
import axios from 'axios';

export const changePage = (payload) => ({
    type: Types.CHECKOUT_CHANGE_PAGE,
    payload
});

export const selectPaymentType = (payload) => ({
    type: Types.SET_SELECTED_PAYMENT_TYPE,
    payload
});

export const setCardNumberTintColor = (payload) => ({
    type: Types.SET_CARD_NUMBER_TINT_COLOR,
    payload
});

export const setCCVTintColor = (payload) => ({
    type: Types.SET_CCV_TINT_COLOR,
    payload
});

export const setExpiryTintColor = (payload) => ({
    type: Types.SET_EXPIRY_TINT_COLOR,
    payload
});

export const confirmPayment = (payload) => ({
    type: Types.CONFIRM_PAYMENT,
    payload
});

export const confirmShipping = (payload) => ({
    type: Types.CONFIRM_SHIPPING,
    payload
});
