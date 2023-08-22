import { withAppContext, withRender } from "../helper/withRender";
import { act, fireEvent, screen } from "@testing-library/react";
import BranchUserForm from "pages/restaurants/show/branchUsersForm/BranchUserForm";
import { onChange } from "../helper/onChange";

const routerOptions = {
    initialEntries: ["/restaurants/1/branch_users/create"]
};

const routes = [
    {
        path: "/restaurants/:id",
        element: null,
    },
    {
        path: "/restaurants/:restaurant_id/branch_users/create",
        element: withAppContext(BranchUserForm, { name: "User" })
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
    },
    {
        fields: {
            key: "Email",
            value: "email",
        },
        expected: "email must be a valid email"
    },
]

const data = [
    {
        key: "Name",
        value: "User Name"
    },
    {
        key: "Email",
        value: "worker@mail.com"
    }
]

let onAddBranchUser = async () => {
    const button = screen.getByText("Add User");
    return act(async () => {
        await fireEvent.click(button)
    });
}

describe("<BranchUserForm />", () => {

    let router;

    beforeEach(async () => {
        // @ts-ignore
        global.fetchMock.mockResponse(
            JSON.stringify([
                {
                    id: 1,
                    location: "Branch 1",
                }
            ]),
        );
        await act(async () => {
            router = await withRender(routes, routerOptions);
        });
    })

    it("should redirect to show restaurant", async () => {
        data.forEach(({ key, value }) => {
            onChange(key, value);
        });
        const branch = screen.getByText("Branch 1");
        fireEvent.click(branch);
        await onAddBranchUser();
        expect(router.state.location.pathname).toBe("/restaurants/1");
    });


    describe("Invalid", () => {
        test.each(cases)(`it should display $expected`, async ({ fields, expected }) => {
            data.forEach(({ key, value }) => {
                if (key === fields.key) onChange(key, fields.value);
                else onChange(key, value);
            });
            await onAddBranchUser();
            const t = screen.getByText(expected);
            expect(t).not.toBeNull();
        })
    })

})