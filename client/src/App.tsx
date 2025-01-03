import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import './App.css';
import ProtectedRoute from './components/ProtectedRoute';
import { GridLoader } from 'react-spinners';
import Layout from './Layout/Layout';
import UserProfile from './pages/UserProfile/UserProfile';
import UserNotifications from './pages/UserNotifications/UserNotifications';
import UserTourSchedule from './pages/UserTourSchedule/UserTourSchedule';
import TourScheduleDetail from './pages/UserTourSchedule/TourScheduleDetail';
import TourRequest from './pages/ManageProperties/TourRequest/TourRequest';
import ManageProperties from './pages/ManageProperties/ManageProperties';

const ScrollToTop = lazy(() => import('./components/ScrollToTop'));
const Home = lazy(() => import('./pages/Home/Home'));
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

function App() {
  useEffect(() => {
    import('./pages/Home/Home');
  }, []);
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

            {/* <Route element={<ProtectedRoute />}>
              <Route path="my-properties" element={<MyProperties />} />
            </Route> */}
            {/* <Route element={<ProtectedRoute />}>
              <Route path="my-properties" element={<MyProperties />}>
                <Route path="tours" element={<TourRequest />} />
              </Route>
            </Route> */}
            <Route element={<ProtectedRoute />}>
              <Route path="manage-properties" element={<ManageProperties />}>
                <Route path="" element={<Navigate to="my-properties" />} />
                <Route path="my-properties" element={<MyProperties />} />
                <Route path="tour-requests" element={<TourRequest />} />
              </Route>
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="my-properties/edit/:id" element={<EditProperty />} />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route path="wishlist" element={<Wishlist />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="user-profile" element={<UserProfile />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="notifications" element={<UserNotifications />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="tour-schedules" element={<UserTourSchedule />}>
                <Route path=":tourId" element={<TourScheduleDetail />} />
              </Route>
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
