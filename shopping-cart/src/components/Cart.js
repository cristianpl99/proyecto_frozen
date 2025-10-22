import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { ToastContext } from '../context/ToastContext';
import { AuthContext } from '../context/AuthContext';
import CartItem from './CartItem';
import ProgressBar from './ProgressBar';
import Map from './Map';
import Stepper from './Stepper';
import './Cart.css';

const CartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cart-svg-icon">
    <circle cx="9" cy="21" r="1"></circle>
    <circle cx="20" cy="21"r="1"></circle>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
  </svg>
);

const StreetIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 22h16"></path>
    <path d="M8 18V6a4 4 0 0 1 4-4h0a4 4 0 0 1 4 4v12"></path>
    <path d="M12 10h.01"></path>
    <path d="M12 14h.01"></path>
    <path d="M12 6h.01"></path>
    <path d="M12 18h.01"></path>
  </svg>
);

const NumberIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 9h16"></path>
    <path d="M4 15h16"></path>
    <path d="M10 3L8 21"></path>
    <path d="M16 3l-2 18"></path>
  </svg>
);

const CityIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 11h20v10H2z"></path>
    <path d="M5 11V5a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v6"></path>
    <path d="M9 21V11h6v10"></path>
    <path d="M9 5h6"></path>
  </svg>
);

const ZoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s-8-4.5-8-11.5a8 8 0 1 1 16 0c0 7-8 11.5-8 11.5z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const BackIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5"></path>
    <polyline points="12 19 5 12 12 5"></polyline>
  </svg>
);

const ShippingIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2.5 2.5h3l2.7 12.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6l2.7-12.4h-21.4"/>
        <path d="M20.2 6.5l-3 6.6"/>
        <path d="M11 20.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
        <path d="M18.5 20.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
    </svg>
);


const SummaryIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <path d="M14 2v6h6"/>
        <path d="M16 13H8"/>
        <path d="M16 17H8"/>
        <path d="M10 9H8"/>
    </svg>
);


const Cart = ({ fetchProducts }) => {
  const { cart, getTotalPrice, clearCart, street, setStreet, streetNumber, setStreetNumber, city, setCity, zone, setZone, step, setStep } = useContext(CartContext);
  const { addToast } = useContext(ToastContext);
  const { user } = useContext(AuthContext);
  const [completedOrderDetails, setCompletedOrderDetails] = useState(null);

  const subtotal = parseFloat(getTotalPrice());
  const shippingCost = subtotal > 5000 ? 0 : 1000;
  const total = subtotal + shippingCost;

  const handleHacerPedido = async () => {
    if (!user) {
      addToast('Debes iniciar sesión para realizar la compra', 'error');
      return;
    }

    if (cart.length === 0) {
      addToast('Tu carrito está vacío', 'error');
      return;
    }

    if (!street || !streetNumber || !city || !zone) {
      addToast('Por favor, completa todos los campos de dirección', 'error');
      return;
    }

    const getZoneAbbreviation = (zone) => {
      switch (zone) {
        case 'Norte':
          return 'N';
        case 'Sur':
          return 'S';
        case 'Este':
          return 'E';
        case 'Oeste':
          return 'O';
        default:
          return '';
      }
    };

    const orderData = {
      id_cliente: user.id_cliente,
      fecha_entrega: null,
      id_prioridad: 1,
      tipo_venta: "ONL",
      calle: street,
      altura: streetNumber,
      localidad: city,
      zona: getZoneAbbreviation(zone),
      productos: cart.map(item => ({
        id_producto: item.id_producto,
        cantidad: item.quantity,
      })),
    };

    try {
      const response = await fetch('https://frozenback-test.up.railway.app/api/ventas/ordenes-venta/crear/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        addToast('Orden de venta creada con éxito', 'success');
        setCompletedOrderDetails({ items: [...cart], total });
        clearCart();
      } else {
        addToast('Error al crear la orden de venta', 'error');
      }
    } catch (error) {
      addToast('Error de red al crear la orden de venta', 'error');
    }
  };

  const handleSeguirComprando = () => {
    setStep(1);
    fetchProducts();
  };

  const handlePlaceSelect = (place) => {
    const addressComponents = place.address_components;
    const streetNumberComponent = addressComponents.find(c => c.types.includes('street_number'));
    const streetComponent = addressComponents.find(c => c.types.includes('route'));
    const cityComponent = addressComponents.find(c => c.types.includes('locality'));

    setStreet(streetComponent ? streetComponent.long_name : '');
    setStreetNumber(streetNumberComponent ? streetNumberComponent.long_name : '');
    setCity(cityComponent ? cityComponent.long_name : '');
  };

  return (
    <div className="cart-container">
      <Stepper currentStep={step} />
      <h2>
        {step === 1 && <><CartIcon /> Carrito de Compras</>}
        {step === 2 && <><ShippingIcon /> Dirección de Envío</>}
        {step === 3 && <><SummaryIcon /> Resumen de la compra</>}
      </h2>

      {cart.length === 0 && step !== 3 ? (
        <p className="cart-empty">Tu carrito está vacío</p>
      ) : (
        <>
          {step === 1 && (
            <>
              {cart.map(item => <CartItem key={item.id_producto} item={item} />)}
              <div className="cart-summary">
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Costo de Envío:</span>
                  {shippingCost === 0 ? (
                    <span className="bonificado">Bonificado</span>
                  ) : (
                    <span>${shippingCost.toFixed(2)}</span>
                  )}
                </div>
                <div className="shipping-info">
                  {subtotal < 5000 ? (
                    <>
                      <span>🚚 Te faltan ${5000 - subtotal} para envío gratis</span>
                      <ProgressBar value={subtotal} max={5000} />
                    </>
                  ) : (
                    <span>🎉 ¡Felicitaciones! Tenés envío gratis.</span>
                  )}
                </div>
                <div className="summary-row total-row">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="pay-btn-container">
                  <button className="pay-btn" onClick={() => setStep(2)}>Continuar a Envio</button>
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <div className="address-step">
              <div className="address-form">
              <div className="address-row">
                <div className="address-input-group">
                  <label htmlFor="street">Calle</label>
                  <div className="address-input-container">
                    <StreetIcon />
                    <input
                      id="street"
                      type="text"
                      placeholder="Calle"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                    />
                  </div>
                </div>
                <div className="address-input-group">
                  <label htmlFor="streetNumber">Altura</label>
                  <div className="address-input-container">
                    <NumberIcon />
                    <input
                      id="streetNumber"
                      type="text"
                      placeholder="Altura"
                      value={streetNumber}
                      onChange={(e) => setStreetNumber(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="address-row">
                <div className="address-input-group">
                  <label htmlFor="city">Localidad</label>
                  <div className="address-input-container">
                    <CityIcon />
                    <input
                      id="city"
                      type="text"
                      placeholder="Localidad"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                </div>
                <div className="address-input-group">
                  <label htmlFor="zone">Zona</label>
                  <div className="address-input-container">
                    <ZoneIcon />
                    <select id="zone" value={zone} onChange={(e) => setZone(e.target.value)}>
                      <option value="" disabled>Zona</option>
                      <option value="Norte">Norte</option>
                      <option value="Sur">Sur</option>
                      <option value="Este">Este</option>
                      <option value="Oeste">Oeste</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
                <Map
                  onPlaceSelect={handlePlaceSelect}
                  street={street}
                  streetNumber={streetNumber}
                  city={city}
                />
              <div className="pay-btn-container">
                <button className="back-btn icon-btn" onClick={() => setStep(1)}><BackIcon /></button>
                <button className="pay-btn" onClick={() => setStep(3)}>Ver Resumen de Compra <ShippingIcon /></button>
              </div>
            </div>
          )}

          {step === 3 && !completedOrderDetails && (
            <div className="order-summary-content">
              <table className="order-summary-table">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cant</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map(item => (
                    <tr key={item.id_producto}>
                      <td>{item.nombre}</td>
                      <td>{item.quantity}</td>
                      <td>${(item.precio * item.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="summary-row total-row">
                <span>Total a pagar:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="pay-btn-container">
                <button className="back-btn icon-btn" onClick={() => setStep(2)}><BackIcon /></button>
                <button className="pay-btn" onClick={handleHacerPedido}>Confirmar Pedido <SummaryIcon /></button>
              </div>
            </div>
          )}

          {step === 3 && completedOrderDetails && (
            <div className="order-summary-content">
              <div className="summary-info">
                <p>📧 El resumen fue enviado a: <strong>{user.email}</strong></p>
                <p>🏦 Alias de pago: <strong>frozen.pyme.congelados</strong></p>
                <p>📧 Enviá tu comprobante de transferencia a: <strong>frozenpyme@gmail.com</strong></p>
                <p>⏰ Tu pedido será reservado por 24hs.</p>
              </div>
              <div className="pay-btn-container">
                <button className="pay-btn" onClick={handleSeguirComprando}>Seguir Comprando</button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;