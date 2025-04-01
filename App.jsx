import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Home from './components/Home';
import PhoneVerification from './components/PhoneVerification';
import Verification from './components/Verification';
import CardSelection from './components/CardSelection';
import CardDetails from './components/CardDetails';
import VerificationProcessing from './components/VerificationProcessing';
import ReceiverDetails from './components/ReceiverDetails';
import About from './components/About';
import TransactionProcessing from './components/TransactionProcessing';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const App = () => {
  return (
    <BrowserRouter>
      <AppContainer>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/phone-verification" element={<PhoneVerification />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/card-selection" element={<CardSelection />} />
          <Route path="/card-details" element={<CardDetails />} />
          <Route path="/verification-processing" element={<VerificationProcessing />} />
          <Route path="/receiver-details" element={<ReceiverDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/transaction-processing" element={<TransactionProcessing />} />
        </Routes>
      </AppContainer>
    </BrowserRouter>
  );
};

export default App;
