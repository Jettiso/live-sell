import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterForm from "./pages/Register";
import Login from "./pages/Login";
import "./App.css";
import Seller from "./pages/Seller";
import AddProduct from "./pages/AddProduct";
import AllProducts from "./pages/AllProducts";
import SearchPage from "./pages/SearchPage";

function App() {
	
	return (
		<Router>
			<Routes>
				<Route path='/register' element={<RegisterForm />} />
				<Route path='/' element={<Login />} />
				<Route path='/seller' element={<Seller />} />
				<Route path='/seller/addproduct' element={<AddProduct />} />
				<Route path='/seller/allproducts' element={<AllProducts />} />
				<Route path="/buyer" element={<SearchPage />} />
			</Routes>
		</Router>
	);
}

export default App;
