import React                from 'react';
import { Link }             from 'react-router';
import { PORTFOLIO_SLUG }   from 'config/app.json';
import Image                from 'image/Image.jsx';
/**
 *  PortfolioItem
 *
 *  @param {Object} itemProps props that are passed to the component
 *
 *  @returns {Object} react element
 */
export default function PortfolioItem( itemProps )
{
    // const { slug, acf : { slides }, title } = itemProps;
    const { slug, acf : { slides } } = itemProps;
    const url = `/${PORTFOLIO_SLUG}/${slug}`;
    const image = slides[ 0 ].image;
    const align = slides[ 0 ].align;
    const valign = slides[ 0 ].valign;
    // const htmlTitle = {
    //     __html : title.rendered,
    // };
    const highlight = slides[ 0 ].highlight;

    let highlightClass = '';

    if ( highlight )
    {
        highlightClass = 'highlight';
    }

    if ( slides[ 1 ] === undefined )
    {
        return (
            <div className={ `portfolio-item ${highlightClass}` } data-slug={ slug }>
                <Image image={ image } align={ align } valign={ valign } />
                {/*<div className="description" dangerouslySetInnerHTML={ htmlTitle } />*/}
            </div>
        );
    }

    return (
        <div className="portfolio-item" data-slug={ slug }>
            <Link to={ url }>
                <Image image={ image } align={ align } valign={ valign } />
                {/*<div className="description" dangerouslySetInnerHTML={ htmlTitle } />*/}
            </Link>
        </div>
    );
}
