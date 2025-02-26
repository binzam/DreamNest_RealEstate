import './QuickStats.css';
import { STATS } from '../../MOCK_DATA';
import Container from '../Container/Container';
import { FaRegSmile } from 'react-icons/fa';

const QuickStats = () => {
  return (
    <section className="quick_stats">
      <Container>
        <div className="quick_stats_inner">
          <h2>Our Achievements</h2>
          <div className="stats_grid">
            {STATS.map((stat) => (
              <div key={stat.id} className="stat_card">
                <FaRegSmile />
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default QuickStats;
