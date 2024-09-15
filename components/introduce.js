function Introduce() {
    return (<div className=" mt-16">
        <h1 className=" text-4xl md:text-6xl lg:text-7xl">Hi, I Am <span className=" text-green-300">Ratnajit</span> Swain,
        A Full-Stack Web Developer
        </h1>
        <p className=" text-gray-400 text-base mt-16">Crafting seamless digital experiences through cutting-edge Full-Stack development expertise.</p>
        <div className=" mt-16 flex gap-10">
            <div className=" max-w-36">
                <h2 className="text-7xl text-green-300">4+</h2>
                <p className=" text-gray-400 text-sm mt-3 uppercase">Years of industry experience</p>
            </div>
            <div className="max-w-20">
                <h2 className="text-7xl text-green-300 ">9+</h2>
                <p className=" text-gray-400 text-sm mt-3 uppercase">Projects</p>
            </div>
        </div>
    </div>);
}

export default Introduce;