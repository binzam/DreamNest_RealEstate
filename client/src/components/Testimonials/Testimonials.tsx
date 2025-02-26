import TestimonialCard from './TestimonialCard';
import { TESTIMONIALS } from '../../MOCK_DATA';
import './Testimonials.css';
import { TestimonialType } from '../../types/PropTypes';
import Container from '../Container/Container';
import { Link } from 'react-router-dom';

const Testimonials = () => {
  return (
    <section className="testimonials_sec">
      <Container>
        <div className="testimonials_sec_inner">
          <h1 className="testi_ttl">What they’ve said</h1>
          <div className="testimonials_grid">
            {TESTIMONIALS.map((testimony: TestimonialType) => (
              <TestimonialCard key={testimony.id} testimony={testimony} />
            ))}
          </div>
          <Link to={'/properties'} className="btn">Browse Properties</Link>
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;
