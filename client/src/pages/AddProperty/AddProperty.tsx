import './AddProperty.css';
import React, { useState } from 'react';
import { axiosPrivate } from '../../api/axiosInstance';
import BackButton from '../../components/BackButton/BackButton';
import { MdAddHomeWork } from 'react-icons/md';
import PropertyDetailForm from './AddPropertyForm/PropertyDetailForm';
import PropertyLocationForm from './AddPropertyForm/PropertyLocationForm';
import { PropertyFormData } from '../../types/propertyTypes';
import PropertyRoomsForm from './AddPropertyForm/PropertyRoomsForm';
import PropertyImageForm from './AddPropertyForm/PropertyImageForm';
import PropertyInfoForm from './AddPropertyForm/PropertyInfoForm';

const AddProperty = () => {
  const [formData, setFormData] = useState<PropertyFormData>({
    title: 'A Cozy 3 bedroom apartment',
    address: {
      street: '123 Main St',
      city: 'Stockholm',
      state: 'Stockholm',
      country: 'Sweden',
      latitude: 59.325180462950215,
      longitude: 18.07158439781698,
    },
    price: 120000,
    bed: 5,
    bath: 3,
    sqft: 1200,
    propertyFor: 'sale',
    propertyType: 'Condo',
    detail:
      'The house has 4 bedrooms and 2 bathrooms with ample rental potential. Spacious room sizes, separate laundry room, huge deck on rear, additional den/office room.',
    yearBuilt: 2001,
    currency: 'SEK',
    features: ['pool', 'garage'],
    isAvailable: true,
    videoUrl: 'http://example.com/video-tour',
    contactInfo: 'John Doe, 123-456-7890',
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  console.log(formData);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const response = await axiosPrivate.post(
        '/properties/add-property',
        formData
      );
      console.log(response);
    } catch (err) {
      console.log(err);

      setError('Failed to add property. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progressBarWidth = (currentStep / 5) * 100;

  return (
    <div className="add_property">
      <div className="add_pty_hdr">
        <BackButton /> <h2>Add New Property</h2>
        <MdAddHomeWork className="add_icon" />
      </div>
      {error && <div className="error">{error}</div>}
      <div className="progress-bar-container">
        <div
          className="progress-bar"
          style={{ width: `${progressBarWidth}%` }}
        ></div>
      </div>
      <div className="add_pty_ctnt">
        <form onSubmit={handleSubmit} className="add_pty_form">
          {currentStep === 1 && (
            <PropertyDetailForm formData={formData} setFormData={setFormData} />
          )}

          {currentStep === 2 && (
            <PropertyLocationForm
              formData={formData}
              setFormData={setFormData}
            />
          )}

          {currentStep === 3 && (
            <PropertyRoomsForm formData={formData} setFormData={setFormData} />
          )}

          {currentStep === 4 && (
            <PropertyImageForm formData={formData} setFormData={setFormData} />
          )}

          {currentStep === 5 && (
            <PropertyInfoForm formData={formData} setFormData={setFormData} />
          )}

          <div className="add_pty_form_navigation">
            {currentStep > 1 && (
              <button
                className="prev_btn"
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                Previous
              </button>
            )}
            {currentStep === 5 ? (
              <button type="submit" disabled={loading}>
                {loading ? 'Submitting...' : 'Add Property'}
              </button>
            ) : (
              <button className="next_btn" type="button" onClick={nextStep}>
                Next
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProperty;
