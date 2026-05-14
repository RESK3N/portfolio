import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPortfolio from './components/MainPortfolio';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './components/admin/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPortfolio />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          {/* We will add more admin sub-routes here like manage projects */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
