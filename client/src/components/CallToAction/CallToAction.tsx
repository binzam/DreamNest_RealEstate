import { Link } from 'react-router-dom';
import './CallToAction.css';
import Container from '../Container/Container';

const CallToAction = () => {
  return (
    <section className="call_to_action">
      <Container>
        <div className="call_to_action_inner">
          <h2>Sell Your Property Faster</h2>
          <p>
            Join thousands of homeowners who have successfully sold their
            properties with us.
          </p>
          <Link to="/add-property" className="cta_btn">
            Get Started
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default CallToAction;
