import React from 'react';
import VideoListItem from '../components/video-list-item';

function VideoList(props) {

    const {movieList}= props;

    console.log(movieList);

    //fonction chez le parent pour receptionner le movie de l'enfant
    function receiveCallback(movie) {
       console.log('Parent:', movie);

       props.callback(movie)
    }

    return (
        <div>
            <ul>
                {
                    movieList.map(toto => {
                        return (
                            <VideoListItem key={toto.id} movie={toto} callback={receiveCallback}/>
                        )
                    })
                }
               
          
            </ul>
        </div>
    )
}

export default VideoList;
