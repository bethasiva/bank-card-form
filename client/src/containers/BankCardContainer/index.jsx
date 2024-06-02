import { MDBCard, MDBCardBody, MDBCardTitle } from "mdb-react-ui-kit";
import styles from "./index.module.css";
import CurrencyConverter from "../../components/CurrencyConverter";
import BankCardSavedDetails from "../../components/BankCardSavedDetails";
import BankCardForm from "../../components/BankCardForm";
import BankCardSaveConsent from "../../components/BankCardSaveConsent";
import PayButton from "../../components/PayButton";

export default function Index() {
	return (
		<MDBCard className={styles.bank_card_container}>
			<MDBCardBody className={styles.bank_card_body}>
				<MDBCardTitle className={styles.bank_card_title}>
					Пополнить банковской картой
				</MDBCardTitle>
				<div className={styles.bank_card_main_container}>
					<CurrencyConverter />
					<BankCardSavedDetails />
					<BankCardForm />
					<BankCardSaveConsent />
				</div>
				<PayButton />
			</MDBCardBody>
		</MDBCard>
	);
}
