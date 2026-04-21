import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import ProgramOptimization from './pages/ProgramOptimization';
import Summary from './pages/Summary';
import Engagement from './pages/Engagement';
import ROI from './pages/ROI';
import Employees from './pages/Employees';
import Rewards from './pages/Rewards';
import Feedback from './pages/Feedback';
import Settings from './pages/Settings';
import Reports from './pages/Reports';

// Placeholder components for routes we haven't built yet
const Placeholder = ({ title }) => (
  <div>
    <h1 className="text-xl font-bold mb-4">{title}</h1>
    <div className="card">
      <p>This page is under construction as part of the implementation phase.</p>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="summary" element={<Summary />} />
          <Route path="engagement" element={<Engagement />} />
          <Route path="roi" element={<ROI />} />
          <Route path="optimization" element={<ProgramOptimization />} />

          {/* Admin Routes */}
          <Route path="employees" element={<Employees />} />
          <Route path="rewards" element={<Rewards />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
          <Route path="feedback" element={<Feedback />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
