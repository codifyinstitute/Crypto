// src/components/Modal.js
import React from 'react';
import styled from 'styled-components';
import pic from "../assets/Success.gif"

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: #ecedf0;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 500px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Header = styled.h2`
  margin: 0 0 20px;
`;

const Button = styled.button`
  background-color: #f7a600;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;

  &:hover {
    background-color: #e69500;
  }
`;

const CancelButton = styled(Button)`
  background-color: #ccc;
  color: black;

  &:hover {
    background-color: #bbb;
  }
`;

const Modal = ({ title, message, onConfirm, onCancel, showDoneButton }) => (
    <Overlay>
        <ModalContainer>
            <Header>{title}</Header>
            <div style={{display:"flex",justifyContent:"center"}}>
            {showDoneButton ? (
                    <img src={pic} alt="Success" height="200px"/>
                ) : null}
            </div>
            <p style={{display:"flex",justifyContent:"center"}}>{message}</p>
            <div style={{display:"flex",justifyContent:"center", marginTop:"1rem"}}>
                {showDoneButton ? (
                    <Button onClick={onConfirm}>Done</Button>
                ) : (
                    <>
                        <Button onClick={onConfirm}>Confirm</Button>
                        <CancelButton onClick={onCancel}>Cancel</CancelButton>
                    </>
                )}
            </div>
        </ModalContainer>
    </Overlay>
);

export default Modal;
