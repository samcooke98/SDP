import React from "react";
import renderer from "react-test-renderer";
// import ReactDOM from 'react-dom';

import Checkbox from "../../components/Checkbox/Checkbox";


describe('React Component: Checkbox', () => {
    it("matches a snapshot", () => {
        const tree = renderer.create(
            <Checkbox />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    })
})