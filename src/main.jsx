import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { RfqProvider } from "./contexts/RfqContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <RfqProvider>
        <App />
      </RfqProvider>
    </AuthProvider>
  </BrowserRouter>
);
