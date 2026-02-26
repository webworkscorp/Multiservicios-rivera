
import React from 'react';
import { X, Check } from 'lucide-react';

const PainPoints: React.FC = () => {
  return (
    <section id="metodologia" className="py-24 bg-brand-concrete">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-heading font-black tracking-tighter text-brand-dark uppercase">
            EL ERROR LE SALE CARO.
          </h2>
          <p className="text-brand-slate text-lg mt-4 font-light">Eliminamos la informalidad que destruye su presupuesto.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-gray-200 border border-gray-200 overflow-hidden shadow-2xl">
          <div className="bg-white p-12">
            <h4 className="text-xs font-black tracking-[0.3em] text-gray-400 uppercase mb-10">La Competencia</h4>
            <ul className="space-y-6">
              {["Costos sorpresa", "Tiempos infinitos", "Acabados mediocres", "Sin garantía real"].map((t, i) => (
                <li key={i} className="flex items-center gap-4 text-gray-400">
                  <X size={18} className="text-red-300" />
                  <span className="font-bold text-sm uppercase tracking-widest">{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-brand-dark p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-crimson/20 blur-[60px]"></div>
            <h4 className="text-xs font-black tracking-[0.3em] text-brand-crimson uppercase mb-10">Sello Rivera</h4>
            <ul className="space-y-6">
              {["Presupuesto cerrado", "Cumplimiento puntual", "Excelencia técnica", "Respaldo total"].map((t, i) => (
                <li key={i} className="flex items-center gap-4 text-white">
                  <Check size={18} className="text-brand-crimson" />
                  <span className="font-black text-sm uppercase tracking-widest">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PainPoints;
