import 'sass/App.scss';
import React                from 'react';
import PropTypes            from 'prop-types';
// import Footer               from 'footer/Footer.jsx';
// import Header               from 'header/Header.jsx';
import { findIndex,
         cloneDeep }        from 'lodash';
import { API_URL,
        PORTFOLIOS_API,
            }             from 'config/app.json';

/**
 *  App Component
 */
export default class App extends React.Component
{
    static propTypes = {
        children    : PropTypes.oneOfType( [
            PropTypes.arrayOf( PropTypes.element ),
            PropTypes.element,
        ] ),
        params      : PropTypes.object,
        location    : PropTypes.object,
    }

    state = {
        portfolios  : null,
        portfolio   : null,
        preloader   : true,
        slides      : null,
    }

    /**
     *  getPortfolio
     *
     *  @param   {Array}    portfolios list of portfolios
     *  @param   {String}   slug       page slug to select portfolio with
     *
     *  @returns {Null|Object}         selected portfolio or null if not in list
     */
    getPortfolio = ( portfolios, slug ) =>
    {
        const portfolioIndex    = findIndex( portfolios, { slug } );

        if ( portfolioIndex > -1 )
        {
            return cloneDeep( portfolios[ portfolioIndex ] );
        }

        return null;
    }

    /**
     *  fetchData
     */
    fetchData()
    {
        // load all portfolios into state initially:
        if ( !this.state.portfolios )
        {
            fetch( `${API_URL}/${PORTFOLIOS_API}` )
                .then( resp => resp.json() )
                .then(
                    portfolios =>
                    {

                        const tempSlides = [];
                        let counter = 0;

                        portfolios.map( ( portfolio ) =>
                        {
                            portfolio.acf.slides.map( ( slide, index ) =>
                            {
                                const newSlide = slide;
                                newSlide[ 'portfolio' ] = portfolio.slug;
                                newSlide[ 'portfolioTitle' ] = portfolio.title.rendered;
                                newSlide[ 'index' ] = index;
                                newSlide[ 'slideIndex' ] = counter;

                                counter += 1;
                                tempSlides.push( newSlide );
                            } );
                        } );

                        const newState = {
                            portfolios  : cloneDeep( portfolios ),
                            preloader   : false,
                            slides      : tempSlides,
                        };

                        this.setState( newState );
                    } )
                .catch( error => console.error( error ) );
        }

    }
    /**
     * changeBackground
     * @param {element} element [description]
     */
    changeBackground( element )
    {
        if ( this.props.location.pathname == '/' )
        {
            element.style.background = '#fff';
        }
        else
        {
            element.style.background = '#fafafa';
        }
    }
    /**
     * mouseMove
     * @param  {[event]} event [description]
     */
    mouseMove = ( event ) =>
    {
        const mouseX = event.clientX;
        const windowCenter = window.innerWidth / 2;

        // left
        if ( mouseX < windowCenter )
        {
            document.getElementsByTagName( 'body' )[ 0 ].classList.remove( 'right' );
            document.getElementsByTagName( 'body' )[ 0 ].classList.add( 'left' );
        }
        else
        {
            document.getElementsByTagName( 'body' )[ 0 ].classList.remove( 'left' );
            document.getElementsByTagName( 'body' )[ 0 ].classList.add( 'right' );
        }
    }
    //  /**
    //  * componentWillMount
    //  */
    // componentWillMount()
    // {
    //     window.addEventListener( 'onMouseMove', this.mouseMove.bind( this ) );
    // }
    // /**
    //  * componentWillUnmount
    //  */
    // componentWillUnmount()
    // {
    //     window.removeEventListener( 'onMouseMove', this.mouseMove.bind( this ) );
    // }

    /**
     * ## componentDidMount
     *
     * loads the settings from the settings server
     */
    componentDidMount()
    {
        this.fetchData();

        const body = document.getElementsByTagName( 'body' )[ 0 ];

        this.changeBackground( body );



    }

    /**
     *  App Render
     *
     *  @return {JSX} app element plus children
     */
    render()
    {
        return (
            <div
                className="site"
                onMouseMove={ this.mouseMove.bind( this ) }
            >
                <div className="backfont">Leon Reindl</div>

                {
                    React.Children.map(
                        this.props.children,
                        child => React.cloneElement( child, this.state )
                    )
                }
            </div>
        );
    }
}
