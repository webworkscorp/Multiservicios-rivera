
import React from 'react';

const ClosingManifesto: React.FC = () => {
  return (
    <section className="py-24 bg-white px-6 md:px-12 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-brand-concrete/50 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"></div>
      
      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <div className="inline-block h-[2px] w-20 bg-brand-crimson mb-12"></div>
        
        <h3 className="text-3xl md:text-5xl font-heading font-extrabold tracking-tighter text-brand-dark leading-tight mb-12">
          Detrás de cada trabajo hay <span className="text-brand-crimson">planificación</span>, experiencia y atención real a los detalles.
        </h3>
        
        <div className="space-y-8">
          <p className="text-xl md:text-2xl text-brand-slate font-light leading-relaxed">
            No se trata solo de ejecutar, sino de <strong className="text-brand-dark font-bold">entender el espacio</strong>, las necesidades y el uso real que tendrá.
          </p>
          
          <div className="bg-brand-concrete p-10 md:p-16 border-l-8 border-brand-crimson text-left shadow-sm">
            <p className="text-lg md:text-xl text-brand-dark leading-relaxed font-medium mb-6">
              En <span className="text-brand-crimson font-black">Multiservicios Rivera</span> combinamos criterio técnico y ejecución ordenada para entregar resultados sólidos, funcionales y bien terminados.
            </p>
            <p className="text-lg md:text-xl text-brand-slate leading-relaxed font-light">
              Trabajamos de forma clara, responsable y cercana, cuidando cada etapa del proceso.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClosingManifesto;
