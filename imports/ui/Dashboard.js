import React from 'react';

import NoteList from './NoteList';

import PrivateHeader from './PrivateHeader';
import NoteListHeader from './NoteListHeader';
import Editor from './Editor';

export default () => {
    return (
      <div>
        <PrivateHeader title="Your Dashboard"/>
        <div className="page-content">
        <NoteListHeader/>

          <div className="page-content__sidebar">
            <NoteList/>            
          </div>
          <div className="page-content__main">
            <Editor/>
          </div>
        </div>
      </div>
    )
};
