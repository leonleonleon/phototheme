import './Portfolios.scss';
import React            from 'react';
import PropTypes        from 'prop-types';
import Image            from 'image/Image.jsx';

import Preloader        from 'preloader/Preloader.jsx';
import Title            from './Title.jsx';

import { browserHistory }        from 'react-router';

/**
 *  Portfolios Component
 */
export default class Portfolios extends React.PureComponent
{
    static propTypes = {
        preloader   : PropTypes.bool,
        portfolios  : PropTypes.array,
        params      : PropTypes.object,
        slides      : PropTypes.array,
    }

    state = {
        imageLoaded : false,
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

        const { slides } = this.props;
        const currentSlide = slides.find( this.findSlide );
        const current = currentSlide.slideIndex;

        switch ( keycode )
        {
        case 37:
            this.prevSlide( current, slides );
            break;
        case 39:
            this.nextSlide( current, slides );
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

    hideWrapper = () =>
    {
        if ( this.portfoliosObject != undefined )
        {
            this.portfoliosObject.classList.remove( 'show' );
        }

        this.setState( { imageLoaded : false } );
    }
    showWrapper = () =>
    {
        if ( this.portfoliosObject != undefined )
        {
            this.portfoliosObject.classList.add( 'show' );
        }

        this.setState( { imageLoaded : true } );
    }
    /**
     * ImagePreloaded
     * @return {[null]} [null]
     */
    imagePreloaded = ( ) =>
    {
        return null;
    }

    /**
     * nextSlide
     * @param  {[number]} current [description]
     * @param  {[object]} slides  [description]
     */
    nextSlide = ( current, slides ) =>
    {
        this.hideWrapper();

        // setTimeout( () =>
        // {
        if ( ( current + 1 ) < slides.length )
        {
            const newCurrent = current + 1;

            const newPortfolio = slides[ newCurrent ].portfolio;
            const newIndex = slides[ newCurrent ].index != 0 ? slides[ newCurrent ].index : '';

            browserHistory.push( `/${newPortfolio}/${newIndex}` );
        }
        else
        {
            const newPortfolio = slides[ 0 ].portfolio;
            browserHistory.push( `/${newPortfolio}/` );
        }
        // }, 250 );
    }

    /**
     * prevSlide
     * @param  {[number]} current [description]
     * @param  {[object]} slides  [description]
     */
    prevSlide = ( current, slides ) =>
    {
        this.hideWrapper();

        // setTimeout( () =>
        // {
        if ( ( current - 1 ) >= 0 )
        {
            const newCurrent = current - 1;

            const newPortfolio = slides[ newCurrent ].portfolio;
            const newIndex = slides[ newCurrent ].index > 0 ? slides[ newCurrent ].index : '';

            browserHistory.push( `/${newPortfolio}/${newIndex}` );
        }
        else
        {
            const newCurrent = slides.length - 1;

            const newPortfolio = slides[ newCurrent ].portfolio;
            const newIndex = slides[ newCurrent ].index;

            browserHistory.push( `/${newPortfolio}/${newIndex}` );
        }
        // }, 250 );
    }

    /**
     * handleCLick
     * @param {array} [slides] [description]
     * @param {event} [event] [description]
     * @param {number} [current] [description]
     */
    handleClick( slides, event, current )
    {
        event.preventDefault();

        const mouseX = event.pageX;
        const windowCenter = window.innerWidth / 2;

        // click left
        if ( mouseX < windowCenter )
        {
            this.prevSlide( current, slides );
        }
        else
        {
            this.nextSlide( current, slides );
        }
    }

    /**
     * findSlide
     * @param  {[object]} slide [description]
     * @return {[object]}       [description]
     */
    findSlide = ( slide ) =>
    {
        const { portfolio, index } = this.props.params;

        const defaultIndex = index != undefined ? parseInt( index ) : 0;

        return portfolio === slide.portfolio && defaultIndex === slide.index;

        // if ( portfolio === slide.portfolio && parseInt( index ) === slide.index )
        // {
        //     return slide.slideIndex;
        // }
    }

    /**
     *  Portfolios Render
     *
     *  @return {JSX} Portfolio element plus children
     */
    render()
    {
        const { preloader, slides } = this.props;

        // const { portfolio, index } = this.props.params;

        if ( preloader || slides.length === 0 ) return <Preloader />;

        const currentSlide = slides.find( this.findSlide );
        const random = Math.floor( Math.random() * ( slides.length - 1 ) );
        const current = currentSlide === undefined ? random : currentSlide.slideIndex;

        const slideNum = slides.length - 1;

        const next = current + 1 <= slideNum ? current + 1 : 0;

        const prev = current - 1 >= 1 ? current - 1 : slideNum;

        const title = slides[ current ].title != '' ? slides[ current ].title : slides[ current ].portfolioTitle; //eslint-disable-line

        const body = document.getElementsByTagName( 'body' )[ 0 ];

        body.style.background = slides[ current ].background;

                //<Image
                //    image={ slides[ next ].image }
                //    hidden={ true }
                ///>
                //<Image
                //    image={ slides[ prev ].image }
                //    hidden={ true }
                ///>
        if ( this.state.imageLoaded )
        {
            return (
                <div className="wrapper">
                    <div
                        className="portfolios show"
                        ref={ portfoliosObject => this.portfoliosObject = portfoliosObject }
                        onClick={ ( event ) => this.handleClick( slides, event, current ) }
                    >
                        <Image
                            image={ slides[ current ].image }
                            align={ slides[ current ].align }
                            valign={ slides[ current ].valign }
                            loadFunc={ this.imagePreloaded.bind( this ) }
                            highlight={ slides[ current ].highlight }
                        />
                        <Title>{ title }</Title>

                    </div>
                    <div
                        className="portfolios"
                    >
                        <Image
                            image={ slides[ next ].image }
                            align={ slides[ next ].align }
                            valign={ slides[ next ].valign }
                            loadFunc={ this.imagePreloaded.bind( this ) }
                            highlight={ slides[ next ].highlight }
                        />
                    </div>
                    <div
                        className="portfolios"
                    >
                        <Image
                            image={ slides[ prev ].image }
                            align={ slides[ prev ].align }
                            valign={ slides[ prev ].valign }
                            loadFunc={ this.imagePreloaded.bind( this ) }
                            highlight={ slides[ prev ].highlight }
                        />
                    </div>
                </div>
            );
        }

        return (
            <div
                className="portfolios"
                ref={ portfoliosObject => this.portfoliosObject = portfoliosObject }
            >
                <Image
                    image={ slides[ current ].image }
                    align={ slides[ current ].align }
                    valign={ slides[ current ].valign }
                    loadFunc={ this.showWrapper.bind( this ) }
                    highlight={ slides[ current ].highlight }
                />
                <div className="loader">
                    <Preloader />
                </div>

            </div>
        );
    }
}

