
/* 
    - props 
        -> propriedades passadas para este componente
        -> é um objeto
    - 
*/

import './style.css';

export const PostCard = ({ post }) => (
    <div className="post">
        <img className="post__img" src={post.cover} alt={post.title} />
        <div className="post__content">
            <h1> {post.id} ||| {post.title} </h1>
            <p> {post.body} </p>
        </div>
    </div>
);