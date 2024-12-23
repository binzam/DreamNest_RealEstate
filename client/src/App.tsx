import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import './App.css';
import ProtectedRoute from './components/ProtectedRoute';
import { GridLoader } from 'react-spinners';
import PropertyList from './pages/PropertyList/PropertyList';
import Layout from './Layout/Layout';
import Home from './pages/Home/Home';
import Wishlist from './pages/Wishlist/Wishlist';
import AddProperty from './pages/AddProperty/AddProperty';

const PropertyDetail = lazy(
  () => import('./pages/PropertyDetail/PropertyDetail')
);
const About = lazy(() => import('./pages/About'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));
const Login = lazy(() => import('./pages/Auth/Login/Login'));
const Signup = lazy(() => import('./pages/Auth/Signup/Signup'));
const ScrollToTop = lazy(() => import('./components/ScrollToTop'));
const CategorisedListing = lazy(
  () => import('./pages/CategorisedListing/CategorisedListing')
);
const Listings = lazy(() => import('./pages/Listings/Listings'));
const UserListings = lazy(() => import('./pages/UserListings/UserListings'));
function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<GridLoader color="#13ccbb" margin={10} size={25} />}>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route element={<ProtectedRoute />}>
            <Route path="add-property" element={<AddProperty />} />
          </Route>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="listings" element={<Listings />} />
            <Route path="listings/:category" element={<CategorisedListing />} />
            <Route path="properties/:type" element={<PropertyList />} />
            <Route path="property-detail/:id" element={<PropertyDetail />} />
            <Route path="about" element={<About />} />

            <Route element={<ProtectedRoute />}>
              <Route path="my-listings" element={<UserListings />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="wishlist" element={<Wishlist />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
