"use client";
import Introduce from '@/components/introduce';
import SecName from '@/components/section-names';
import About from '@/components/about';
import Experience from '@/components/experience';
import { Element } from 'react-scroll';
import Skills from '@/components/skills';
import Contact from '@/components/contact';

function Home() {
    return (<>
        <div className="">
            <Element name="introduce" className=' min-h-screen'>
                <SecName name="INTRODUCTION" icon="las la-home"></SecName>
                <Introduce></Introduce>
            </Element>
            <Element name="about" className=' min-h-screen'>
                <SecName name="ABOUT" icon="lar la-user"></SecName>
                <About></About>
            </Element>
            <Element name="experience" className=' min-h-screen'>
                <SecName name="Experience" icon="las la-briefcase"></SecName>
                <Experience></Experience>
            </Element>
            <Element name="skills" className=' min-h-screen'>
                <SecName name="Skills" icon="las la-shapes"></SecName>
                <Skills></Skills>
            </Element>
            <Element name="contact" className='mt-10 min-h-screen'>
                <SecName name="contact" icon="las la-shapes"></SecName>
                <Contact></Contact>
            </Element>
        </div>
    </>);
}

export default Home;