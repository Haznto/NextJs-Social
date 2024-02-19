"use client"
import { useEffect, useState } from 'react';
import Comments from "./Comment";
import axios from 'axios';
import Link from 'next/link';


export default function Post({data}) {
    const [userData, setUserData] = useState({})
    const [commnetsNumbers, setCommnetsNumbers] = useState(0)
    const fetchUserData = async() =>{
        try{
            let response = await axios.get(`https://jsonplaceholder.typicode.com/users/${data.userId}`)
            setUserData(response.data)
        }catch(err){

        }
    }
  const [showComments, setShowComments] = useState(true);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  useEffect(() => {
    fetchUserData()
  
    
  }, [])
  

  return (
    <div className='flex items-center justify-center mt-20'>
      <div className="rounded-xl border p-5 shadow-md w-9/12 bg-white">
        <div className="flex w-full items-center justify-between border-b pb-3">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-full bg-slate-400 bg-[url('https://i.pravatar.cc/32')]"></div>
            <Link href={`/users/${userData.id}`}>
            <div  className="text-lg font-bold text-gray-400">{userData.name}</div>
            </Link>
          </div>
          <div className="flex items-center space-x-8">
            <button className="rounded-2xl border bg-neutral-100 px-3 py-1 text-xs font-semibold text-gray-800">{userData?.username}</button>
            <div className="text-xs text-neutral-500">{data.id} hours ago</div>
          </div>
        </div>

        <div className="mt-4 mb-6">
          <div className="mb-3 text-xl font-bold text-black">{data?.title}</div>
          <div className="text-sm text-neutral-600">{data?.body}</div>
        </div>

        <div>
          <div className="flex items-center justify-between text-slate-500">
            <div className="flex space-x-4 md:space-x-8">
              {/* Call toggleComments function when the SVG icon is clicked */}
              <div className="flex cursor-pointer items-center transition hover:text-slate-600" onClick={toggleComments}>
                <svg xmlns="http://www.w3.org/2000/svg" className="mr-1.5 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
                <span onClick={toggleComments}>{commnetsNumbers}</span>
              </div>
              <div className="flex cursor-pointer items-center transition hover:text-slate-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="mr-1.5 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
                <span>4</span>
              </div>
            </div>
          </div>
        </div>

        
        {showComments && <Comments setCommnetsNumbers={setCommnetsNumbers}  showComments={showComments} postId={data.id}/>}
        
      </div>
    </div>
  );
}
