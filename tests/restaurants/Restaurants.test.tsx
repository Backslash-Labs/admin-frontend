import { withAppContext, withRender } from "../helper/withRender";
import { act, screen } from "@testing-library/react";
import Restaurants from "pages/restaurants/index/Restaurants";

const routerOptions = {
    initialEntries: ["/"]
};

const routes = [
    {
        path: "/",
        element: withAppContext(Restaurants, { name: "User" })
    }
];

describe("<Restaurants />", () => {

    it("should render restaurants", async () => {
        // @ts-ignore
        global.fetchMock.mockResponse(
            JSON.stringify([
                {
                    name: "Cookie",
                    email: "cookie@mail.com",
                    allowed_branches: 10,
                    allowed_users: 2,
                }
            ]),
        );
        await act(async () => {
            await withRender(routes, routerOptions);
        });
        const name = screen.getByText("Cookie");
        expect(name).not.toBeNull();
        const email = screen.getByText("cookie@mail.com");
        expect(email).not.toBeNull();
        const allowed_branches = screen.getByText("10");
        expect(allowed_branches).not.toBeNull();
        const allowed_users = screen.getByText("2");
        expect(allowed_users).not.toBeNull();
    });


})