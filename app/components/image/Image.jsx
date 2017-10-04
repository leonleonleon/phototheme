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
        layout    : PropTypes.string,
        loadFunc  : PropTypes.func,
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
            const ratio =  window.innerWidth / window.innerHeight;

            const width = Math.round( imgMax * ratio );

            srcSet += `${images[ i ][ 0 ]} ${width}w, `;
        }

        return srcSet;
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

        const layout = this.props.layout;

        const sizes = this.props.layout === 'highlight' ? '100vw' : '(min-width: 800px) 50vw, 100vw';


        return  (
            <div
                className={ `imagewrapper ${this.props.align}
                ${this.props.valign} ${layout}` }
                ref={ imageWrapper => this.imageWrapper = imageWrapper }
            >
                <img
                    src={ initialSrc }
                    ref={ imageObject => this.imageObject = imageObject }
                    onLoad={ this.props.loadFunc }
                    srcSet={ srcSet }
                    sizes={ sizes }
                />
            </div>
        );
    }
}
