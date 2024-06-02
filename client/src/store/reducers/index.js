import { combineReducers } from 'redux';
import bankCardReducer from './bankCardReducer';

const rootReducer = combineReducers({
    bankCard: bankCardReducer
});

export default rootReducer;
