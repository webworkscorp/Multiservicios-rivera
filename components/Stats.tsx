
import React from 'react';

const Stats: React.FC = () => {
  const stats = [
    { label: "Proyectos Ejecutados", value: "150+" },
    { label: "Clientes Satisfechos", value: "95%" },
    { label: "Años de Trayectoria", value: "20+" },
    { label: "Técnicos Expertos", value: "12" }
  ];

  return (
    <div className="bg-brand-dark py-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter group-hover:text-brand-crimson transition-colors">{stat.value}</div>
              <div className="text-brand-crimson text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;
