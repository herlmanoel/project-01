import './App.css';
import { Component } from 'react';
import { PostCard } from './components/PostCard';
import { loadPosts } from './utils/load-posts';

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
    const postsAndPhotos = await loadPosts();
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
