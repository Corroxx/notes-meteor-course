import { Meteor } from 'meteor/meteor'
import expect from 'expect';

import { validateNewUser } from './users';

if(Meteor.isServer) {
    describe('Users', function() {
        it('schould allow valid email adresss', function() {
            const testUser = {
                emails: [
                    {
                        address: 'Test@example.com'
                    }
                ]
            };
            const res = validateNewUser(testUser);
    
            expect(res).toBe(true);
        })

        it('should reject invalid Email', function() {
            const testUser = {
                email: [
                    {
                        address: 'testmail.de'
                    }
                ]
            }
            expect(() =>{
                validateNewUser(testUser);
            }).toThrow();
        })
    });
}