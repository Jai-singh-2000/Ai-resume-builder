import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import DashboardLayout from './components/layout/DashboardLayout';

// Pages & Components
import Login from './pages/Login';
import Analyze from './pages/Analyze';
import ProtectedRoute from './context/ProtectedRoute';

// Mock Pages for now
const History = () => <div className="p-6"><h1 className="text-2xl font-bold">Analysis History</h1><p>Your previous resumes will appear here.</p></div>;
const Profile = () => <div className="p-6"><h1 className="text-2xl font-bold">User Profile</h1></div>;

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes (Require Login) */}
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              {/* This is your main workspace */}
              <Route path="/" element={<div>Dashboard</div>} />
              <Route path="/analyze" element={<Analyze />} />
              <Route path="/history" element={<History />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;