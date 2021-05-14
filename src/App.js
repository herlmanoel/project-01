import './App.css';
import { Component } from 'react';

// Componente de Classe
class App extends Component {

  state = {
    posts: [],
    counter: 0,
  };

  handleTimeout = () => {
    const arrayPosts = [
      {
        id: 1,
        title: 'O título 1',
        body: 'O corpo 1'
      },
      {
        id: 2,
        title: 'O título 2',
        body: 'O corpo 2'
      },
      {
        id: 3,
        title: 'O título 3',
        body: 'O corpo 3'
      },
    ]
    const { counter } = this.state;
    // utilizamos ArrowFunctions para termos acesso ao this
    // simulando o tempo de acesso a uma API
    this.timeoutUpdate = setTimeout(() => {
      this.setState({
        posts: arrayPosts,
        counter: counter + 1,
      });
    }, 1000); // 2000ms
  }

  // componente montado na tela
  // não utilizamos ArrowFunctions 
  componentDidMount() {
    console.log('Componente montado');
    // faz uma requisição para uma api e seta o estado

    // atualiza o estado, com isso chama o componentDidUpdate()
    this.handleTimeout();
  }

  // componente alterado
  componentDidUpdate() {
    console.log('Componente alterado');

    // fica se chamando
    this.handleTimeout();
  }

  // componente for desmontado
  componentWillUnmount() {
    clearTimeout(this.timeoutUpdate);
  }

  render() {
    // const name = this.state.name;
    const { posts, counter } = this.state;
    console.log(posts)
    return (
      <div className="App">
        {/* todo array em JS tem uma função '.map' disponível, ele retorna um novo array */}
        {/* sempre que retornar vários elementos de um array no react temos que identificar-los, pois para otimizar a performance para saber exatamente qual elemento foi atualizado e ir direto nele */}
        {/* com isso, utilizamos o key */}
        <h1>{counter}</h1>
        {posts.map(post => (
          <div key={post.id}>
            <h1>{post.title}</h1>
            <h2>{post.body}</h2>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
