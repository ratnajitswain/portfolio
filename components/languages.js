import Image from "next/image";

function Langs({ src, name, years, invert=false }) {
    return (
    
    <li className="text-center w-fit ">
        <div className="border border-gray-400 rounded-full px-8 py-12 block neonText cursor-pointer">
        <Image height={100} className={`${invert?"invert":""}`} width={100} src={src} ></Image>
        </div>
       
        <h3 className="text-sm mt-5">{name}</h3>
        {/* <p>{years}</p> */}
    </li>);
}

export default Langs;