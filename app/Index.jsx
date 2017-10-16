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
        onUpdate={ ( ) =>
        {
            if ( typeof window.ga === 'function' )
            {
                // eslint-disable-next-line
                window.gtag('config', 'UA-46475543-1', {
                    // 'page_title'    : document.title,
                    // 'page_location' : document.location.pathname,
                    'page_path'     : document.location.pathname,
                }
                );
            }
            else
            {
                console.warn( 'No Goole gtag found!' );
            }

            return null;
        }
        }
    >
        <Route
            path="/"
            component={ App }
            history={ browserHistory }
        >
            <IndexRoute component={ Portfolios } history={ browserHistory } />
            <Route
                path="/:portfolio(/:index)"
                component={ Portfolios }
                history={ browserHistory }
            />
        </Route>
    </Router>
, document.getElementById( 'app' ) );
