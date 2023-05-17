import { withAppContext, withRender } from "../helper/withRender";
import { act, screen } from "@testing-library/react";
import ShowRestaurants from "pages/restaurants/show/ShowRestaurants";

const routerOptions = {
    initialEntries: ["/restaurants/1"]
};

const routes = [
    {
        path: "/restaurants/:id",
        element: withAppContext(ShowRestaurants, { name: "User" })
    }
];

describe("<ShowRestaurants />", () => {

    it("should render restaurants", async () => {
        // @ts-ignore
        global.fetchMock.mockResponse((req) => {

            let body = JSON.stringify({
                name: "Cookie",
                email: "cookie@mail.com",
                allowed_branches: 10,
                allowed_users: 2,
            });

            if (req.url.endsWith("/branches")) {
                body = JSON.stringify([
                    {
                        location: "Branch Location"
                    }
                ])
            } else if (req.url.endsWith("/workers")) {
                body = JSON.stringify([
                    {
                        name: "User"
                    }
                ])
            }

            return new Promise((res) => {
                res(body)
            })
        });
        await act(async () => {
            await withRender(routes, routerOptions);
        });
        const name = screen.getByText("Cookie");
        expect(name).not.toBeNull();
        const location = screen.getByText("Branch Location");
        expect(location).not.toBeNull();
        const user = screen.getByText("User");
        expect(user).not.toBeNull();
    });


})