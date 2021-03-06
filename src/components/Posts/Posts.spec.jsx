import { render, screen } from '@testing-library/react';

import { Posts } from '.';

const props = {
  posts: [
    {
      id: 1,
      title: 'title 1',
      body: 'body 1',
      cover: 'img/img1.png',
    },
    {
      id: 2,
      title: 'title 2',
      body: 'body 2',
      cover: 'img/img2.png',
    },
    {
      id: 3,
      title: 'title 3',
      body: 'body 3',
      cover: 'img/img3.png',
    },
  ],
};

/*
    Como já testamos o PostCard
    desse modo, não convém testar novamente.
*/

describe('<Posts />', () => {
  it('should render posts', () => {
    render(<Posts posts={props.posts} />);

    expect(screen.getAllByRole('heading')).toHaveLength(3);
    expect(screen.getAllByRole('img')).toHaveLength(3);
    expect(screen.getAllByText(/body/i)).toHaveLength(3);
    expect(screen.getByRole('img', { name: 'title 3' })).toHaveAttribute('src', 'img/img3.png');
  });

  // testando renderizar sem os posts
  it('should not render posts', () => {
    render(<Posts />);

    expect(screen.queryAllByText(/body/i)).toHaveLength(0);

    /*
            É a mesma coisa que:
                expect(screen.queryAllByText(/body/i))
                    .not.boBeInTheDocument();
            Usamos o query poque sabemos que não existe na tela

            Podemos utilizar o:
                npm test -- --watchAll="false" --coverage
                mostra os arquivos e o que falta testar.
        */
  });

  it('should render posts', () => {
    const { container } = render(<Posts posts={props.posts} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
