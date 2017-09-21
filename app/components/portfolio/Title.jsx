import React from 'react';

/**
 *  Title
 *
 *  @param {Object} titleProps  props passed from outside
 *
 *  @returns {Object}           React element
 */
export default function Title( titleProps )
{
    const htmlTitle = {
        __html : titleProps.content,
    };

    return (
        <div className="backfont" dangerouslySetInnerHTML={ htmlTitle } />
    );
}
