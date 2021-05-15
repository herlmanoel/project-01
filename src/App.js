import './App.css';
import { Component } from 'react';
import { PostCard } from './components/PostCard';

// Componente de Classe
class App extends Component {

  /*
    -> o estado pode apenas descer (ir para componentes filhos), mas
  */

  state = {
    posts: [],
  };


  // componente montado na tela
  // não utilizamos ArrowFunctions 
  componentDidMount() {
    this.loadPosts();
  }

  loadPosts = async () => {
    // retorna uma promise que retorna uma resposta e, após isso, convertemos 
    const postsResponse = fetch(`https://jsonplaceholder.typicode.com/posts`);
    const photosResponse = fetch(`https://jsonplaceholder.typicode.com/photos`);

    /*  
      não colocamos o await, pois temos que fazer a requisição das Fotos
      e, para fazer em paralelo, usamos o Promise.all([ ]);
    */

    const [ posts, photos ] = await Promise.all([ postsResponse, photosResponse ]);

    const postsJson = await posts.json();
    const photosJson = await photos.json();

    // unindo os arrays pelo menor
    const postsAndPhotos = postsJson.map((post, index) => {
      // o cover vem da foto
      return { ...post, cover: photosJson[index].url }
    });

    this.setState({ posts: postsAndPhotos })
  }

  render() {
    const { posts } = this.state;
    return (
      <section className="container">

        <div className="posts">
          {posts.map(post => (
            <PostCard post={post} />
          ))}
        </div>

      </section>
    );
  }
}

export default App;
