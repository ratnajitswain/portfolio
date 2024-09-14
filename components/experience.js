import TimeLineElement from '@/components/timeline-element';
import ScrollAnimation from 'react-animate-on-scroll';
const expreriences = [
    {
        date:"05/2024-Present",
        exs:[
            {title:"Senior Software Developer",
            company:"Involead Services Pvt. Ltd.",
            desc:""}
        ],
        animateIn:{animateIn:"fadeInUp",delay:0.3 * 1000, offset:50}
    },
    {
        date:"09/2021-05/2024",
        exs:[
            {title:"Software Developer",
            company:"Triedent Analytical Solutions Pvt. Ltd.",
            desc:""}
        ],
        animateIn:{animateIn:"fadeInUp",delay:0.3 * 1000, offset:50}
    },
    {
        date:"01/2021-07/2021",
        exs:[
            {title:"SDE-1",
            company:"Nirmalya Labs Pvt. Ltd.",
            desc:""}
        ],
        animateIn:{animateIn:"fadeInUp",delay:0.7 * 1000, offset:50}
    }
]
function Experience() {
    return (<div className=" mt-16">
        <h2 className=" text-4xl leading-normal capitalize">
            <span className="text-green-300">Experience</span>
        </h2>
        <div className="mt-16 ">
          {expreriences.map((d, i)=>(
            <ScrollAnimation key={i} {...d.animateIn}>
                <TimeLineElement key={i} data={d}></TimeLineElement>
            </ScrollAnimation>
            
          ))}
        </div>
    </div>);
}

export default Experience;