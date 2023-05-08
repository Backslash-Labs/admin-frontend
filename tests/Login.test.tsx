import React from "react";
import { withRender } from "./helper/withRender";
import Login from "pages/login/Login";
import { act, fireEvent, screen } from "@testing-library/react";
import { onChange } from "./helper/onChange";

describe("<Login />", () => {
    it("should login successfully", async () => {
        fetchMock.mockResponse(
            JSON.stringify({

            }),
            {
                headers: {
                    Authorization: "Bearer token"
                },
            }
        );
        const router = withRender(Login);
        onChange("Email", "admin@mail.com");
        onChange("Password", "password");
        const button = screen.getByText("Sign In");
        await act(async () => {
            await fireEvent.click(button)
        });
        expect(router.router.state.location.pathname).toBe("/");
    })
})