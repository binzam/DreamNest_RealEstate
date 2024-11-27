import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import PropertyDetail from './pages/PropertyDetail/PropertyDetail';
import About from './pages/About';
import Layout from './Layout/Layout';
import Listings from './pages/Listings/Listings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/listings/:category" element={<Listings />} />
          <Route path="/property-detail/:id" element={<PropertyDetail />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
