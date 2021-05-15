
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
            <h1> {post.title} </h1>
            <h2> {post.body} </h2>
        </div>
    </div>
);