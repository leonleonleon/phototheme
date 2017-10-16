import 'sass/App.scss';
import React                from 'react';
import PropTypes            from 'prop-types';
// import Footer               from 'footer/Footer.jsx';
// import Header               from 'header/Header.jsx';
import Title                from 'portfolios/Title.jsx';
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
        history     : PropTypes.object,
    }

    state = {
        portfolios   : null,
        preloader    : true,
        slides       : null,
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
            fetch( `${API_URL}/${PORTFOLIOS_API}?per_page=100` )
                .then( resp => resp.json() )
                .then(
                    portfolios =>
                    {

                        const tempSlides = [];
                        let counter = 0;

                        // shuffle portfolios
                        const shuffleArray = ( arr ) => arr.sort( () => Math.random() - 0.5 );

                        const shuffle = shuffleArray( portfolios );
                        // portfolios.map( ( portfolio ) =>
                        shuffle.map( ( portfolio ) =>
                        {
                            portfolio.acf.slides.map( ( slide, index ) =>
                            {
                                const newSlide = slide;
                                newSlide[ 'portfolio' ] = portfolio.slug;
                                newSlide[ 'portfolioTitle' ] = portfolio.title.rendered;
                                newSlide[ 'index' ] = index;
                                newSlide[ 'slideIndex' ] = counter;
                                newSlide[ 'content' ] = portfolio.content.rendered;

                                counter += 1;
                                tempSlides.push( newSlide );
                            } );
                        } );


                        const random = Math.floor( Math.random() * ( tempSlides.length - 1 ) );

                        const newState = {
                            portfolios  : cloneDeep( portfolios ),
                            preloader   : false,
                            slides      : tempSlides,
                            random      : random,
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

        const element = document.getElementsByTagName( 'html' )[ 0 ];

        // left
        if ( mouseX < windowCenter )
        {
            element.classList.remove( 'rightmouse' );
            element.classList.add( 'leftmouse' );
        }
        else
        {
            element.classList.remove( 'leftmouse' );
            element.classList.add( 'rightmouse' );
        }
    }
     /**
     * componentWillMount
     */
    componentWillMount()
    {
        window.addEventListener( 'mousemove', this.mouseMove.bind( this ) );
    }
    /**
     * componentWillUnmount
     */
    componentWillUnmount()
    {
        window.removeEventListener( 'mousemove', this.mouseMove.bind( this ) );
    }

    /**
     * ## componentDidMount
     *
     * loads the settings from the settings server
     */
    componentDidMount()
    {
        this.fetchData();

        // const body = document.getElementsByTagName( 'body' )[ 0 ];

        // this.changeBackground( body );



    }

    /**
     *  App Render
     *
     *  @return {JSX} app element plus children
     */
    render()
    {
        const mOne = 'info';
        const mTwo = 'leonreindl';
        //                 onMouseMove={ this.mouseMove.bind( this ) }
        // eslint-disable-next-line
        if ( ( navigator.userAgent.match( /iPhone/i ) ) || ( navigator.userAgent.match( /iPod/i ) ) )
        {
            if ( window.innerHeight < window.innerWidth )
            {
                document.getElementsByTagName( 'html' )[ 0 ].style.height = 'calc( 100% + 1px)';
            }
        }

        return (
            <div
                className="site"
            >
                <Title
                    firstText="Leon Reindl"
                    secondText={ `${mOne}@${mTwo}.de / +49 178 40 80 478` }
                    className="backfont"
                />

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
