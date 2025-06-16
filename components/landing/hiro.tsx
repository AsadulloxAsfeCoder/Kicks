import React from 'react'
import HiroCorusel from './hiro-corusel'

const Hero = () => {
return (
   <section className="px-5 md:pl- pt-8 lg:px-10 ">
     <div className='max-w-full mx-auto '>
         <img  src="/images/doit2.svg" alt=""  className='w-[764px] md:w-auto lg:w-[1650px]'/>
      </div>
      <div className='lg:p-5 pt-6'>
      <HiroCorusel />
      </div>
    </section>
)
}

export default Hero

