import { createContext, useState } from "react";

export const ActiveUserContext = createContext();

export const ActiveUserProvider = ({ children }) => {
    const [activeUser, setActiveUser] = useState({
        username: "cooljmessy",
        name: "Peter Messy",
        avatar_url:
            "https://vignette.wikia.nocookie.net/mrmen/images/1/1a/MR_MESSY_4A.jpg/revision/latest/scale-to-width-down/250?cb=20170730171002",
    });

    return <ActiveUserContext.Provider value={{ activeUser, setActiveUser }}>{children}</ActiveUserContext.Provider>;
};
