import React from "react";
import renderer from "react-test-renderer";
// import ReactDOM from 'react-dom';

import Modal from "../../components/Modal/Modal";


describe('React Component: Modal', () => {
    it("matches a snapshot", () => {
        const tree = renderer.create(
            <Modal />   
        ).toJSON();
        expect(tree).toMatchSnapshot();
    })
})