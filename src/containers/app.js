import React, {Component} from 'react';
import SearchBar from '../components/search-bar';
import VideoList from './video-list';
import axios from 'axios';
import VideoDetails from '../components/video-details';
import Video from '../components/video';
import '../style.css'

const API_END_POINT = "https://api.themoviedb.org/3/"
const POPULAR_MOVIES_URL = "discover/movie?language=fr&sort_by=popularity.desc&include_adult=false&append_to_response=images"
const API_KEY = process.env.REACT_APP_API_KEY
const SEARCH_URL = "search/movie?language=fr&include_adult=false"


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {movieList:{}, currentMovie:{}}
  }

  componentWillMount() {

      this.initMovies();

  }


  initMovies() {

    axios.get(
      `${API_END_POINT}${POPULAR_MOVIES_URL}&${API_KEY}`
    ).then(function(response) {
      
      //On remplit le state avec le 1er film populaire et avec 5 films populaires (de 1 à 5):
      this.setState({movieList: response.data.results.slice(1,6), currentMovie: response.data.results[0]}, function(){
        this.applyVideoToCurrentMovie();
      });
      //On relie la fonction de rech de response au state avec bind:
    }.bind(this));

  }

  applyVideoToCurrentMovie() {
//On va rechercher la video associée à l'id des film:
    axios.get(
      `${API_END_POINT}movie/${this.state.currentMovie.id}?${API_KEY}&append_to_response=videos&include_adult=false`

    ).then(function(response) {
      
      const youtubeKey = response.data.videos.results[0].key;
      let newCurrentMovieState = this.state.currentMovie;
      newCurrentMovieState.videoId = youtubeKey;
      this.setState({ currentMovie: newCurrentMovieState});

      console.log(newCurrentMovieState);
      
    }.bind(this));
  }

//fonction pour afficher le film clické dans la liste des recommendatios / On va récupérer le movie du parent du movie de l'enfant 
//"function() est rajouté pour bien mettre à jour le state"
  onClickListItem(movie) {
    this.setState({currentMovie: movie}, function() {
      this.applyVideoToCurrentMovie(); //On affiche le film clické
      this.setRecommendation(); //On met à jour la liste des recommendations 
    })
  }


//fonction pour rechercher un film
  onClickSearch(searchText) {
    console.log(searchText);

    if(searchText){ //On fait la recherche que s'il y a du texte

    axios.get(
      `${API_END_POINT}${SEARCH_URL}&${API_KEY}&query=${searchText}`
    ).then(function(response) {
      if(response.data && response.data.results[0]){// On verifie qu'il y a bien une réponse et un résultat dedans.
        if(response.data.results[0].id != this.state.currentMovie.id){ //On verfifie que ce que le resultat qu'on reçoit est bien different du film actuel
          this.setState({currentMovie: response.data.results[0]}, ()=> {
            this.applyVideoToCurrentMovie();//Mets à jour la video à aafficher selon la recherche
            this.setRecommendation(); //Met à jour la liste des 5films recommendés
          })
        }
      }
      //On relie la fonction de rech de response au state avec bind:
    }.bind(this));
  }
  }

  setRecommendation(){

    axios.get(
      `${API_END_POINT}movie/${this.state.currentMovie.id}/recommendations?&${API_KEY}&language=fr`
    ).then(function(response) {
      
      //On remplit le state avec les 5 premiers films RECOMMANDES 
      this.setState({movieList: response.data.results.slice(0,5)});
      //On relie la fonction de rech de response au state avec bind:
    }.bind(this));

  }


  render() {
  
    const renderVideoList = () => {
      if(this.state.movieList.length >= 5) {
        return <VideoList movieList={this.state.movieList} callback={this.onClickListItem.bind(this)} />
      }
    }
  
    return (
      <div className="container">
        <p className="app-title">TRAILER.COM</p>
        <div className="search_bar">
          <SearchBar callback={this.onClickSearch.bind(this)} />
        </div>
        <div className="row">
          <div className="col-md-8">
            <Video videoId={this.state.currentMovie.videoId}/>
            <VideoDetails title={this.state.currentMovie.title} description={this.state.currentMovie.overview}/>
          </div>
          <div className="col-md-4">
            {renderVideoList()}
          </div>
        </div>
      </div>
    )
  }
}

export default App;

