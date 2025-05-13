import { BrowserRouter as Router, Routes} from 'react-router-dom';
import { CartProvider } from './context/CartContext';


function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
        
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
