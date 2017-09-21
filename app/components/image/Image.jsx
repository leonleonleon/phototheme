import React                    from 'react';
import PropTypes                from 'prop-types';
import { reqAnimationFrame }    from 'utils/helperUtils.js';
import Preloader                from 'preloader/Preloader.jsx';
import './Image.scss';
/**
 *  Image Component
 */
export default class Image extends React.Component
{
    static propTypes = {
        image     : PropTypes.object,
        align     : PropTypes.string,
        valign    : PropTypes.string,
        highlight : PropTypes.bool,
    }

    /**
     * ## constructor
     *
     * sets the initial state
     */
    constructor()
    {
        super( ...arguments );

        this.state = {
            preloader : true,
            max       : 200,
        };
    }

    /**
     * ## componentDidMount
     *
     * loads the settings from the settings server
     */
    componentDidMount()
    {
        reqAnimationFrame( () =>
        {
            const node = this.imageWrapper;
            const width = node.clientWidth;
            const height = node.clientHeight;
            // console.log(width);
            const max = Math.min( width, height ) * 2;

            this.setState( {
                preloader : false,
                max       : max,
            } );
        } );

    }
    /**
     *  getImageUrl
     *
     * @param {sizes} [sizes] all the availeble image sizes
     * @param {max} [max] max need size
     *
     * @returns {ImageUrl} [image url]
     */
    getImageUrl( sizes, max )
    {
        let counter = 0;
        const images = [];
        let tempUrl = '';
        let tempWidth = 0;
        {
            Object.keys( sizes ).map( ( key ) =>
            {
                counter += 1;
                if ( counter === 1 )
                {
                    tempUrl = sizes[ key ];
                }
                if ( counter === 2 )
                {
                    tempWidth = sizes[ key ];
                }
                if ( counter === 3 )
                {
                    images.push( [ tempUrl, tempWidth, sizes[ key ] ] );

                    counter = 0;
                }
            } );
        }

        for ( let i = 0; i < images.length; i++ )
        {
            const imgMax = Math.min( images[ i ][ 1 ], images[ i ][ 2 ] );
            if ( imgMax >= max )
            {
                return images[ i ][ 0 ];
            }
        }

        return images[ images.length - 1 ][ 0 ];
    }

    /**
     *  handleImageLoaded
     *  change parent opacity / fadeIn
     */
    handleImageLoaded()
    {
        // this.imageWrapper.style.opacity = 1;
        if ( this.imageWrapper.parentNode.parentNode != undefined )
        {
            this.imageWrapper.parentNode.parentNode.style.opacity  = 1;
        }
        if ( this.imageWrapper.parentNode != undefined )
        {
            this.imageWrapper.parentNode.style.opacity  = 1;
        }
        // if ( this.imageWrapper.parentNode.parentNode.parentNode != undefined )
        // {
        //     this.imageWrapper.parentNode.parentNode.parentNode.style.opacity  = 1;
        // }
        if ( this.imageWrapper.firstChild != undefined )
        {
            this.imageWrapper.firstChild.style.opacity  = 1;
        }
    }

    /**
     *  handleClick
     *  zoom in
     */
    handleClick()
    {
        this.imageObject.classList.toggle( 'zoom' );
    }

    /**
     *  Image Render
     *
     *  @return {JSX} Image element plus children
     */
    render()
    {
        const { preloader, max } = this.state;

        if ( preloader )
        {

            return  (
                <div
                    className={ `imagewrapper ${this.props.align}
                    ${this.props.valign}` }
                    ref={ imageWrapper => this.imageWrapper = imageWrapper }
                >
                    <Preloader />
                </div>
            );
        }

        const imageUrl = this.getImageUrl( this.props.image.sizes, max );

        // let highlightClass = '';

        // if ( this.props.highlight )
        // {
        //     highlightClass = 'highlight';
        // }

        return  (
            <div
                className={ `imagewrapper ${this.props.align}
                ${this.props.valign}` }
                ref={ imageWrapper => this.imageWrapper = imageWrapper }
            >
                <img
                    onLoad={ this.handleImageLoaded.bind( this ) }
                    src={ imageUrl }
                    onClick={ this.handleClick.bind( this ) }
                    ref={ imageObject => this.imageObject = imageObject }
                />
            </div>
        );
    }
}
