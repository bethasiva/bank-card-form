import React, { useEffect } from "react";
import { MDBCardText, MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import styles from "./index.module.css";
import {
	fetchCards,
	setCardData,
	resetCardData,
} from "../../store/actions/bankCardActions";

export default function Index() {
	const dispatch = useDispatch();
	const cards = useSelector((state) => state.bankCard.cards);

	useEffect(() => {
		dispatch(fetchCards());
	}, [dispatch]);

	return (
		<ul className={styles.bank_card_saved_details}>
			{cards.map((card) => (
				<li key={card.card_number}>
					<MDBBtn
						className={styles.saved_card}
						onClick={() => dispatch(setCardData(card))}
					>
						<div>
							<MDBCardText>•••• {card.card_number.slice(-4)}</MDBCardText>
							<MDBCardText>
								{card.expiry_month} / {card.expiry_year}
							</MDBCardText>
						</div>
					</MDBBtn>
				</li>
			))}
			<li key="add_new_card" className={styles.add_new_card}>
				<MDBBtn outline onClick={() => dispatch(resetCardData({}))}>
					<MDBCardText>
						<MDBIcon fas icon="plus" />
						<span>Новая карта</span>
					</MDBCardText>
				</MDBBtn>
			</li>
		</ul>
	);
}
