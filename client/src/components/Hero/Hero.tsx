import heroDesktop from '../../assets/images/hp-hero-desktop.jpg';
import heroMobile from '../../assets/images/hp-hero-mobile.jpg';
import heroTablet from '../../assets/images/hp-hero-tablet.jpg';
import heroDesktopXL from '../../assets/images/hp-hero-desktop-xl.jpg';
import { Link, useNavigate } from 'react-router-dom';
// import { TypeAnimation } from 'react-type-animation';
import './Hero.css';
import { BsHouseAdd } from 'react-icons/bs';
import { useFetchProperties } from '../../hooks/useProperties';
import SearchBar from '../SearchBar/SearchBar';
const Hero = () => {
  const { data: properties = [] } = useFetchProperties();
  const navigate = useNavigate();

  const handleSearchSelect = (searchParams: { [key: string]: string }) => {
    const params = new URLSearchParams(searchParams);
    navigate(`/properties?${params.toString()}`);
    return;
  };

  return (
    <section className="hero_">
      <picture className="hero_bg">
        <source srcSet={heroMobile} media="(max-width: 480px)" />
        <source srcSet={heroTablet} media="(max-width: 768px)" />
        <source srcSet={heroDesktop} media="(max-width: 996px)" />
        <source srcSet={heroDesktopXL} media="(min-width: 997px)" />
        <img
          src={heroDesktop}
          alt="Beautiful house showcased on DreamNest"
          loading="lazy"
        />
      </picture>
      <div className="hero_overlay">
        <div className="hero_message">
          <h1  className="hero_ttl">
          The #1 site real estate    Professionals trust*
          </h1>
          {/* <TypeAnimation
           
            sequence={[
              'The #1 site real estate    Professionals trust*',
              1000,
              'The #1 site real estate    Sellers trust*',
              1000,
              'The #1 site real estate    Buyers trust*',
              1000,
              'The #1 site real estate    Agents trust*',
              1000,
            ]}
            wrapper="h1"
            speed={50}
            repeat={100}
          /> */}
          <p className="hero_sub_ttl">
            With the most complete source of homes for sale & real estate near
            you.
          </p>
        </div>
        <div className="hero_actions">
          <nav className="hero_nav">
            <Link className="hero_nav_link" to="/properties/sale">
              Buy
            </Link>
            <Link className="hero_nav_link" to="/properties/rent">
              Rent
            </Link>
            <Link className="hero_nav_link add" to="/add-property">
              <BsHouseAdd /> Add Property
            </Link>
          </nav>
          <SearchBar
            properties={properties}
            onSearchSelect={handleSearchSelect}
            placeholder="Address, City, Zip or Neighborhood"
            className="hero"
          />
          
        </div>
      </div>
    </section>
  );
};

export default Hero;
