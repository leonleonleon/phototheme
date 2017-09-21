import React                    from 'react';
import PropTypes                from 'prop-types';
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

    }

    /**
     * ## componentDidMount
     *
     * loads the settings from the settings server
     */
    componentDidMount()
    {

    }

    /**
     *  getImageUrl
     *
     * @param {sizes} [sizes] all the availeble image sizes
     *
     * @returns {srcSet} [set of image urls]
     */
    getImageUrl( sizes )
    {
        let counter = 0;
        const images = [];
        let tempUrl = '';
        let tempWidth = 0;
        let srcSet = '';

        {
            Object.keys( sizes ).forEach( ( key ) =>
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

        for ( let i = 0; i < ( images.length - 1 ); i++ )
        {
            const imgMax = Math.min( images[ i ][ 1 ], images[ i ][ 2 ] );
            srcSet += `${images[ i ][ 0 ]} ${imgMax}w, `;
        }

        return srcSet;
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
        const imagesObject = this.props.image.sizes;

        const srcSet = this.getImageUrl( imagesObject );

        const initialSrc = imagesObject[ 'full256' ];

        return  (
            <div
                className={ `imagewrapper ${this.props.align}
                ${this.props.valign}` }
                ref={ imageWrapper => this.imageWrapper = imageWrapper }
            >
                <img
                    src={ initialSrc }
                    onClick={ this.handleClick.bind( this ) }
                    ref={ imageObject => this.imageObject = imageObject }
                    srcSet={ srcSet }
                />
            </div>
        );
    }
}
