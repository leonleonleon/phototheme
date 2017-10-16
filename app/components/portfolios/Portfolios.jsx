import './Portfolios.scss';
import React            from 'react';
import PropTypes        from 'prop-types';

import Preloader        from 'preloader/Preloader.jsx';
import Slide            from 'slide/Slide.jsx';

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
        random      : PropTypes.number,
    }

    state = {
        imageLoaded  : false,
        lastSlide    : null,
        current      : null,
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

        if ( currentSlide != undefined )
        {
            const current = currentSlide.slideIndex;

            const imageLoaded = this.state.imageLoaded;

            if ( imageLoaded )
            {
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
     * [hideWrapper]
     * @param  {[current]} current [description]
     */
    hideWrapper = ( current ) =>
    {
        if ( this.portfoliosObject != undefined )
        {
            this.portfoliosObject.classList.add( 'bye' );
        }

        this.setState( {
            imageLoaded : false,
            lastSlide   : current,
        } );
    }
    /**
     * [showWrapper]
     */
    showWrapper = ( ) =>
    {
        // if ( this.portfoliosObject != undefined )
        // {
        //     this.portfoliosObject.classList.add( 'show' );
        // }

        // if ( event != undefined )
        // {
        //     console.log( 'Event', event.target );
        // }
        // console.log( 'showWrapper', this );

        if ( !this.state.loaded )
        {
            this.setState( {
                imageLoaded : true,
            } );
        }

    }
    /**
     * ImagePreloaded
     * @return {[null]} [null]
     */
    imagePreloaded = ( ) =>
    {
        // console.log( 'imagePreloaded', this );

        return null;
    }

    /**
     * nextSlide
     * @param  {[number]} current [description]
     * @param  {[object]} slides  [description]
     */
    nextSlide = ( current, slides ) =>
    {
        this.hideWrapper( current );

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
        this.hideWrapper( current );

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
        // event.stopPropagation();
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
        const { preloader, slides, random } = this.props;
        // const { portfolio, index } = this.props.params;

        if ( preloader || slides.length === 0 )
        {
            return (
                <div className="loader">
                    <Preloader />
                </div>
            );
        }

        const currentSlide = slides.find( this.findSlide );

        const current = currentSlide === undefined ? random : currentSlide.slideIndex;


        const slideNum = slides.length - 1;

        const next = current + 1 <= slideNum ? current + 1 : 0;

        const prev = current - 1 >= 1 ? current - 1 : slideNum;

        // eslint-disable-next-line
        // const title = slides[ current ].title != '' ? slides[ current ].title : slides[ current ].portfolioTitle;

        // if images not loaded

        if ( !this.state.imageLoaded )
        {
            const lastSlide = this.state.lastSlide;

            if ( lastSlide != undefined && lastSlide != null )
            {
                return (
                    <div className="wrapper">
                        <div
                            className="portfolios bye"
                        >
                            <Slide
                                loadFunc={ this.imagePreloaded }
                                key={ `sld${slides[ lastSlide ].slideIndex}` }
                                slide={ slides[ lastSlide ] }
                            />
                        </div>
                        <div
                            className="portfolios"
                        >
                            <Slide
                                loadFunc={ this.showWrapper.bind( this ) }
                                key={ `sld${slides[ current ].slideIndex}` }
                                slide={ slides[ current ] }
                            />
                            <div className="loader">
                                <Preloader />
                            </div>
                        </div>
                    </div>
                );
            }

            const body = document.getElementsByTagName( 'body' )[ 0 ];

            body.style.background = slides[ current ].background;

            return (
                <div
                    className="portfolios"
                >
                    <Slide
                        loadFunc={ this.showWrapper.bind( this ) }
                        key={ `sld${slides[ current ].slideIndex}` }
                        slide={ slides[ current ] }
                    />
                    <div className="loader">
                        <Preloader />
                    </div>

                </div>
            );
        }
        // eslint-disable-next-line
        const slideTitle = slides[ current ].title != '' ? slides[ current ].title : slides[ current ].portfolioTitle;

        document.title = `Leon Reindl / ${slideTitle}`;

        return (
            <div className="wrapper">
                <div
                    className="portfolios show"
                    onClick={ ( event ) => this.handleClick( slides, event, current ) }
                >
                    <Slide
                        loadFunc={ this.imagePreloaded }
                        key={ `sld${slides[ current ].slideIndex}` }
                        slide={ slides[ current ] }
                    />
                </div>
                <div
                    className="portfolios"
                >
                    <Slide
                        loadFunc={ this.imagePreloaded }
                        key={ `sld${slides[ next ].slideIndex}` }
                        slide={ slides[ next ] }
                    />
                </div>
                <div
                    className="portfolios"
                >
                    <Slide
                        loadFunc={ this.imagePreloaded }
                        key={ `sld${slides[ prev ].slideIndex}` }
                        slide={ slides[ prev ] }
                    />
                </div>
            </div>
        );
    }
}

