import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { HouseListPage } from './pages/HouseListPage';
import { HouseDetailPage } from './pages/HouseDetailPage';
import { RoomDetailPage } from './pages/RoomDetailPage';
import { TenantsPage } from './pages/TenantsPage';
import { ReceiptsPage } from './pages/ReceiptsPage';
import { SettingsPage } from './pages/SettingsPage';
import { AuthProvider, useAuth } from './providers/AuthProvider';


export function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session, loading } = useAuth();

  if (loading) return null;

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return <MainLayout>{children}</MainLayout>;
}

export default function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/houses"
            element={
              <ProtectedRoute>
                <HouseListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/houses/:houseId"
            element={
              <ProtectedRoute>
                <HouseDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/rooms/:roomId"
            element={
              <ProtectedRoute>
                <RoomDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tenants"
            element={
              <ProtectedRoute>
                <TenantsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/receipts"
            element={
              <ProtectedRoute>
                <ReceiptsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
