import TestimonialCard from './TestimonialCard';
import { TESTIMONIALS } from '../../MOCK_DATA';
import './Testimonials.css';
import { TestimonialType } from '../../types';

const Testimonials = () => {
  return (
    <section className="testimonials_sec">
      <h1 className="testi_ttl">What they’ve said</h1>
      <div className="testimonials_grid">
        {TESTIMONIALS.map((testimony: TestimonialType) => (
          <TestimonialCard key={testimony.id} testimony={testimony} />
        ))}
      </div>
      <button className="btn">Browse Properties</button>
    </section>
  );
};

export default Testimonials;
