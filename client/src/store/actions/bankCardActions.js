import api from '../../api/api';
import { convertPrimitivesObjectToStrings, generateUniqueID } from '../../utils/genericUtils';
import { validateBankCardForm } from '../../utils/validateBankCardForm';

export const FETCH_CARDS = 'FETCH_CARDS';
export const TOP_UP = 'TOP_UP';
export const SET_ERRORS = 'SET_ERRORS';
export const SET_CARD_DATA = 'SET_CARD_DATA';
export const SET_CONSENT = 'CONSENT';
export const SET_TOP_UP_AMOUNT = 'SET_TOP_UP_AMOUNT';
export const UPDATE_CARD_DETAILS = 'UPDATE_CARD_DETAILS';
export const RESET_CARD_DATA = 'RESET_CARD_DATA';
export const SET_API_RESPONSE = 'SET_API_RESPONSE';

export const fetchCards = () => async dispatch => {
    try {
        const response = await api.get('/api/bank-cards');
        dispatch({ type: FETCH_CARDS, payload: response.data });
    } catch (error) {
        console.error(error);
    }
}

export const setCardData = (cardData) => (dispatch) => {
    dispatch({ type: SET_CARD_DATA, payload: cardData });
}
export const resetCardData = (cardData) => (dispatch) => {
    dispatch({ type: RESET_CARD_DATA });
}

export const setConsent = (consent) => dispatch => {
    dispatch({ type: SET_CONSENT, payload: consent });
}

export const setTopUpAmount = (amount) => dispatch => {
    dispatch({ type: SET_TOP_UP_AMOUNT, payload: amount });
}

export const setApiResponse = (apiResponse) => dispatch => {
    dispatch({ type: SET_API_RESPONSE, payload: apiResponse });
}

export const topUp = () => async (dispatch, store) => {
    try {
        const { bankCard } = store();
        const { currentCard } = bankCard;
        const { top_up_amount } = bankCard;
        const errors = validateBankCardForm(bankCard);

        if (Object.keys(errors).length) {
            dispatch({ type: SET_ERRORS, payload: errors });
        }
        else {
            dispatch({ type: SET_ERRORS, payload: {} });
            dispatch({ type: SET_API_RESPONSE, payload: { loading: true, error: false } });

            const payload = { card_number: currentCard.card_number, expiry_month: currentCard.expiry_month, expiry_year: currentCard.expiry_year, cvv: currentCard.cvv, top_up_amount: top_up_amount.rubles_currency };
            const response = await api.post('/api/top-up', convertPrimitivesObjectToStrings(payload));
            if (response.data && response.status === 201) {
                if (currentCard.id) {
                    dispatch({ type: UPDATE_CARD_DETAILS, payload: currentCard });
                } else {
                    payload.id = generateUniqueID();
                    dispatch({ type: TOP_UP, payload });
                }
                alert('Top up successfull')
                dispatch({ type: SET_API_RESPONSE, payload: { loading: false } });
            }
        }
    } catch (error) {
        alert('Invalid card details,Insufficient balance or something went wrong');
        dispatch({ type: SET_ERRORS, payload: {} });
        dispatch({ type: SET_API_RESPONSE, payload: { loading: false, error: true } });
    }
};


