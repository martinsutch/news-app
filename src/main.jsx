import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { StatusProvider } from "./contexts/StatusContext.jsx";
import App from "./App.jsx";
import "./index.css";
import { ActiveUserProvider } from "./contexts/ActiveUserContext.jsx";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <StatusProvider>
            <ActiveUserProvider>
                <App />
            </ActiveUserProvider>
        </StatusProvider>
    </BrowserRouter>
);
