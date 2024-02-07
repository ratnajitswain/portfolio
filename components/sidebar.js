import ScrollLink from '@/components/ScrollLink'
function Sidebar() {
    return (<div className="fixed  flex items-center h-screen right-10">
        <ul className="flex flex-col  border border-gray-400 rounded-full py-8 px-5 gap-8">
            <li>
                <ScrollLink href="introduce" className="">
                    <i className="text-xl text-gray-400 las la-home"></i>
                </ScrollLink>
            </li>
            <li>
                <ScrollLink href="about" className="">
                    <i className="text-xl text-gray-400 lar la-user"></i>
                </ScrollLink>
            </li>
            <li>
                <ScrollLink href='experience' className="">
                    <i className="text-xl text-gray-400 las la-briefcase"></i>
                </ScrollLink>
            </li>
            <li>
                <ScrollLink className="" href='skills'>
                    <i className="text-xl text-gray-400 las la-shapes"></i>
                </ScrollLink>
            </li>
            <li>
                <a className="">
                    <i className="text-xl las text-gray-400 la-grip-vertical"></i>
                </a>
            </li>
            <li>
                <a className="">
                    <i className="text-xl las text-gray-400 la-envelope"></i>
                </a>
            </li>
        </ul>
    </div>);
}

export default Sidebar;