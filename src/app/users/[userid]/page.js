"use client"
import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import Profile from "@/Components/Profile";

export default function page({params}) {
    // const params = useRouter()
    // console.log(params.userid)
  return (
    <div>
        {/* <Navbar/> */}
        <Profile id={params.userid} />
    {/* <Footer/> */}
    </div>
  )
}
