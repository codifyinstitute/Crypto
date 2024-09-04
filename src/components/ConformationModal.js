// src/components/Modal.js
import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

// Keyframe animation for the check mark
const checkMarkAnimation = keyframes`
  0% {
    stroke-dasharray: 100;
    stroke-dashoffset: 100;
    opacity: 0;
  }
  50% {
    stroke-dasharray: 100;
    stroke-dashoffset: 0;
    opacity: 1;
  }
  100% {
    stroke-dasharray: 100;
    stroke-dashoffset: 0;
    opacity: 1;
  }
`;

// Container for the success message and animation
const SuccessContainer = styled.div`
 
  width: 100%;
  background-color: #dff0d8;
  border-radius: 10px;
  padding: 20px;

`;

const SuccessCenter = styled.div`
font-size: 20px;
display: flex;
justify-content: center;
`


// Styled check mark
const CheckMark = styled.svg`
  width: 80px;
  height: 80px;
  stroke: #4caf50;
  stroke-width: 5;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  animation: ${checkMarkAnimation} 3s ease forwards;
`;

// Success message text
const SuccessMessage = styled.div`
  font-size: 20px;
  color: #4caf50;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
  font-size: 15px;

  } 
`;


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
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Header = styled.h2`
  margin: 0 0 20px;
`;

const Button = styled.button`
  background-color: #f7a600;
  color: black;
  font-weight: 700;
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



const Modal = ({ title,
   message,
    onConfirm, 
    onCancel,
     showDoneButton }) => (
    <Overlay>
        <ModalContainer>
            <Header>{title}</Header>
            <div style={{display:"flex",justifyContent:"center", width: "80%", maxWidth:"500px"}}>
            {showDoneButton ? (
              <SuccessContainer>
                <SuccessCenter>
              <CheckMark viewBox="0 0 24 24">
                <path d="M5 13l4 4L19 7" />
              </CheckMark>
              </SuccessCenter>
              <SuccessMessage>{message}</SuccessMessage>
            </SuccessContainer>
                ) : null}
            </div>
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
