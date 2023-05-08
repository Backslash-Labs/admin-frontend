import React from "react";
import { render } from "@testing-library/react"
import { AppContext } from "../../src/contexts/AppContext"
import { BrowserRouter, Route, RouterProvider, Routes, createMemoryRouter } from "react-router-dom";

export const withRender = (Component) => {

    const App = () => (
        <AppContext.Provider value={{
            currentUser: null,
            setCurrentUser: () => { },
            onSignOut: () => { },
        }}>
            <Component />
        </AppContext.Provider>
    )

    const router = createMemoryRouter(
        [
            {
                path: "/",
                element: <App />
            },
            {
                path: "/login",
                element: <App />
            }
        ],
        {
            initialEntries: ["/login"]
        }
    )

    render(<RouterProvider router={router} />)

    return {
        router
    }
}