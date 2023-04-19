import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterForm from "./pages/Register";
import Login from "./pages/Login";
import "./App.css";
import Seller from "./pages/Seller";
import Buyer from "./pages/Buyer";
import AddProduct from "./pages/AddProduct";
import Products from "./pages/Products";

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/register' element={<RegisterForm />} />
				<Route path='/login' element={<Login />} />
				<Route path='/seller' element={<Seller />} />
				<Route path='/buyer' element={<Buyer />} />
				<Route path='/addproduct' element={<AddProduct />} />
				<Route path='/products' element={<Products />} />
			</Routes>
		</Router>
	);
}

export default App;
