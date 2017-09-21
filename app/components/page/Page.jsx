import './Page.scss';
import React        from 'react';
import PropTypes    from 'prop-types';
import Preloader    from 'preloader/Preloader.jsx';
import Image        from 'image/Image.jsx';

/**
 *  Page Component
 *
 *  @param {Object} props React props from the app component
 *
 *  @returns {Object} React element page
 */
export default function Page( props )
{

    if ( !props.page ) return <Preloader />;

    const image = props.page.acf.image;
    const innerHtml = { __html : props.page.content.rendered };

    return (
        <div className="page">
            <Image image={ image } />
            <div className="text" dangerouslySetInnerHTML={ innerHtml } />
        </div>
    );
}

Page.propTypes = {
    page            : PropTypes.shape( {
        content : PropTypes.object,
        acf     : PropTypes.object,
    } ),
    setBodyColor    : PropTypes.func,
};
