import './Listings.css';
import LoadingSkeleton from '../../components/Loading/LoadingSkeleton/LoadingSkeleton';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { PropertyDataType } from '../../types/propertyTypes';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import { settingsForProperty as settings } from '../../utils/sliderSetting';
import ErrorDisplay from '../../components/ErrorDisplay/ErrorDisplay';
import { useFetchCategorizedProperties } from '../../hooks/useProperties';
import Container from '../../components/Container/Container';
import { FaTrailer } from 'react-icons/fa6';
import { MdCabin, MdTerrain, MdVilla } from 'react-icons/md';
import { PiFarm } from 'react-icons/pi';
import { HiHomeModern } from 'react-icons/hi2';
import { BiSolidBuildingHouse } from 'react-icons/bi';
import { LiaCitySolid } from 'react-icons/lia';
import { BsFillHousesFill } from 'react-icons/bs';
import { useMemo } from 'react';
import BackToTopButton from '../../components/BackToTopButton/BackToTopButton';
const Listings = () => {
  const {
    data: categoriedProperties,
    isLoading,
    isError,
    error,
  } = useFetchCategorizedProperties();
  const propertyTypes = useMemo(
    () => [
      { title: 'Any', icon: <BiSolidBuildingHouse /> },
      { title: 'House', icon: <HiHomeModern /> },
      { title: 'Villa', icon: <MdVilla /> },
      { title: 'Condo', icon: <LiaCitySolid /> },
      { title: 'Town house', icon: <MdCabin /> },
      { title: 'Multi family', icon: <BsFillHousesFill /> },
      { title: 'Farm', icon: <PiFarm /> },
      { title: 'Mobile', icon: <FaTrailer /> },
      { title: 'Land', icon: <MdTerrain /> },
    ],
    []
  );
  if (isLoading || !categoriedProperties) {
    return (
      <>
        <LoadingSkeleton />
        <LoadingSkeleton />
        <LoadingSkeleton />
      </>
    );
  }

  if (isError) {
    return <ErrorDisplay message={error.message} />;
  }

  return (
    <Container>
      <div className="all_listings">
        <section className="slider_section">
          {categoriedProperties.length > 0 ? (
            categoriedProperties.map((category) => {
              const matchedType = propertyTypes.find(
                (type) =>
                  type.title.toLowerCase() === category.category.toLowerCase()
              );

              return (
                <div key={category.category} className="property_slider">
                  <h1 className="cat_ttl">
                    {category.category.split('-').join(' ')} {matchedType?.icon}{' '}
                  </h1>
                  {category.properties.length === 1 && (
                    <div className="single_pty">
                      <PropertyCard property={category.properties[0]} />
                    </div>
                  )}
                  {category.properties.length > 1 && (
                    <div>
                      <Slider {...settings}>
                        {category.properties.map(
                          (property: PropertyDataType) => (
                            <PropertyCard
                              key={property._id}
                              property={property}
                            />
                          )
                        )}
                      </Slider>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <p>No properties found.</p>
          )}
        </section>
      </div>
      <BackToTopButton />
    </Container>
  );
};

export default Listings;
