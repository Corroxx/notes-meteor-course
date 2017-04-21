import React from 'react';


import LinksList from './LinksList';
import PrivateHeader from './PrivateHeader';
import {AddLink} from './AddLink';
import LinksListFilters from './LinksListFilters';

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
