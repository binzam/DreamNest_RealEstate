import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
import './App.css';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './Layout/Layout';
import NotificationListener from './components/NotificationListener';
import ScrollToTop from './components/ScrollToTop';
import TourScheduleCheckout from './pages/TourScheduleCheckout/TourScheduleCheckout';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AdminLayout from './Layout/AdminLayout';
import AdminDashboard from './pages/Admin/AdminDashboard';

const UserProfile = lazy(() => import('./pages/UserProfile/UserProfile'));
const UserNotifications = lazy(
  () => import('./pages/UserNotifications/UserNotifications')
);
const UserTourSchedule = lazy(
  () => import('./pages/UserTourSchedule/UserTourSchedule')
);
const TourScheduleDetail = lazy(
  () => import('./pages/UserTourSchedule/TourScheduleDetail')
);
const TourRequest = lazy(
  () => import('./pages/ManageProperties/TourRequest/TourRequest')
);
const ManageProperties = lazy(
  () => import('./pages/ManageProperties/ManageProperties')
);
const PropertyList = lazy(() => import('./pages/PropertyList/PropertyList'));
const Wishlist = lazy(() => import('./pages/Wishlist/Wishlist'));
const AddProperty = lazy(() => import('./pages/AddProperty/AddProperty'));
const MyProperties = lazy(
  () => import('./pages/ManageProperties/MyProperties/MyProperties')
);
const EditProperty = lazy(() => import('./pages/EditProperty/EditProperty'));
const PropertyDetail = lazy(
  () => import('./pages/PropertyDetail/PropertyDetail')
);
const About = lazy(() => import('./pages/About'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));
const Login = lazy(() => import('./pages/Auth/Login/Login'));
const Signup = lazy(() => import('./pages/Auth/Signup/Signup'));
const CategorisedListing = lazy(
  () => import('./pages/CategorisedListing/CategorisedListing')
);
const Listings = lazy(() => import('./pages/Listings/Listings'));
const Home = lazy(() => import('./pages/Home/Home'));

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <NotificationListener />
      <Routes>
        <Route
          path="login"
          element={
            <GoogleOAuthProvider
              clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
            >
              <Login />
            </GoogleOAuthProvider>
          }
        />
        <Route
          path="signup"
          element={
            <GoogleOAuthProvider
              clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
            >
              <Signup />
            </GoogleOAuthProvider>
          }
        />
        <Route path="*" element={<NotFound />} />
        <Route element={<ProtectedRoute />}>
          <Route path="add-property" element={<AddProperty />} />
        </Route>

        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="listings" element={<Listings />}>
            <Route index element={<Listings />} />
            <Route path=":category" element={<CategorisedListing />} />
          </Route>
          <Route path="properties/:type" element={<PropertyList />} />

          <Route path="property-detail/:id" element={<PropertyDetail />} />
          <Route path="about" element={<About />} />

          <Route element={<ProtectedRoute />}>
            <Route path="manage-properties" element={<ManageProperties />}>
              <Route path="" element={<Navigate to="my-properties" />} />
              <Route path="my-properties" element={<MyProperties />} />
              <Route path="tour-requests" element={<TourRequest />} />
            </Route>
            <Route path="my-properties/edit/:id" element={<EditProperty />} />

            <Route
              path="tour-schedule/payment"
              element={<TourScheduleCheckout />}
            />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="user-profile" element={<UserProfile />} />
            <Route path="notifications" element={<UserNotifications />} />
            <Route path="tour-schedules" element={<UserTourSchedule />}>
              <Route path=":tourId" element={<TourScheduleDetail />} />
            </Route>
          </Route>
        </Route>
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          {' '}
          {/* Restrict admin access */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            {/* <Route path="manage-users" element={<ManageUsers />} /> */}
            {/* <Route path="manage-listings" element={<ManageListings />} /> */}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
