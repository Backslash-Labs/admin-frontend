import { act, screen, fireEvent } from "@testing-library/react";

export const onChange = (label: string, value: string) => {
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