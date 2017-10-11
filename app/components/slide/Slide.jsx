import React                    from 'react';
import PropTypes                from 'prop-types';
import './Slide.scss';

import Title                    from 'portfolios/Title.jsx';
import Image                    from 'image/Image.jsx';

/**
 *  Slide Component
 */
export default class Slide extends React.Component
{
    static propTypes = {
        slide     : PropTypes.object,
        loadFunc     : PropTypes.func,
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
     * imageLoaded
     * @return {[null]} [null]
     */
    imageLoaded = () =>
    {
        return null;
    }

    /**
     *  Slide Render
     *
     *  @return {JSX} Slide element plus children
     */
    render()
    {
        const slide = this.props.slide;
        const title = slide.title != '' ? slide.title : slide.portfolioTitle;

        const content = slide.content != '' ? slide.content : slide.portfolioTitle;

        if ( slide.layout === 'twoImages' )
        {
            //two pictures
            return (
                <div
                    className="full"
                >
                    <Image
                        image={ slide.image }
                        align={ slide.align }
                        valign={ slide.valign }
                        loadFunc={ this.imageLoaded }
                        layout="first"
                    />
                    <Image
                        image={ slide.secondimage }
                        align={ slide.secondAlign }
                        valign={ slide.secondValign }
                        loadFunc={ this.props.loadFunc }
                        layout="second"
                    />
                    <Title
                        firstText={ title }
                        secondText={ content }
                        className="title"
                    />

                </div>
            );
        }

        // single picture
        return (
            <div className="full">
                <Image
                    image={ slide.image }
                    align={ slide.align }
                    valign={ slide.valign }
                    loadFunc={ this.props.loadFunc }
                    layout={ slide.layout }
                />
                <Title
                    firstText={ title }
                    secondText={ content }
                    className="title"
                />
            </div>
        );
    }
}
