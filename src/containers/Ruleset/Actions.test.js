import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import Actions from './Actions.js';
import { shallow, mount, render } from 'enzyme';

configure({ adapter: new Adapter() });

const initialState = {};
const mockStore = configureStore();
let wrapper;
let store;

beforeEach(() => {
  store = mockStore(initialState);
  wrapper = shallow(<Actions store={store} />);
});

const props = { reorderActions: function(a, b) {} };

describe('Actions', () => {
  it('renders', () => {
    expect(wrapper.find('.col ui-area-header')).not.toBe(null);
  });
});
