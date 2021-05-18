import { render, screen } from "@testing-library/react";
import { PostCard } from '.';
import { postCardPropsMock } from './mock';

/*
    Dando um console.log para ver o que está acontecendo
        const { debug } = render(<PostCard post={mock} />);
        debug();
    A imagem não precisa existir

    Estes testes são chamados de snapshot

    Não temos getByRole para parágrafos

    Quando 'termino' um componente e
    se eu mudar alguma coisa no componente
    como eu testo?
    Quando terminamos, posso fazer um teste de snapshot
    tira uma foto do componente do jeito que ele está.

    snapshot: pega o componente, renderiza e salva.
    PostCard.spec.jsx.snap

    Com isso, se eu alterar o componente ele sempre verificará se
    bate com o snapshot, se não bater o teste irá falhar e,
    se for intencional a mudança, posso clicar "u" para ele atualizar
    o snapshot.
*/

describe('<PostCard />', () => {
    it('should render PostCard correctly', () => {

        render(<PostCard post={postCardPropsMock} />);

        const img = screen.getByRole('img');
        const heading = screen.getByRole('heading', { name: 'title 1'});
        const paragraph = screen.getByText('body 1');

        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('src', postCardPropsMock.cover);
        
        expect(heading).toBeInTheDocument();
        expect(paragraph).toBeInTheDocument();
    });

    it('should match snapshot', () => {
        const { container } = render(<PostCard post={postCardPropsMock} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});