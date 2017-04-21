import React from 'react';


import PrivateHeader from './PrivateHeader';
import {AddLink} from './AddLink';

export default () => {
    return (
      <div>
        <PrivateHeader title="Your Dashboard"/>
        <div className="page-content">
            <h1>Welcome to your Dashboard!</h1>
        </div>

      </div>
    )
};
