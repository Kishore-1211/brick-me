import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { WorkProvider } from './context/WorkContext';
import { SiteProvider } from './context/SiteContext';

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <SiteProvider>
          <WorkProvider>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </WorkProvider>
        </SiteProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
