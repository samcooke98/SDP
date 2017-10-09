import React from "react";
import renderer from "react-test-renderer";
// import ReactDOM from 'react-dom';

import ControlButton from "../../components/ControlButton/index";


describe('React Component: ControlButton', () => {
    it("matches a snapshot", () => {
        const tree = renderer.create(
            <ControlButton />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    })
})