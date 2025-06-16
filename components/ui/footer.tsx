import Link from 'next/link';
import React from 'react';

function Footer() {
  return (
     <footer>
     <div className="p-5 lg:p-12">
     <div className="bg-primary py-6 px-4 lg:p-10 rounded-2xl lg:rounded-[48px] overflow-hidden">
       <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-20 pb-[96px] ">
            <div className="inline-flex flex-col space-y-1 lg:col-start-1 lg:col-end-3">
              {/* about */}
                <h3 className="text-4xl font-bold text-yellow-500 ">About us</h3>
                <p className="text-lg text-white">We are the biggest hyperstore in the universe. We got you all cover with our exclusive collections and latest drops.</p>
            </div>
              <div className="inline-flex flex-col lg:w-[129px] space-y-1">
                {/* Categories */}
                <h3 className="text-2xl font-bold  text-yellow-500">Categories</h3>
           <ul className="flex flex-col space-y-2  ">
            <li><a className='text-white' href="#">Runners</a></li>
            <li><a className='text-white' href="#">Snecars</a></li>
            <li><a className='text-white' href="#">Basketboll</a></li>
            <li><a className='text-white' href="#">Outor</a></li>
            <li><a className='text-white' href="#">Golf</a></li>
            <li><a className='text-white' href="#">Haikng</a></li>
           </ul>
            </div>
            {/* Companiy */}
             <div className="inline-flex lg:w-[129px] flex-col space-y-1">
                <h3 className="text-2xl font-bold text-yellow-500">Company</h3>
           <ul className="flex flex-col space-y-4 ">
             <li><a className='text-white' href="#">About</a></li>
             <li><a className='text-white' href="#">Contact</a></li>
             <li><a className='text-white' href="#">Blogs</a></li>
           </ul>
            </div>
            {/* follow us */}
                <div className="inline-flex lg:w-[129px] flex-col space-x-1">
                <h3 className="text-2xl font-bold text-yellow-500">Follow us </h3>
               <ul className=" flex gap-4 ">
               <li><a className='text-white' href="#"><img src="/images/facebook.svg" alt="Link.svg" /></a></li>
              <li><a className='text-white' href="#"><img src="/images/instagram.svg" alt="Link.svg" /></a></li>
              <li><a className='text-white' href="#"><img src="/images/twitter.svg" alt="Link.svg" /></a></li>
              <li><a className='text-white' href="#"><img src="/images/tik.tok.svg" alt="Link.svg" /></a></li>
           </ul>
            </div>
         </div>  
         <Link className='mt-20' href="#">
         <img className='w-full max-w-[1600px] relative top-6 lg:top-10' src="/images/logo-footer.svg" alt="" />
         </Link> 
    </div>
    </div>
</footer>
  );
}

export default Footer;
