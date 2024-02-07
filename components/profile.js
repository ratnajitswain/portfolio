import me from "@/assets/images/me1.jpg";
import Image from "next/image";
function Profile() {
    return (
        <div className=" border border-gray-500 rounded-3xl p-7 text-center max-w-[350px] relative lg:fixed lg:left-5">
            <div className="flex justify-between">
                <h2 className=" font-bold text-4xl">Ratnajit</h2>
                <div className=" max-w-28 text-right">Full Stack Web Developer</div>
            </div>
            <Image className="rounded-3xl max-w-64 ml-auto mr-auto mt-5 mb-6 object-contain" src={me}></Image>
            <h3 className=" text-2xl">ratnajitswain@gmail.com</h3>
            <h3 className="text-2xl mt-2">Bhubaneswar, Odisha</h3>
            <p className=" text-sm text-gray-400 mt-5">© 2024 Ratnajit. All Rights Reserved</p>
            <ul className=" flex justify-center items-center flex-wrap gap-2 mt-5">
                <li>
                    <a className="group block w-12 h-12 border-2 border-gray-500 hover:border-green-300 rounded-full text-center leading-[46px] cursor-pointer transition duration-1000">
                        <i className="lab la-github text-xl text-gray-500 group-hover:text-green-300 transition duration-1000"></i>
                    </a>
                </li>
                <li>
                    <a className="group block w-12 h-12 border-2 border-gray-500 hover:border-green-300 rounded-full text-center leading-[46px] cursor-pointer transition duration-1000">
                        <i className="lab la-linkedin text-xl text-gray-500 group-hover:text-green-300 transition duration-1000"></i>
                    </a>
                </li>
                <li>
                    <a className="group block w-12 h-12 border-2 border-gray-500 hover:border-green-300 rounded-full text-center leading-[46px] cursor-pointer transition duration-1000">
                        <i className="lab la-twitter text-xl text-gray-500 group-hover:text-green-300 transition duration-1000"></i>
                    </a>
                </li>
                <li>
                    <a className="group block w-12 h-12 border-2 border-gray-500 hover:border-green-300 rounded-full text-center leading-[46px] cursor-pointer transition duration-1000">
                        <i className="lab la-instagram text-xl text-gray-500 group-hover:text-green-300 transition duration-1000"></i>
                    </a>
                </li>
            </ul>
            <a className=" inline-flex bg-green-400 text-black rounded-3xl w-full justify-center items-center py-3 text-lg mt-5">
                <i className="las la-envelope text-2xl mr-2"></i>
                Hire me</a>
        </div>
    );
}

export default Profile;