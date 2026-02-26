
import React from 'react';
import { ShieldCheck } from 'lucide-react';

const Navigation: React.FC<{ scrolled: boolean }> = ({ scrolled }) => {
  const logoUrl = "https://i.imgur.com/etIjOB5.png";

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 py-3 px-6 md:px-12 flex justify-between items-center ${
      scrolled ? 'bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm' : 'bg-transparent'
    }`}>
      <div className="flex items-center">
        <a href="#inicio" className="transition-transform hover:scale-105 active:scale-95">
          <img 
            src={logoUrl} 
            alt="Multiservicios Rivera" 
            className="h-20 md:h-28 w-auto transition-all duration-300"
          />
        </a>
      </div>
      
      <div className="hidden md:flex gap-10 items-center">
        <div className="flex gap-8 text-[11px] font-bold uppercase tracking-[0.15em]">
          <a href="#metodologia" className={`${scrolled ? 'text-brand-slate' : 'text-white/80'} hover:text-brand-crimson transition-colors`}>Metodología</a>
          <a href="#servicios" className={`${scrolled ? 'text-brand-slate' : 'text-white/80'} hover:text-brand-crimson transition-colors`}>Especialidades</a>
          <a href="#portafolio" className={`${scrolled ? 'text-brand-slate' : 'text-white/80'} hover:text-brand-crimson transition-colors`}>Proyectos</a>
        </div>
        <a 
          href="https://wa.me/50687088047" 
          target="_blank"
          rel="noopener noreferrer"
          className="bg-brand-crimson text-white px-6 py-2.5 text-[11px] font-extrabold uppercase tracking-widest hover:bg-brand-dark transition-all shadow-md flex items-center gap-2"
        >
          <ShieldCheck size={14} />
          Asesoría Técnica
        </a>
      </div>
    </nav>
  );
};

export default Navigation;
