import React from 'react';
import '../style.css'


function VideoDetails({title, description}) {

    //dans la parenthèse, "props" est equivalent à "let title = props.title"//
    return (
        <div>
            <div >
                <h1 className="video-details-title">
                    {title}
                </h1>
            </div>
            <div className="video-details-text">
                <p>{description}</p>
            </div>
        </div>
    )
}

export default VideoDetails;
