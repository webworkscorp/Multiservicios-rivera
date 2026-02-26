
import React from 'react';

const Footer: React.FC = () => {
  const logoUrl = "https://i.imgur.com/etIjOB5.png";

  return (
    <footer className="bg-brand-dark py-20 px-6 md:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
        <div className="md:col-span-5">
          <div className="flex items-center mb-8">
            <img 
              src={logoUrl} 
              alt="Multiservicios Rivera" 
              className="h-24 md:h-32 w-auto opacity-90 object-contain"
            />
          </div>
          <p className="text-white/40 font-light text-sm max-w-sm leading-relaxed">
            Mantenimiento y remodelación con enfoque profesional. Calidad técnica, orden y cumplimiento para su hogar o empresa.
          </p>
        </div>
        
        <div className="md:col-span-3">
          <h4 className="text-white font-bold uppercase text-[10px] tracking-widest mb-8">Especialidades</h4>
          <ul className="space-y-4 text-sm text-white/40 font-light">
            <li className="hover:text-brand-crimson cursor-pointer transition-colors">Obra Civil & Estructura</li>
            <li className="hover:text-brand-crimson cursor-pointer transition-colors">Remodelación Corporativa</li>
            <li className="hover:text-brand-crimson cursor-pointer transition-colors">Sistemas de Energía</li>
            <li className="hover:text-brand-crimson cursor-pointer transition-colors">Mantenimiento de Activos</li>
          </ul>
        </div>
        
        <div className="md:col-span-4">
          <h4 className="text-white font-bold uppercase text-[10px] tracking-widest mb-8">Contacto Técnico</h4>
          <div className="space-y-5">
            <div>
              <p className="text-white/30 text-[9px] font-black uppercase tracking-[0.2em] mb-1">Canales Directos</p>
              <p className="text-white/70 text-sm font-light mb-1">les82rivera@hotmail.com</p>
              <p className="text-white/70 text-sm font-light">8708-8047</p>
            </div>
            
            <div className="pt-4 border-t border-white/5">
              <p className="text-white/30 text-[9px] font-black uppercase tracking-[0.2em] mb-4">Redes Sociales</p>
              <a 
                href="https://www.facebook.com/share/1GxjbLTE6L/?mibextid=wwXIfr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center p-2 rounded-lg bg-white/5 text-brand-crimson hover:bg-brand-crimson hover:text-white transition-all duration-300 shadow-lg"
                aria-label="Facebook Oficial"
              >
                {/* Official Facebook SVG Logo */}
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span className="ml-3 text-[10px] font-black uppercase tracking-widest">Facebook</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] text-white/20 font-bold uppercase tracking-[0.3em]">
        <span>&copy; 2026 Rivera Engineering Group.</span>
        <span>Excelencia Técnica.</span>
      </div>
    </footer>
  );
};

export default Footer;
