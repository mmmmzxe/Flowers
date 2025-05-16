import React from 'react';
import handPlantImg from '../assets/Header/Frame 32.png';

const PlantJourney = () => {
  return (
    <section className="w-full flex flex-col items-center justify-center bg-white">
        <div className="w-full max-w-6xl flex flex-col md:flex-row justify-between items-start pt-10 pb-6 px-6 md:px-0">
        <div className="md:w-1/2 text-left mb-8 md:mb-0">
          <p className="text-gray-700 text-base md:text-lg leading-relaxed max-w-xs">
            Each houseplant set is handled quickly and safely before being sent to your destination in specially designed insulated packaging.
          </p>
        </div>
        <div className="md:w-1/2 flex flex-col items-start md:items-start">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-normal mb-8 text-black leading-snug max-w-xl">
            Learn how we take care of your plant at every stage of its journey from our greenhouse to your home.
          </h2>
          <button className="flex items-center gap-4 px-0 py-0 text-base font-medium bg-transparent rounded-full group">
            <span className="tracking-wide">LEARN MORE</span>
            <span className="w-8 h-8 flex items-center justify-center rounded-full border border-black group-hover:bg-black group-hover:text-white transition">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="none"/><path d="M9 12h6m-3-3 3 3-3 3"/></svg>
            </span>
          </button>
        </div>
      </div>
      {/* Main Image Section with Background */}
    <div className='w-full flex relative flex-col items-center mt-[100px] justify-center'>
    <div className="w-full flex justify-center items-center relative py-10 px-2 md:px-0">
        <div className="w-full max-w-7xl aspect-[2/1] flex items-center bottom-[100px] justify-center relative">
       
          <img src={handPlantImg} alt="Hand holding plants" className="object-contain w-full h-full relative z-10" />
        </div>
  
      </div>
      
      {/* Bottom Stepper */}
      <div className="w-full absolute bottom-0 flex items-end h-[300px] justify-between bg-[#F5F5F5] px-8 py-6">
        <span className="text-sm tracking-widest text-black font-medium">STEP 1</span>
        <span className="text-xl md:text-2xl font-serif font-normal text-black text-center flex-1">
          We put everything together
        </span>
        <div className="flex items-center gap-3">
          <button className="w-8 h-8 flex items-center justify-center rounded-full border border-black hover:bg-black hover:text-white transition">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full border border-black hover:bg-black hover:text-white transition">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    </div>
    </section>
  );
};

export default PlantJourney; 