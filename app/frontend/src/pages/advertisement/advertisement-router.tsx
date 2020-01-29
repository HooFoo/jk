import * as React from 'react';

import { Switch, Route } from 'react-router-dom';

import AdvertisementListPage from './advertisement-list';
import AdvertisementEditPage from './advertisement-edit';

const AdvertisementRouter: React.FC = () => {

  const processRoute = (props: any) => {
    switch(props.match.params.section) {
      case "edit":
        return <AdvertisementEditPage {...props} />
      case "list":
        return <AdvertisementListPage {...props} />;
    }
  };

  return (
    <Switch>
      <Route path="/building/:uid/advertisements/:section/:id" render={ processRoute }/>
      <Route path="/building/:uid/advertisements/:section" render={ processRoute }/>
      <Route component={AdvertisementListPage}/>
    </Switch>
  );
}

export default AdvertisementRouter;