import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { Notes } from '../api/notes';
import NoteListEmptyItem from './NoteListEmptyItem';
import NoteListItem from './NoteListItem';

export const NoteList = (props) => {
    const noteCount = props.notes.length;
    return (
        <div>
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
    Meteor.subscribe('notes');
    return {
        notes: Notes.find({}).fetch()
    }
}, NoteList);