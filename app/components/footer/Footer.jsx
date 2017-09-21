import React from 'react';

/**
 *  Footer
 *
 *  @return {Object} Footer Component
 */
export default function Footer()
{
    return (
        <div className="footer">
            <ul role="nav">
                <li>
                    <a href="http://www.github.com/leonleonleon" target="_blank">
                        <i className="fa fa-github" aria-hidden="true" />
                    </a>
                </li>
                <li>
                    <a href="http://www.linkedin.com/in/leon-reindl" target="_blank">
                        <i className="fa fa-linkedin-square" aria-hidden="true" />
                    </a>
                </li>
                <li>
                    <a href="https://www.facebook.com/lionklion" target="_blank">
                        <i className="fa fa-facebook-square" aria-hidden="true" />
                    </a>
                </li>
                <li>
                    <a href="https://www.instagram.com/leonreindl/" target="_blank">
                        <i className="fa fa-instagram" aria-hidden="true" />
                    </a>
                </li>
            </ul>
        </div>
    );
}
