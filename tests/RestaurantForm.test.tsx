import { withAppContext, withRender } from "./helper/withRender";
import { act, fireEvent, screen } from "@testing-library/react";
import RestaurantForm from "pages/restaurants/form/RestaurantForm";
import { onChange } from "./helper/onChange";

const routerOptions = {
    initialEntries: ["/restaurants/create"]
};

const routes = [
    {
        path: "/",
        element: null,
    },
    {
        path: "/restaurants/create",
        element: withAppContext(RestaurantForm, { name: "User" })
    }
];

describe("<RestaurantForm />", () => {

    it("should render restaurants", async () => {
        // @ts-ignore
        global.fetchMock.mockResponse(
            JSON.stringify([
                {
                    id: 1,
                    name: "Cookie",
                    allowed_branches: 10,
                    allowed_users: 2,
                    plan_features: [
                        {
                            feature: {
                                id: 2,
                                name: "Feature"
                            }
                        }
                    ]
                }
            ]),
        );
        let router
        await act(async () => {
            router = await withRender(routes, routerOptions);
        });
        onChange("Name", "Restaurant");
        onChange("Email", "user@mail.com");
        onChange("Branch Location", "Location", "branch_location");
        onChange("Plan", "1", "plan_id");
        const button = screen.getByText("Add Restaurant");
        await act(async () => {
            await fireEvent.click(button)
        });
        expect(router.state.location.pathname).toBe("/");
    });

})