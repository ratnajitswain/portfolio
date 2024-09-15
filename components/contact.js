function Contact() {
    return ( <>
    <div className=" mt-16">
        <h2 className=" text-3xl md:text-4xl leading-normal capitalize">
            let's have a  <span className="text-green-300">chat</span>
        </h2>
        <div className="mt-16 gap-6 flex flex-col">
            <input className=" bg-transparent border-b-2 border-gray-500 p-2 lg:w-1/2 outline-none placeholder:to-blue-500" placeholder="Name"></input>
            <input className=" bg-transparent border-b-2 border-gray-500 p-2 lg:w-1/2 outline-none placeholder:to-blue-500" placeholder="Email"></input>
            <input className=" bg-transparent border-b-2 border-gray-500 p-2 lg:w-1/2 outline-none placeholder:to-blue-500" placeholder="Phone"></input>
            <textarea rows={5} className=" resize-none mt-5  rounded-lg bg-transparent border-2 border-gray-500 p-2 lg:w-1/2 outline-none placeholder:to-blue-500" placeholder="Reason for contact"></textarea>
            <button className="text-base bg-transparent border-2 mt-5  rounded-lg border-gray-500 neonText p-2 lg:w-1/2 outline-none">SUBMIT</button>
        </div>
        </div>
    </> );
}

export default Contact;