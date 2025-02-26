import './AddProperty.css';
import { useState } from 'react';
import { axiosPrivate } from '../../api/axiosInstance';
import BackButton from '../../components/BackButton/BackButton';
import { MdAddHomeWork } from 'react-icons/md';
import PropertyDetailForm from './AddPropertyForm/PropertyDetailForm/PropertyDetailForm';
import PropertyLocationForm from './AddPropertyForm/PropertyLocationForm/PropertyLocationForm';
import { PropertyFormData } from '../../types/propertyTypes';
import PropertyRoomsForm from './AddPropertyForm/PropertyRoomsForm/PropertyRoomsForm';
import PropertyImageForm from './AddPropertyForm/PropertyImageForm/PropertyImageForm';
import PropertyInfoForm from './AddPropertyForm/PropertyInfoForm/PropertyInfoForm';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GridLoader } from 'react-spinners';
import ErrorDisplay from '../../components/ErrorDisplay/ErrorDisplay';
import { GrLinkNext, GrLinkPrevious } from 'react-icons/gr';
import AddPropertyCheckout from './AddPropertyForm/AddPropertyCheckout/AddPropertyCheckout';
import { v4 as uuidv4 } from 'uuid';
import {
  createPropertyFormData,
  getStepErrors,
} from '../../utils/formDataHelper';
import Container from '../../components/Container/Container';

const stepTitles = ['Type', 'Location', 'Specs', 'Info', 'Images', 'Payment'];

const AddProperty = () => {
  const tempId = uuidv4();

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
      { title: 'Main', image: null, previewUrl: '' },
      { title: '', image: null, previewUrl: '' },
      { title: '', image: null, previewUrl: '' },
      { title: '', image: null, previewUrl: '' },
    ],
    price: null,
    bed: null,
    bath: null,
    sqft: null,
    sizeUnit: 'sqft',
    propertyFor: 'sale',
    propertyType: '',
    detail: '',
    yearBuilt: null,
    currency: 'USD',
    features: ['', ''],
    isAvailable: true,
    tempPropertyId: tempId,
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const formDataWithFiles = createPropertyFormData(formData);

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
  const nextStep = async () => {
    if (currentStep < 6) {
      if (currentStep === 5) {
        await validateFormData();
      } else {
        setCurrentStep((prev) => prev + 1);
      }
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

    const updatedFields = Object.keys(newData);
    setValidationErrors((prevErrors) => {
      const newErrors = { ...prevErrors };

      updatedFields.forEach((field) => {
        if (field === 'address') {
          const addressFields = Object.keys(newData.address || {});
          addressFields.forEach((addressField) => {
            delete newErrors[`address.${addressField}`];
          });
        } else {
          delete newErrors[field];
        }
      });

      return newErrors;
    });
  };
  const validateFormData = async () => {
    setLoading(true);
    setError(null);
    try {
      const formDataWithFiles = createPropertyFormData(formData);

      const response = await axiosPrivate.post(
        '/properties/validate',
        formDataWithFiles,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        setCurrentStep(6);
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.errors) {
          const errors = error.response.data.errors;

          const errorMap: Record<string, string> = {};
          errors.forEach((err: { field: string; message: string }) => {
            errorMap[err.field] = err.message;
          });

          setValidationErrors(errorMap);
        } else {
          setError('Something went wrong. Please try again.');
        }
      }
    } finally {
      setLoading(false);
    }
  };
  console.log(validationErrors);
  const progressBarWidth = (currentStep / 6) * 100;
  return (
    <div className="add_property">
      {loading && (
        <GridLoader
          color="#13ccbb"
          margin={20}
          size={35}
          className="add_pty_loading"
        />
      )}
      <div className="add_pty_hdr">
        <Container>
          <div className="add_pty_hdr_inner">
            <BackButton className="blue" /> <h2>Add New Property</h2>
            <MdAddHomeWork className="add_icon" />
          </div>
        </Container>
      </div>
      <Container>
        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{ width: `${progressBarWidth}%` }}
          ></div>
          <div className="step-titles">
            {stepTitles.map((title, index) => {
              const stepNumber = index + 1;
              const hasErrors = getStepErrors(stepNumber, validationErrors);

              return (
                <span
                  onClick={() => {
                    if (index !== stepTitles.length - 1) {
                      setCurrentStep(index + 1);
                    }
                  }}
                  key={index}
                  className={`step-title ${
                    currentStep === stepNumber ? 'active' : ''
                  } ${hasErrors ? 'error' : ''}`}
                >
                  {title}
                </span>
              );
            })}
          </div>
        </div>
      </Container>
      <div className="add_pty_ctnt">
        <Container>
          <form onSubmit={handleSubmit} className="add_pty_form">
            {currentStep === 1 && (
              <PropertyDetailForm
                formData={formData}
                updateFormData={updateFormData}
                validationErrors={validationErrors}
              />
            )}

            {currentStep === 2 && (
              <PropertyLocationForm
                formData={formData}
                updateFormData={updateFormData}
                validationErrors={validationErrors}
              />
            )}

            {currentStep === 3 && (
              <PropertyRoomsForm
                formData={formData}
                updateFormData={updateFormData}
                validationErrors={validationErrors}
              />
            )}

            {currentStep === 4 && (
              <PropertyInfoForm
                formData={formData}
                updateFormData={updateFormData}
                validationErrors={validationErrors}
              />
            )}
            {currentStep === 5 && (
              <PropertyImageForm
                formData={formData}
                updateFormData={updateFormData}
                validationErrors={validationErrors}
              />
            )}
            {currentStep === 6 && (
              <AddPropertyCheckout
                formData={formData}
                onPaymentSuccess={handleSubmit}
              />
            )}
          </form>
        </Container>

        {error && <ErrorDisplay message={error} />}
      </div>
      <Container>
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
      </Container>
    </div>
  );
};

export default AddProperty;
