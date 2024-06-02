import { isInteger } from "./genericUtils";

export const validateBankCardForm = (bankCard) => {
    const errors = {};
    let { card_number, expiry_month, expiry_year, cvv } = bankCard.currentCard;
    let { top_up_amount } = bankCard;
    card_number = card_number ? parseInt(card_number, 10) : '';
    expiry_month = expiry_month ? parseInt(expiry_month, 10) : '';
    expiry_year = expiry_year ? parseInt(expiry_year, 10) : '';
    cvv = cvv ? parseInt(cvv, 10) : '';
    top_up_amount = top_up_amount.rubles_currency ? parseFloat(top_up_amount.rubles_currency) : 0;
    if (!(isInteger(card_number) && card_number.toString().length === 16)) errors.card_number = true;
    if (!(isInteger(expiry_month) && expiry_month >= 1 && expiry_month <= 12 && bankCard.currentCard.expiry_month.toString().length === 2)) errors.expiry_month = true;
    const currentYear = parseInt(new Date().getFullYear().toString().slice(-2), 10);
    const currentMonth = new Date().getMonth() + 1;
    if (!(isInteger(expiry_year) && expiry_year >= currentYear && bankCard.currentCard.expiry_year.toString().length === 2)) errors.expiry_year = true;
    if (expiry_year === currentYear && expiry_month <= currentMonth) errors.expiry_month = true;
    if (!(isInteger(cvv) && cvv.toString().length === 3)) errors.cvv = true;
    if (top_up_amount <= 0) errors.top_up_amount = true;
    return errors;
}