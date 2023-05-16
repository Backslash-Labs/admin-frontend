import React, { FC } from "react";
import { render } from "@testing-library/react"
import { AppContext } from "../../src/contexts/AppContext"
import { RouteObject, RouterProvider, createMemoryRouter } from "react-router-dom";

export const withAppContext = (Component: FC, currentUser: any = null) => {
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

export const withRender = (routes: RouteObject[], routerOptions: any) => {

    const router = createMemoryRouter(routes, routerOptions)

    render(<RouterProvider router={router} />)

    return { router };
}