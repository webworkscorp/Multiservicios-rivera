
import React from 'react';

const TrustSection: React.FC = () => {
  return (
    <section id="manifiesto" className="pt-16 pb-24 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <h2 className="text-5xl md:text-7xl font-heading font-black tracking-tighter leading-none uppercase text-brand-dark">
            NO VENDEMOS TRABAJO. VENDEMOS <span className="text-brand-crimson">CERTEZA.</span>
          </h2>
          <p className="text-2xl text-brand-slate font-light leading-tight">
            Gestionamos su proyecto con orden para asegurar <span className="text-brand-dark font-bold">resultados de calidad en el tiempo acordado.</span>
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 border-l-2 border-brand-crimson pl-12 py-4">
          <div>
            <span className="block text-5xl font-black text-brand-dark tracking-tighter">20+</span>
            <span className="text-[10px] uppercase font-black text-gray-400 tracking-[0.2em]">Años de Trayectoria</span>
          </div>
          <div>
            <span className="block text-5xl font-black text-brand-dark tracking-tighter">150+</span>
            <span className="text-[10px] uppercase font-black text-gray-400 tracking-[0.2em]">Obras Entregadas</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
