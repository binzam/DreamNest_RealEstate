import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { fetchProperties } from './store/slices/propertySlice.ts';
import { fetchWishlistThunk } from './store/slices/wishlistThunks.ts';
import { fetchNotificationsThunk } from './store/slices/notificationThunks.ts';

store.dispatch(fetchProperties());
store.dispatch(fetchWishlistThunk());
store.dispatch(fetchNotificationsThunk());

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
