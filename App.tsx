
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout.tsx';
import LandingPage from './pages/LandingPage.tsx';
import InputPage from './pages/InputPage.tsx';
import ResponsePage from './pages/ResponsePage.tsx';
import { UserInput } from './types.ts';

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