import { Component } from 'react';

import './style.css';

// import { PostCard } from './components/PostCard';
import { Posts } from '../../components/Posts';
import { loadPosts } from '../../utils/load-posts';

// Componente de Classe
export default class Home extends Component {

  /*
    -> o estado pode apenas descer (ir para componentes filhos), mas
  */

  state = {
    posts: [],
  };


  /*
    -> Montado na tela
    -> Não utilizamos ArrowFunctions 
    -> Pode ser async
  */
  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const postsAndPhotos = await loadPosts();
    this.setState({ posts: postsAndPhotos })
  }

  render() {
    const { posts } = this.state;
    return (
      <section className="container">
        <Posts posts={posts} />
      </section>
    );
  }
}

