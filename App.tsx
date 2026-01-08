
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import LandingPage from './pages/LandingPage';
import InputPage from './pages/InputPage';
import ResponsePage from './pages/ResponsePage';
import { UserInput } from './types';

const App: React.FC = () => {
  const [inputData, setInputData] = useState<UserInput | null>(null);

  const handleInputSubmit = (data: UserInput) => {
    setInputData(data);
  };

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/input" element={<InputPage onSubmit={handleInputSubmit} />} />
          <Route path="/reflection" element={<ResponsePage inputData={inputData} />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
