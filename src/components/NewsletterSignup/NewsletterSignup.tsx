import { useState } from 'react';
import './NewsletterSignup.css';
import { FaCheck } from 'react-icons/fa6';

const NewsletterSignup = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
  
      if (!emailRegex.test(email)) {
        setError('Please enter a valid email address');
        setSuccess(false);
      } else {
        setError('');
        setSuccess(true);
        setTimeout(()=> {

            setSuccess(false);
        },2000)
        setEmail('');
      }
    };
  return (
    <section className="newsletter_signup">
      <div className="newsletter_hdr">
        <h2>Stay Updated</h2>
        <p>
          Subscribe to our newsletter for updates on new listings, price drops,
          and real estate tips.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="signup_form">
        <input
        className={error ? 'input_error' : ''}
          type="email"
         placeholder="Updates in your inbox…"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="signup_btn">
          Subscribe
        </button>
         {error && <span className="err_msg">{error}</span>}
        {success && (
          <span className="success_msg">
            <span className="check_icon">
              <FaCheck />
            </span>
            Thank you for subscribing!
          </span>
        )}
      </form>
    </section>
  );
};

export default NewsletterSignup;
