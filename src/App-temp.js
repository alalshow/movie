import React from 'react';
import axios from 'axios';
import Movie from './Movie';

class App extends React.Component {
    state = {
        isLoading: true,
        movies: []
    }
    getMovies = async() => {
        const {data:{data:{movies}}} = await axios.get("https://yts-proxy.now.sh/list_movies.json?sort_by=rating"); 
        this.setState(current => ({movies, isLoading: false}));
    }
    componentDidMount() {
        this.getMovies();
    }
    render() {
        const {isLoading, movies} = this.state;
        return <section className="container">
                {isLoading? 
                <div className="loader">
                    <span className="loader_text">Loading...</span>
                </div> :  
                movies.map(movie => 
                    <div className="movies">
                        <Movie 
                            key={movie.id} 
                            id={movie.id} 
                            title={movie.title} 
                            year={movie.year} 
                            summary={movie.summary} 
                            genres={movie.genres}
                            poster={movie.medium_cover_image} >
                        </Movie>
                    </div>
                )}
            </section>
    }
}
export default App;