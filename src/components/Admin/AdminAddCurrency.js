import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from './Sidebar';

// Styled components for AdminAddCurrency
const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f9f9f9;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Content = styled.div`
  flex-grow: 1;
  margin: 0;
  padding: 2rem;
  background: white;
  margin-top: 4rem; /* Space for header on mobile */

  @media (min-width: 768px) {
    margin-top: 0; /* No top margin needed for larger screens */
  }
`;

const Section = styled.section`
  margin-bottom: 1.5rem;
`;

const Title = styled.h2`
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  color: #333;
  text-align: center; /* Center align the title */
`;

const Paragraph = styled.p`
  color: #666;
  font-size: 1rem;
  text-align: center; /* Center align the paragraph */
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center; /* Center align the form elements */
`;

const Input = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
  max-width: 400px; /* Limit the width of the input fields */
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #0056b3;
  }
`;

const TableContainer = styled.div`
  overflow-y: auto; /* Enable vertical scrolling */
  max-height: 500px; /* Fixed height to make the table scrollable */
  margin: 1.5rem auto; /* Center align the table container */
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse; /* Collapse table borders */

  thead {
    background-color: #f1f1f1;
  }

  th, td {
    padding: 0.75rem;
    text-align: left;
    border: 1px solid #ddd; /* Add border to table cells */
  }

  th {
    font-weight: bold;
    color: #333;
  }

  tbody tr:hover {
    background-color: #f9f9f9;
  }

  @media (max-width: 768px) {
    th, td {
      font-size: 0.875rem;
      padding: 0.5rem;
    }
  }
`;

const EditButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 0.875rem;

  &:hover {
    background-color: #218838;
  }
`;

const DeleteButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 0.875rem;
  margin-left: 0.5rem; /* Space between Edit and Delete buttons */

  &:hover {
    background-color: #c82333;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 4px;
  width: 90%;
  max-width: 500px;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem;
  cursor: pointer;

  &:hover {
    background: #c82333;
  }
`;

const ConfirmButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 0.875rem;
  margin-top: 1rem;

  &:hover {
    background-color: #0056b3;
  }
`;

const SearchInput = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
  max-width: 400px; /* Limit the width of the search box */
  margin-bottom: 1rem; /* Space below the search box */
`;

const AdminAddCurrency = () => {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [name, setName] = useState('');
    const [symbol, setSymbol] = useState('');
    const [rate, setRate] = useState('');
    const [currencies, setCurrencies] = useState([]);
    const [filteredCurrencies, setFilteredCurrencies] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [editingCurrency, setEditingCurrency] = useState(null);
    const [deleteMode, setDeleteMode] = useState(false);
    const [currencyToDelete, setCurrencyToDelete] = useState(null);

    useEffect(() => {
        const Id = localStorage.getItem("Login");
        if (Id !== "Admin") {
            navigate('/admin/login');
        }
    }, [navigate]);

    const handleAddCurrency = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://crypto-anl6.onrender.com/currencies/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Name: name,
                    Symbol: symbol,
                    Rate: rate
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            alert('Currency added successfully');
            setName('');
            setSymbol('');
            setRate('');
            fetchCurrencies(); // Refresh the list after adding a new currency
        } catch (error) {
            console.error('Error adding currency:', error);
            alert('Failed to add currency');
        }
    };

    const fetchCurrencies = async () => {
        try {
            const response = await fetch('https://crypto-anl6.onrender.com/currencies/all');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setCurrencies(data);
            setFilteredCurrencies(data); // Initialize filtered currencies
        } catch (error) {
            console.error('Error fetching currencies:', error);
        }
    };

    const handleEditCurrency = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://crypto-anl6.onrender.com/currencies/put/${editingCurrency._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Name: name,
                    Symbol: symbol,
                    Rate: rate
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            alert('Currency updated successfully');
            setName('');
            setSymbol('');
            setRate('');
            setEditMode(false);
            setEditingCurrency(null);
            fetchCurrencies(); // Refresh the list after updating a currency
        } catch (error) {
            console.error('Error updating currency:', error);
            alert('Failed to update currency');
        }
    };

    const handleDeleteCurrency = async () => {
        try {
            const response = await fetch(`https://crypto-anl6.onrender.com/currencies/del/${currencyToDelete._id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            alert('Currency deleted successfully');
            setDeleteMode(false);
            setCurrencyToDelete(null);
            fetchCurrencies(); // Refresh the list after deleting a currency
        } catch (error) {
            console.error('Error deleting currency:', error);
            alert('Failed to delete currency');
        }
    };

    const openEditModal = (currency) => {
        setEditingCurrency(currency);
        setName(currency.Name);
        setSymbol(currency.Symbol);
        setRate(currency.Rate);
        setEditMode(true);
    };

    const closeEditModal = () => {
        setEditMode(false);
        setEditingCurrency(null);
    };

    const openDeleteModal = (currency) => {
        setCurrencyToDelete(currency);
        setDeleteMode(true);
    };

    const closeDeleteModal = () => {
        setDeleteMode(false);
        setCurrencyToDelete(null);
    };

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = currencies.filter(currency =>
            currency.Name.toLowerCase().includes(query) ||
            currency.Symbol.toLowerCase().includes(query)
        );
        setFilteredCurrencies(filtered);
    };

    useEffect(() => {
        fetchCurrencies(); // Fetch currencies on component mount
    }, []);

    return (
        <DashboardContainer>
            <Sidebar isOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            <Content>
                <Section>
                    <Title>Add Currency</Title>
                    <Paragraph>Here you can add new currencies to the system.</Paragraph>
                    <Form onSubmit={handleAddCurrency}>
                        <Input
                            type="text"
                            placeholder="Currency Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <Input
                            type="text"
                            placeholder="Currency Symbol"
                            value={symbol}
                            onChange={(e) => setSymbol(e.target.value)}
                            required
                        />
                        <Input
                            type="number"
                            step="0.01"
                            placeholder="Currency Rate"
                            value={rate}
                            onChange={(e) => setRate(e.target.value)}
                            required
                        />
                        <Button type="submit">Add Currency</Button>
                    </Form>
                    <Section>
                        <Title>Existing Currencies</Title>
                        <SearchInput
                            type="text"
                            placeholder="Search by Name or Symbol"
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                        <TableContainer>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Symbol</th>
                                        <th>Rate</th>
                                        <th>Actions</th> {/* Add Actions column */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredCurrencies.map((currency) => (
                                        <tr key={currency._id}>
                                            <td>{currency.Name}</td>
                                            <td>{currency.Symbol}</td>
                                            <td>{currency.Rate}</td>
                                            <td>
                                                <EditButton onClick={() => openEditModal(currency)}>Edit</EditButton>
                                                <DeleteButton onClick={() => openDeleteModal(currency)}>Delete</DeleteButton>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </TableContainer>
                    </Section>
                </Section>

                {editMode && (
                    <Modal>
                        <ModalContent>
                            <CloseButton onClick={closeEditModal}>Close</CloseButton>
                            <Title>Edit Currency</Title>
                            <Form onSubmit={handleEditCurrency}>
                                <Input
                                    type="text"
                                    placeholder="Currency Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                                <Input
                                    type="text"
                                    placeholder="Currency Symbol"
                                    value={symbol}
                                    onChange={(e) => setSymbol(e.target.value)}
                                    required
                                />
                                <Input
                                    type="number"
                                    step="0.01"
                                    placeholder="Currency Rate"
                                    value={rate}
                                    onChange={(e) => setRate(e.target.value)}
                                    required
                                />
                                <Button type="submit">Update Currency</Button>
                            </Form>
                        </ModalContent>
                    </Modal>
                )}

                {deleteMode && (
                    <Modal>
                        <ModalContent>
                            <CloseButton onClick={closeDeleteModal}>Close</CloseButton>
                            <Title>Confirm Deletion</Title>
                            <Paragraph>Are you sure you want to delete this currency?</Paragraph>
                            <ConfirmButton onClick={handleDeleteCurrency}>Confirm</ConfirmButton>
                        </ModalContent>
                    </Modal>
                )}
            </Content>
        </DashboardContainer>
    );
};

export default AdminAddCurrency;
