import './Portfolios.scss';
import React            from 'react';
import PropTypes        from 'prop-types';
import Image            from 'image/Image.jsx';

import Preloader        from 'preloader/Preloader.jsx';

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
    }

    state = {
        current : 0,
        slides  : [],
    }

    /**
     * componentWillUpdate
     */
    componentWillUpdate( )
    {
        // if ( this.portfoliosObject != undefined )
        // {
        //     // const img = this.portfoliosObject;
        //     // img.style.opacity = 0;
        //     this.toggleOpacity();
        // }
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

        const { slides } = this.state;
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
            this.portfoliosObject.classList.add( 'hidden' );
        }
    }
    showWrapper = () =>
    {
        if ( this.portfoliosObject != undefined )
        {
            this.portfoliosObject.classList.remove( 'hidden' );
        }
    }
    /**
     * nextSlide
     * @param  {[number]} current [description]
     * @param  {[object]} slides  [description]
     */
    nextSlide = ( current, slides ) =>
    {
        this.hideWrapper();

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
            browserHistory.push( `/${newPortfolio}` );
        }
    }
    /**
     * prevSlide
     * @param  {[number]} current [description]
     * @param  {[object]} slides  [description]
     */
    prevSlide = ( current, slides ) =>
    {
        this.hideWrapper();

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
    }

    /**
     * handleCLick
     * @param {array} [slides] [description]
     * @param {event} [event] [description]
     * @param {number} [current] [description]
     */
    handleClick( slides, event, current )
    {
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
     * componentWillReceiveProps
     *
     * @param {[props]} [nextProps] [description]
     */
    componentWillReceiveProps( nextProps )
    {
        const portfolios = nextProps.portfolios;
        const { slides } = this.state;

        if ( portfolios != undefined && slides.length === 0 )
        {
            const tempSlides = [];
            let counter = 0;

            portfolios.map( ( portfolio ) =>
            {
                portfolio.acf.slides.map( ( slide, index ) =>
                {
                    const newSlide = slide;
                    newSlide[ 'portfolio' ] = portfolio.slug;
                    newSlide[ 'index' ] = index;
                    newSlide[ 'slideIndex' ] = counter;

                    counter += 1;
                    tempSlides.push( newSlide );
                } );
            } );

            this.setState( { slides : tempSlides } );
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

        const antiZero = index != undefined ? parseInt( index ) : 0;

        return portfolio === slide.portfolio && antiZero === slide.index;

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
        const { preloader } = this.props;
        const { slides } = this.state;

        // const { portfolio, index } = this.props.params;


        if ( preloader || slides.length === 0 ) return <Preloader />;

        const currentSlide = slides.find( this.findSlide );
        const current = currentSlide.slideIndex;

        const slideNum = slides.length - 1;

        const next = current + 1 <= slideNum ? current + 1 : 0;

        const prev = current - 1 >= 1 ? current - 1 : slideNum;

        return (
            <div
                className="portfolios"
                ref={ portfoliosObject => this.portfoliosObject = portfoliosObject }
                onClick={ ( event ) => this.handleClick( slides, event, current ) }
            >
                <Image
                    image={ slides[ current ].image }
                    align={ slides[ current ].align }
                    valign={ slides[ current ].valign }
                    wrapper={ this.showWrapper.bind( this ) }
                    highlight={ slides[ current ].highlight }
                    hidden={ false }
                />
                <Image
                    image={ slides[ next ].image }
                    hidden={ true }
                />
                <Image
                    image={ slides[ prev ].image }
                    hidden={ true }
                />
            </div>
        );
    }
}
