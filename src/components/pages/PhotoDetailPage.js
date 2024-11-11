import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

const PhotoDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [photo, setPhoto] = useState({});
  const [comments, setComments] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    fetchPhotoDetails();
  }, [id]);

  const fetchPhotoDetails = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(
        `https://ujikom2024pplg.smkn4bogor.sch.id/0059495358/backend/public/api/photos/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setPhoto(data.photo);
        setComments(data.photo.comments || []);
        setLikeCount(data.like_count || 0);
        setIsLiked(data.is_liked || false);
      }
    } catch (error) {
      console.error('Error fetching photo details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getFullImageUrl = (imageUrl) => {
    if (imageUrl?.startsWith('/storage')) {
      return `https://ujikom2024pplg.smkn4bogor.sch.id/0059495358/backend/public${imageUrl}`;
    }
    return imageUrl;
  };

  const handleLike = async () => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      navigate('/login');
      return;
    }

    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);

    try {
      await fetch(
        `https://ujikom2024pplg.smkn4bogor.sch.id/0059495358/backend/public/api/photos/${id}/like`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (error) {
      console.error('Error toggling like:', error);
      setIsLiked(!isLiked);
      setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('auth_token');
    const userId = localStorage.getItem('user_id');

    if (!token) {
      navigate('/login');
      return;
    }

    if (!commentText.trim()) {
      return;
    }

    try {
      const response = await fetch(
        'https://ujikom2024pplg.smkn4bogor.sch.id/0059495358/backend/public/api/comments',
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            photo_id: id,
            user_id: userId,
            content: commentText,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setComments(prev => [...prev, {
          ...data.comment,
          user: {
            id: userId,
            name: user.name || 'Anonymous'
          }
        }]);
        setCommentText('');
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    const token = localStorage.getItem('auth_token');
    try {
      const response = await fetch(
        `https://ujikom2024pplg.smkn4bogor.sch.id/0059495358/backend/public/api/comments/${commentId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        setComments(prev => prev.filter(comment => comment.id !== commentId));
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not available';
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getInitials = (name) => {
    if (!name) return 'A';
    const words = name.trim().split(' ');
    if (words.length > 1) {
      return `${words[0][0]}${words[1][0]}`.toUpperCase();
    }
    return words[0][0].toUpperCase();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Photo Section */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <img
          src={getFullImageUrl(photo.image_url)}
          alt={photo.title}
          className="w-full h-[500px] object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/placeholder.jpg';
          }}
        />
        
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{photo.title}</h1>
          <p className="text-gray-600 mb-4">{photo.description}</p>
          <p className="text-sm text-gray-500">Posted on {formatDate(photo.created_at)}</p>

          {/* Action Buttons */}
          <div className="flex items-center space-x-6 mt-4 py-3 border-t border-gray-200">
            <button
              onClick={handleLike}
              className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors"
            >
              <i className="material-icons">
                {isLiked ? 'favorite' : 'favorite_border'}
              </i>
              <span>{likeCount}</span>
            </button>
            
            <div className="flex items-center space-x-2 text-gray-600">
              <i className="material-icons">chat_bubble_outline</i>
              <span>{comments.length}</span>
            </div>

            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: photo.title,
                    text: photo.description,
                    url: window.location.href,
                  });
                }
              }}
              className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors"
            >
              <i className="material-icons">share</i>
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Comments</h2>
        
        {/* Comment Form */}
        <form onSubmit={handleComment} className="mb-6">
          <div className="flex space-x-4">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder={user.role ? "Add a comment..." : "Login to comment..."}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-primary/50
                       bg-white/80 backdrop-blur-sm
                       text-primary-dark placeholder-gray-400
                       font-medium"
            />
            <button
              type="submit"
              className={`px-6 py-2 rounded-lg transition-colors
                         ${user.role 
                           ? 'bg-primary text-white hover:bg-primary-dark' 
                           : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
              disabled={!user.role}
            >
              Post
            </button>
          </div>
        </form>

        {/* Comments List */}
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
                {getInitials(comment.user.name)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800">{comment.user.name}</h3>
                  {comment.user.id === parseInt(localStorage.getItem('user_id')) && (
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <i className="material-icons">delete</i>
                    </button>
                  )}
                </div>
                <p className="text-gray-600 mt-1">{comment.content}</p>
                <span className="text-sm text-gray-500 mt-2">
                  {formatDate(comment.created_at)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhotoDetailPage; 