import { withAppContext, withRender } from "../helper/withRender";
import { act, fireEvent, screen } from "@testing-library/react";
import WorkerForm from "pages/restaurants/show/workersForm/WorkerForm";
import { onChange } from "../helper/onChange";

const routerOptions = {
    initialEntries: ["/restaurants/1/workers/create"]
};

const routes = [
    {
        path: "/restaurants/:id",
        element: null,
    },
    {
        path: "/restaurants/:restaurant_id/workers/create",
        element: withAppContext(WorkerForm, { name: "User" })
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
        value: "Worker Name"
    },
    {
        key: "Email",
        value: "worker@mail.com"
    }
]

let onAddWorker = async () => {
    const button = screen.getByText("Add Worker");
    return act(async () => {
        await fireEvent.click(button)
    });
}

describe("<WorkerForm />", () => {

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
        await onAddWorker();
        expect(router.state.location.pathname).toBe("/restaurants/1");
    });


    describe("Invalid", () => {
        test.each(cases)(`it should display $expected`, async ({ fields, expected }) => {
            data.forEach(({ key, value }) => {
                if (key === fields.key) onChange(key, fields.value);
                else onChange(key, value);
            });
            await onAddWorker();
            const t = screen.getByText(expected);
            expect(t).not.toBeNull();
        })
    })

})