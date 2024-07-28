import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainerComponent } from "./components/Toast/Toast";

// Contexts
import UserProvider from "./contexts/UserContext";

// Pages
import {
  LandingPage,
  RegisterPage,
  LoginPage,
  DashboardPage,
  FormBuilderPage,
  FlowPage,
  ThemePage,
  ResponsePage,
  UserResponsePage,
  SettingsPage,
} from "./pages";

// Utils
import ProtectedRoutes from "./utils/ProtectedRoutes";

function App() {
  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route
                path="/form-builder/:folderId?"
                element={<FormBuilderPage />}
              >
                <Route path="flow" element={<FlowPage />} />
                <Route path="theme" element={<ThemePage />} />
                <Route path="response" element={<ResponsePage />} />
              </Route>
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
            <Route
              path="/form/:formId/user-response"
              element={<UserResponsePage />}
            />
          </Routes>
        </UserProvider>
      </BrowserRouter>
      <ToastContainerComponent />
    </>
  );
}

export default App;
