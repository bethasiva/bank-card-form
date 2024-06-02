import "@fortawesome/fontawesome-free/css/all.min.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BankCardFormPage from "./pages/BankCardFormPage";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<BankCardFormPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
