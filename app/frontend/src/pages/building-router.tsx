import * as React from 'react';

import { Switch, Route } from 'react-router-dom';

import ChatPage from './chat';
import AdvertisementRouter from './advertisement/advertisement-router';

const BuildingRouter: React.FC = () => {
    return (
      <Switch>
          <Route path="/building/:uid/:section" render={ (props) => {
              switch(props.match.params.section) {
                case "advertisements":
                  return <AdvertisementRouter />;
                case "chat":
                  return <ChatPage {...props} />
              }
            }
          }/>
          <Route component={ChatPage}/>
      </Switch>
    );
}

export default BuildingRouter;