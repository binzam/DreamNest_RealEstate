import { Link } from 'react-router-dom'
import './CallToAction.css'

const CallToAction = () => {
  return (
    <section className="call_to_action">
    <h2>Sell Your Property Faster</h2>
    <p>Join thousands of homeowners who have successfully sold their properties with us.</p>
    <Link to="/add-property" className="cta_btn">Get Started</Link>
  </section>
  )
}

export default CallToAction