import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import './App.css';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './Layout/Layout';
import AdminLayout from './Layout/AdminLayout';
import NotificationListener from './components/NotificationListener';
import ScrollToTop from './components/ScrollToTop';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Loader } from './components/Loader';
import { PropertyFilterProvider } from './context/PropertyFilterContext';

const TourScheduleCheckout = lazy(
  () => import('./pages/TourScheduleCheckout/TourScheduleCheckout')
);
const AdminDashboard = lazy(() => import('./pages/Admin/AdminDashboard'));

const ManageUsers = lazy(() => import('./pages/Admin/ManageUsers/ManageUsers'));
const ManageTransactions = lazy(
  () => import('./pages/Admin/ManageTransactions/ManageTransactions')
);
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
      <Suspense fallback={<Loader />}>
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
            <Route path="listings" element={<Listings />} />
            <Route
              path="listings/:category"
              element={
                <PropertyFilterProvider>
                  <CategorisedListing />
                </PropertyFilterProvider>
              }
            />
            <Route
              path="properties/:type?"
              element={
                <PropertyFilterProvider>
                  <PropertyList />
                </PropertyFilterProvider>
              }
            />

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
            <Route path="admin" element={<AdminLayout />}>
              <Route path="" element={<Navigate to="dashboard" />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="manage-users" element={<ManageUsers />} />
              <Route
                path="users/:userId/profile"
                element={<UserProfile isAdminView />}
              />
              <Route path="profile" element={<UserProfile isAdminView />} />
              <Route
                path="users/:userId/tour-schedules/:tourId?"
                element={<UserTourSchedule isAdminView />}
              />
              <Route
                path="users/:userId/properties"
                element={<MyProperties isAdminView />}
              />
              <Route
                path="users/:userId/wishlist"
                element={<Wishlist isAdminView />}
              />
              <Route
                path="manage-listings"
                element={
                  <PropertyFilterProvider>
                    <PropertyList adminMode />
                  </PropertyFilterProvider>
                }
              />
              <Route
                path="manage-transactions"
                element={<ManageTransactions />}
              />
              <Route
                path="edit-property/:id"
                element={<EditProperty isAdminView />}
              />
              <Route path="notifications" element={<UserNotifications />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
