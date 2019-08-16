import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe('pk_test_AuCcdG5J8m0DPpIoWzUi14yq00pC4C4Wld');

export const bookTour = async tourId => {
	try {
		// 1) Get checkout session from API
		const session = await axios(
			`http://127.0.0.1:3300/api/v1/bookings/checkout-session/${tourId}`
		);
		console.log(session);

		// 2) Create checkout form + charge credit card
		await stripe.redirectToCheckout({
			sessionId: session.data.session.id
		});
	} catch (err) {
		console.log(err);
		showAlert('error', err);
	}
};
