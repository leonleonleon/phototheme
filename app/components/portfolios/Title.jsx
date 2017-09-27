import React                    from 'react';
import PropTypes                from 'prop-types';
/**
 *  Title Component
 */
export default class Title extends React.Component
{
    static propTypes = {
        children    : PropTypes.string,
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
     *  Title Render
     *
     *  @return {JSX} Title element plus children
     */
    render()
    {
        return  (
            <div
                className="title"
            >
                { this.props.children }
            </div>
        );
    }
}
