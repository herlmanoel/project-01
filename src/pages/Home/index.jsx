import { useEffect, useState, useCallback } from 'react';

import './style.css';

// import { PostCard } from './components/PostCard';
import { Posts } from '../../components/Posts';
import { loadPosts } from '../../utils/load-posts';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

export const Home = () => {
  /*
    const arr = [0, 1, 2];
    const [a, b, c] = arr;
  */
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [pageStart, setPageStart] = useState(0);
  const [postsPerPage] = useState(6);
  const [searchValue, setSearchValue] = useState('');

  const noMorePosts = pageStart + postsPerPage >= allPosts.length;

  const filteredPosts = searchValue
    ? allPosts.filter((post) => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
      })
    : posts;

  /*
    -> Esse useEffect tem uma dependência faltando, 
    a handleLoadPosts que está sendo usada dentro do componente.
    Entretanto, não posso colocar [ handleLoadPosts ], pois

    sempre que o componente for renderizado é chamado o useEffect
    => que chama a handleLoadPosts(); => chama useEffect => ...
    
    -> Criamos um loop
  */

  const handleLoadPosts = useCallback(async (pageStart, postsPerPage) => {
    // const { pageStart, postsPerPage } = this.state;

    const postsAndPhotos = await loadPosts();

    // this.setState({
    //   posts: postsAndPhotos.slice(pageStart, postsPerPage),
    //   allPosts: postsAndPhotos,
    // });

    setPosts(postsAndPhotos.slice(pageStart, postsPerPage));
    setAllPosts(postsAndPhotos);
  }, []);

  useEffect(() => {
    handleLoadPosts(0, postsPerPage);
  }, [handleLoadPosts, postsPerPage]);

  // carregará sempre mais dois Posts
  const loadMorePosts = () => {
    // const {
    //   allPosts,
    //   posts,
    //   pageStart,
    //   postsPerPage
    // } = this.state;

    const nextPage = pageStart + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);

    posts.push(...nextPosts);

    // this.setState({ posts: posts, pageStart: nextPage });
    setPosts(posts);
    setPageStart(nextPage);
  };

  const handleChange = (event) => {
    const { value } = event.target;

    // this.setState({ searchValue: value });
    setSearchValue(value);
  };

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

      <div className="searchContainer">
        {!!searchValue && <h1>Search Value {searchValue} </h1>}

        <Input valueInput={searchValue} handleChange={handleChange} />
      </div>

      {filteredPosts.length > 0 && <Posts posts={filteredPosts} />}

      {filteredPosts.length === 0 && <h1>Não existem Posts.</h1>}

      {/* 
        -> Chamando um evento sintético de click 
        -> Não funciona passar o onCLick só nesse component, precisamos pegar lá no comp e usar
        
        <Button onCLick={loadMorePosts} />
          -> onCLick={loadMorePosts} não é evento, estamos passando 
            a propriedade para o component
      />
      */}
      <div className="container__button">
        {/* se não tenha busca, exiba o botão */}
        {!searchValue && <Button text="Carregar mais Posts" onCLick={loadMorePosts} disabled={noMorePosts} />}
      </div>
    </section>
  );
};
