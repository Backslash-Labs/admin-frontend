import React from "react";
import { withRender } from "./helper/withRender";
import Login from "pages/login/Login";
import { act, fireEvent, screen } from "@testing-library/react";
import { onChange } from "./helper/onChange";

describe("<Login />", () => {
    
    it("should redirect to home when request is successful", async () => {
        // @ts-ignore
        global.fetchMock.mockResponse(
            JSON.stringify({

            }),
            {
                headers: {
                    Authorization: "Bearer token"
                },
            }
        );
        const router = withRender(Login);
        onChange("Email", "user@mail.com");
        onChange("Password", "password");
        const button = screen.getByText("Sign In");
        await act(async () => {
            await fireEvent.click(button)
        });
        expect(router.router.state.location.pathname).toBe("/");
    });

    it("should not redirect when request was not successful", async () => {
        // @ts-ignore
        global.fetchMock.mockResponse(
            JSON.stringify({

            }),
            {
                status: 401,
            }
        );
        const router = withRender(Login);
        onChange("Email", "user@mail.com");
        onChange("Password", "password");
        const button = screen.getByText("Sign In");
        await act(async () => {
            await fireEvent.click(button)
        });
        expect(router.router.state.location.pathname).toBe("/login");
    });


    it("should show email required when email is empty", async () => {
        const router = withRender(Login);
        onChange("Email", "");
        onChange("Password", "password");
        const button = screen.getByText("Sign In");
        act(() => {
            fireEvent.click(button)
        });
        const email = screen.findByText("Email is required");
        expect(email).not.toBeNull();
        expect(router.router.state.location.pathname).toBe("/login");
    });


    it("should show password required when password is empty", async () => {
        const router = withRender(Login);
        onChange("Email", "user@mail.com");
        onChange("Password", "");
        const button = screen.getByText("Sign In");
        act(() => {
            fireEvent.click(button)
        });
        const email = screen.findByText("Email is required");
        expect(email).not.toBeNull();
        expect(router.router.state.location.pathname).toBe("/login");
    });

})