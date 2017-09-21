
/**
 * reqAnimationFrame
 *
 * @param  {Function} callback  callback function
 * @param  {Function} context   context of the callback function
 *
 * @return {Function}           timeout
 */
export function reqAnimationFrame( callback, context = null )
{
    if ( context )
    {
        callback.bind( context );
    }

    const rAF = window.requestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                function( callback )
                {
                    setTimeout( callback, 1000 / 60  );
                };

    return rAF( callback );
}
