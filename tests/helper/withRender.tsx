import React from "react";
import { render } from "@testing-library/react"
import { AppContext } from "../../src/contexts/AppContext"
import { BrowserRouter, Route, RouterProvider, Routes, createMemoryRouter } from "react-router-dom";

export const withAppContext = (Component, currentUser = null) => {
    return (
        <AppContext.Provider value={{
            currentUser,
            setCurrentUser: () => { },
            onSignOut: () => { },
        }}>
            <Component />
        </AppContext.Provider>
    )

}

export const withRender = (routes, routerOptions) => {

    const router = createMemoryRouter(routes, routerOptions)

    render(<RouterProvider router={router} />)

    return { router };
}