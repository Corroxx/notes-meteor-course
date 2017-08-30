import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import { Meteor } from 'meteor/meteor';

import { NoteList } from './NoteList';

const notes = [
    {
        _id: 'noteId1',
        title: 'Test Title',
        body: 'something',
        updatedAt: 0,
        userId: 'userId1'
    },
    {
        _id: 'noteId2',
        title: '',
        body: 'something is here',
        updatedAt: 0,
        userId: 'userId2'
    }
];

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