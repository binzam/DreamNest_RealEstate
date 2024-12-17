import { TestimonialType } from '../../types/PropTypes';
import './Testimonials.css';

const TestimonialCard = ({ testimony }: { testimony: TestimonialType }) => {
  const { image, name, message, role } = testimony;
  return (
    <article className="tst_box">
      <img src={image} alt={name} loading="lazy" />
      <h3>{name}</h3>
      <p>{message}</p>
      <strong>- {role}</strong>
    </article>
  );
};

export default TestimonialCard;
