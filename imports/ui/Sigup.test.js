import { Meteor } from 'meteor/meteor';
import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';

import { Signup } from './Signup';

if(Meteor.isClient) {
    describe('Signup', function() {
        it('should show error Messages', function() {
            const error = 'this is not working';
            const wrapper = mount( <Signup createUser= {() => {} }/> );
            wrapper.setState({error});

            const errorText = wrapper.find('p').text();

            expect(errorText).toBe(error);

            wrapper.setState({error: ''});
            expect(wrapper.find('p').length).toBe(0);
        })

        it('should call createUser with the form data', function() {
            const email = 'andrew@test.com';
            const password = 'password123';
            const spy = expect.createSpy();

            const wrapper = mount( <Signup createUser={spy}/>);
            
            wrapper.ref('email').node.value = email;
            wrapper.ref('password').node.value = password;

            wrapper.find('form').simulate('submit');
            expect(spy.calls[0].arguments[0]).toEqual({ email, password });

        })

        it('should throw error if short passord', function() {
            const email = 'andrew@test.com';
            const password = '123';
            const spy = expect.createSpy();

            const wrapper = mount( <Signup createUser={spy}/>);
            
            wrapper.ref('email').node.value = email;
            wrapper.ref('password').node.value = password;

            wrapper.find('form').simulate('submit');
            expect(wrapper.state('error')).toBe('Password must be more than 8 characters long.');
        })

        it('should set createUser callback errors', function() {
            const password = 'password123';
            const reason = 'this is why it fails';
            const spy = expect.createSpy();
            const wrapper = mount( <Signup createUser={spy}/>);
            wrapper.ref('password').node.value = password;
            wrapper.find('form').simulate('submit');

            spy.calls[0].arguments[1]({reason});
            expect(wrapper.state('error')).toBe(reason);

            spy.calls[0].arguments[1]();
            expect(wrapper.state('error')).toBe('');
            
        })
    })
}