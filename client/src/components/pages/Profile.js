import { useEffect, useState } from 'react';
import { fetchData } from '../../main';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState({});

  useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  if (storedUser) {
    setUser(storedUser);

    const fetchUserPosts = async (userId) => {
      try {
        const data = await fetchData('/post/getPosts', { userId }, 'POST');
        setPosts(data);

        for (const post of data) {
          fetchComments(post._id);
        }
      } 
      catch (error) {
        console.error('Error fetching posts:', error.message || error);
      }
    };

    fetchUserPosts(storedUser._id);
  }

  setLoading(false);
}, []);

  const fetchComments = async (postId) => {
    try {
      const response = await fetch('/comment/getComments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId })
      });

      if (!response.ok) throw new Error(await response.text());

      const data = await response.json();
      setComments(prev => ({ ...prev, [postId]: data }));
    } 
    catch (error) {
      console.error('Error fetching comments:', error.message || error);
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

  const handleCommentSubmit = async (e, postId) => {
    e.preventDefault();
    const content = newComment[postId];
    if (!content || !content.trim()) return;

    try {
      const comment = await fetchData('/comment/createComment', {
        userId: user._id,
        postId,
        content
      }, 'POST');

      setComments(prev => ({
        ...prev,
        [postId]: [comment, ...(prev[postId] || [])]
      }));
      setNewComment(prev => ({ ...prev, [postId]: '' }));
    } 
    catch (error) {
      console.error('Error creating comment:', error.message || error);
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

  const handleDeleteComment = async (postId, commentId) => {
    try {
      await fetchData('/comment/deleteComment', { commentId }, 'DELETE');
      setComments(prev => ({
        ...prev,
        [postId]: prev[postId].filter(c => c._id !== commentId)
      }));
    } catch (error) {
      console.error('Error deleting comment:', error.message || error);
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

            <div className="comment-section">
              <form onSubmit={(e) => handleCommentSubmit(e, post._id)}>
                <input
                  type="text"
                  placeholder="Write a comment..."
                  value={newComment[post._id] || ''}
                  onChange={(e) =>
                    setNewComment((prev) => ({
                      ...prev,
                      [post._id]: e.target.value
                    }))
                  }
                  required
                />
                <button type="submit">Comment</button>
              </form>

              <div className="comments-list">
                {comments[post._id]?.length > 0 ? (
                  comments[post._id].map((comment) => (
                    <div key={comment._id} className="comment-item">
                      <p>{comment.content}</p>
                      <button onClick={() => handleDeleteComment(post._id, comment._id)}>
                        Delete Comment
                      </button>
                    </div>
                  ))
                ) : (
                  <p>No comments yet.</p>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No posts yet.</p>
      )}
    </div>
  </div>
);
}
export default Profile;
