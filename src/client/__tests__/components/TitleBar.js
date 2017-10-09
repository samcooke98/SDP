import React from "react";
import renderer from "react-test-renderer";
// import ReactDOM from 'react-dom';

import TitleBar from "../../components/TitleBar/Titlebar";


describe('React Component: TitleBar', () => {
    it("matches a snapshot", () => {
        const tree = renderer.create(
            <TitleBar />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    })
})