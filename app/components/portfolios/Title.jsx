import React                    from 'react';
import PropTypes                from 'prop-types';
/**
 *  Title Component
 */
export default class Title extends React.Component
{
    static propTypes = {
        firstText    : PropTypes.string,
        secondText   : PropTypes.string,
        className    : PropTypes.string,
    }

    state = {
        showSecondText : false,
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
     * handleClick
     * @param  {[event]} event [description]
     */
    handeClick = ( event ) =>
    {
        const { showSecondText } = this.state;

        event.stopPropagation();

        if ( showSecondText )
        {
            this.setState( {
                showSecondText : false,
            } );
        }
        else
        {
            this.setState( {
                showSecondText : true,
            } );
        }
    }
    /**
     *  Title Render
     *
     *  @return {JSX} Title element plus children
     */
    render()
    {
        const { showSecondText } = this.state;
        const className = this.props.className;
        const firstText = { __html : this.props.firstText };
        const secondText = { __html : this.props.secondText };

        if ( showSecondText )
        {
            return  (
                <div
                    onClick={ this.handeClick.bind( this ) }
                    className={ className }
                    dangerouslySetInnerHTML={ secondText }
                />
            );
        }

        return  (
            <div
                onClick={ this.handeClick.bind( this ) }
                className={ className }
                dangerouslySetInnerHTML={ firstText }
            />
        );
    }
}
