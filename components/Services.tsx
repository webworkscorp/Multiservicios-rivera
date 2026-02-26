
import React from 'react';
import { ArrowUpRight, Minus } from 'lucide-react';

const Services: React.FC = () => {
  const phoneTicker = Array(25).fill("87088047");

  const engineeringServices = [
    {
      title: "Sistemas de potencia",
      desc: "Construimos variedad de sistemas de tensión o transmisión eléctrica, según el requerimiento del proyecto.",
      image: "https://i.imgur.com/sNXMUfa.jpeg",
      tag: "ELÉCTRICA"
    },
    {
      title: "Sistemas de señales",
      desc: "Trabajamos con sistemas transmisión de voz y datos, así como detección de alarmas y seguridad en edificios, entre otros.",
      image: "https://i.imgur.com/K1KFOdo.jpeg",
      tag: "VOZ & DATOS"
    },
    {
      title: "Fontanería",
      desc: "Diseñamos y construimos sistemas que abastecen de agua potable o evacuan las aguas pluviales y negras de un edificio.",
      image: "https://i.imgur.com/mEdLV8b.jpeg",
      tag: "HIDRÁULICA"
    },
    {
      title: "Sistemas mecánicos industriales",
      desc: "Trabajamos en redes de abastecimiento de gases, para servicios médicos, y en procesos industriales para líneas de producción.",
      image: "https://i.imgur.com/MxjFyd3.jpeg",
      tag: "MECÁNICA"
    }
  ];

  const coreSpecialties = [
    "Redes de aguas negras",
    "Redes de aguas pluviales",
    "Redes de ventilación",
    "Sistemas de bombeo",
    "Cableado estructurado"
  ];

  return (
    <section id="servicios" className="py-24 bg-white px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Cabecera Principal - Tono Humano y Directo */}
        <header className="mb-24">
          <div className="flex flex-col md:flex-row gap-16 items-start justify-between">
            <div className="md:w-3/5">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-[3px] w-12 bg-brand-crimson"></div>
                <span className="text-brand-crimson font-black text-xs uppercase tracking-[0.4em]">Soluciones Reales</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-heading font-black tracking-tighter uppercase leading-[0.9] text-brand-dark mb-8">
                Todo lo que su espacio <br/>
                <span className="text-brand-slate/20 italic">necesita para estar al 100%.</span>
              </h2>
              <p className="text-brand-slate text-xl md:text-2xl font-medium leading-tight max-w-xl">
                Nos encargamos de construir, reparar y mejorar su lugar sin complicaciones. Trabajo bien hecho, limpio y a tiempo.
              </p>
            </div>
            <div className="md:w-1/3 pt-6">
              <div className="border-l-4 border-brand-crimson pl-10 py-2">
                <p className="text-brand-slate font-light text-lg md:text-xl leading-snug">
                  En Multiservicios Rivera trabajamos con un enfoque claro: hacer el trabajo bien para que usted no tenga de qué preocuparse. No improvisamos, solucionamos.
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* --- SECCIONES DE IMPACTO VISUAL (GRANDES ESTRUCTURAS) --- */}
        <div className="space-y-8 mb-16">
          <div className="relative w-full h-[550px] overflow-hidden bg-brand-dark group shadow-2xl">
            <img 
              src="https://i.imgur.com/bdUBS1q.jpeg" 
              alt="Soldaduras"
              className="w-full h-full object-cover opacity-80 grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[6000ms] ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/20 to-transparent"></div>
            <div className="absolute bottom-16 left-12 md:left-24">
              <h3 className="text-white text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-8">
                Soldaduras y <br/>Estructuras Metálicas.
              </h3>
              <div className="h-2 w-32 bg-brand-crimson"></div>
            </div>
          </div>

          <div className="relative w-full h-[550px] overflow-hidden bg-brand-dark group shadow-2xl">
            <img 
              src="https://i.imgur.com/JJJKRGZ.jpeg" 
              alt="Acabados"
              className="w-full h-full object-cover opacity-80 grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[6000ms] ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/20 to-transparent"></div>
            <div className="absolute bottom-16 right-12 md:right-24 text-right">
              <h3 className="text-white text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-8">
                Acabados y <br/>Detalles de Lujo.
              </h3>
              <div className="h-2 w-32 bg-brand-crimson ml-auto"></div>
            </div>
          </div>
        </div>

        {/* Ticker Minimalista */}
        <div className="w-full bg-brand-concrete overflow-hidden py-6 border-y border-gray-100 mb-24">
          <div className="flex whitespace-nowrap animate-marquee">
            {phoneTicker.map((num, i) => (
              <div key={i} className="flex items-center gap-10 mx-16">
                <span className="text-brand-dark text-2xl font-black tracking-tighter">{num}</span>
                <span className="text-brand-crimson font-black tracking-[0.2em] text-[10px] uppercase">Asesoría Técnica Rivera</span>
                <div className="h-2 w-2 rounded-full bg-brand-dark/20"></div>
              </div>
            ))}
          </div>
        </div>

        {/* --- BLOQUE DE INGENIERÍA: CARDS --- */}
        <div className="mb-24">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {engineeringServices.map((service, i) => (
              <div key={i} className="flex flex-col bg-brand-concrete/30 group hover:bg-white hover:shadow-2xl transition-all duration-500 overflow-hidden rounded-xl border border-transparent hover:border-gray-100">
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" 
                  />
                  <div className="absolute inset-0 bg-brand-dark/10"></div>
                </div>
                <div className="p-10 flex flex-col flex-grow">
                  <span className="text-brand-crimson font-black text-[11px] uppercase tracking-[0.25em] mb-6">
                    {service.tag}
                  </span>
                  <h4 className="text-2xl font-black text-brand-dark uppercase tracking-tighter mb-4 leading-none">
                    {service.title}
                  </h4>
                  <p className="text-brand-slate text-base font-light leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- ALCANCE DE OPERACIÓN: REDISEÑO HUMANO --- */}
        <div className="pt-24 border-t border-gray-100">
          <div className="grid md:grid-cols-12 gap-12 items-start mb-20">
            <div className="md:col-span-5">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-brand-crimson"></div>
                <span className="text-brand-crimson font-black text-[10px] uppercase tracking-[0.4em]">Cuidado de principio a fin</span>
              </div>
              <h3 className="text-4xl md:text-5xl font-black text-brand-dark uppercase tracking-tighter leading-none mb-6">
                Resolvemos <br/> <span className="text-brand-slate/30">lo importante.</span>
              </h3>
              <p className="text-brand-slate text-lg font-light leading-snug">
                Cuidamos lo que no se ve para que su espacio funcione siempre bien y sin fallas.
              </p>
            </div>

            <div className="md:col-span-7">
              <div className="grid grid-cols-1 border-t border-brand-dark/10">
                {coreSpecialties.map((item, i) => (
                  <div 
                    key={i} 
                    className="flex items-center justify-between py-10 border-b border-brand-dark/10 group hover:bg-brand-concrete/40 px-6 transition-all duration-500 cursor-default"
                  >
                    <div className="flex items-center gap-12">
                      <div className="flex flex-col items-center">
                         <span className="text-brand-crimson font-black text-xs mb-1">{(i+1).toString().padStart(2, '0')}</span>
                         <Minus size={12} className="text-brand-crimson/30 rotate-90" />
                      </div>
                      <h4 className="text-2xl md:text-4xl font-black text-brand-dark uppercase tracking-tighter group-hover:translate-x-4 transition-transform duration-500">
                        {item}
                      </h4>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500 hidden sm:block">
                      <div className="flex items-center gap-4 text-brand-crimson">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Trabajo Garantizado</span>
                        <ArrowUpRight size={28} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-12 p-8 bg-brand-concrete/50 rounded-lg flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                   <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-crimson mb-2">Compromiso Rivera</p>
                   <p className="text-brand-dark font-bold text-lg uppercase tracking-tight leading-tight">Usted descansa, nosotros nos ocupamos de los detalles.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default Services;
