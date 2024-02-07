"use client";
import { Link } from 'react-scroll';

function ScrollLink({children, href="#"}) {
    return ( <Link 
        activeClass="activeScroll"
        className=' cursor-pointer'
        to={href}
        spy={true} 
        smooth={true} 
        offset={-100} 
        hashSpy={true}
        duration={500} 
        delay={100}
    >
    {children}
    </Link> );
}

export default ScrollLink;