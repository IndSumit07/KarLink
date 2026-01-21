import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { RfqProvider } from "./contexts/RfqContext.jsx";
import { BidProvider } from "./contexts/BidContext.jsx";
import { OrderProvider } from "./contexts/OrderContext.jsx";

import { ChatProvider } from "./contexts/ChatContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <RfqProvider>
        <BidProvider>
          <OrderProvider>
            <ChatProvider>
              <App />
            </ChatProvider>
          </OrderProvider>
        </BidProvider>
      </RfqProvider>
    </AuthProvider>
  </BrowserRouter>
);
