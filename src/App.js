import React, { Component } from 'react';
import './App.css';
import MovieRow from './MovieRow.js';
import $ from 'jquery'

class App extends Component {
  constructor(props) {
    super(props)
    this.state={}
   // console.log("this is my initializer")
/*
    const movies = [

      {id: 0, poster_src:"", title:"avengers",overview:"anudakbnj slknu knfaej lnfejn"},
      {id: 1, poster_src:"", title:"dc",overview:"anudakbnj slknu knfaej lnfejn"},

    ]

    
  
  var movieRows = []
  movies.forEach((movie) => {

    console.log(movie.title)
    const movieRow = <MovieRow movie={movie}/>
    movieRows.push(movieRow)
  })
  this.state = {rows: movieRows}
*/

this.performSearch("marvel")
  }
performSearch(searchTerm){
  console.log("perform search")
  const urlString = "https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&language=en-US&api_key=1b5adf76a72a13bad99b8fc0c68cb085&query=" + searchTerm
  $.ajax({
    url: urlString,
    success: (searchResults) => {
      console.log("got the data")
     // console.log(searchResults)
      const results = searchResults.results
     // console.log(results[0])
     var movieRows = []

      results.forEach((movie) => {
        movie.poster_src = "https://image.tmdb.org/t/p/w185" + movie.poster_path
        //console.log(movie.poster_path)
        const movieRow = <MovieRow key={movie.id} movie={movie}/>
movieRows.push(movieRow)
      })
      this.setState({rows: movieRows})
    },
    error: (xhr, status, err) => {
      console.error("failed")
    }

  })
}
searchChangeHandler(event){
  console.log(event.target.value)
  const boundObject = this
  const searchTerm = event.target.value
  boundObject.performSearch(searchTerm)
}

  render() {
  return (
    <div>
      
      <table className="titleBar">

      
        <tbody>
          <td>
            <img alt="app icon" src="log.jpg"/>
          </td>
          <td width = "50"/>
          <td>
          <pre><h1 className="head">      Movie Night</h1></pre>
            
          </td>
        </tbody>

      
      
      </table>

    <input style={{
      fontSize: 30,
      display: 'block',
      width: "98%",
      paddingTop: 8,
      paddingBottom: 8,
      paddingLeft: 16
    }} onChange={this.searchChangeHandler.bind(this)} placeholder="Search Movie Name"/>
<br/><br/>
    {this.state.rows}

    </div>
  );
}
}

export default App;
