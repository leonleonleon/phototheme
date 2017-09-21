import React            from 'react';
import PropTypes        from 'prop-types';
import { Link, browserHistory }         from 'react-router';
import Preloader        from 'preloader/Preloader.jsx';
import Title            from 'portfolio/Title.jsx';
// import Text             from 'portfolio/Text.jsx';
import { PORTFOLIO_SLUG }   from 'config/app.json';
import { findIndex,
         cloneDeep }    from 'lodash';
import Slide            from 'Slide.jsx';

import './Portfolio.scss';

/**
 *  Portfolio Component
 */
export default class Portfolio extends React.PureComponent
{
    static propTypes = {
        preloader   : PropTypes.bool,
        portfolios  : PropTypes.array,
        portfolio   : PropTypes.object,
    }

    /**
     *  getNextPortfolioLink
     *
     *  @returns {String} link to the next portfolio
     */
    getNextPortfolioLink()
    {
        const { portfolio : { slug }, portfolios } = this.props;
        const maxIndex = portfolios.length - 1;
        const currIndex = findIndex( portfolios, { slug } );

        const nextIndex = currIndex < maxIndex ? currIndex + 1 : 0;

        return `/${PORTFOLIO_SLUG}/${portfolios[ nextIndex ].slug}`;
    }

    /**
     *  getPreviousPortfolioLink
     *
     *  @returns {String} link to the Previous portfolio
     */
    getPreviousPortfolioLink()
    {
        const { portfolio : { slug }, portfolios } = this.props;
        const maxIndex = portfolios.length - 1;
        const currIndex = findIndex( portfolios, { slug } );

        const nextIndex = currIndex > 0 ? currIndex - 1 : maxIndex;

        return `/${PORTFOLIO_SLUG}/${portfolios[ nextIndex ].slug}`;
    }
    /**
     * keyDown
     *
     * @param {event} event [description]
     */
    keyDown = ( event ) =>
    {
        let evt = event;
        if ( !evt )
        {
            evt = window.event;
        } // for old IE compatible
        const keycode = evt.keyCode || evt.which; // also for cross-browser compatible

        switch ( keycode )
        {
        case 37:
            browserHistory.push( this.getPreviousPortfolioLink() );
            break;
        case 39:
            browserHistory.push( this.getNextPortfolioLink() );
            break;
        }
    }
    /**
     * componentWillMount
     */
    componentWillMount()
    {
        window.addEventListener( 'keydown', this.keyDown.bind( this ) );
    }
    /**
     * componentWillUnmount
     */
    componentWillUnmount()
    {
        window.removeEventListener( 'keydown', this.keyDown );
    }
    /**
     *  Portfolio Render
     *
     *  @return {JSX} Portfolio element plus children
     */
    render()
    {
        // const { preloader, portfolio, portfolios } = this.props;
        const { preloader, portfolio } = this.props;

        if ( preloader || !portfolio ) return <Preloader />;

        const slideOne      = [ cloneDeep( portfolio.acf.slides[ 0 ] ) ];
        const slidesRest    = cloneDeep( portfolio.acf.slides.slice( 1 ) );

        const bgcolor = portfolio.acf.background_color;
        const body = document.getElementsByTagName( 'body' )[ 0 ];
        body.style.backgroundColor = bgcolor;

        return (
            <div className="portfolio">
                <div className="close">
                    <Link to="/">
                        {/*<i className="fa fa-window-close-o" aria-hidden="true" />*/}
                        CLOSE
                    </Link>
                </div>
                <Title content={ portfolio.title.rendered } />
                <Slide>{ slideOne }</Slide>
                {/*
                <Text content={ portfolio.content.rendered } />*/}
                <Slide>{ slidesRest }</Slide>
                {/*<div className="arrows">
                    <div className="previousArrow">
                        {
                            portfolios &&
                            <Link to={ this.getPreviousPortfolioLink() }>
                                <i className="fa fa-angle-left" aria-hidden="true" /> previous
                            </Link>
                        }
                    </div>
                    <div className="nextArrow">
                        {
                            portfolios &&
                            <Link to={ this.getNextPortfolioLink() }>
                                next <i className="fa fa-angle-right" aria-hidden="true" />
                            </Link>
                        }
                    </div>
                </div>*/}
            </div>
        );
    }
}
