import { MDBCardText } from "mdb-react-ui-kit";
import styles from "./index.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setTopUpAmount } from "../../store/actions/bankCardActions";

export default function Index() {
	const dispatch = useDispatch();
	const top_up_amount = useSelector((state) => state.bankCard.top_up_amount);
	const errors = useSelector((state) => state.bankCard.errors);

	const handleInputChange = (e) => {
		const { name } = e.target;
		const value = parseFloat(e.target.value);
		if (isNaN(value)) {
			dispatch(
				setTopUpAmount({
					foreign_currency: 0,
					rubles_currency: 0,
				}),
			);
		} else {
			if (name === "foreign_currency") {
				dispatch(
					setTopUpAmount({
						foreign_currency: value,
						rubles_currency: parseFloat((value * 15).toFixed(2)),
					}),
				);
			} else if (name === "rubles_currency") {
				dispatch(
					setTopUpAmount({
						rubles_currency: value,
						foreign_currency: parseFloat((value / 15).toFixed(2)),
					}),
				);
			}
		}

	};

	return (
		<div className={styles.currency_converter_container}>
			<MDBCardText className={styles.heading}>Укажите сумму</MDBCardText>
			<div className={styles.currency_fields_container}>
				<div>
					<input
						type="number"
						name="foreign_currency"
						className={`form-control ${errors.top_up_amount ? styles.error_border : ''}`}
						placeholder="0000.00"
						maxLength={16}
						required
						value={
							top_up_amount.foreign_currency
								? top_up_amount.foreign_currency
								: ""
						}
						onChange={handleInputChange}
					/>
					<span>ֆ</span>
				</div>
				<div>
					<input
						type="number"
						name="rubles_currency"
						className={`form-control ${errors.top_up_amount ? styles.error_border : ''}`}
						placeholder="0000.00"
						maxLength={16}
						required
						value={
							top_up_amount.rubles_currency ? top_up_amount.rubles_currency : ""
						}
						onChange={handleInputChange}
					/>
					<span>₽</span>
				</div>
			</div>
		</div>
	);
}
