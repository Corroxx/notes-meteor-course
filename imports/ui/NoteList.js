import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session'

import { Notes } from '../api/notes';
import NoteListEmptyItem from './NoteListEmptyItem';
import NoteListItem from './NoteListItem';

export const NoteList = (props) => {
    const noteCount = props.notes.length;
    return (
        <div className="item-list">
            NoteList { noteCount }
            {props.notes.length === 0 && <NoteListEmptyItem/>}
            {props.notes.map((note) => <NoteListItem key={note._id} note={note}/>)}
        </div>
    );
};

NoteList.propTypes = {
    notes: React.PropTypes.array.isRequired
}

export default createContainer(() => {
    const selectedNoteId = Session.get('selectedNoteId');
    Meteor.subscribe('notes');
    return {
        notes: Notes.find({},{sort:{ 
            updatedAt:-1
        }}).fetch().map((note) => {
           return {
               ...note,
               selected: note._id === selectedNoteId
           };
        })
    }
}, NoteList);