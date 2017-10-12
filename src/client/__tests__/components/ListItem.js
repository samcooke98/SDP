import React from "react";
import renderer from "react-test-renderer";
// import ReactDOM from 'react-dom';

import ListItem from "../../components/ListItem/ListItem";


describe('React Component: ListItem', () => {
    it("matches a snapshot", () => {
        const tree = renderer.create(
            <ListItem />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    })
})