import aws from '@/assets/images/aws.png';
import css from '@/assets/images/css.png';
import html from '@/assets/images/html.png';
import javascript from '@/assets/images/javascript.png';
import mongodb from '@/assets/images/mongodb.png';
import nextjs from '@/assets/images/next.png';
import nodejs from '@/assets/images/nodejs.png';
import python from '@/assets/images/python.png';
import react from '@/assets/images/react.png';
import redux from '@/assets/images/redux.png';
import tailwind from '@/assets/images/tailwind.png';
import Langs from '@/components/languages';
import ScrollAnimation from 'react-animate-on-scroll';
const techs = [
    {
        src:react,
        name:"REACT.JS",
        years:3,
    },
    {
        src:nextjs,
        name:"NEXT.JS",
        years:3,
        invert:true
    },
    {
        src:nodejs,
        name:"NODE.JS",
        years:3
    },
    {
        src:javascript,
        name:"JAVASCRIPT",
        years:3
    },
    {
        src:redux,
        name:"REDUX",
        years:3,
        invert:true
    },
    {
        src:html,
        name:"HTML",
        years:3
    },
    {
        src:css,
        name:"CSS",
        years:3
    },
    {
        src:mongodb,
        name:"MONGODB",
        years:3
    },
    {
        src:tailwind,
        name:"TAILWIND CSS",
        years:3,
        invert:true
    },
    {
        src:python,
        name:"PYTHON",
        years:1
    },
    {
        src:aws,
        name:"AWS",
        years:2,
        invert:true
    }
]
import { useEffect } from 'react';
function Skills() {
    useEffect(() => {
        const intervalId = setInterval(() => {
          const neonElements = document.querySelectorAll('.neonText');
          const randomIndex = Math.floor(Math.random() * neonElements.length);
    
          neonElements.forEach((element, index) => {
            if (index === randomIndex) {
              element.classList.add('blink');
            } else {
              element.classList.remove('blink');
            }
          });
        }, 2000);
    
        return () => {
          clearInterval(intervalId);
        };
      }, []);
    return (<div className=" mt-16">
    <h2 className=" text-3xl md:text-4xl leading-normal capitalize">
        My area of <span className="text-green-300">expertise</span>
    </h2>
    <ul className='flex flex-wrap gap-5  mt-16'>
    {techs.map((d,i)=>(
        <ScrollAnimation key={i} offset={50} animateIn="fadeInUp" delay={300}>
            <Langs {...d}></Langs>
        </ScrollAnimation>
    ))}
        </ul> 
</div>);
}

export default Skills;