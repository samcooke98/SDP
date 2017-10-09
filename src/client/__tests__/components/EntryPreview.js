import React from "react";
import renderer from "react-test-renderer";
// import ReactDOM from 'react-dom';
import { MemoryRouter } from "react-router-dom";
import EntryPreview from "../../components/EntryPreview/index";


describe('React Component: EntryPreview', () => {
    it("matches a snapshot", () => {
        const tree = renderer.create(
            <MemoryRouter>
                <EntryPreview />
            </MemoryRouter>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    })
})