function SectionName({ name, icon }) {
    return (<h4 className=" uppercase mt-16 border border-gray-500 rounded-2xl max-w-fit py-2 px-6 text-xs">
        <i className={icon + " mr-2 "}></i>{name}
    </h4>);
}

export default SectionName;