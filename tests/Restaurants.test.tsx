import React from "react";
import Restaurant from "../src/pages/restaurants/index/Restaurants";
import { withRender } from "./helper/withRender";

describe("<Restaurants />", () => {
    it("should fetch restaurants", () => {
        const app = withRender(Restaurant);
        expect(app).not.toBeNull();
    })
})