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
import Page             from 'components/page/Page.jsx';
import Portfolio        from 'components/portfolio/Portfolio.jsx';

render(
    <Router history={ browserHistory } onUpdate={ () => window.scrollTo( 0, 0 ) } >
        <Route path="/" component={ App }>
            <IndexRoute component={ Portfolios } />
            <Route path="/portfolio" component={ Portfolios } />
            <Route path="/portfolio/:portfolio" component={ Portfolio } />
            <Route path="/CV" component={ Page } />
        </Route>
    </Router>
, document.getElementById( 'app' ) );
