import React from "react";
import styles from "./index.module.css";
import { MDBCardText } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { setCardData } from "../../store/actions/bankCardActions";

export default function Index() {
	const dispatch = useDispatch();
	const currentCard = useSelector((state) => state.bankCard.currentCard);
	const errors = useSelector((state) => state.bankCard.errors);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		dispatch(setCardData({ ...currentCard, [name]: value }));
	};

	return (
		<div className={styles.bank_card_form}>
			<div className={styles.account_number_and_expiry}>
				<div className={styles.card_input_container}>
					<MDBCardText className={styles.heading}>Номер карты</MDBCardText>
					<input
						type="text"
						name="card_number"
						value={currentCard.card_number}
						className={`form-control ${
							errors.card_number ? styles.error_border : ""
						}`}
						placeholder="Номер карты"
						maxLength={16}
						required
						onChange={handleInputChange}
					/>
				</div>
				<div className={styles.card_input_container}>
					<MDBCardText className={styles.heading}>Действует до</MDBCardText>
					<div className={styles.expiry_fields_container}>
						<input
							type="text"
							name="expiry_month"
							className={`form-control ${
								errors.expiry_month ? styles.error_border : ""
							}`}
							placeholder="мм"
							maxLength={2}
							required
							value={currentCard.expiry_month}
							onChange={handleInputChange}
						/>
						<small>/</small>
						<input
							type="text"
							name="expiry_year"
							className={`form-control ${
								errors.expiry_year ? styles.error_border : ""
							}`}
							placeholder="гг"
							maxLength={2}
							required
							value={currentCard.expiry_year}
							onChange={handleInputChange}
						/>
					</div>
				</div>
			</div>

			<div className={styles.cvv_Outer_container}>
				<div className={styles.card_input_container}>
					<MDBCardText className={styles.heading}>CVV/CVC</MDBCardText>
					<div className={styles.cvv_fields_container}>
						<div className={styles.expiry_fields_container}>
							<input
								type="text"
								name="cvv"
								className={`form-control ${
									errors.cvv ? styles.error_border : ""
								}`}
								placeholder="000"
								maxLength={3}
								required
								value={currentCard.cvv}
								onChange={handleInputChange}
							/>
						</div>
						<div className={styles.cvv_text}>
							<MDBCardText>три цифры </MDBCardText>
							<MDBCardText>с обратной стороны</MDBCardText>
							<MDBCardText>карты</MDBCardText>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
