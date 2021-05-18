import { fireEvent, render, screen } from "@testing-library/react";
import { Button } from "./index";

/*
    Preciso testar o que eu quero que aconteça quando rederizar este componente

    screen
     -> query : se encontrar o elemento, levanta o erro.
        elemento que eu quero que não esteja na tela.
     -> get : para verificar se o elemento está na tela.
        all é quando temos mais de um elemento na tela
     -> Expressão Regular
        - /x/i
    
    ver se tem mais alguma coisa para testar:
        -> npm test -- --coverage
        -> coletará coverage
        -> criou uma pasta coverage
        -> Se abrir o index, ele informará quantos testes fiz para cada 
            local e se não fizer o teste em um determinado local ele diz o %
*/

describe('<Button />', () => {
    it('should render the button with the test "Load more"', () => {
        // renderiza
        render(<Button text="Load more" />);

        /* 
            Espera que ocorra uma assertion (afirmação), que é expect(button).toBeInTheDocument();
            É mais comum em testes assíncronos
        */
        expect.assertions(1);

        // busca o botão com esse texto
        const button = screen.getByRole('button', { name: /load more/i });

        // afirma que quer esse botão no documento
        expect(button).toBeInTheDocument();
    });

    // garantir que quando clica no botão essa função é chamada
    it('should call function on button click', () => {
        // cria uma função fictícia
        const fn = jest.fn();


        // renderiza
        render(<Button text="Load more" onCLick={fn} />);

        // busca o botão com esse texto
        const button = screen.getByRole('button', { name: /load more/i });

        // clica no botão
        fireEvent.click(button);

        /*
            Há outra biblioteca userEvent
                -> Nos permite fazer uma checagem mais natural
                -> Neste caso, faz a mesma coisa do fireEvent
                    userEvent.click(button);
        */

        // afirma que quer esse botão foi clicado uma vez
        expect(fn).toHaveBeenCalledTimes(1);
    });

    // verificar o disabled é true
    it('should be disabled when disabled is true', () => {
        // renderiza
        render(<Button text="Load more" disabled={true} />);

        // busca o botão com esse texto
        const button = screen.getByRole('button', { name: /load more/i });

        expect(button).toBeDisabled();
    });

    // verificar o disabled é false
    it('should be disabled when disabled is false', () => {
        // renderiza
        render(<Button text="Load more" disabled={false} />);

        // busca o botão com esse texto
        const button = screen.getByRole('button', { name: /load more/i });

        expect(button).toBeEnabled();
    });
});