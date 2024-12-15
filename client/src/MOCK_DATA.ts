import ImgRecommended from './assets/images/recommeded-small.jpg';
import ImgPropertyFront from './assets/images/property-image-1.webp';
import ImgNewLisings from './assets/images/new-listing-small.jpg';
import ImgOpenHouse from './assets/images/open-house-small.jpg';
import ImgSold from './assets/images/sold-small.jpg';
import ImgPriceReduced from './assets/images/price-reduced-small.jpg';
import ImgLand from './assets/images/land-small.jpg';
import AvatarAli from './assets/images/avatar-ali.png';
import AvatarAnisha from './assets/images/avatar-anisha.png';
import AvatarShanai from './assets/images/avatar-shanai.png';
import AvatarRichard from './assets/images/avatar-richard.png';


export const PROPERTYCATEGORY = [
  {
    categoryName: 'recommended',
    id: 1,
    title: 'Recommended',
    count: 20,
    image: ImgRecommended,
  },
  {
    categoryName: 'new-listings',
    id: 2,
    title: 'New Listings',
    count: 1400,
    image: ImgNewLisings,
  },
  {
    categoryName: 'price-reduced',
    id: 3,
    title: 'Price Reduced',
    count: 440,
    image: ImgPriceReduced,
  },

  {
    categoryName: 'open-houses',
    id: 4,
    title: 'Open Houses',
    count: 64,
    image: ImgOpenHouse,
  },
  {
    categoryName: 'recently-sold',
    id: 5,
    title: 'Recently Sold',
    count: 40,
    image: ImgSold,
  },
  {
    categoryName: 'land',
    id: 6,
    title: 'Land',
    count: 200,
    image: ImgLand,
  },
];
export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Anisha Li',
    image: AvatarAnisha,
    message: `“This website made finding our dream home so easy. The team was supportive every step of the way. Highly recommend!”`,
    role: 'Happy Homeowner',
  },
  {
    id: 2,
    name: 'Ali Bravo',
    image: AvatarAli,
    message: `“Selling my property was effortless. My listing looked great, and I got multiple offers in no time. Fantastic experience!”`,
    role: 'Satisfied Seller',
  },
  {
    id: 3,
    name: 'Richard Watts',
    image: AvatarRichard,
    message: `“We quickly found a beautiful rental home that matched our needs. The process was smooth and stress-free!”`,
    role: 'Tenant',
  },
  {
    id: 4,
    name: 'Shanai Gough',
    image: AvatarShanai,
    message: `“The experts helped me find the perfect commercial property and guided me through the process. Couldn’t be happier!”`,
    role: 'Commercial Property Investor',
  },
];

export const STATS = [
  { id: 1, value: '1000+', label: 'Happy Homeowners' },
  { id: 2, value: '500+', label: 'Properties Sold' },
  { id: 3, value: '50+', label: 'Locations Covered' },
];
export const MAPMARKERS: {
  id: number;
  geocode: [number, number];
  popup: string;
  popupImg: string;
}[] = [
  {
    id: 1,
    geocode: [48.86, 2.3522],
    popup: 'Hot Property',
    popupImg: ImgPropertyFront,
  },
  {
    id: 2,
    geocode: [48.85, 2.3522],
    popup: 'Hot Property',
    popupImg: ImgPropertyFront,
  },
  {
    id: 3,
    geocode: [48.855, 2.34],
    popup: 'Hot Property',
    popupImg: ImgPropertyFront,
  },
];
