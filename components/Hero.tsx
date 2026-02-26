
import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  const videoUrl = "https://mqajxigehitkgdtepqzi.supabase.co/storage/v1/object/public/Video%20surf/FDownloader.Net_AQMhwzMNzXsyh53XcVoEDKEBgLR4NUbW2KvV8K6zDDzAKdHH9UvRJpIZ98Ve0_7ZlrGe_PruR9k8YrA1ab6lRoZC9J5heZVglvXRBEeYShpCuQ_720p_(HD).mov";

  return (
    <header className="relative min-h-screen bg-brand-dark flex items-center overflow-hidden pt-20">
      {/* Optimized Background Video Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-60 brightness-90 contrast-[1.1] scale-100 transition-opacity duration-1000"
        >
          <source 
            src={videoUrl} 
            type="video/quicktime" 
          />
          <source 
            src={videoUrl} 
            type="video/mp4" 
          />
        </video>
        {/* Balanced Overlays for clarity and legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/40 to-transparent"></div>
        <div className="absolute inset-0 bg-brand-dark/10"></div>
        <div className="absolute inset-0 opacity-5 grid-bg"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8">
            <h1 className="font-heading text-6xl md:text-9xl font-extrabold text-white tracking-tighter leading-[0.85] mb-6 drop-shadow-2xl">
              SU OBRA,<br /> <span className="text-brand-crimson">SIN ERRORES.</span>
            </h1>
            
            <p className="text-xl md:text-3xl text-white/90 leading-tight font-light max-w-xl mb-10 drop-shadow-lg">
              Soluciones de mantenimiento, remodelación e <span className="text-white font-black">infraestructura con resultados garantizados.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a 
                href="#contacto"
                className="group bg-brand-crimson text-white px-8 py-5 font-black uppercase tracking-[0.2em] text-xs hover:bg-white hover:text-brand-dark transition-all flex items-center justify-center gap-4 shadow-2xl shadow-brand-crimson/20"
              >
                COTIZAR AHORA
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <div className="flex items-center gap-4 border-l border-white/20 pl-6">
                <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest leading-tight">
                  150+ Proyectos<br />Entregados con Éxito
                </span>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-4 hidden lg:block relative">
            <div className="aspect-[3/4] overflow-hidden grayscale contrast-125 border border-white/10 bg-brand-dark shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?q=80&w=1000&auto=format&fit=crop" 
                alt="Expertise" 
                className="w-full h-full object-cover opacity-60"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-6 shadow-2xl border-t-4 border-brand-crimson">
              <p className="text-brand-dark text-lg font-black tracking-tighter leading-none">
                CALIDAD<br />CERTIFICADA
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
