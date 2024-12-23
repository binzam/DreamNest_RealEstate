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
    name: '',
    street: '',
    city: '',
    state: '',
    country: '',
    price: 0,
    bed: null,
    bath: null,
    sqft: null,
    image: '',
    latitude: 0,
    longitude: 0,
    category: '',
    propertyFor: '',
    propertyType: '',
    detail: '',
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  console.log('formdata value long', formData.longitude);
  console.log('formdata value lat', formData.latitude);

  
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
            // <PropertyDetailForm formData={formData} setFormData={setFormData} />
            <PropertyDetailForm />
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
            {currentStep === 6 ? (
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
