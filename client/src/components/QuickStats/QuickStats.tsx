import './QuickStats.css';
import { STATS } from '../../MOCK_DATA';

const QuickStats = () => {
  return (
    <section className="quick_stats">
      <h2>Our Achievements</h2>
      <div className="stats_grid">
        {STATS.map((stat) => (
          <div key={stat.id} className="stat_card">
            <h3>{stat.value}</h3>
            <p>{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default QuickStats;
