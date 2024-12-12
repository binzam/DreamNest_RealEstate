import { useState } from 'react';
import './SellProperty.css';

const SellProperty = () => {
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState('');
  const [sellTimeline, setSellTimeline] = useState('');
  const [expectedSalePrice, setExpectedSalePrice] = useState('');
  const [propertyType, setPropertyType] = useState('');

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    // Handle form submission, e.g., send data to a server
    console.log({
      address,
      sellTimeline,
      expectedSalePrice,
      propertyType,
    });
  };

  return (
    <div className="sell_page">
      <div className="sell_page_hdr">
        <h2>Sell Realestate</h2>
      </div>
      <div className="sell_page_cntnt">
        <div className="sell_form">
          {step === 1 && (
            <div className="form_group">
              <h2>Enter Property Address</h2>
              <input
                className="address_input"
                type="text"
                placeholder="Enter address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <button className="next_btn" onClick={handleNext}>
                Next
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="form_group">
              <h2>How soon are you looking to sell?</h2>
              <label>
                <input
                  type="radio"
                  name="sellTimeline"
                  value="Right Away"
                  checked={sellTimeline === 'Right Away'}
                  onChange={(e) => setSellTimeline(e.target.value)}
                />
                Right Away
              </label>
              <label>
                <input
                  type="radio"
                  name="sellTimeline"
                  value="1-3 Months"
                  checked={sellTimeline === '1-3 Months'}
                  onChange={(e) => setSellTimeline(e.target.value)}
                />
                1-3 Months
              </label>
              <label>
                <input
                  type="radio"
                  name="sellTimeline"
                  value="4+ Months"
                  checked={sellTimeline === '4+ Months'}
                  onChange={(e) => setSellTimeline(e.target.value)}
                />
                4+ Months
              </label>
              <label>
                <input
                  type="radio"
                  name="sellTimeline"
                  value="Already Listed"
                  checked={sellTimeline === 'Already Listed'}
                  onChange={(e) => setSellTimeline(e.target.value)}
                />
                Already Listed
              </label>
              <div className="form_btns">
                <button className="previous_btn" onClick={handlePrevious}>
                  Previous
                </button>
                <button className="next_btn" onClick={handleNext}>
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="form_group">
              <h2>How much do you think your home will sell for?</h2>
              <label>
                <input
                  type="radio"
                  name="expectedSalePrice"
                  value="$1.4M or more"
                  checked={expectedSalePrice === '$1.4M or more'}
                  onChange={(e) => setExpectedSalePrice(e.target.value)}
                />
                $1.4M or more
              </label>
              <label>
                <input
                  type="radio"
                  name="expectedSalePrice"
                  value="$1.1M - $1.4M"
                  checked={expectedSalePrice === '$1.1M - $1.4M'}
                  onChange={(e) => setExpectedSalePrice(e.target.value)}
                />
                $1.1M - $1.4M
              </label>
              {/* Add more price range options */}
              <div className="form_btns">
                <button className="previous_btn" onClick={handlePrevious}>
                  Previous
                </button>
                <button className="next_btn" onClick={handleNext}>
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="form_group">
              <h2>What kind of home are you looking to sell in {address}?</h2>
              <label>
                <input
                  type="radio"
                  name="propertyType"
                  value="Single Family"
                  checked={propertyType === 'Single Family'}
                  onChange={(e) => setPropertyType(e.target.value)}
                />
                Single Family
              </label>
              <label>
                <input
                  type="radio"
                  name="propertyType"
                  value="Condominium"
                  checked={propertyType === 'Condominium'}
                  onChange={(e) => setPropertyType(e.target.value)}
                />
                Condominium
              </label>
              <div className="form_btns">
                <button className="previous_btn" onClick={handlePrevious}>
                  Previous
                </button>
                <button className="submit_btn" onClick={handleSubmit}>
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellProperty;
