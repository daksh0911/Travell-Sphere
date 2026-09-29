import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';
import GlobalExperienceLayer from './components/common/GlobalExperienceLayer';
import SiteCommandCenter from './components/common/SiteCommandCenter';

function App() {
  return (
    <AuthProvider>
      <GlobalExperienceLayer />
      <BrowserRouter>
        <SiteCommandCenter />
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
