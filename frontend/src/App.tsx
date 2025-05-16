import { BrowserRouter, Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import Header from './components/Header';
import PlantJourney from './components/PlantJourney';
import LocationLoginCard from './components/LocationLoginCard';
import Home from './Layout/Home';
import Navbar from './components/Navbar';
import BestSellerVarieties from './components/BestSellerVarieties';
import ProductDetail from './components/ProductDetail';

function App() {
  return (
    <CartProvider>
      <FavoritesProvider>
        <BrowserRouter> 
          <Navbar />
          
        
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/Login" element={<LocationLoginCard/>} />
            <Route path="/products/:id" element={<ProductDetail />} />
          </Routes>
        </BrowserRouter>
      </FavoritesProvider>
    </CartProvider>
  );
}

export default App;
