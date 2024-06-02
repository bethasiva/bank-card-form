import { Link } from "react-router-dom";
import { MDBCardText, MDBIcon, MDBCheckbox } from "mdb-react-ui-kit";
import styles from "./index.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setConsent} from "../../store/actions/bankCardActions";

export default function Index() {

	const dispatch = useDispatch();
    const consent = useSelector(state => state.bankCard.consent);

	return (
		<div className={styles.bank_card_save_consent}>
			<div className={styles.save_card}>
				<MDBCheckbox
					name="inlineCheck"
					id="save_bank_card_details"
					label="Запомнить эту карту. Это безопасно."
					checked={consent}
					onChange={() => dispatch(setConsent(!consent))}
				/>
				<MDBIcon fas icon="info-circle" />
			</div>
			<MDBCardText className={styles.terms_and_conditions}>
				Сохраняя карту, вы соглашаетесь с
				<Link to="/">условиями привязки карты.</Link>
			</MDBCardText>
		</div>
	);
}
