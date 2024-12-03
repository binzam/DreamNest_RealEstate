import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import PropertyDetail from './pages/PropertyDetail/PropertyDetail';
import About from './pages/About';
import Layout from './Layout/Layout';
import NotFound from './pages/NotFound/NotFound';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import ScrollToTop from './components/ScrollToTop';
import CategorisedListing from './pages/CategorisedListing/CategorisedListing';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="listings/:category" element={<CategorisedListing />} />
          <Route path="property-detail/:id" element={<PropertyDetail />} />
          <Route path="about" element={<About />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
