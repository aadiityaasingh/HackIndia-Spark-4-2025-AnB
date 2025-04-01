import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  padding: 2rem;
`;

const ProcessingCard = styled.div`
  background: white;
  border-radius: 24px;
  padding: 3rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  text-align: center;
  animation: ${fadeIn} 0.5s ease-out;
  max-width: 400px;
  width: 100%;
`;

const LoadingSpinner = styled.div`
  width: 80px;
  height: 80px;
  border: 4px solid #e0f2fe;
  border-top: 4px solid #0ea5e9;
  border-radius: 50%;
  animation: ${rotate} 1s linear infinite;
  margin: 0 auto 2rem;
`;

const Icon = styled.div`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  animation: ${pulse} 2s infinite;
`;

const Title = styled.h2`
  color: #0f172a;
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const Message = styled.p`
  color: #475569;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const CardInfo = styled.div`
  background: #f8fafc;
  border-radius: 12px;
  padding: 1rem;
  margin-top: 2rem;
  border: 1px solid #e2e8f0;
`;

const CardType = styled.div`
  color: #64748b;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 0.5rem;
`;

const LastFourDigits = styled.div`
  color: #0f172a;
  font-size: 1.2rem;
  font-weight: 600;
  font-family: monospace;
`;

const VerificationProcessing = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cardType, lastFourDigits } = location.state || {};

  useEffect(() => {
    // Redirect to receiver details after 3 seconds
    const timer = setTimeout(() => {
      navigate('/receiver-details', {
        state: { cardType, lastFourDigits }
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate, cardType, lastFourDigits]);

  return (
    <Container>
      <ProcessingCard>
        <LoadingSpinner />
        <Icon>🔒</Icon>
        <Title>Verifying Your Card</Title>
        <Message>
          Please wait while we securely verify your card information...
        </Message>
        <CardInfo>
          <CardType>{cardType} Card</CardType>
          <LastFourDigits>**** **** **** {lastFourDigits}</LastFourDigits>
        </CardInfo>
      </ProcessingCard>
    </Container>
  );
};

export default VerificationProcessing; 