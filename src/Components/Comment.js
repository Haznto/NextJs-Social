"use client"
import axios from 'axios';
import { useEffect, useState } from 'react';

function Comment({ author, content }) {
  return (
    <div className="border-b pb-4 pt-2">
      <div className="flex items-center mb-2">
        <div className={`h-10 w-10 rounded-full bg-[url('https://i.pravatar.cc/31')] bg-gray-300 flex-shrink-0`} ></div>
        <div className="ml-3">
          <div className="text-sm font-semibold text-gray-700">{author}</div>
          <div className="text-sm text-gray-600">2 hours ago</div>
        </div>
      </div>
      <p className="text-sm text-gray-800">{content}</p>
    </div>
  );
}

export default function Comments({showComments, postId,setCommnetsNumbers}) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [newCommentAuthor, setNewCommentAuthor] = useState('');
  const [animation, setAnimation] = useState(false);


  const fetchComments = async () => {
    try{
        let response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
        setComments(response.data)
        setCommnetsNumbers(response.data.length)
    }catch(err){
        console.log(err)
    }
  }

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleAuthorChange = (e) => {
    setNewCommentAuthor(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment || !newCommentAuthor) return;
    const newCommentObj = {
      id: comments.length + 1,
      email: newCommentAuthor,
      body: newComment,
    };
    setComments([...comments, newCommentObj]);
    setNewComment('');
    setNewCommentAuthor('');
  };

  useEffect(() => {
    setAnimation(!animation)
  
    
  }, [showComments])

  useEffect(() => {
    fetchComments()
  }, [])
  
  

  return (
    <div className={`mt-4 transition-all ease-in-out duration-500 ${animation ? 'opacity-100' : 'opacity-0'}`}>
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Comments</h2>
      {comments.map((comment) => (
        <Comment key={comment.id} author={comment.email} content={comment.body} />
      ))}
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="text"
          value={newCommentAuthor}
          onChange={handleAuthorChange}
          placeholder="Your Name"
          className="border w-full py-2 px-3 text-sm text-gray-800 mb-2"
        />
        <textarea
          value={newComment}
          onChange={handleCommentChange}
          placeholder="Add a comment..."
          className="border w-full py-2 px-3 text-sm text-gray-800 resize-none mb-2"
          rows="3"
        ></textarea>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Post Comment
        </button>
      </form>
    </div>
  );
}