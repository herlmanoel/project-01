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
    searchValue: '',
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

    posts.push(...nextPosts);

    this.setState({ posts: posts, pageStart: nextPage });
  }

  handleChange = (event) => {
    const { value } = event.target;

    this.setState({ searchValue: value });
  }

  render() {
    const { posts, pageStart, allPosts, postsPerPage, searchValue } = this.state;
    const noMorePosts = pageStart + postsPerPage >= allPosts.length;

    /*
      -> se tiver algo no searchValue, ...
      -> verifica se possui algum post que o titulo inclui o searchValue
      post.title.toLowerCase().includes(searchValue.toLowerCase())
    */
    const filteredPosts = !!searchValue ?
      allPosts.filter(post => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
      })
      : posts;

    return (
      <section className="container">
        {/* 
          # input 
            -> Temos o evento sintético onChange
            -> Recebe uma função com o parâmetro do evento e, nele, temos as informações
            -> coloca no estado e no value do input

          # Avaliação de curto-circuito
            https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Expressions_and_operators
            -> expressões lógicas são avaliadas da esquerda para a direita
            -> ( false && x ) é avaliado em curto-circuito como falso
            -> ( true || x )  é avaliado em curto-circuito como verdadeiro
            saber se existe alguma coisa no searchValue, para converter para
            Boolean com (!!), se for x = '', é false. Se tem valor na String é true.
            !!x && y => se x for verdadeiro, retorne y. Senão, não faça nada 
        */}
        {!!searchValue && (
          <>
            <h1>Search Value {searchValue} </h1> <br /> <br />
          </>
        )}
        
        <input
          onChange={this.handleChange}
          value={searchValue}
          type="search"
        /> <br /> <br />

        {filteredPosts.length > 0 && (
          <Posts posts={filteredPosts} />
        )}

        {filteredPosts.length === 0 && (
          <h1>Não existem Posts.</h1>
        )}



        {/* 
          -> Chamando um evento sintético de click 
          -> Não funciona passar o onCLick só nesse component, precisamos pegar lá no comp e usar
          
          <Button onCLick={this.loadMorePosts} />
            -> onCLick={this.loadMorePosts} não é evento, estamos passando 
              a propriedade para o component
        />
        */}
        <div className="container__button">
          {/* se não tenha busca, exiba o botão */}
          {!searchValue && (
            <Button
              text="Carregar mais Posts"
              onCLick={this.loadMorePosts}
              disabled={noMorePosts}
            />
          )}

        </div>
      </section>
    );
  }
}

