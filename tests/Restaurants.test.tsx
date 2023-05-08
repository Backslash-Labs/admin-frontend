import { withAppContext, withRender } from "./helper/withRender";
import { act, screen } from "@testing-library/react";
import Restaurants from "pages/restaurants/index/Restaurants";

const routerOptions = {
    initialEntries: ["/restaurants"]
};

const routes = [
    {
        path: "/",
        element: null,
    },
    {
        path: "/restaurants",
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
                    workspaces: 10,
                    users: 2,
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
        const workspaces = screen.getByText("10");
        expect(workspaces).not.toBeNull();
        const users = screen.getByText("2");
        expect(users).not.toBeNull();
    });


})