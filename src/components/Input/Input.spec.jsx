import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Input } from ".";

/*
    Nosso input precisa de
        { valueInput, handleChange }
    
*/

describe('<Input />', () => {

    it('should have a value of searchValue', () => {

        const fn = jest.fn();

        render(<Input handleChange={fn} valueInput={'testando'} />);

        const input = screen.getByPlaceholderText(/type your search/i);

        expect(input).toBeInTheDocument();
        expect(input.value).toBe("testando");

    });

    it('should call handleChange function on each key pressed', () => {
        /*
            está função não precisa fazer nada, 
            apenas preciso verificar se ela foi chamada
        */
        const fn = jest.fn();

        render(<Input handleChange={fn} searchValue={'testando'} />);
        const input = screen.getByPlaceholderText(/type your search/i);

        /*
            Como a função é uma onChange,
            quero saber se a função foi chamada o número de vezes corretos.
            Ou seja, 7 vezes.
        */ 

        const value = 'o valor';

        // quero que ele digite o valor no input
        userEvent.type(input, value);

        expect(input.value).toBe(value);
        expect(fn).toHaveBeenCalledTimes(value.length);
    });

    it('should match snapshot', () => {
        const fn = jest.fn();
        const { container } = render(<Input handleChange={fn} searchValue={'testando'} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});