import './App.css';
import { Component } from 'react';

// Componente de Classe
class App extends Component {

  state = {
    posts: [
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
    ],
  };



  render() {
    // const name = this.state.name;
    const { posts } = this.state;
    console.log(posts)
    return (
      <div className="App">
        {/* todo array em JS tem uma função '.map' disponível, ele retorna um novo array */}
        {/* sempre que retornar vários elementos de um array no react temos que identificar-los, pois para otimizar a performance para saber exatamente qual elemento foi atualizado e ir direto nele */}
        {/* com isso, utilizamos o key */}
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
