import React from "react";
import "./App.css";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      celebrities: [],
      displayInfo: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    axios.get("https://api.themoviedb.org/3/person/popular?page=1&api_key=b65927a56dd662d710f9591313a47810")
      .then(response => {
        this.setState({
          celebrities: response.data.results
        });
      });
  }
  handleClick(e, celebrity) {
    e.preventDefault();

    let selectedCeleb = [...this.state.celebrities].find(
      celeb => celeb.id === celebrity.id
    );
    this.setState({
      displayInfo: !this.state.displayInfo,
      selectedCelebrity: selectedCeleb
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Movie Celebrities</h1>

        <div className="celeb">
          <div className="celebList">
            <h2>{this.state.celebrities.length} Celebrities found</h2>
            {this.state.celebrities.map(celebrity => (
              <div
                value={celebrity.Id}
                onClick={e => this.handleClick(e, celebrity)}
                className="celebs"
                key={celebrity.id}
              >
                <img
                  src={
                    "https://image.tmdb.org/t/p/w185/" + celebrity.profile_path
                  }
                  alt="no img found"
                />
                <span>{celebrity.name}</span>
              </div>
            ))}
          </div>
          {this.state.displayInfo && (
            <div className="celebrityDetails">
            
              <img
                src={
                  "https://image.tmdb.org/t/p/w185/" +this.state.selectedCelebrity.profile_path
}
                alt=""
              />
              <span>
                <b>{this.state.selectedCelebrity.name}</b>
              </span>
              <span>Know for</span>
              {this.state.selectedCelebrity.known_for.map(info => (
                <div key={info.id}>
                  <img
                    src={"https://image.tmdb.org/t/p/w185/" + info.poster_path}
                    alt=""
                  />
                  <br />
                  <span>{info.title || info.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default App;
