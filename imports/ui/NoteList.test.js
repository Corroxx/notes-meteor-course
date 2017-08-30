import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import { Meteor } from 'meteor/meteor';

import { NoteList } from './NoteList';
import { notes } from '../fixtures/fixtures';

if(Meteor.isClient) {
    describe('NoteList', function() {
        it('Should render NoteList Item for each Item', function() {
            const wrapper = mount( <NoteList notes={notes}/> );

            expect(wrapper.find('NoteListItem').length).toBe(2);
            expect(wrapper.find('NoteListEmptyItem').length).toBe(0);

        });

        it('Should render NoteListEmptyItem if zero notes', function() {
            const wrapper = mount( <NoteList notes={[]}/> );

            expect(wrapper.find('NoteListEmptyItem').length).toBe(1);
            expect(wrapper.find('NoteListItem').length).toBe(0);
        })
    });
}