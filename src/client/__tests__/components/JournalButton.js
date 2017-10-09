import React from "react";
import renderer from "react-test-renderer";
// import ReactDOM from 'react-dom';

import JournalButton from "../../components/JournalButton/JournalButton";


describe('React Component: JournalButton', () => {
    it("matches a snapshot", () => {
        const tree = renderer.create(
            <JournalButton />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    })
})