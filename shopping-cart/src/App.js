import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import ToastContainer from './components/ToastContainer';
import Footer from './components/Footer';

function App() {
  const navbarRef = React.useRef(null);
  const [mainContentPadding, setMainContentPadding] = React.useState(0);

  React.useEffect(() => {
    const updatePadding = () => {
      if (navbarRef.current) {
        setMainContentPadding(navbarRef.current.offsetHeight);
      }
    };

    updatePadding();
    window.addEventListener('resize', updatePadding);

    return () => window.removeEventListener('resize', updatePadding);
  }, []);

  return (
    <ToastProvider>
      <CartProvider>
        <div className="App">
          <Navbar ref={navbarRef} />
          <main className="main-content" style={{ paddingTop: mainContentPadding }}>
            <div className="product-list">
              <ProductList />
            </div>
            <aside className="cart">
              <Cart />
            </aside>
          </main>
          <ToastContainer />
          <Footer />
        </div>
      </CartProvider>
    </ToastProvider>
  );
}

export default App;