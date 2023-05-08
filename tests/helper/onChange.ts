import { act, screen, fireEvent } from "@testing-library/react";

export const onChange = (label, value) => {
    const name = label.toLowerCase();
    const el = screen.getByLabelText(label);
    act(() => {
        fireEvent.change(el, {
            target: {
                value,
                name,
            }
        });
    });
}