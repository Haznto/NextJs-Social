"use client"
import Post from "@/Components/Post";
import SideBarA from "@/Components/SideBarA";
import SideBarB from "@/Components/SideBarB";
import axios from "axios";
import { useEffect, useState } from "react";


export default function page() {
    const [feedPosts, setFeedPosts] = useState([])
    const fetchData = async () => {
        try {
            let response = await axios.get("https://jsonplaceholder.typicode.com/posts")
            setFeedPosts(response.data)

        }catch(err){

        }
    }

    useEffect(() => {
        fetchData()
    
      
    }, [])
    
  return (
    <div className="flex">
    <div className=" flex-col overflow-hidden hidden md:flex md:w-[17%] h-[100vh] m-auto ">
       <SideBarA/>
    </div>
    <div className="flex flex-col  overflow-scroll overflow-x-hidden w-[100%] md:w-[66%] h-[100vh] m-auto bg-gray-100">
        {feedPosts.map(post => <Post key={post.id} data={post}/>)}
    </div>
    <div className=" flex-col hidden overflow-hidden md:flex md:w-[17%]  h-[100vh] m-auto bg-gray-50">
       <SideBarB/>
       
    </div>
    </div>
  )
}
