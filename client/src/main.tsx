import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { fetchProperties } from './store/slices/propertySlice.ts';
import { fetchWishlistThunk } from './store/slices/userSlice.ts';

store.dispatch(fetchProperties());
store.dispatch(fetchWishlistThunk());

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
