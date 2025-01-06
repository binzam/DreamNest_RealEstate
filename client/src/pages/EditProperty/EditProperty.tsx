import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { axiosPrivate } from '../../api/axiosInstance';
import { PropertyDataType } from '../../types/propertyTypes';
import './EditProperty.css';
import BackButton from '../../components/BackButton/BackButton';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import { MdOutlineBrowserUpdated } from 'react-icons/md';
import axios from 'axios';
import { GridLoader } from 'react-spinners';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import ErrorDisplay from '../../components/ErrorDisplay';
const EditProperty = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useSelector((state: RootState) => state.user);
  const [property, setProperty] = useState<PropertyDataType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const response = await axiosPrivate.get(`/properties/list/${id}`);
        // if (response.data.owner !== user?._id) {
        //   return navigate('/manage-properties');
        // }
        setProperty(response.data);
      } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
          return setError(
            error.response?.data?.message || 'Failed to fetch property details'
          );
        }
        setError('Failed to fetch property details');
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id, navigate, user?._id]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axiosPrivate.put(
        `/properties/list/${id}/update`,
        property
      );
      console.log(response);

      if (response.status === 200) {
        navigate('/manage-properties/my-properties', {
          state: { message: 'Property updated successfully!' },
        });
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        return setError(
          error.response?.data?.message || 'Failed to update property'
        );
      }
      setError('Failed to update property');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProperty((prev) => ({
      ...prev!,
      [name]: value,
    }));
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProperty((prev) => ({
      ...prev!,
      address: {
        ...prev!.address,
        [name]: value,
      },
    }));
  };

  return (
    <div className="edit_pty_page">
      <div className="edit_pty_hdr">
        <BackButton />

        <h2>Edit Property</h2>
      </div>
      <div className="edit_pty_cntnt">
        {property && <PropertyCard property={property} />}
        {loading ? (
          <GridLoader
            color="#13ccbb"
            margin={40}
            size={35}
            className="edit_pty_loading"
          />
        ) : error ? (
          <ErrorDisplay message={error} />
        ) : (
          <form onSubmit={handleSubmit} className="edit_property_form">
            <div className="edit_form_cntnt">
              <div className="edit_frm_grp">
                <label>
                  Address - Street:
                  <input
                    type="text"
                    name="street"
                    value={property?.address?.street || ''}
                    onChange={handleAddressChange}
                  />
                </label>

                <label>
                  Address - City:
                  <input
                    type="text"
                    name="city"
                    value={property?.address?.city || ''}
                    onChange={handleAddressChange}
                  />
                </label>

                <label>
                  Address - State:
                  <input
                    type="text"
                    name="state"
                    value={property?.address?.state || ''}
                    onChange={handleAddressChange}
                  />
                </label>

                <label>
                  Address - Country:
                  <input
                    type="text"
                    name="country"
                    value={property?.address?.country || ''}
                    onChange={handleAddressChange}
                  />
                </label>
              </div>
              <div className="edit_frm_grp">
                <label>
                  Bedrooms:
                  <input
                    type="number"
                    name="bed"
                    value={property?.bed || ''}
                    onChange={handleChange}
                  />
                </label>

                <label>
                  Bathrooms:
                  <input
                    type="number"
                    name="bath"
                    value={property?.bath || ''}
                    onChange={handleChange}
                  />
                </label>

                <label>
                  Square Footage:
                  <input
                    type="number"
                    name="sqft"
                    value={property?.sqft || ''}
                    onChange={handleChange}
                  />
                </label>

                <label>
                  Year Built:
                  <input
                    type="number"
                    name="yearBuilt"
                    value={property?.yearBuilt || ''}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="edit_frm_grp">
                <label>
                  Title:
                  <input
                    type="text"
                    name="title"
                    value={property?.title || ''}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Description:
                  <textarea
                    name="detail"
                    value={property?.detail || ''}
                    onChange={handleChange}
                  ></textarea>
                </label>

                <label>
                  Property Type:
                  <input
                    type="text"
                    name="propertyType"
                    value={property?.propertyType || ''}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Price:
                  <input
                    type="number"
                    name="price"
                    value={property?.price || ''}
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>

            <button className="update_pty_btn" type="submit">
              <MdOutlineBrowserUpdated /> Update Property
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditProperty;
