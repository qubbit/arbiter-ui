import React from 'react';
import { Route } from 'react-router-dom';

import Layout from './components/Layout';
import HomePage from './containers/HomePage';
import ShowRulesets from './containers/ShowRulesets';
import Ruleset from './containers/Ruleset';

const routes = (
  <Layout>
    <Route exact path="/new" component={Ruleset} />
    <Route exact path="/" component={HomePage} />
    <Route path="/rulesets" component={ShowRulesets} />
  </Layout>
);

export default routes;
