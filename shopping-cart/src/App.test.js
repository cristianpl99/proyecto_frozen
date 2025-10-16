import { render, screen } from '@testing-library/react';
import App from './App';
import { ToastProvider } from './context/ToastContext';
import { CartProvider } from './context/CartContext';

const renderApp = () => {
  return render(
    <ToastProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </ToastProvider>
  );
};

test('renders navbar with title', () => {
  renderApp();
  const titleElement = screen.getByText((content, element) => {
    return element.tagName.toLowerCase() === 'div' &&
           element.classList.contains('navbar-title') &&
           /Frozen Pyme/i.test(content);
  });
  expect(titleElement).toBeInTheDocument();
});