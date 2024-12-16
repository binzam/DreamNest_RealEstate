import { Property } from '../models/propertyModel.js';
const PROPERTIESDATA = [
  {
    street: '29 Becker Center',
    city: 'Louisville',
    country: 'United States',
    state: 'Kentucky',
    price: 2232795,
    bed: 3,
    bath: 1,
    sqft: 4997,
    image:
      'http://ap.rdcpix.com/dc056cce79810cd4113cadea6618982dl-m526987112rd-w2048_h1536.webp',
    photos: [
      {
        title: 'front',
        image: `http://localhost:5555/uploads/properties/property-image-1.webp`,
      },
      {
        title: 'side',
        image: `http://localhost:5555/uploads/properties/property-image-2.webp`,
      },
      {
        title: 'rear',
        image: `http://localhost:5555/uploads/properties/property-image-3.webp`,
      },
      {
        title: 'yard',
        image: `http://localhost:5555/uploads/properties/property-image-4.webp`,
      },
    ],
    detail:
      'The house has 4 bedrooms and 2 bathrooms with ample rental potential. Qualifies for AHA program that allows $2700 month rent. Spacious room sizes, separate laundry room, huge deck on rear, additional den/office room. Outside storage building 10X15 great for storage. Located close to new public park at end of street. ',
    category: 'recently-sold',
    propertyFor: 'sale',
    propertyType: 'House',
  },
  {
    street: '8 Bobwhite Center',
    city: 'Dallas',
    country: 'United States',
    state: 'Texas',
    price: 5946412,
    bed: 4,
    bath: 2,
    sqft: 4019,
    image:
      'http://ap.rdcpix.com/dc056cce79810cd4113cadea6618982dl-m526987112rd-w2048_h1536.webp',
    photos: [
      {
        title: 'front',
        image: `http://localhost:5555/uploads/properties/property-image-1.webp`,
      },
      {
        title: 'side',
        image: `http://localhost:5555/uploads/properties/property-image-2.webp`,
      },
      {
        title: 'rear',
        image: `http://localhost:5555/uploads/properties/property-image-3.webp`,
      },
      {
        title: 'yard',
        image: `http://localhost:5555/uploads/properties/property-image-4.webp`,
      },
    ],
    detail:
      'The house has 4 bedrooms and 2 bathrooms with ample rental potential. Qualifies for AHA program that allows $2700 month rent. Spacious room sizes, separate laundry room, huge deck on rear, additional den/office room. Outside storage building 10X15 great for storage. Located close to new public park at end of street. ',
    category: 'price-reduced',
    propertyFor: 'sale',
    propertyType: 'Townhome',
  },
  {
    street: '8189 Delladonna Street',
    city: 'Rochester',
    country: 'United States',
    state: 'New York',
    price: 1657010,
    bed: 5,
    bath: 4,
    sqft: 4818,
    image:
      'http://ap.rdcpix.com/dc056cce79810cd4113cadea6618982dl-m526987112rd-w2048_h1536.webp',
    photos: [
      {
        title: 'front',
        image: `http://localhost:5555/uploads/properties/property-image-1.webp`,
      },
      {
        title: 'side',
        image: `http://localhost:5555/uploads/properties/property-image-2.webp`,
      },
      {
        title: 'rear',
        image: `http://localhost:5555/uploads/properties/property-image-3.webp`,
      },
      {
        title: 'yard',
        image: `http://localhost:5555/uploads/properties/property-image-4.webp`,
      },
    ],
    detail:
      'The house has 4 bedrooms and 2 bathrooms with ample rental potential. Qualifies for AHA program that allows $2700 month rent. Spacious room sizes, separate laundry room, huge deck on rear, additional den/office room. Outside storage building 10X15 great for storage. Located close to new public park at end of street. ',
    category: 'price-reduced',
    propertyFor: 'sale',
    propertyType: 'Townhome',
  },
  {
    street: '3936 Doe Crossing Parkway',
    city: 'Richmond',
    country: 'United States',
    state: 'Virginia',
    price: 5638085,
    bed: 4,
    bath: 3,
    sqft: 4573,
    image:
      'http://ap.rdcpix.com/dc056cce79810cd4113cadea6618982dl-m526987112rd-w2048_h1536.webp',
    photos: [
      {
        title: 'front',
        image: `http://localhost:5555/uploads/properties/property-image-1.webp`,
      },
      {
        title: 'side',
        image: `http://localhost:5555/uploads/properties/property-image-2.webp`,
      },
      {
        title: 'rear',
        image: `http://localhost:5555/uploads/properties/property-image-3.webp`,
      },
      {
        title: 'yard',
        image: `http://localhost:5555/uploads/properties/property-image-4.webp`,
      },
    ],
    detail:
      'The house has 4 bedrooms and 2 bathrooms with ample rental potential. Qualifies for AHA program that allows $2700 month rent. Spacious room sizes, separate laundry room, huge deck on rear, additional den/office room. Outside storage building 10X15 great for storage. Located close to new public park at end of street. ',
    category: 'price-reduced',
    propertyFor: 'sale',
    propertyType: 'Multi family',
  },
  {
    street: '08828 Lakewood Terrace',
    city: 'Salt Lake City',
    country: 'United States',
    state: 'Utah',
    price: 5099507,
    bed: 6,
    bath: 5,
    sqft: 1042,
    image:
      'http://ap.rdcpix.com/dc056cce79810cd4113cadea6618982dl-m526987112rd-w2048_h1536.webp',
    photos: [
      {
        title: 'front',
        image: `http://localhost:5555/uploads/properties/property-image-1.webp`,
      },
      {
        title: 'side',
        image: `http://localhost:5555/uploads/properties/property-image-2.webp`,
      },
      {
        title: 'rear',
        image: `http://localhost:5555/uploads/properties/property-image-3.webp`,
      },
      {
        title: 'yard',
        image: `http://localhost:5555/uploads/properties/property-image-4.webp`,
      },
    ],
    detail:
      'The house has 4 bedrooms and 2 bathrooms with ample rental potential. Qualifies for AHA program that allows $2700 month rent. Spacious room sizes, separate laundry room, huge deck on rear, additional den/office room. Outside storage building 10X15 great for storage. Located close to new public park at end of street. ',
    category: 'recommended',
    propertyFor: 'sale',
    propertyType: 'Farm',
  },
  {
    street: '5494 Mccormick Center',
    city: 'Hollywood',
    country: 'United States',
    state: 'Florida',
    price: 928866,
    bed: 4,
    bath: 4,
    sqft: 5463,
    image:
      'http://ap.rdcpix.com/dc056cce79810cd4113cadea6618982dl-m526987112rd-w2048_h1536.webp',
    photos: [
      {
        title: 'front',
        image: `http://localhost:5555/uploads/properties/property-image-1.webp`,
      },
      {
        title: 'side',
        image: `http://localhost:5555/uploads/properties/property-image-2.webp`,
      },
      {
        title: 'rear',
        image: `http://localhost:5555/uploads/properties/property-image-3.webp`,
      },
      {
        title: 'yard',
        image: `http://localhost:5555/uploads/properties/property-image-4.webp`,
      },
    ],
    detail:
      'The house has 4 bedrooms and 2 bathrooms with ample rental potential. Qualifies for AHA program that allows $2700 month rent. Spacious room sizes, separate laundry room, huge deck on rear, additional den/office room. Outside storage building 10X15 great for storage. Located close to new public park at end of street. ',
    category: 'price-reduced',
    propertyFor: 'rent',
    propertyType: 'Moblie',
  },
  {
    street: '14 Southridge Street',
    city: 'Fort Worth',
    country: 'United States',
    state: 'Texas',
    price: 225373,
    bed: 2,
    bath: 3,
    sqft: 1162,
    image:
      'http://ap.rdcpix.com/dc056cce79810cd4113cadea6618982dl-m526987112rd-w2048_h1536.webp',
    photos: [
      {
        title: 'front',
        image: `http://localhost:5555/uploads/properties/property-image-1.webp`,
      },
      {
        title: 'side',
        image: `http://localhost:5555/uploads/properties/property-image-2.webp`,
      },
      {
        title: 'rear',
        image: `http://localhost:5555/uploads/properties/property-image-3.webp`,
      },
      {
        title: 'yard',
        image: `http://localhost:5555/uploads/properties/property-image-4.webp`,
      },
    ],
    detail:
      'The house has 4 bedrooms and 2 bathrooms with ample rental potential. Qualifies for AHA program that allows $2700 month rent. Spacious room sizes, separate laundry room, huge deck on rear, additional den/office room. Outside storage building 10X15 great for storage. Located close to new public park at end of street. ',
    category: 'land',
    propertyFor: 'sale',
    propertyType: 'Land',
  },
  {
    street: '829 Little Fleur Terrace',
    city: 'Saint Louis',
    country: 'United States',
    state: 'Missouri',
    price: 2316218,
    bed: 1,
    bath: 3,
    sqft: 5689,
    image:
      'http://ap.rdcpix.com/dc056cce79810cd4113cadea6618982dl-m526987112rd-w2048_h1536.webp',
    photos: [
      {
        title: 'front',
        image: `http://localhost:5555/uploads/properties/property-image-1.webp`,
      },
      {
        title: 'side',
        image: `http://localhost:5555/uploads/properties/property-image-2.webp`,
      },
      {
        title: 'rear',
        image: `http://localhost:5555/uploads/properties/property-image-3.webp`,
      },
      {
        title: 'yard',
        image: `http://localhost:5555/uploads/properties/property-image-4.webp`,
      },
    ],
    detail:
      'The house has 4 bedrooms and 2 bathrooms with ample rental potential. Qualifies for AHA program that allows $2700 month rent. Spacious room sizes, separate laundry room, huge deck on rear, additional den/office room. Outside storage building 10X15 great for storage. Located close to new public park at end of street. ',
    category: 'recently-sold',
    propertyFor: 'sale',
    propertyType: 'Condo',
  },
  {
    street: '6464 Elgar Court',
    city: 'Sandy',
    country: 'United States',
    state: 'Utah',
    price: 3527530,
    bed: 3,
    bath: 4,
    sqft: 2152,
    image:
      'http://ap.rdcpix.com/dc056cce79810cd4113cadea6618982dl-m526987112rd-w2048_h1536.webp',
    photos: [
      {
        title: 'front',
        image: `http://localhost:5555/uploads/properties/property-image-1.webp`,
      },
      {
        title: 'side',
        image: `http://localhost:5555/uploads/properties/property-image-2.webp`,
      },
      {
        title: 'rear',
        image: `http://localhost:5555/uploads/properties/property-image-3.webp`,
      },
      {
        title: 'yard',
        image: `http://localhost:5555/uploads/properties/property-image-4.webp`,
      },
    ],
    detail:
      'The house has 4 bedrooms and 2 bathrooms with ample rental potential. Qualifies for AHA program that allows $2700 month rent. Spacious room sizes, separate laundry room, huge deck on rear, additional den/office room. Outside storage building 10X15 great for storage. Located close to new public park at end of street. ',
    category: 'recently-sold',
    propertyFor: 'rent',
    propertyType: 'Condo',
  },
  {
    street: '567 Arapahoe Drive',
    city: 'Portland',
    country: 'United States',
    state: 'Oregon',
    price: 5368397,
    bed: 6,
    bath: 1,
    sqft: 5532,
    image:
      'http://ap.rdcpix.com/dc056cce79810cd4113cadea6618982dl-m526987112rd-w2048_h1536.webp',
    photos: [
      {
        title: 'front',
        image: `http://localhost:5555/uploads/properties/property-image-1.webp`,
      },
      {
        title: 'side',
        image: `http://localhost:5555/uploads/properties/property-image-2.webp`,
      },
      {
        title: 'rear',
        image: `http://localhost:5555/uploads/properties/property-image-3.webp`,
      },
      {
        title: 'yard',
        image: `http://localhost:5555/uploads/properties/property-image-4.webp`,
      },
    ],
    detail:
      'The house has 4 bedrooms and 2 bathrooms with ample rental potential. Qualifies for AHA program that allows $2700 month rent. Spacious room sizes, separate laundry room, huge deck on rear, additional den/office room. Outside storage building 10X15 great for storage. Located close to new public park at end of street. ',
    category: 'new-listings',
    propertyFor: 'rent',
    propertyType: 'Condo',
  },
  {
    street: '86 Mcbride Parkway',
    city: 'Jackson',
    country: 'United States',
    state: 'Mississippi',
    price: 613928,
    bed: 3,
    bath: 1,
    sqft: 2622,
    image:
      'http://ap.rdcpix.com/dc056cce79810cd4113cadea6618982dl-m526987112rd-w2048_h1536.webp',
    photos: [
      {
        title: 'front',
        image: `http://localhost:5555/uploads/properties/property-image-1.webp`,
      },
      {
        title: 'side',
        image: `http://localhost:5555/uploads/properties/property-image-2.webp`,
      },
      {
        title: 'rear',
        image: `http://localhost:5555/uploads/properties/property-image-3.webp`,
      },
      {
        title: 'yard',
        image: `http://localhost:5555/uploads/properties/property-image-4.webp`,
      },
    ],
    detail:
      'The house has 4 bedrooms and 2 bathrooms with ample rental potential. Qualifies for AHA program that allows $2700 month rent. Spacious room sizes, separate laundry room, huge deck on rear, additional den/office room. Outside storage building 10X15 great for storage. Located close to new public park at end of street. ',
    category: 'land',
    propertyFor: 'rent',
    propertyType: 'Multi family',
  },
  {
    street: '52 Crescent Oaks Parkway',
    city: 'Miami',
    country: 'United States',
    state: 'Florida',
    price: 2299977,
    bed: 3,
    bath: 2,
    sqft: 3705,
    image:
      'http://ap.rdcpix.com/dc056cce79810cd4113cadea6618982dl-m526987112rd-w2048_h1536.webp',
    photos: [
      {
        title: 'front',
        image: `http://localhost:5555/uploads/properties/property-image-1.webp`,
      },
      {
        title: 'side',
        image: `http://localhost:5555/uploads/properties/property-image-2.webp`,
      },
      {
        title: 'rear',
        image: `http://localhost:5555/uploads/properties/property-image-3.webp`,
      },
      {
        title: 'yard',
        image: `http://localhost:5555/uploads/properties/property-image-4.webp`,
      },
    ],
    detail:
      'The house has 4 bedrooms and 2 bathrooms with ample rental potential. Qualifies for AHA program that allows $2700 month rent. Spacious room sizes, separate laundry room, huge deck on rear, additional den/office room. Outside storage building 10X15 great for storage. Located close to new public park at end of street. ',
    category: 'open-houses',
    propertyFor: 'rent',
    propertyType: 'House',
  },
  {
    street: '200 Lakeland Center',
    city: 'Des Moines',
    country: 'United States',
    state: 'Iowa',
    price: 2661100,
    bed: 4,
    bath: 2,
    sqft: 1578,
    image:
      'http://ap.rdcpix.com/dc056cce79810cd4113cadea6618982dl-m526987112rd-w2048_h1536.webp',
    photos: [
      {
        title: 'front',
        image: `http://localhost:5555/uploads/properties/property-image-1.webp`,
      },
      {
        title: 'side',
        image: `http://localhost:5555/uploads/properties/property-image-2.webp`,
      },
      {
        title: 'rear',
        image: `http://localhost:5555/uploads/properties/property-image-3.webp`,
      },
      {
        title: 'yard',
        image: `http://localhost:5555/uploads/properties/property-image-4.webp`,
      },
    ],
    detail:
      'The house has 4 bedrooms and 2 bathrooms with ample rental potential. Qualifies for AHA program that allows $2700 month rent. Spacious room sizes, separate laundry room, huge deck on rear, additional den/office room. Outside storage building 10X15 great for storage. Located close to new public park at end of street. ',
    category: 'open-houses',
    propertyFor: 'rent',
    propertyType: 'Condo',
  },
  {
    street: '1981 1st Junction',
    city: 'Seattle',
    country: 'United States',
    state: 'Washington',
    price: 3821539,
    bed: 1,
    bath: 5,
    sqft: 2726,
    image:
      'http://ap.rdcpix.com/dc056cce79810cd4113cadea6618982dl-m526987112rd-w2048_h1536.webp',
    photos: [
      {
        title: 'front',
        image: `http://localhost:5555/uploads/properties/property-image-1.webp`,
      },
      {
        title: 'side',
        image: `http://localhost:5555/uploads/properties/property-image-2.webp`,
      },
      {
        title: 'rear',
        image: `http://localhost:5555/uploads/properties/property-image-3.webp`,
      },
      {
        title: 'yard',
        image: `http://localhost:5555/uploads/properties/property-image-4.webp`,
      },
    ],
    detail:
      'The house has 4 bedrooms and 2 bathrooms with ample rental potential. Qualifies for AHA program that allows $2700 month rent. Spacious room sizes, separate laundry room, huge deck on rear, additional den/office room. Outside storage building 10X15 great for storage. Located close to new public park at end of street. ',
    category: 'new-listings',
    propertyFor: 'rent',
    propertyType: 'Townhome',
  },
  {
    street: '70239 Farwell Parkway',
    city: 'Lincoln',
    country: 'United States',
    state: 'Nebraska',
    price: 988729,
    bed: 2,
    bath: 1,
    sqft: 2879,
    image:
      'http://ap.rdcpix.com/dc056cce79810cd4113cadea6618982dl-m526987112rd-w2048_h1536.webp',
    photos: [
      {
        title: 'front',
        image: `http://localhost:5555/uploads/properties/property-image-1.webp`,
      },
      {
        title: 'side',
        image: `http://localhost:5555/uploads/properties/property-image-2.webp`,
      },
      {
        title: 'rear',
        image: `http://localhost:5555/uploads/properties/property-image-3.webp`,
      },
      {
        title: 'yard',
        image: `http://localhost:5555/uploads/properties/property-image-4.webp`,
      },
    ],
    detail:
      'The house has 4 bedrooms and 2 bathrooms with ample rental potential. Qualifies for AHA program that allows $2700 month rent. Spacious room sizes, separate laundry room, huge deck on rear, additional den/office room. Outside storage building 10X15 great for storage. Located close to new public park at end of street. ',
    category: 'open-houses',
    propertyFor: 'rent',
    propertyType: 'Multi family',
  },
  {
    street: '552 Memorial Junction',
    city: 'Pueblo',
    country: 'United States',
    state: 'Colorado',
    price: 1638240,
    bed: 5,
    bath: 3,
    sqft: 1347,
    image:
      'http://ap.rdcpix.com/dc056cce79810cd4113cadea6618982dl-m526987112rd-w2048_h1536.webp',
    photos: [
      {
        title: 'front',
        image: `http://localhost:5555/uploads/properties/property-image-1.webp`,
      },
      {
        title: 'side',
        image: `http://localhost:5555/uploads/properties/property-image-2.webp`,
      },
      {
        title: 'rear',
        image: `http://localhost:5555/uploads/properties/property-image-3.webp`,
      },
      {
        title: 'yard',
        image: `http://localhost:5555/uploads/properties/property-image-4.webp`,
      },
    ],
    detail:
      'The house has 4 bedrooms and 2 bathrooms with ample rental potential. Qualifies for AHA program that allows $2700 month rent. Spacious room sizes, separate laundry room, huge deck on rear, additional den/office room. Outside storage building 10X15 great for storage. Located close to new public park at end of street. ',
    category: 'recently-sold',
    propertyFor: 'rent',
    propertyType: 'House',
  },
  {
    street: '3355 Donald Trail',
    city: 'Pinellas Park',
    country: 'United States',
    state: 'Florida',
    price: 3614659,
    bed: 3,
    bath: 5,
    sqft: 2013,
    image:
      'http://ap.rdcpix.com/dc056cce79810cd4113cadea6618982dl-m526987112rd-w2048_h1536.webp',
    photos: [
      {
        title: 'front',
        image: `http://localhost:5555/uploads/properties/property-image-1.webp`,
      },
      {
        title: 'side',
        image: `http://localhost:5555/uploads/properties/property-image-2.webp`,
      },
      {
        title: 'rear',
        image: `http://localhost:5555/uploads/properties/property-image-3.webp`,
      },
      {
        title: 'yard',
        image: `http://localhost:5555/uploads/properties/property-image-4.webp`,
      },
    ],
    detail:
      'The house has 4 bedrooms and 2 bathrooms with ample rental potential. Qualifies for AHA program that allows $2700 month rent. Spacious room sizes, separate laundry room, huge deck on rear, additional den/office room. Outside storage building 10X15 great for storage. Located close to new public park at end of street. ',
    category: 'open-houses',
    propertyFor: 'rent',
    propertyType: 'Condo',
  },
  {
    street: '815 Parkside Park',
    city: 'Philadelphia',
    country: 'United States',
    state: 'Pennsylvania',
    price: 2771705,
    bed: 1,
    bath: 3,
    sqft: 1707,
    image:
      'http://ap.rdcpix.com/dc056cce79810cd4113cadea6618982dl-m526987112rd-w2048_h1536.webp',
    photos: [
      {
        title: 'front',
        image: `http://localhost:5555/uploads/properties/property-image-1.webp`,
      },
      {
        title: 'side',
        image: `http://localhost:5555/uploads/properties/property-image-2.webp`,
      },
      {
        title: 'rear',
        image: `http://localhost:5555/uploads/properties/property-image-3.webp`,
      },
      {
        title: 'yard',
        image: `http://localhost:5555/uploads/properties/property-image-4.webp`,
      },
    ],
    detail:
      'The house has 4 bedrooms and 2 bathrooms with ample rental potential. Qualifies for AHA program that allows $2700 month rent. Spacious room sizes, separate laundry room, huge deck on rear, additional den/office room. Outside storage building 10X15 great for storage. Located close to new public park at end of street. ',
    category: 'recommended',
    propertyFor: 'sale',
    propertyType: 'Land',
  },
  {
    street: '72 Continental Park',
    city: 'Richmond',
    country: 'United States',
    state: 'Virginia',
    price: 3463530,
    bed: 4,
    bath: 3,
    sqft: 3040,
    image:
      'http://ap.rdcpix.com/dc056cce79810cd4113cadea6618982dl-m526987112rd-w2048_h1536.webp',
    photos: [
      {
        title: 'front',
        image: `http://localhost:5555/uploads/properties/property-image-1.webp`,
      },
      {
        title: 'side',
        image: `http://localhost:5555/uploads/properties/property-image-2.webp`,
      },
      {
        title: 'rear',
        image: `http://localhost:5555/uploads/properties/property-image-3.webp`,
      },
      {
        title: 'yard',
        image: `http://localhost:5555/uploads/properties/property-image-4.webp`,
      },
    ],
    detail:
      'The house has 4 bedrooms and 2 bathrooms with ample rental potential. Qualifies for AHA program that allows $2700 month rent. Spacious room sizes, separate laundry room, huge deck on rear, additional den/office room. Outside storage building 10X15 great for storage. Located close to new public park at end of street. ',
    category: 'open-houses',
    propertyFor: 'sale',
    propertyType: 'Farm',
  },
  {
    street: '80 Service Way',
    city: 'Baltimore',
    country: 'United States',
    state: 'Maryland',
    price: 3255267,
    bed: 3,
    bath: 2,
    sqft: 4793,
    image:
      'http://ap.rdcpix.com/dc056cce79810cd4113cadea6618982dl-m526987112rd-w2048_h1536.webp',
    photos: [
      {
        title: 'front',
        image: `http://localhost:5555/uploads/properties/property-image-1.webp`,
      },
      {
        title: 'side',
        image: `http://localhost:5555/uploads/properties/property-image-2.webp`,
      },
      {
        title: 'rear',
        image: `http://localhost:5555/uploads/properties/property-image-3.webp`,
      },
      {
        title: 'yard',
        image: `http://localhost:5555/uploads/properties/property-image-4.webp`,
      },
    ],
    detail:
      'The house has 4 bedrooms and 2 bathrooms with ample rental potential. Qualifies for AHA program that allows $2700 month rent. Spacious room sizes, separate laundry room, huge deck on rear, additional den/office room. Outside storage building 10X15 great for storage. Located close to new public park at end of street. ',
    category: 'recommended',
    propertyFor: 'sale',
    propertyType: 'Mobile',
  },
];

// Function to upload properties
export const uploadProperties = async () => {
  try {
    for (const property of PROPERTIESDATA) {
      const newProperty = new Property(property);
      await newProperty.save();
      console.log(`Property with ID ${property.price} uploaded`);
    }
    console.log('All properties uploaded successfully');
    // const result = await Property.deleteMany({});
    // console.log(`Deleted ${result.deletedCount} Properties.`);
  } catch (err) {
    console.error('Error uploading properties:', err);
  }
};
