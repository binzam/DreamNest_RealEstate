import heroDesktop from '../../assets/images/hp-hero-desktop.jpg';
import heroMobile from '../../assets/images/hp-hero-mobile.jpg';
import heroTablet from '../../assets/images/hp-hero-tablet.jpg';
import heroDesktopXL from '../../assets/images/hp-hero-desktop-xl.jpg';
import { Link } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import './Hero.css';
const Hero = () => {
  return (
    <section className="hero">
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
          <TypeAnimation
          className='hero_ttl'
            sequence={[
              'The #1 site real estate   Professionals trust*',
              1000,
              'The #1 site real estate   Sellers trust*',
              1000,
              'The #1 site real estate   Buyers trust*',
              1000,
              'The #1 site real estate   Agents trust*',
              1000,
            ]}
            wrapper="h1"
            speed={50}
            repeat={3}
          />
          <p className="hero_sub_ttl">
            With the most complete source of homes for sale & real estate near
            you.
          </p>
        </div>
        <div className="hero_actions">
          <nav className="hero_nav">
            <Link className="hero_nav_link" to="/">
              Buy
            </Link>
            <Link className="hero_nav_link" to="/">
              Sell
            </Link>
            <Link className="hero_nav_link" to="/">
              Rent
            </Link>
          </nav>
          <form className="search_form">
            <input
              className="search_input"
              type="text"
              placeholder="Address, City, Zip or Neighborhood"
            />
            <button className="search_btn">
              <svg
                data-testid="icon-magnifying-glass"
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  fillRule="evenodd"
                  d="M16.618 18.032a9 9 0 1 1 1.414-1.414l3.675 3.675a1 1 0 0 1-1.414 1.414l-3.675-3.675ZM18 11a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Hero;
