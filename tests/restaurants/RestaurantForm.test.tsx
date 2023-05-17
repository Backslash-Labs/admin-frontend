import { withAppContext, withRender } from "../helper/withRender";
import { act, fireEvent, screen } from "@testing-library/react";
import RestaurantForm from "pages/restaurants/form/RestaurantForm";
import { onChange } from "../helper/onChange";

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

const cases = [
    {
        fields: {
            key: "Name",
            value: "",
        },
        expected: "name is a required field"
    },
    {
        fields: {
            key: "Email",
            value: "",
        },
        expected: "email is a required field"
    }
]

const data = [
    {
        key: "Name",
        value: "Restaurant"
    },
    {
        key: "Email",
        value: "user@mail.com"
    },
    {
        key: "Branch Location",
        value: "Location",
        name: "branch_location"
    },
    {
        key: "Plan",
        value: "1",
        name: "plan_id"
    },
]

let onAddRestaurant = async () => {
    const button = screen.getByText("Add Restaurant");
    return act(async () => {
        await fireEvent.click(button)
    });
}

describe("<RestaurantForm />", () => {

    let router;

    beforeEach(async () => {
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
        await act(async () => {
            router = await withRender(routes, routerOptions);
        });
    })

    it("should redirect to home", async () => {

        data.forEach(({ key, value, name }) => {
            onChange(key, value, name);
        });
        await onAddRestaurant();
        expect(router.state.location.pathname).toBe("/");
    });


    describe("Invalid", () => {
        test.each(cases)(`it should display $expected`, async ({ fields, expected }) => {
            data.forEach(({ key, value, name }) => {
                if (key === fields.key) onChange(key, fields.value, name);
                else onChange(key, value, name);
            });
            await onAddRestaurant();
            const t = screen.getByText(expected);
            expect(t).not.toBeNull();
        })
    })

})