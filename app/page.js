import Profile from "@/components/profile";
import Home from "@/components/home";
import Sidebar from "@/components/sidebar";
import Particles from "@/components/particles";
export default function MainPage() {
 return (
  <div className="p-6 grid grid-cols-1 lg:grid-cols-7">
    <Particles></Particles>
      <div className=" col-span-2"><Profile></Profile></div>
      <div className=" col-span-4"><Home></Home></div>
      <div className=" col-span-1  "><Sidebar></Sidebar></div>
  </div>
 )
}
