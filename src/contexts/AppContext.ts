import { createContext } from "react";

export const AppContext = createContext({
    currentUser: null,
    onSignOut: () => {},
    setCurrentUser: (currentUser) => {},
});

