import React            from 'react';
import { render }       from 'react-dom';
import {
    Router,
    Route,
    browserHistory,
    IndexRoute }        from 'react-router';
import 'whatwg-fetch';
import App              from 'components/App.jsx';
import Portfolios       from 'components/portfolios/Portfolios.jsx';

render(
    <Router history={ browserHistory } onUpdate={ () => window.scrollTo( 0, 0 ) } >
        <Route path="/" component={ App }>
            <IndexRoute component={ Portfolios } />
            <Route path="/:portfolio/" component={ Portfolios } />
            <Route path="/:portfolio/:index" component={ Portfolios } />
        </Route>
    </Router>
, document.getElementById( 'app' ) );
