import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './EditProperty.css';
import BackButton from '../../components/BackButton/BackButton';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import { MdOutlineBrowserUpdated } from 'react-icons/md';
import ErrorDisplay from '../../components/ErrorDisplay/ErrorDisplay';
import { useFetchPropertyById } from '../../hooks/useProperties';
import { useUpdateProperty } from '../../hooks/useManageProperties';
import { PhotoType, PropertyEditFormData } from '../../types/propertyTypes';
import MessageDisplay from '../../components/MessageDisplay/MessageDisplay';
import { axiosPrivate } from '../../api/axiosInstance';
import { Loader } from '../../components/Loader';
import Container from '../../components/Container/Container';
import { FaEdit } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa6';
import BackToTopButton from '../../components/BackToTopButton/BackToTopButton';

interface EditPropertyProps {
  isAdminView?: boolean;
}

const EditProperty = ({ isAdminView = false }: EditPropertyProps) => {
  const { id } = useParams<{ id: string }>();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const navigate = useNavigate();

  const {
    data: property,
    isLoading,
    isError,
    error,
  } = useFetchPropertyById(id!);
  const [formData, setFormData] = useState<PropertyEditFormData | null>(null);
  const [currentImages, setCurrentImages] = useState<PhotoType[]>([]);
  const [newImages, setNewImages] = useState<
    { title: string; image: File; previewUrl: string }[]
  >([]);

  const updatePropertyMutation = useUpdateProperty(id!);
  useEffect(() => {
    if (property) {
      setFormData(property);
      setCurrentImages(property.photos);
    }
  }, [property]);
  const handleDeleteImage = (index: number) => {
    setCurrentImages((prev) => prev.filter((_, i) => i !== index));
  };
  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const previewUrl = URL.createObjectURL(file);
    setNewImages((prev) => [...prev, { title: ``, image: file, previewUrl }]);
  };
  const handleImageTitleChange = (index: number, title: string) => {
    setNewImages((prev) =>
      prev.map((img, i) => (i === index ? { ...img, title } : img))
    );
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;
    setUpdateLoading(true);
    const uploadedPhotos = await uploadImages(newImages);

    console.log('uploadedPhotos-->', uploadedPhotos);
    const updatedFormData = {
      ...formData,
      photos: [...currentImages, ...uploadedPhotos],
    };
    updatePropertyMutation.mutate(updatedFormData, {
      onSuccess: () => {
        setUpdateLoading(false);

        setSuccessMessage('Property updated successfully!');
        setTimeout(() => {
          if (isAdminView) {
            navigate(-1);
          } else {
            navigate('/manage-properties/my-properties');
          }
        }, 2000);
      },
      onError: (error) => {
        if (error instanceof Error) {
          setSuccessMessage(null);
        }
      },
    });
  };

  const uploadImages = async (
    images: { title: string; image: File; previewUrl: string }[]
  ): Promise<PhotoType[]> => {
    const formData = new FormData();
    images.forEach((photo, index) => {
      formData.append(
        `photos${index}[title]`,
        photo.title || `New image ${index}`
      );
      formData.append('photos', photo.image);
    });

    try {
      const response = await axiosPrivate.post(
        `/properties/list/${id}/upload-images`,

        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log(response);
      return response.data.photos;
    } catch (error) {
      console.error('Error uploading images:', error);
      return [];
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev!,
      [name]: value,
    }));
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev!,
      address: {
        ...prev!.address,
        [name]: value,
      },
    }));
  };
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="edit_pty_page">
      <div className="edit_pty_hdr">
        <Container>
          <div className="edit_pty_hdr_inner">
            <BackButton className="black" />
            <div className="hdr_flex">
              <FaEdit />
              <h2>Edit Property</h2>
            </div>
          </div>
        </Container>
      </div>
      <MessageDisplay message={successMessage} setMessage={setSuccessMessage} />
      {isError && <ErrorDisplay message={error.message} />}
      <Container>
        <div className="edit_pty_cntnt">
          {updateLoading && <Loader />}
          {property && <PropertyCard adminMode property={property} />}
      <div className="pty_preview_small">
        <img src={formData?.photos[0].image} alt="" />
      </div>
          <form onSubmit={handleSubmit} className="edit_property_form">
            <div className="edit_form_cntnt">
              <div className="edit_row">
                <div className="edit_frm_grp">
                  <label className="edit_label first">
                    Street
                    <input
                      type="text"
                      name="street"
                      value={formData?.address?.street || ''}
                      onChange={handleAddressChange}
                    />
                  </label>

                  <label className="edit_label first">
                    City
                    <input
                      type="text"
                      name="city"
                      value={formData?.address?.city || ''}
                      onChange={handleAddressChange}
                    />
                  </label>

                  <label className="edit_label first">
                    State
                    <input
                      type="text"
                      name="state"
                      value={formData?.address?.state || ''}
                      onChange={handleAddressChange}
                    />
                  </label>

                  <label className="edit_label first">
                    Country
                    <input
                      type="text"
                      name="country"
                      value={formData?.address?.country || ''}
                      onChange={handleAddressChange}
                    />
                  </label>
                </div>
                <div className="edit_frm_grp">
                  <label className="edit_label first">
                    Bedrooms
                    <input
                      type="number"
                      name="bed"
                      value={formData?.bed || ''}
                      onChange={handleChange}
                    />
                  </label>

                  <label className="edit_label first">
                    Bathrooms
                    <input
                      type="number"
                      name="bath"
                      value={formData?.bath || ''}
                      onChange={handleChange}
                    />
                  </label>

                  <label className="edit_label first">
                    Square Footage
                    <input
                      type="number"
                      name="sqft"
                      value={formData?.sqft || ''}
                      onChange={handleChange}
                    />
                  </label>
                  <label className="edit_label first">
                    Size unit
                    <select
                      id="sizeUnit"
                      className="edit_size_select"
                      name="sizeUnit"
                      value={formData?.sizeUnit || 'sqft'}
                      onChange={handleChange}
                    >
                      <option value="sqft">Square Feet</option>
                      <option value="sqm">Square Meters</option>
                    </select>
                  </label>
                </div>
              </div>

              <div className="edit_row_second">
                <div className="edit_col">
                  <label className="edit_label full">
                    Title
                    <input
                      type="text"
                      name="title"
                      value={formData?.title || ''}
                      onChange={handleChange}
                    />
                  </label>
                  <label className="edit_label full">
                    Year Built
                    <input
                      type="number"
                      name="yearBuilt"
                      value={formData?.yearBuilt || ''}
                      onChange={handleChange}
                    />
                  </label>
                  <label className="edit_label full">
                    Price
                    <input
                      type="number"
                      name="price"
                      value={formData?.price || ''}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <div className="edit_col">
                  <label className="edit_label textarea">
                    Description
                    <textarea
                      name="detail"
                      value={formData?.detail || ''}
                      onChange={handleChange}
                    ></textarea>
                  </label>
                </div>
              </div>
            </div>

            <div className="edit_frm_grp imgs">
              {currentImages.map((photo, index) => {
                return (
                  <div className="edit_photo" key={index}>
                    <p>{photo.title}</p>
                    <img src={photo.image} alt={photo.title} />
                    <button
                      type="button"
                      onClick={() => handleDeleteImage(index)}
                      className="delete_photo_btn"
                    >
                      Delete
                    </button>
                  </div>
                );
              })}
              {newImages.map((newImage, index) => (
                <div className="edit_photo" key={`new-${index}`}>
                  <input
                    type="text"
                    value={newImage.title}
                    onChange={(e) =>
                      handleImageTitleChange(index, e.target.value)
                    }
                    placeholder="insert image title"
                  />
                  <img src={newImage.previewUrl} alt={newImage.title} />
                </div>
              ))}
            </div>
            <div className="edit_frm_grp">
              <label className="edit_label add_img">
                <FaPlus /> Add Image
                <input
                  className="file_input"
                  type="file"
                  accept="image/*"
                  onChange={handleAddImage}
                />
              </label>
            </div>
            <div className="row_center">
              <label className="edit_label checkbox">
                <input
                  className="chkbox"
                  type="checkbox"
                  name="isAvailable"
                  checked={formData?.isAvailable ?? true}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev!,
                      isAvailable: e.target.checked,
                    }))
                  }
                />
                <span className="edit_available">
                  <p> Property is Available?</p>
                  <small>
                    Checked is <strong>Yes</strong>
                  </small>
                </span>
              </label>
              {isAdminView && (
                <label className="edit_label checkbox">
                  <input
                    className="chkbox"
                    type="checkbox"
                    name="isAvailable"
                    checked={formData?.priority === 'featured' ? true : false}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev!,
                        priority: e.target.checked ? 'featured' : 'standard',
                      }))
                    }
                  />
                  <span className="edit_available">
                    <p> Property is featured?</p>
                    <small>
                      Checked is <strong>Yes</strong>
                    </small>
                  </span>
                </label>
              )}
            </div>

            <button disabled={updateLoading} className="update_pty_btn" type="submit">
              <MdOutlineBrowserUpdated />{' '}
              {updateLoading ? 'Updating....' : ' Update Property'}
            </button>
          </form>
        </div>
        <BackToTopButton />
      </Container>
    </div>
  );
};

export default EditProperty;
