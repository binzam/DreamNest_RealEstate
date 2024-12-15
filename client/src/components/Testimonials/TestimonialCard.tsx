import { TestimonialType } from '../../types';
import './Testimonials.css';

interface TestimonialCardProps {
  testimony: TestimonialType;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimony }) => {
  return (
    <article className="tst_box">
      <img src={testimony.image} alt={testimony.name} loading="lazy" />
      <h3>{testimony.name}</h3>
      <p>{testimony.message}</p>
      <strong>- {testimony.role}</strong>
    </article>
  );
};

export default TestimonialCard;
