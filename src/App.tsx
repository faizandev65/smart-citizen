import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

// Layouts
import { PublicLayout } from './layouts/PublicLayout';
import { CitizenLayout } from './layouts/CitizenLayout';
import { AdminLayout } from './layouts/AdminLayout';

// Public Pages
import { HomePage } from './pages/public/HomePage';
import { ServicesPage } from './pages/public/ServicesPage';
import { HowItWorksPage } from './pages/public/HowItWorksPage';
import { StatisticsPage } from './pages/public/StatisticsPage';
import { CitizenHelpPage } from './pages/public/CitizenHelpPage';
import { TrackComplaintPage } from './pages/public/TrackComplaintPage';
import { LoginPage } from './pages/public/LoginPage';
import { RegisterPage } from './pages/public/RegisterPage';
import { ForgotPasswordPage } from './pages/public/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/public/ResetPasswordPage';
import { SubmitComplaintPage } from './pages/public/SubmitComplaintPage';
import { RequestServicePage } from './pages/public/RequestServicePage';

// Citizen Pages
import { CitizenDashboardPage } from './pages/citizen/CitizenDashboardPage';
import { MyComplaintsPage } from './pages/citizen/MyComplaintsPage';
import { ComplaintDetailsPage } from './pages/citizen/ComplaintDetailsPage';
import { MyServiceRequestsPage } from './pages/citizen/MyServiceRequestsPage';
import { CitizenProfilePage } from './pages/citizen/CitizenProfilePage';
import { NotificationsPage } from './pages/citizen/NotificationsPage';

// Admin Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminComplaintsPage } from './pages/admin/AdminComplaintsPage';
import { AdminServicesPage } from './pages/admin/AdminServicesPage';

export function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <BrowserRouter>
          <Routes>
            
            {/* 1. Public Pages (PublicLayout) */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/how-it-works" element={<HowItWorksPage />} />
              <Route path="/statistics" element={<StatisticsPage />} />
              <Route path="/help" element={<CitizenHelpPage />} />
              <Route path="/track" element={<TrackComplaintPage />} />
              <Route path="/track/:id" element={<TrackComplaintPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route path="/submit-complaint" element={<SubmitComplaintPage />} />
              <Route path="/request-service" element={<RequestServicePage />} />
            </Route>

            {/* 2. Citizen Dashboard Suite (CitizenLayout) */}
            <Route path="/citizen" element={<CitizenLayout />}>
              <Route index element={<Navigate to="/citizen/dashboard" replace />} />
              <Route path="dashboard" element={<CitizenDashboardPage />} />
              <Route path="complaints" element={<MyComplaintsPage />} />
              <Route path="complaints/:id" element={<ComplaintDetailsPage />} />
              <Route path="services" element={<MyServiceRequestsPage />} />
              <Route path="submit-complaint" element={<SubmitComplaintPage />} />
              <Route path="request-service" element={<RequestServicePage />} />
              <Route path="profile" element={<CitizenProfilePage />} />
              <Route path="notifications" element={<NotificationsPage />} />
            </Route>

            {/* 3. Admin & Municipal Officer Portal (AdminLayout & Login) */}
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboardPage />} />
              <Route path="complaints" element={<AdminComplaintsPage />} />
              <Route path="services" element={<AdminServicesPage />} />
            </Route>

            {/* Catch-all fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />

          </Routes>
        </BrowserRouter>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
