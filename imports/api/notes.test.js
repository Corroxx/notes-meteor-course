import expect from 'expect';
import { Meteor } from 'meteor/meteor'
import { Notes } from './notes';

if(Meteor.isServer) {
    describe('notes', function() {
        const noteOne = {
            _id: 'testNoteId1',
            title:'My title',
            body: 'My body for note',
            updatedAt: 0,
            userId: 'testUserId1'
        };
        const noteTwo = {
            _id: 'testNoteId2',
            title:'Things to buy',
            body: 'couch',
            updatedAt: 0,
            userId: 'testUserId2'
        };
        beforeEach(function() {
            Notes.remove({});
            Notes.insert(noteOne);
            Notes.insert(noteTwo);
        });

        it('shoud insert new Note', function() {
            const userId = 'testId'
            const _id = Meteor.server.method_handlers['notes.insert'].apply({userId})
            
            expect( Notes.findOne({_id, userId})).toExist();
        });

        it('should not insert Note if not authorized', function() {
            expect(() => {
                Meteor.server.method_handlers['notes.insert']();
            }).toThrow();
        })

        it('should remove note', function() {
            Meteor.server.method_handlers['notes.remove'].apply({userId: noteOne.userId}, [noteOne._id])
            expect(Notes.findOne({_id: noteOne._id})).toNotExist();
        })

        it('should not remove the note if unauthenticated', function() {
            expect(() => {
                Meteor.server.method_handlers['notes.remove'].apply({}, [noteOne._id])
            }).toThrow();
        })

        it('should not remove the note if invalid _Id', function() {
            expect(() => {
                Meteor.server.method_handlers['notes.remove'].apply({userId: noteOne.userId}, []) 
            }).toThrow()
        })

        it('should update note', function() {
            const title = 'this is an updated title';
                Meteor.server.method_handlers['notes.update'].apply({userId: noteOne.userId}, [noteOne._id, { title }]);

            const note = Notes.findOne(noteOne._id);
            expect(note.updatedAt).toBeGreaterThan(0);
            expect(note).toInclude({
                title,
                body: noteOne.body
            })
        })

        it('should throw an error on malissous update-properties provided', function () {
            const malCode = 'this is malissious Code';

            expect(() => {
                Meteor.server.method_handlers['notes.update'].apply({userId: noteOne.userId}, [noteOne._id, malCode]);
            }).toThrow();
        })

        it('should throw an error on extra update properties provided', function () {
            const malCode = 'this is malissious Code';

            expect(() => {
                Meteor.server.method_handlers['notes.update'].apply({userId: noteOne.userId}, [noteOne._id, {title: 'a new title', name: 'Andrew'}]);
            }).toThrow();
        })

        it('should not update note, if user was not creator', function() {
            const title = 'this is an updated title';
            Meteor.server.method_handlers['notes.update'].apply({userId: 'testId'}, [noteOne._id, { title }]);

        const note = Notes.findOne(noteOne._id);
        expect(note).toInclude(noteOne)
        })

        it('should not update note if unauthorized', function() {
            expect(() => {
                Meteor.server.method_handlers['notes.update'].apply({},[noteOne._id,{title: 'updated title'}]);
            }).toThrow();
        })

        it('should not update note if invalid _id', function() {
            expect(() => {
                Meteor.server.method_handlers['notes.update'].apply({userId: noteOne.userId}, [{_id: 'wrongId'},{ title: 'updated title' }])
            }).toThrow()
        })

        it('should return a users notes', function() {
            const res = Meteor.server.publish_handlers.notes.apply({userId: noteOne.userId})
            const notes = res.fetch();

            expect(notes.length).toBe(1);
            expect(notes[0]).toEqual(noteOne);
        })

        it('should return no notes for users that has no notes', function() {
            const res = Meteor.server.publish_handlers.notes.apply({userId: 'notRegisteredId'})
            const notes = res.fetch();

            expect(notes.length).toBe(0);
        })
    });
}   