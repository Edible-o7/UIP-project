import { useEffect, useState } from 'react';

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
      const response = await fetch('/posts/getPosts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId })
      });

      if (!response.ok) throw new Error(await response.text());

      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error.message);
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    try {
      const response = await fetch('/posts/createPost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: user._id,
          content: newPost
        })
      });

      if (!response.ok) throw new Error(await response.text());

      const newCreatedPost = await response.json();
      setPosts([newCreatedPost, ...posts]);
      setNewPost('');
    } catch (error) {
      console.error('Error creating post:', error.message);
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
        <button type="submit">Post</button>
      </form>

      <div className="user-posts">
        <h3>Your Posts</h3>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} className="post-card">
              <p>{post.content}</p>
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
