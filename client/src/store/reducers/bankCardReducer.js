import { FETCH_CARDS, TOP_UP, SET_ERRORS, SET_CARD_DATA, SET_CONSENT, SET_TOP_UP_AMOUNT, UPDATE_CARD_DETAILS, RESET_CARD_DATA ,SET_API_RESPONSE} from '../actions/bankCardActions';

const initialState = {
    cards: [],
    currentCard: {
        id: '',
        card_number: '',
        expiry_month: '',
        expiry_year: '',
        cvv: '',
    },
    consent: false,
    top_up_amount: {
        foreign_currency: 0,
        rubles_currency: 0
    },
    errors: {},
    apiStatus: {
        error: false,
        loading: false
    }
};

export default function bankCardReducer(state = initialState, action) {
    switch (action.type) {
        case SET_TOP_UP_AMOUNT:
            return { ...state, top_up_amount: action.payload };
        case FETCH_CARDS:
            return { ...state, cards: action.payload };
        case TOP_UP:
            return { ...state, cards: [...state.cards, action.payload], errors: {} };
        case SET_CARD_DATA:
            return { ...state, currentCard: action.payload };
        case RESET_CARD_DATA:
            return { ...state, currentCard: initialState.currentCard };
        case SET_CONSENT:
            return { ...state, consent: action.payload };
        case SET_ERRORS:
            return { ...state, errors: action.payload };
        case SET_API_RESPONSE:
            return { ...state, apiStatus: action.payload };
        case UPDATE_CARD_DETAILS:
            return {
                ...state,
                cards: state.cards.map(card =>
                    card.id === action.payload.id ? { ...card, ...action.payload } : card
                ),
            };
        default:
            return state;
    }
}
