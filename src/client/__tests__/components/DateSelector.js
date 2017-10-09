import React from "react";
import renderer from "react-test-renderer";
// import ReactDOM from 'react-dom';

import DateSelector from "../../components/DateSelector/DateSelector";


describe('React Component: DateSelector', () => {
    it("matches a snapshot", () => {
        const tree = renderer.create(
            <DateSelector />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    })
})