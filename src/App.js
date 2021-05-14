import logo from './logo.svg';
import './App.css';
import { Component } from 'react';

// Componente de Classe Stateless
class App extends Component {

  //  recebe as props
  constructor(props) {
    // chamando o construtor da classe Component
    super(props);

    this.state = {
      name: 'Herlmanoel',
      counter: 0,
    };

    // não posso alterar o estate diretamente, ou seja,
    // this.state.name = 'Herl'
    // Para isso, utilizamos o setState

    this.handlePClicks = this.handlePClicks.bind(this);
  }

  handlePClicks() {
    // não consigo acessar o this, pois o React não faz o Bind do this
    // Para ter acesso ao this: this.handlePClicks.bind(this)
    this.setState({ name: 'Júnior' });
    // quando o estado é alterado a função render é chamada novamente com o novo estado
  }

  // para não precisarmos fazer o .bind(this), utilizamos as ArrowFunctions
  // AF não possuem this, ou seja, como ela não tem, procura no elemento pai que no caso é própria Classe
  handleAClicks = (event) => {
    event.preventDefault(); // não faz o que foi definido como padrão

    const { counter } = this.state; 
    this.setState({ name: 'Júnior', counter: counter+1 }); // setState sendo chamado o render é chamado
    console.log(counter);
  }

  render() {
    // const name = this.state.name;
    const { name, counter } = this.state;

    // isso que caracteriza o SinglePageAplication, saí de rotas, mas na mesma Página.

    // class fields me permitem criar atributos sem precisar de um constructor e, com isso, eliminar o constructor

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p onClick={() => this.handlePClicks()}>
            {name} <br/> { counter }
          </p>
          <a
            onClick={(event) => this.handleAClicks(event)}
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Este é o Link          </a>
        </header>
      </div>
    );
  }
}

export default App;
