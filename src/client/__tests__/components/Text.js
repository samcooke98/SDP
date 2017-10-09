import React from "react";
import renderer from "react-test-renderer";
// import ReactDOM from 'react-dom';

import Text from "../../components/Text/Text.js";


describe('React Component: Text', () => {
    it("matches a snapshot", () => {
        const tree = renderer.create(
            <Text />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    })
})