function TimeLine({ data,key }) {
    return (<div key={key} className="
     pl-16
    relative before:content-[''] before:absolute before:w-[14px] before:h-[14px] before:bg-gray-400 before:left-[-7px] before:top-[6px] before:duration-300 before:rounded-full before:z-10
    after:content-[''] after:absolute after:w-[0.5px] after:h-full after:bg-gray-600 after:left-0 after:top-[10px]
    ">
        <span className="text-base text-gray-400 hover:text-green-300 cursor-pointer">{data.date}</span>
        {data.exs.map((l) => (
            <>
                <h3 className="text-2xl mt-5">{l.title}</h3>
                <p className="text-xs pb-4 text-gray-400">{l.company}</p>
            </>
        ))}
    </div>);
}

export default TimeLine;