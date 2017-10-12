import React from "react";
import renderer from "react-test-renderer";
// import ReactDOM from 'react-dom';

import TextInput from "../../components/TextInput/TextInput";


describe('React Component: TextInput', () => {
    it("matches a snapshot", () => {
        const tree = renderer.create(
            <TextInput />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    })
})