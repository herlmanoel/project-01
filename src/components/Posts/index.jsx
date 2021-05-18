import PropTypes from 'prop-types';

import { PostCard } from '../PostCard';

import './style.css';

/*
   Posts = ({ posts = [] }) => é a mesma coisa de 
   Posts.defaultProps = { post: [] };
   os dois passam valores padrão.
   O Posts.defaultProps ta acabando, pq agr podemos 
   passar pelo destructuring.
*/

export const Posts = ({ posts = [] }) => (
  <div className="posts">
    {posts.map((post) => (
      <PostCard post={post} key={post.id} />
    ))}
  </div>
);

Posts.defaultProps = {
  post: [],
};

/*
  Poderia ser só
  posts: PropTypes.array,
*/

Posts.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      cover: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }),
  ),
};
