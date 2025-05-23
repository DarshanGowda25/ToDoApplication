import {LogIn, MapPin, Menu } from 'lucide-react'
import React, {useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom';



function NavBar() {

     const location = useLocation();

    const navLinkClass = `p-7 !border-b-2 border-transparent text-white cursor-pointer hover:text-eliteGold hover:border-eliteGold transition-all duration-300`;
    const activeClass = `!border-eliteGold !text-eliteGold `;

    const navItems = [
        {   
            title : "Todos",
            link  :  "/"

        },
        {
            title : "Completed Todos",
            link  :  "/completedTodos"
        },
        {
            title : "Pending Todos",
            link : "/pendingTodos"

        }
    ]

  return (

    <section className='fixed top-0 left-0 z-50 w-full m-0 '>
    <nav className='w-full h-[80px] flex justify-center items-center transition-all duration-300 bg-transparent backdrop-blur-2xl'>

    <div className='relative h-full w-full place-content-center'>
        <div  className="ml-20 text-eliteGold text-2xl font-bold">ToDo Assistant</div>
    </div>


    {/* //navLinks */}
    <ul className='w-auto  h-[78px] flex justify-center items-center gap-[4px] text-white absolute uppercase font-bold'>
        {navItems.map((item,idx)=>(
                <NavLink to={item.link} key={idx} className={({ isActive }) => `${navLinkClass} ${isActive ? activeClass : ''} h-[50px] md:h-auto w-auto `}
                onClick={()=>setHamburger(!isHamburger)}>
                    {item.title}
                </NavLink>
        ))}
       
    </ul>

    <div className='border-2 border-eliteGold text-eliteGold flex text-[0.9rem] p-2 rounded-lg mt-1 mr-20 gap-2'>Banglore 
        <MapPin className='w-5 h-5 ml-2 mb-0.5  text-eliteGold' /></div>
    </nav>
    
    </section>

  )
}

export default NavBar