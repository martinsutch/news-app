import { createContext, useState } from "react";

export const StatusContext = createContext();

export const StatusProvider = ({ children }) => {
    const [status, setStatus] = useState ({icon: "loading", msg: "Loading... please wait...", duration: -1});

    return (
        <StatusContext.Provider value={{status, setStatus}}>
            {children}
        </StatusContext.Provider>
    );
};