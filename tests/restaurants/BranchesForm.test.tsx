import { withAppContext, withRender } from "../helper/withRender";
import { act, fireEvent, screen } from "@testing-library/react";
import BranchForm from "pages/restaurants/show/branchesForm/BranchForm";
import { onChange } from "../helper/onChange";

const routerOptions = {
    initialEntries: ["/restaurants/1/branches/create"]
};

const routes = [
    {
        path: "/restaurants/:id",
        element: null,
    },
    {
        path: "/restaurants/:restaurant_id/branches/create",
        element: withAppContext(BranchForm, { name: "User" })
    }
];

const cases = [
    {
        fields: {
            key: "Location",
            value: "",
        },
        expected: "location is a required field"
    },
]

const data = [
    {
        key: "Location",
        value: "Location"
    },
]

let onAddBranch = async () => {
    const button = screen.getByText("Add Branch");
    return act(async () => {
        await fireEvent.click(button)
    });
}

describe("<BranchForm />", () => {

    let router;

    beforeEach(async () => {
        router = withRender(routes, routerOptions);
    })

    it("should redirect to show restaurant", async () => {
        data.forEach(({ key, value }) => {
            onChange(key, value);
        });
        await onAddBranch();
        expect(router.state.location.pathname).toBe("/restaurants/1");
    });


    describe("Invalid", () => {
        test.each(cases)(`it should display $expected`, async ({ fields, expected }) => {
            data.forEach(({ key, value }) => {
                if (key === fields.key) onChange(key, fields.value);
                else onChange(key, value);
            });
            await onAddBranch();
            const t = screen.getByText(expected);
            expect(t).not.toBeNull();
        })
    })

})