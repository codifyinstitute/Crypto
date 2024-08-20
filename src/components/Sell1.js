import React from 'react';
import styled from 'styled-components';
import Footer from './Footer';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import HomeContact from './HomeContact';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #1e1e1e;

  color: white;
  /* min-height: 100vh; */
`;

const Card = styled.div`
  background-color: white;
  color: black;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  width: 100%;
  margin-top: 4%;
  max-width: 350px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  color: #ffa500;
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const Label = styled.label`
  font-size: 0.9rem;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  appearance: none;
  background: url('data:image/svg+xml;utf8,<svg fill="%23000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>') no-repeat;
  background-position: right 10px center;
`;

const Button = styled.button`
  background-color: #ffa500;
  color: white;
  padding: 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  margin-top: 10px;
`;

const ExchangeCard = styled(Card)`
  background-color: #2e2e2e;
  color: white;
`;

const ExchangeTitle = styled.h1`
  font-size: 3rem;
  margin: 0;
`;

const ExchangeSubtitle = styled.p`
  font-size: 1rem;
  margin: 5px 0 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #444;
`;

const TableCell = styled.td`
  padding: 10px 0;
  font-size: 0.9rem;
`;

const ContactSection = styled.div`
  text-align: center;
  /* max-width: 600px; */
`;

const Sell1 = () => {
  return (
    <>
    <Navbar/>
    <Container>
      <Card>
        <Title>Sell Crypto</Title>
        <Form>
          <InputGroup>
            <Label>You pay</Label>
            <Input type="number" placeholder="25174.13" />
            <Select>
              <option>INR</option>
            </Select>
          </InputGroup>
          <InputGroup>
            <Label>You receive (estimate)</Label>
            <Input type="number" placeholder="11934.9" />
            <Select>
              <option>BCH</option>
            </Select>
          </InputGroup>
          <Link to='/Sell2'><Button>Review Order</Button></Link>
        </Form>
      </Card>

      <ExchangeCard>
        <ExchangeTitle>93</ExchangeTitle>
        <ExchangeSubtitle>1USDT=93</ExchangeSubtitle>
        <Table>
          <tbody>
            <TableRow>
              <TableCell>&gt;1075.27 and&lt;2150.54</TableCell>
              <TableCell>93+0.25</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>&gt;2150.54 and&lt;3225.81</TableCell>
              <TableCell>93+0.5</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>&gt;3225.81</TableCell>
              <TableCell>93+1</TableCell>
            </TableRow>
          </tbody>
        </Table>
      </ExchangeCard>

     <HomeContact/>
    </Container>
    <Footer/>
    </>
  );
};

export default Sell1;