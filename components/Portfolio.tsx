
import React from 'react';

const Portfolio: React.FC = () => {
  const projects = [
    { img: "https://i.imgur.com/r7Rt0Ul.jpeg" },
    { img: "https://i.imgur.com/ShE6mCn.jpeg" },
    { img: "https://i.imgur.com/CMKIlqF.jpeg" },
    { img: "https://i.imgur.com/8MmM3qu.jpeg" },
    { img: "https://i.imgur.com/99roZMd.jpeg" },
    { img: "https://i.imgur.com/Wc2Ryi1.jpeg" }
  ];

  return (
    <section id="portafolio" className="py-32 bg-brand-concrete/50 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Cabecera de Sección con Marketing Persuasivo */}
        <div className="flex flex-col items-center text-center mb-28">
          <h2 className="text-5xl md:text-8xl font-heading font-black tracking-tighter text-brand-dark uppercase leading-[0.85] mb-10 max-w-4xl">
            OBRAS QUE HABLAN <br/> <span className="text-brand-slate/30">DE NUESTRO RIGOR.</span>
          </h2>
          <div className="h-1 w-20 bg-brand-crimson mb-10"></div>
          <p className="text-xl md:text-2xl text-brand-slate font-light max-w-2xl leading-snug">
            La diferencia entre un proyecto común y una infraestructura de <span className="text-brand-dark font-bold italic">excelencia</span> reside en la perfección del detalle. No solo construimos, aseguramos su inversión con rigor técnico y una ejecución impecable que trasciende el tiempo.
          </p>
        </div>

        {/* Galería de Cuadrados Profesionales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((p, i) => (
            <div 
              key={i} 
              className="group relative aspect-square bg-white p-2 shadow-[0_15px_40px_-20px_rgba(0,0,0,0.3)] border border-gray-100 overflow-hidden transition-all duration-500 hover:shadow-[0_40px_80px_-25px_rgba(0,0,0,0.4)] hover:-translate-y-3"
            >
              {/* Contenedor de Imagen */}
              <div className="w-full h-full overflow-hidden bg-brand-dark relative">
                <img 
                  src={p.img} 
                  alt={`Ejecución Técnica Rivera ${i + 1}`}
                  className="w-full h-full object-cover grayscale-[0.1] contrast-[1.15] transition-all duration-1000 group-hover:scale-110 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              
              {/* Marcadores de precisión */}
              <div className="absolute top-6 right-6 h-8 w-8 border-t-2 border-r-2 border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="absolute bottom-6 left-6 h-8 w-8 border-b-2 border-l-2 border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            </div>
          ))}
        </div>

        {/* Pie de Sección Minimalista */}
        <div className="mt-24 flex flex-col items-center">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((dot) => (
              <div key={dot} className="h-1.5 w-1.5 rounded-full bg-brand-crimson/30"></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
