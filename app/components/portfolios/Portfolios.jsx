import './Portfolios.scss';
import React            from 'react';
import PropTypes        from 'prop-types';
import Image            from 'image/Image.jsx';

import Preloader        from 'preloader/Preloader.jsx';

/**
 *  Portfolios Component
 */
export default class Portfolios extends React.PureComponent
{
    static propTypes = {
        preloader   : PropTypes.bool,
        portfolios  : PropTypes.array,
    }

    state = {
        current : 0,
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

    toggleOpacity = () =>
    {
        if ( this.portfoliosObject != undefined )
        {
            if ( this.portfoliosObject.style.opacity != '1' )
            {
                this.portfoliosObject.style.opacity = 1;
            }
            else
            {
                this.portfoliosObject.style.opacity = 0;
            }
        }
    }

    /**
     * handleCLick
     * @param {array} [slides] [description]
     * @param {event} [event] [description]
     */
    handleClick( slides, event )
    {
        const { current } = this.state;
        const mouseX = event.pageX;
        const windowCenter = window.innerWidth / 2;
        this.toggleOpacity();

        // click left
        if ( mouseX < windowCenter )
        {
            if ( ( current - 1 ) >= 0 )
            {
                const newCurrent = current - 1;

                this.setState( {
                    current : newCurrent,
                } );
            }
            else
            {
                this.setState( {
                    current : slides.length - 1,
                } );
            }
        }
        else if ( ( current + 1 ) < slides.length )
        {
            const newCurrent = current + 1;

            this.setState( {
                current : newCurrent,
            } );
        }
        else
        {
            this.setState( {
                current : 0,
            } );
        }
    }

    /**
     *  Portfolios Render
     *
     *  @return {JSX} Portfolio element plus children
     */
    render()
    {
        const { preloader, portfolios } = this.props;
        const { current } = this.state;



        const slides = [];

        if ( portfolios != undefined && slides.length === 0 )
        {

            portfolios.map( ( portfolio ) =>
            {

                portfolio.acf.slides.map( ( slide ) =>
                {
                    slides.push( slide );
                } );
            } );
        }

        if ( preloader && slides.length === 0 ) return <Preloader />;

        const slideNum = slides.length - 1;

        const next = current + 1 <= slideNum ? current + 1 : 0;

        return (
            <div
                className="portfolios"
                ref={ portfoliosObject => this.portfoliosObject = portfoliosObject }
                onClick={ ( event ) => this.handleClick( slides, event ) }
            >
                <Image
                    image={ slides[ current ].image }
                    align={ slides[ current ].align }
                    valign={ slides[ current ].valign }
                    wrapper={ this.toggleOpacity.bind( this ) }
                    highlight={ slides[ current ].highlight }
                    hidden={ false }
                />
                <Image
                    image={ slides[ next ].image }
                    align={ slides[ next ].align }
                    valign={ slides[ next ].valign }
                    wrapper={ this.toggleOpacity }
                    highlight={ slides[ next ].highlight }
                    hidden={ true }
                />
            </div>
        );
    }
}
