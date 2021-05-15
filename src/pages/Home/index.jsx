import { Component } from 'react';

import './style.css';

// import { PostCard } from './components/PostCard';
import { Posts } from '../../components/Posts';
import { loadPosts } from '../../utils/load-posts';
import { Button } from '../../components/Button';

// Componente de Classe
export default class Home extends Component {

  /*
    -> o estado pode apenas descer (ir para componentes filhos), mas
  */

  state = {
    posts: [],
    allPosts: [],
    pageStart: 0,
    postsPerPage: 2,
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
    const { pageStart, postsPerPage } = this.state;

    const postsAndPhotos = await loadPosts();

    /*
      -> devemos fazer um .slice() - fatiar - do JS
        arr.slice([início[,fim]])
        https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
    */

    this.setState({
      posts: postsAndPhotos.slice(pageStart, postsPerPage),
      allPosts: postsAndPhotos,
    });
  }

  // carregará sempre mais dois Posts
  loadMorePosts = () => {
    const { 
      allPosts, 
      posts,
      pageStart, 
      postsPerPage 
    } = this.state;

    const nextPage = pageStart + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, (nextPage + postsPerPage));

    /*
      Spread Operator
      -> Espalha um array
    */

    posts.push( ...nextPosts );

    this.setState({ posts: posts, pageStart: nextPage });
    // console.log( pageStart, postsPerPage, nextPage, nextPage + postsPerPage );

    console.log("chamado");
  }

  render() {
    const { posts } = this.state;
    return (
      <section className="container">
        <Posts posts={posts} />
        {/* 
          -> Chamando um evento sintético de click 
          -> Não funciona passar o onCLick só nesse component, precisamos pegar lá no comp e usar
          
          <Button onCLick={this.loadMorePosts} />
            -> onCLick={this.loadMorePosts} não é evento, estamos passando 
              a propriedade para o component
        />
        */}
        <Button
          text="Carregar mais Posts"
          onCLick={this.loadMorePosts}
        />
      </section>
    );
  }
}

