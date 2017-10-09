import React from "react";
import renderer from "react-test-renderer";
// import ReactDOM from 'react-dom';

import Button from "../../components/Button/Button";


describe('React Component: Button', () => {
    it("matches a snapshot", () => {
        const tree = renderer.create(
            <Button />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    })
})