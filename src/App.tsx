import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { WorkProvider } from './context/WorkContext';

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <WorkProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </WorkProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
