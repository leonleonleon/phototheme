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
    <Router
        history={ browserHistory }
        onUpdate={ () =>
        {
            window.scrollTo( 0, document.body.scrollHeight );
        } }
    >
        <Route path="/" component={ App } history={ browserHistory }>
            <IndexRoute component={ Portfolios } history={ browserHistory } />
            <Route
                path="/:portfolio(/:index)"
                component={ Portfolios }
                history={ browserHistory }
            />
        </Route>
    </Router>
, document.getElementById( 'app' ) );
