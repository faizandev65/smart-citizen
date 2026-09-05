import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

// Layouts
import { PublicLayout } from './layouts/PublicLayout';
import { CitizenLayout } from './layouts/CitizenLayout';
import { AdminLayout } from './layouts/AdminLayout';

// Public Auth & Informational Pages
import { LoginPage } from './pages/public/LoginPage';
import { RegisterPage } from './pages/public/RegisterPage';
import { ForgotPasswordPage } from './pages/public/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/public/ResetPasswordPage';
import { CitizenHelpPage } from './pages/public/CitizenHelpPage';
import { HowItWorksPage } from './pages/public/HowItWorksPage';
import { StatisticsPage } from './pages/public/StatisticsPage';

// Citizen Pages
import { CitizenDashboardPage } from './pages/citizen/CitizenDashboardPage';
import { MyComplaintsPage } from './pages/citizen/MyComplaintsPage';
import { ComplaintDetailsPage } from './pages/citizen/ComplaintDetailsPage';
import { MyServiceRequestsPage } from './pages/citizen/MyServiceRequestsPage';
import { CitizenProfilePage } from './pages/citizen/CitizenProfilePage';
import { NotificationsPage } from './pages/citizen/NotificationsPage';
import { SubmitComplaintPage } from './pages/public/SubmitComplaintPage';
import { RequestServicePage } from './pages/public/RequestServicePage';
import { TrackComplaintPage } from './pages/public/TrackComplaintPage';

// Admin Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminComplaintsPage } from './pages/admin/AdminComplaintsPage';
import { AdminServicesPage } from './pages/admin/AdminServicesPage';

// 1. Root route dispatcher: sends unauthenticated users to /login, logged-in users to /dashboard or /admin/dashboard
function RootRoute() {
  const { isAuthenticated, isAdminAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  if (isAdminAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }
  return <Navigate to="/login" replace />;
}

// 2. Citizen Route Guard: Prevents unauthenticated users from seeing any protected citizen routes
function CitizenGuard() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}

// 3. Admin Route Guard: Prevents unauthenticated users from seeing any protected admin routes
function AdminGuard() {
  const { isAdminAuthenticated } = useAuth();
  if (!isAdminAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  return <Outlet />;
}

// 4. Citizen Login Guard: Redirects to dashboard if citizen is already authenticated
function CitizenLoginRoute() {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  return <LoginPage />;
}

// 5. Admin Login Guard: Redirects to admin dashboard if admin is already authenticated
function AdminLoginRoute() {
  const { isAdminAuthenticated } = useAuth();
  if (isAdminAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }
  return <AdminLoginPage />;
}

export function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <BrowserRouter>
          <Routes>
            {/* Root Route: "/" -> /login if logged out, /dashboard if citizen, /admin/dashboard if admin */}
            <Route path="/" element={<RootRoute />} />

            {/* Public Authentication & Registration Routes */}
            <Route path="/login" element={<CitizenLoginRoute />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/admin/login" element={<AdminLoginRoute />} />

            {/* Public Informational Pages */}
            <Route element={<PublicLayout />}>
              <Route path="/help" element={<CitizenHelpPage />} />
              <Route path="/how-it-works" element={<HowItWorksPage />} />
              <Route path="/statistics" element={<StatisticsPage />} />
            </Route>

            {/* Protected Citizen Routes with /citizen prefix */}
            <Route element={<CitizenGuard />}>
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

              {/* Top-Level Citizen Protected Aliases */}
              <Route element={<CitizenLayout />}>
                <Route path="/dashboard" element={<CitizenDashboardPage />} />
                <Route path="/complaints" element={<MyComplaintsPage />} />
                <Route path="/complaints/:id" element={<ComplaintDetailsPage />} />
                <Route path="/register-complaint" element={<SubmitComplaintPage />} />
                <Route path="/submit-complaint" element={<SubmitComplaintPage />} />
                <Route path="/services" element={<MyServiceRequestsPage />} />
                <Route path="/request-service" element={<RequestServicePage />} />
                <Route path="/track-complaint" element={<TrackComplaintPage />} />
                <Route path="/track" element={<TrackComplaintPage />} />
                <Route path="/track/:id" element={<TrackComplaintPage />} />
                <Route path="/profile" element={<CitizenProfilePage />} />
                <Route path="/notifications" element={<NotificationsPage />} />
              </Route>
            </Route>

            {/* Protected Admin Routes */}
            <Route element={<AdminGuard />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboardPage />} />
                <Route path="complaints" element={<AdminComplaintsPage />} />
                <Route path="services" element={<AdminServicesPage />} />
              </Route>
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
