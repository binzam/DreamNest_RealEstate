import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import './App.css';

const Home = lazy(() => import('./pages/Home/Home'));
const PropertyDetail = lazy(
  () => import('./pages/PropertyDetail/PropertyDetail')
);
const About = lazy(() => import('./pages/About'));
const Layout = lazy(() => import('./Layout/Layout'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));
const Login = lazy(() => import('./pages/Auth/Login/Login'));
const Signup = lazy(() => import('./pages/Auth/Signup/Signup'));
const ScrollToTop = lazy(() => import('./components/ScrollToTop'));
const CategorisedListing = lazy(
  () => import('./pages/CategorisedListing/CategorisedListing')
);
const Listings = lazy(() => import('./pages/Listings/Listings'));
const PropertyList = lazy(() => import('./pages/PropertyList/PropertyList'));
const SellProperty = lazy(() => import('./pages/SellProperty/SellProperty'));
function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <ScrollToTop />
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="listings" element={<Listings />} />
            <Route path="listings/:category" element={<CategorisedListing />} />
            <Route path="properties/:type" element={<PropertyList />} />
            <Route path="property-detail/:id" element={<PropertyDetail />} />
            <Route path="about" element={<About />} />
            <Route path="sell" element={<SellProperty />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
