import React from 'react';


const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500/";

function VideoListItem (props) {

    const {movie} = props;

    //fonction pour envoyer movie de l'enfant au parent
    function handleOnClick() {
        console.log('click', movie);
        props.callback(movie) 
    }

    return (
        
            <li className="list-group-item" onClick={handleOnClick}>
                <div className="media">
                    <div className="media-left">
                        <img className="media-object img-rounded" height="100px" width="auto" src={`${IMAGE_BASE_URL}${movie.poster_path}`} />
                        </div>
                        <div className="media-body">
                            <h5 className="title_list_item">{movie.title}</h5>
                        </div>
                    
                </div>
            </li>
        
    );
}

export default VideoListItem ;
