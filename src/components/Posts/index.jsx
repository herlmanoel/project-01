import { PostCard } from "../PostCard";

import './style.css';

export const Posts = ({ posts }) => (
    <div className="posts">
        {posts.map(post => (
            <PostCard post={post} key={post.id} />
        ))}
    </div>
);