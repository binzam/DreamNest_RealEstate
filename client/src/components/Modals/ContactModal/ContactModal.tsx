import React, { useState } from 'react';
import './ContactModal.css';
import { FaXmark } from 'react-icons/fa6';
import { ContactFormData } from '../../../types/propertyTypes';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
interface ContactModalProps {
  propertyImage: string;
  propertyAddress: string;
  onClose: () => void;
}
const ContactModal: React.FC<ContactModalProps> = ({
  propertyImage,
  propertyAddress,
  onClose,
}) => {
  const  email  = useSelector((state: RootState) => state.user.user?.email);
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: `${email}`,
    phone: '',
    message: `I am interested in ${propertyAddress}...`,
  });

  const [error, setError] = useState<string>('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { fullName, email } = formData;

    if (!fullName || !email) {
      setError('Please fill in all required fields.');
      return;
    }

    setError('');
    console.log(formData);
    
    onClose();
  };

  return (
    <div className="contact_modal_overlay">
      <div className="modal_content">
        <div className="contact_hdr">
          <h2>Contact Property</h2>
          <button
            type="button"
            className="close_contact_modal"
            onClick={onClose}
          >
            <FaXmark />
          </button>
        </div>
        <div className="contact_pty_img">
          <img src={propertyImage} alt={propertyAddress} />
        </div>
        <form onSubmit={handleSubmit} className="contact_form">
          <label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name *"
              required
            />
          </label>
          <label>
            <input
              type="email"
              name="email"
              placeholder="Email *"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            <input
              type="tel"
              name="phone"
              placeholder="Phone *"
              value={formData.phone}
              onChange={handleChange}
            />
          </label>
          <label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Ask a question"
            />
          </label>
          {error && <p className="error_message">{error}</p>}
          <button type="submit" className="contact_submit_btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactModal;
