// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Menu';
import Home from './Pages/Home';
import Models from './Pages/Models';
import Products from './Pages/Products';
import Events from './Pages/Events';
import PhotoSales from './Pages/PhotoSales';
import Memberships from './Pages/Memberships';
import ContactUs from './Pages/ContactUs';
import AdminDashboard from './Pages/AdminDashboard';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import ManageModels from './Pages/ManageModels';
import ManageProducts from './Pages/ManageProducts';
import ManageEvents from './Pages/ManageEvents';
// import ManagePhotoSales from './Pages/ManagePhotos';
// import ManageMemberships from './Pages/ManageMemberships';

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ paddingTop: '4rem' }}> {/* To avoid content overlapping with Navbar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/models" element={<Models />} />
          <Route path="/products" element={<Products />} />
          <Route path="/events" element={<Events />} />
          <Route path="/photos" element={<PhotoSales />} />
          <Route path="/memberships" element={<Memberships />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/manage-models" element={<ManageModels />} />
          <Route path="/manage-products" element={<ManageProducts />} />
          <Route path="/manage-events" element={<ManageEvents />} />
          {/* <Route path="/manage-photos" element={<ManagePhotos />} /> */}
          {/* <Route path="/manage-memberships" element={<ManageMemberships />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

