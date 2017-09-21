import 'sass/App.scss';
import React                from 'react';
import PropTypes            from 'prop-types';
// import Footer               from 'footer/Footer.jsx';
// import Header               from 'header/Header.jsx';
import { isEqual,
         findIndex,
         cloneDeep }        from 'lodash';
import { API_URL,
        PORTFOLIOS_API,
        CV_ID }             from 'config/app.json';

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
        page        : null,
        preloader   : true,
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
        const portfolioSlug = this.props.params.portfolio;

        // load story
        // if ( this.props.location.pathname == '/CV' && !this.state.page )
        if ( !this.state.page &&
            ( this.props.location.pathname == '/CV/' || this.props.location.pathname == '/CV' ) )
        {
            fetch( `${API_URL}/pages/${CV_ID}` )
                .then( resp => resp.json() )
                .then( page => this.setState( { page } ) );
        }

        // load all portfolios into state initially:
        if ( !this.state.portfolios )
        {
            fetch( `${API_URL}/${PORTFOLIOS_API}` )
                .then( resp => resp.json() )
                .then(
                    portfolios =>
                    {
                        const newState = {
                            portfolios  : cloneDeep( portfolios ),
                            preloader   : false,
                        };

                        if ( portfolioSlug )
                        {
                            newState.portfolio = this.getPortfolio( portfolios, portfolioSlug );
                        }

                        this.setState( newState );
                    } )
                .catch( error => console.error( error ) );
        }
        else
        {
            this.setState( {
                portfolio  : this.getPortfolio( this.state.portfolios, portfolioSlug ),
                preloader   : false,
            } );
        }

    }
    /**
     * changeBackground
     * @param {element} element [description]
     */
    changeBackground( element )
    {
        if ( this.props.location.pathname == '/CV/' || this.props.location.pathname == '/CV' )
        {
            element.style.background = '#fafafa';
        }
        else if ( this.props.location.pathname == '/' )
        {
            element.style.background = '#fff';
        }
        else
        {
            element.removeAttribute( 'style' );
        }
    }

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
     *  componentDidUpdate
     *
     *  @param {Object} prevProps       props before last change
     */
    componentDidUpdate( prevProps )
    {
        if ( !isEqual( prevProps.location, this.props.location ) )
        {
            this.setState( {
                preloader   : true,
                portfolio   : null,
            } );

            const body = document.getElementsByTagName( 'body' )[ 0 ];

            // if ( body.scrollTop !== 0 )
            // {
            //     body.scrollTop = 0;
            // }

            this.changeBackground( body );


            this.fetchData();
        }
    }

    /**
     *  App Render
     *
     *  @return {JSX} app element plus children
     */
    render()
    {
        return (
            <div className="site">
                {/*<Header />*/}

                {
                    React.Children.map(
                        this.props.children,
                        child => React.cloneElement( child, this.state )
                    )
                }

                {/*<Footer />*/}
            </div>
        );
    }
}
