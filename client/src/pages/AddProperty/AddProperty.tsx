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
    title: '',
    address: {
      street: '',
      city: '',
      state: '',
      country: '',
      latitude: 0,
      longitude: 0,
    },
    photos: [
      { title: 'Main', image: null },
      { title: 'Front', image: null },
      { title: 'Side', image: null },
      { title: 'Back', image: null },
      { title: 'Bedroom 1', image: null },
    ],
    price: 0,
    bed: 0,
    bath: 0,
    sqft: 0,
    propertyFor: 'sale',
    propertyType: '',
    detail: '',
    yearBuilt: 0,
    currency: 'USD',
    features: ['', ''],
    isAvailable: true,
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  console.log(formData);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    const formDataWithFiles = new FormData();
    formDataWithFiles.append('title', formData.title);
    formDataWithFiles.append('address[street]', formData.address.street);
    formDataWithFiles.append('address[city]', formData.address.city);
    formDataWithFiles.append('address[state]', formData.address.state);
    formDataWithFiles.append('address[country]', formData.address.country);
    formDataWithFiles.append(
      'address[latitude]',
      formData.address.latitude.toString()
    );
    formDataWithFiles.append(
      'address[longitude]',
      formData.address.longitude.toString()
    );
    formDataWithFiles.append('price', formData.price.toString());
    formDataWithFiles.append('bed', formData.bed.toString());
    formDataWithFiles.append('bath', formData.bath.toString());
    formDataWithFiles.append('sqft', formData.sqft.toString());
    formDataWithFiles.append('propertyFor', formData.propertyFor);
    formDataWithFiles.append('propertyType', formData.propertyType);
    formDataWithFiles.append('detail', formData.detail);
    formDataWithFiles.append('yearBuilt', formData.yearBuilt.toString());
    if (formData.currency) {
      formDataWithFiles.append('currency', formData.currency);
    }
    formDataWithFiles.append('isAvailable', formData.isAvailable.toString());

    formData.photos.forEach((photo, index) => {
      if (photo.image) {
        // make a new array for formDData.photos so that the indexes match the backend
        formDataWithFiles.append(`photos${index}[title]`, photo.title);
        formDataWithFiles.append('photos', photo.image);
      }
    });
    
    try {
      const response = await axiosPrivate.post(
        '/properties/add-property',
        formDataWithFiles,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
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
  const updateFormData = (newData: Partial<PropertyFormData>) => {
    setFormData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };
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
            <PropertyDetailForm
              formData={formData}
              updateFormData={updateFormData}
            />
          )}

          {currentStep === 2 && (
            <PropertyLocationForm
              formData={formData}
              updateFormData={updateFormData}
            />
          )}

          {currentStep === 3 && (
            <PropertyRoomsForm
              formData={formData}
              updateFormData={updateFormData}
            />
          )}

          {currentStep === 4 && (
            <PropertyInfoForm
              formData={formData}
              updateFormData={updateFormData}
            />
          )}
          {currentStep === 5 && (
            <PropertyImageForm
              formData={formData}
              updateFormData={updateFormData}
            />
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
          <button
            type="submit"
            onClick={(e) => handleSubmit(e)}
            className="add_pty_submit"
          >
            Add Property
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProperty;
