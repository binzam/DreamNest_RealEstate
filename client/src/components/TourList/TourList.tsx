// import { GridLoader } from 'react-spinners';
// import { FaHome } from 'react-icons/fa';
// import { IoMdInformationCircleOutline } from 'react-icons/io';
// import { BsSmartwatch } from 'react-icons/bs';
// import { ImCheckboxChecked } from 'react-icons/im';
// import { GiCancel } from 'react-icons/gi';
// import { Link } from 'react-router-dom';
// import { FaCalendarDays, FaLocationDot } from 'react-icons/fa6';
//import './TourList.css';
// const TourList = ({
//   tours,
//   loadingTourId,
//   handleConfirm,
//   handleCancel,
//   isOwner,
//   loading,
//   error,
//   noToursMessage,
// }) => {
//   if (loading) {
//     return <GridLoader color="#13ccbb" margin={40} size={35} />;
//   }

//   if (error) {
//     return <p className="error">{error}</p>;
//   }

//   if (!tours || tours.length === 0) {
//     return <p className="zero_msg">{noToursMessage}</p>;
//   }

//   return (
//     <ul className="tour_list">
//       {tours.map((tour) => (
//         <li key={tour.tourId} className="tour_item">
//           {loadingTourId === tour.tourId && (
//             <GridLoader color="#13ccbb" margin={16} size={20} />
//           )}
//           <div className="tour_details">
//             <div className="tour_img">
//               <img src={tour.propertyImage} alt={tour.addressOfTour} />
//             </div>
//             <div className="tour_info">
//               <div className="tour_address">
//                 <FaLocationDot />
//                 <Link to={`/property-detail/${tour.propertyId}`}>
//                   <FaHome />
//                   {tour.addressOfTour}
//                 </Link>
//               </div>
//               <div className="tour_time">
//                 <div>
//                   <FaCalendarDays /> {tour.dateOfTour}
//                 </div>
//                 <div>
//                   <BsSmartwatch />
//                   {tour.timeOfTour}
//                 </div>
//               </div>
//               <div className={`tour_status ${tour.status.toLowerCase()}`}>
//                 {tour.status === 'Scheduled' && (
//                   <>
//                     <IoMdInformationCircleOutline />
//                     <span>Tour {tour.status}</span>
//                     <small>* Waiting for confirmation.</small>
//                   </>
//                 )}
//                 {tour.status === 'Confirmed' && (
//                   <>
//                     <ImCheckboxChecked />
//                     <span>Tour {tour.status}</span>
//                     <small>* Be ready to visit.</small>
//                   </>
//                 )}
//                 {tour.status === 'Canceled' && (
//                   <>
//                     <GiCancel />
//                     <span>Tour {tour.status}</span>
//                     <small>* Request canceled.</small>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//           {isOwner && tour.status === 'Scheduled' && (
//             <div className="tour_actions">
//               <button
//                 className="confirm_btn"
//                 onClick={() => handleConfirm(tour.tourId)}
//                 disabled={!!loadingTourId}
//               >
//                 Confirm
//               </button>
//               <button
//                 className="cancel_btn"
//                 onClick={() => handleCancel(tour.tourId)}
//                 disabled={!!loadingTourId}
//               >
//                 Cancel
//               </button>
//             </div>
//           )}
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default TourList;
