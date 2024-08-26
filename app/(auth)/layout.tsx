import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full flex-wrap h-screen border justify-between">
      <div className="md:block hidden w-3/5 p-5">
        <div className="w-full h-full flex items-center justify-center bg-black relative">
          <video autoPlay loop playsInline muted>
            <source src="/splash.mp4" type="video/mp4" />
          </video>
          <p className="text-white font-medium opacity-90 absolute bottom-2 left-2 font-satoshi">
            @dvdp on Instagram
          </p>
        </div>
      </div>
      <div className="w-full md:w-2/5">{children}</div>
    </div>
  );
}
