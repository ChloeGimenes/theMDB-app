import React, {Component} from 'react';
import '../style.css'

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: "", 
            placeHolder: "Recherchez votre film",
            //pour enclancher la rech à la google
            intervalBeforerequest: 1000, //en milli secondes,
            lockRequest: false, //verouiller la recherche
        }
    }

    handleChange(event) {
      
        this.setState({searchText: event.target.value});
        //rech google
        if(!this.state.lockRequest) { //Si le verrou du handlechange est ouvert on doit le bloquer 
            this.setState({lockRequest:true})
            setTimeout(function() { //On envoie au bout d'1sec notre methode search()
                this.search();
            }.bind(this), this.state.intervalBeforerequest)
        }
        }

///Recherche simple
    // handleOnClick(event) {
    //     console.log('click');
    //     this.props.callback(this.state.searchText)
    // }


///Recherche à la Google
    handleOnClick() {
        this.search();
    }

    search() {
        this.props.callback(this.state.searchText);
        // On reouvre le verrou pour réentrer dans le handle change:
        this.setState({lockRequest: false})
    }


    render(){

        return (
            <div className="row">
                <div className="col-lg-8 input-group">
                    <input className="form-control input-lg" type="text" onChange={this.handleChange.bind(this)} placeholder={this.state.placeHolder}/>
                <span className="input-group-btn">
                    <button className="btn btn-secondary" onClick={this.handleOnClick.bind(this)}>GO</button>
                </span>
                </div>
            </div>
        );
    }
}

export default SearchBar;
