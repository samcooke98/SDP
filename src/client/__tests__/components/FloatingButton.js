import React from "react";
import renderer from "react-test-renderer";
// import ReactDOM from 'react-dom';

import FloatingButton from "../../components/FloatingButton/FloatingButton";


describe('React Component: FloatingButton', () => {
    it("matches a snapshot", () => {
        const tree = renderer.create(
            <FloatingButton />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    })
})