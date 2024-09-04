import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navbar from "./Navbar";
import Footer from "./Footer";
import HomeContact from "./HomeContact";
import { ChevronLeft } from "lucide-react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: black;
  @media (max-width: 480px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const FormWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 20px;
`;

const FormContainer = styled.div`
  background-color: white;
  color: white;
  padding: 2rem;
  border-radius: 0.5rem;
  width: 380px;
  height: 610px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  margin-top: 10%;


  @media (max-width: 480px) {
    padding: 1rem;
    width: auto;
    height: auto;
  }
`;

const FormTitle = styled.h2`
  color: #f7a600;
  margin-top: 0;
  font-size: 1.9rem;
  text-align: center;
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
  justify-content: space-between;
`;

const Tab = styled.div`
  padding: 0.5rem 0;
  margin-left:8px;
  color: orange;
  border-bottom: 2px solid orange;
  cursor: pointer;
  font-size: 18px;
`;

const FormSection = styled.div`
  h3 {
    color: orange;
    margin-bottom: 0.5rem;
    font-size: 18px;
    font-weight: 500;
    margin: 8px auto;
  }
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.25rem;
  font-size: 0.9rem;
  color: #666;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  margin-bottom: 1rem;
  box-sizing: border-box;
`;

const FormButton = styled.button`
  background-color: #f7a600;
  color: white;
  border: none;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  margin-top: 1rem;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};

  &:hover {
    background-color: #e69500;
  }
`;

const Button = styled.button`
  background-color: #f7a600;
  color: white;
  border: none;
  padding: 10px;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};

  &:hover {
    background-color: #e69500;
  }
`;

const FormWarning = styled.p`
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 0.5rem;
`;

const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 480px) {
    width: 100%;
  }
`;

const CardsSection = styled.div`
  width: 100%;
  border-radius: 1rem;
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
  margin-bottom: 2%;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const Card = styled.div`
  width: 480px;
  background-color: ${({ selected }) => (selected ? "#f7a600" : "white")};
  color: ${({ selected }) => (selected ? "white" : "#333")};
  border: 2px solid ${({ selected }) => (selected ? "#f7a600" : "#ccc")};
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  font-family: Arial, sans-serif;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, border 0.3s;

  &:hover {
    background-color: ${({ selected }) => (selected ? "#e69500" : "#f7a600")};
    color: ${({ selected }) => (selected ? "white" : "#fff")};
    border-color: ${({ selected }) => (selected ? "#e69500" : "#e69500")};
  }
`;

const CardTitle = styled.h4`
  margin-right: 1rem;
  color: inherit;
  cursor: pointer;
  font-size: 18px;
  padding: 0.3rem 0;
  border-bottom: 2px solid inherit;
  width: fit-content;
  font-weight: 500;
  margin-bottom: 1%;
`;

const Crosss = styled.p`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const BackButton = styled.button`
  background-color: transparent;
  color: #ffa500;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  /* z-index: 1001; */
  width: fit-content;
  margin: 0 5px 0 0;
  display: flex;
  align-items: center;

  @media (max-width: 1024px) {
    display: block;
  }

  @media (max-width: 430px) {
    font-size: 14px;
    top: 10px;
    left: 10px;
  }
`;

const Sell3 = () => {
  const navigate = useNavigate();
  const [accountHolder, setAccountHolder] = useState("");
  const [country, setCountry] = useState("India");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [form, setForm] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    validateForm();
  }, [accountHolder, country, bankName, accountNumber, ifsc]);

  const fetchData = async () => {
    const email = localStorage.getItem("token");

    if (!email) {
      console.error("No email found in local storage");
      return;
    }

    try {
      const response = await axios.get(
        `https://crypto-anl6.onrender.com/users/get/${email}`
      );
      const user = response.data;

      if (user.Accounts.length > 0) {
        setAccounts(user.Accounts);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const validateForm = () => {
    const isValid =
      /^[A-Za-z\s]+$/.test(accountHolder.trim()) &&
      country.trim() !== "" &&
      /^[A-Za-z\s]+$/.test(bankName.trim()) &&
      /^\d{15}$/.test(accountNumber.trim()) &&
      /^[A-Z0-9]+$/.test(ifsc.trim());
    setIsFormValid(isValid);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const email = localStorage.getItem("token");

    if (!email) {
      console.error("No email found in local storage");
      return;
    }

    const accountData = {
      Name: accountHolder,
      Country: country,
      BankName: bankName,
      AccountNumber: accountNumber,
      IFSC: ifsc,
    };

    try {
      await axios.put(
        `https://crypto-anl6.onrender.com/users/put/${email}/accounts`,
        accountData
      );
      toast.success("Account data successfully submitted");
      setAccountHolder("");
      setCountry("India");
      setBankName("");
      setAccountNumber("");
      setIfsc("");
      fetchData();
    } catch (error) {
      toast.error("Error submitting account data");
      console.error("Error submitting account data:", error);
    }
  };

  const handleCardClick = (account) => {
    setSelectedAccount(account);

    const existingTransactionDetails =
      JSON.parse(localStorage.getItem("transactionDetails")) || {};

    const updatedTransactionDetails = {
      ...existingTransactionDetails,
      Name: account.Name,
      Country: account.Country,
      BankName: account.BankName,
      AccountNumber: account.AccountNumber,
      IFSC: account.IFSC,
    };

    localStorage.setItem(
      "transactionDetails",
      JSON.stringify(updatedTransactionDetails)
    );
    navigate("/sell4");
  };

  const AddAccount = () => {
    setForm(!form);
  };

  const handleAccountHolderChange = (e) => {
    const value = e.target.value.replace(/[^A-Za-z\s]/g, "");
    setAccountHolder(value);
  };

  const handleBankNameChange = (e) => {
    const value = e.target.value.replace(/[^A-Za-z\s]/g, "");
    setBankName(value);
  };

  const handleAccountNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 15);
    setAccountNumber(value);
  };

  const handleIfscChange = (e) => {
    const value = e.target.value
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "")
      .slice(0, 11);
    setIfsc(value);
  };

  return (
    <>
      <PageContainer>
        <Navbar />
        <ToastContainer />

        <FormWrapper>
          <FormContainer>
            <TabContainer>
              <BackButton onClick={() => window.history.back()}>
                {" "}
                <ChevronLeft />{" "}
              <Tab active>Accounts</Tab>
              </BackButton>
              {form ? (
                <Button onClick={AddAccount}>Choose Account</Button>
              ) : (
                <Button onClick={AddAccount}>Add Account +</Button>
              )}
            </TabContainer>

            {form ? (
              <form onSubmit={handleFormSubmit}>
                <FormSection>
                  <h3>Personal Information</h3>
                  <FormLabel>Account Holder</FormLabel>
                  <FormInput
                    value={accountHolder}
                    onChange={handleAccountHolderChange}
                    placeholder="Please enter your full name"
                  />

                  <FormLabel>Country</FormLabel>
                  <FormInput
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="Choose your country"
                    readOnly
                  />
                </FormSection>

                <FormSection>
                  <h3>Account Information</h3>
                  <FormLabel>Bank Name</FormLabel>
                  <FormInput
                    value={bankName}
                    onChange={handleBankNameChange}
                    placeholder="Enter Your Bank Name"
                  />

                  <FormLabel>Account Number</FormLabel>
                  <FormInput
                    value={accountNumber}
                    onChange={handleAccountNumberChange}
                    placeholder="Enter Your Account Number"
                    maxLength={15}
                  />

                  <FormLabel>IFSC</FormLabel>
                  <FormInput
                    value={ifsc}
                    onChange={handleIfscChange}
                    placeholder="Enter Your IFSC"
                  />
                </FormSection>

                <FormWarning>
                  Attention: Please ensure the bank account belongs to you and
                  the information is accurate.
                </FormWarning>

                <FormButton type="submit" disabled={!isFormValid}>
                  Proceed To Pay
                </FormButton>
              </form>
            ) : (
              <CardsContainer>
                <FormTitle>Choose Account</FormTitle>
                <CardsSection>
                  {accounts.map((account, index) => (
                    <Card
                      key={index}
                      selected={
                        selectedAccount?.AccountNumber === account.AccountNumber
                      }
                      onClick={() => handleCardClick(account)}
                    >
                      <CardTitle>Account {index + 1}</CardTitle>
                      <Crosss>
                        <strong>Account Number:</strong> {account.AccountNumber}
                      </Crosss>
                      <Crosss>
                        <strong>IFSC:</strong> {account.IFSC}
                      </Crosss>
                    </Card>
                  ))}
                </CardsSection>
              </CardsContainer>
            )}
          </FormContainer>
        </FormWrapper>
      </PageContainer>
      <HomeContact />
      <Footer />
    </>
  );
};

export default Sell3;
