
/* 
    - props 
        -> propriedades passadas para este componente
        -> é um objeto

*/

import './style.css';

export const PostCard = ({ post }) => (
    <div className="post">
        <img name={post.title} className="post__img" src={post.cover} alt={post.title} />
        <div className="post__content">
            <h1 name={post.title}> {post.title} </h1>
            <p> {post.body} </p>
        </div>
    </div>
);