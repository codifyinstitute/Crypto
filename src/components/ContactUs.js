import React, { useState } from "react";
import styled from "styled-components";
import contact from '../assets/contact.png'
import Footer from "./Footer";
import Navbar from "./Navbar";

const ContactUsContainer = styled.div`
  background-color: black;
  color: white;
  padding: 2rem;
  font-family: Arial, sans-serif;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-evenly;
    align-items: flex-start;
  }
`;

const IllustrationSection = styled.div`
  width: 100%;
  max-width: 500px;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    flex: 1;
    margin-right: 2rem;
    margin-bottom: 0;
  }
`;

const Illustration = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Person = styled.div`
  background-image: url(${contact});
  width: 100%;
  height: 0;
  padding-bottom: 60%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const Description = styled.div`
  margin-top: 1rem;
  font-size: 0.9rem;
  line-height: 1.5;
  display: flex;
  justify-content: center;
`;

const Info = styled.p`
  width: 100%;
  text-align: center;
`;

const FormSection = styled.div`
  width: 100%;
  max-width: 500px;

  @media (min-width: 768px) {
    flex: 1;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-top: 10px;
  padding: 0.5rem;
  border: none;
  border-radius: 25px;
  width: 100%;
  height: 40px;
  box-sizing: border-box;
`;

const Label = styled.label`
  margin-bottom: 1.3rem;
`;

const Text = styled.textarea`
  height: 100px;
  margin-top: 10px;
  padding: 0.5rem;
  border: none;
  border-radius: 15px;
  width: 100%;
  box-sizing: border-box;
  resize: vertical;
`;

const ErrorMessage = styled.span`
  color: #ff6b6b;
  font-size: 0.8rem;
  margin-top: 0.2rem;
`;

const SubmitButton = styled.button`
  background-color: #fbbf24;
  color: black;
  border: none;
  padding: 0.5rem;
  border-radius: 25px;
  cursor: pointer;
  font-weight: bold;
  width: 100%;
  max-width: 200px;
  align-self: center;
`;

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number (10 digits required)";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Submit the form
      console.log("Form submitted:", formData);
      // Reset form after submission
      setFormData({ name: "", email: "", phone: "", message: "" });
    }
  };

  return (
    <>
      <Navbar />
      <ContactUsContainer>
        <Title>Contact Us</Title>
        <Content>
          <IllustrationSection>
            <Illustration>
              <Person></Person>
            </Illustration>
            <Description>
              <Info>
                We're here to assist you with any inquiries or concerns you may
                have. Whether you have questions about account registration, deposit
                and withdrawal processes, trading features, or anything else related
                to our platform, our dedicated support team is ready to help.
              </Info>
            </Description>
          </IllustrationSection>
          <FormSection>
            <Form onSubmit={handleSubmit}>
              <Label>
                Name<br />
                <Input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
              </Label>
              <Label>
                Email<br />
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
              </Label>
              <Label>
                Contact no<br />
                <Input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
                {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
              </Label>
              <Label>
                Message<br />
                <Text
                  name="message"
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
                {errors.message && <ErrorMessage>{errors.message}</ErrorMessage>}
              </Label>
              <SubmitButton type="submit">SUBMIT</SubmitButton>
            </Form>
          </FormSection>
        </Content>
      </ContactUsContainer>
      <Footer />
    </>
  );
};

export default ContactUs;