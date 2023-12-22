'use client';
import {Parallax} from "react-parallax";

export default function Banner() {
  return (
    <Parallax className="relative w-full" bgImage={'banner.jpg'} strength={350}>
      <div className="flex flex-col items-center justify-center h-screen bg-[#00000066]">
        <h1 className={'text-white text-7xl font-medium text-center pb-4'}>IDEAS</h1>
        <h3 className={'text-white text-lg'}>Where all our great things begin</h3>
      </div>
      {/* Div to be stacked on top of the first div */}
      <div className="absolute top-0 w-full h-full" style={{borderBottom: '20vh solid #fff', borderLeft: '100vw solid transparent' }}/>
    </Parallax>
  )
}