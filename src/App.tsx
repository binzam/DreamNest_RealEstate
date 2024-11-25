import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Listings from './pages/Listings';
import PropertyDetail from './pages/PropertyDetail';
import About from './pages/About';
import Layout from './Layout/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
