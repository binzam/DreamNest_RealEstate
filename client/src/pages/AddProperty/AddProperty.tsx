import './AddProperty.css';
import { useState } from 'react';
import { axiosPrivate } from '../../api/axiosInstance';
import BackButton from '../../components/BackButton/BackButton';
import { MdAddHomeWork } from 'react-icons/md';
import PropertyDetailForm from './AddPropertyForm/PropertyDetailForm';
import PropertyLocationForm from './AddPropertyForm/PropertyLocationForm';
import { PropertyFormData } from '../../types/propertyTypes';
import PropertyRoomsForm from './AddPropertyForm/PropertyRoomsForm';
import PropertyImageForm from './AddPropertyForm/PropertyImageForm';
import PropertyInfoForm from './AddPropertyForm/PropertyInfoForm';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GridLoader } from 'react-spinners';
import ErrorDisplay from '../../components/ErrorDisplay';
import { GrLinkNext, GrLinkPrevious } from 'react-icons/gr';
import AddPropertyCheckout from './AddPropertyCheckout';
import { useDispatch } from 'react-redux';
import { fetchProperties } from '../../store/slices/propertySlice';
import { AppDispatch } from '../../store/store';
const stepTitles = [
  'Property Type',
  'Property Location',
  'Property Specs',
  'Property Info',
  'Property Images',
  'Listing Payment',
];

const AddProperty = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState<PropertyFormData>({
    currency: 'USD',
    title: 'sapien urna pretium',
    address: {
      street: '32067 Artisan Point',
      city: 'Buffalo',
      state: 'New York',
      country: 'United States',
      latitude: 42.7684,
      longitude: -78.8871,
    },
    price: 190623,
    bed: 1,
    bath: 4,
    sqft: 4270,
    sizeUnit: 'sqft',
    photos: [
      {
        title: 'living room',
        image: null,
        previewUrl:
          'http://ap.rdcpix.com/dc056cce79810cd4113cadea6618982dl-m526987112rd-w2048_h1536.webp',
      },
      {
        title: 'side',
        image: null,
        previewUrl:
          'http://ap.rdcpix.com/dc056cce79810cd4113cadea6618982dl-m526987112rd-w2048_h1536.webp',
      },
      {
        title: 'front',
        image: null,
        previewUrl:
          'http://ap.rdcpix.com/dc056cce79810cd4113cadea6618982dl-m526987112rd-w2048_h1536.webp',
      },
      {
        title: 'bedroom',
        image: null,
        previewUrl:
          'http://ap.rdcpix.com/dc056cce79810cd4113cadea6618982dl-m526987112rd-w2048_h1536.webp',
      },
    ],
    detail:
      'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.',
    propertyFor: 'sale',
    propertyType: 'House',
    yearBuilt: 1887,
    features: ['', ''],
    isAvailable: true,
    tempPropertyId: null,
   
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
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
    if (formData.tempPropertyId) {
      formDataWithFiles.append('tempPropertyId', formData.tempPropertyId);
    }
    formData.photos.forEach((photo, index) => {
      if (photo.image) {
        formDataWithFiles.append(`photos${index}[title]`, photo.title);
        formDataWithFiles.append('photos', photo.image);
      }
    });
    console.log(formData);

    try {
      console.log(formDataWithFiles);

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
      if (response.status === 201) {
        dispatch(fetchProperties());
        navigate('/manage-properties/my-properties', {
          state: {
            message: 'Congratulations! Property added successfully!',
          },
        });
      }
    } catch (error) {
      console.log(error);

      if (axios.isAxiosError(error)) {
        if (error.response?.data?.message === 'Validation Error') {
          return setError('Please fill all required fields');
        }
        return setError(
          error.response?.data?.message || 'Failed to add Property'
        );
      }
      setError('Something went wrong! Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 6) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
    setError(null);
  };
  console.log(formData);

  const updateFormData = (newData: Partial<PropertyFormData>) => {
    setFormData((prevData) => ({
      ...prevData,
      ...newData,
    }));
    setError(null);
  };

  const progressBarWidth = (currentStep / 6) * 100;
  return (
    <div className="add_property">
      {loading && (
        <GridLoader
          color="#13ccbb"
          margin={40}
          size={75}
          className="add_pty_loading"
        />
      )}
      <div className="add_pty_hdr">
        <BackButton /> <h2>Add New Property</h2>
        <MdAddHomeWork className="add_icon" />
      </div>
      <div className="progress-bar-container">
        <div
          className="progress-bar"
          style={{ width: `${progressBarWidth}%` }}
        ></div>
        <div className="step-titles">
          {stepTitles.map((title, index) => (
            <span
              onClick={() => setCurrentStep(index + 1)}
              key={index}
              className={`step-title ${
                currentStep === index + 1 ? 'active' : ''
              }`}
            >
              {title}
            </span>
          ))}
        </div>
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
          {currentStep === 6 && (
            <AddPropertyCheckout
              formData={formData}
              onPaymentSuccess={handleSubmit}
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
                <GrLinkPrevious />
                Previous
              </button>
            )}
            {currentStep < 6 && (
              <button
                disabled={loading}
                className="next_btn"
                type="button"
                onClick={nextStep}
              >
                Next <GrLinkNext />
              </button>
            )}
          </div>
        </form>
        {error && <ErrorDisplay message={error} />}
      </div>
    </div>
  );
};

export default AddProperty;
