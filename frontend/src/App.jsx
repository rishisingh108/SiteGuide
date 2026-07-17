import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/DashboardLayout';
import DashboardOverview from './pages/DashboardOverview';
import ProjectList from './pages/ProjectList';
import CostEstimator from './pages/CostEstimator';
import AppScheduler from './pages/AppScheduler';
import AICopilot from './pages/AICopilot';
import MapDashboard from './pages/MapDashboard';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />

        {/* Dashboard Routes with Sidebar & Navbar — require login */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardOverview />} />
          <Route path="projects" element={<ProjectList />} />
          <Route path="cost-estimator" element={<CostEstimator />} />
          <Route path="scheduler" element={<AppScheduler />} />
          <Route path="ai-copilot" element={<AICopilot />} />
          <Route path="map" element={<MapDashboard />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
