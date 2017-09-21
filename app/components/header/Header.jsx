import React    from 'react';
import { Link } from 'react-router';

/**
 *  Header
 *
 *  @returns {Object} react stateless component
 */
export default function Header()
{
    return (
        <div className="header">
            <h1><Link to="/">leon reindl</Link></h1>
            <ul role="nav">
                {/*<li><Link to="/">Projects</Link></li>
                                <li><Link to="/CV">CV</Link></li>*/}
            </ul>
        </div>
    );
}
