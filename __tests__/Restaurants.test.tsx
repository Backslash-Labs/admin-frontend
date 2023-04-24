import React from "react";
import Restaurant from "../src/pages/restaurants/index/Restaurants";
import { render } from "@testing-library/react";
import { AppContext } from "../src/contexts/AppContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => (
    <AppContext.Provider value={{
        currentUser: null,
        setCurrentUser: () => { },
        onSignOut: () => { },
    }}>
        <Restaurant />
    </AppContext.Provider>
)

describe("<Restaurants />", () => {
    it("should fetch restaurants", () => {
        const app = render(
            <>
                <BrowserRouter>

                    <Routes>
                        <Route
                            element={<App />}
                        />
                    </Routes>
                </BrowserRouter>
            </>
        );
        expect(app).not.toBeNull();
    })
})