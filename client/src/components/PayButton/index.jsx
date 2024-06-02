import { MDBBtn } from "mdb-react-ui-kit";
import styles from "./index.module.css";
import { topUp } from "../../store/actions/bankCardActions";
import { useDispatch, useSelector } from "react-redux";

export default function Index() {
	const dispatch = useDispatch();
	const consent = useSelector((state) => state.bankCard.consent);
	const apiStatus = useSelector((state) => state.bankCard.apiStatus);

	return (
		<MDBBtn
			disabled={!consent || apiStatus.loading}
			rounded
			className={styles.pay_button}
			onClick={() => dispatch(topUp())}
		>
			Оплатить
		</MDBBtn>
	);
}
