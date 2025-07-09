import { useEffect, useState } from 'react';
import { fetchData } from '../../main';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      fetchUserPosts(storedUser._id);
    }
    setLoading(false);
  }, []);

const fetchUserPosts = async (userId) => {
    try {
      const data = await fetchData('/post/getPosts', { userId }, 'POST');
      setPosts(data);
    } 
    catch (error) {
      console.error('Error fetching posts:', error.message || error);
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    try {
      const newCreatedPost = await fetchData('/post/createPost', {
        userId: user._id,
        content: newPost
      }, 'POST');

      setPosts([newCreatedPost, ...posts]);
      setNewPost('');
    } 
    catch (error) {
      console.error('Error creating post:', error.message || error);
    }
  };

  const handleDelete = async (postId) => {
    try {
      await fetchData('/post/deletePost', { postId }, 'DELETE');
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    } 
    catch (error) {
      console.error('Error deleting post:', error.message || error);
    }
  };


  if (loading) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      <h2>Welcome, {user?.username}!</h2>

      <form onSubmit={handlePostSubmit}>
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Write something..."
          rows={4}
          required
        />
        <br></br>
        <button type="submit">Post</button>
      </form>

      <div className="user-posts">
        <h3>Your Posts</h3>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} className="post-card">
              <p>{post.content}</p>
              <button onClick={() => handleDelete(post._id)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No posts yet.</p>

        )}
      </div>
    </div>
  );
};

export default Profile;
