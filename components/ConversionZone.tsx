
import React, { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const ConversionZone: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Configuración del mensaje de WhatsApp
    const phoneNumber = "50687088047"; // Número destino
    const text = `*Nueva Solicitud desde Web*\n\n*Nombre:* ${formData.name}\n*Detalle de la consulta:* ${formData.message}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;

    // Abrir WhatsApp en nueva pestaña
    window.open(whatsappUrl, '_blank');

    // Mostrar estado de éxito en la web
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (submitted) {
    return (
      <section id="contacto" className="py-32 bg-brand-dark text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-crimson/10 blur-[120px]"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center">
          <div className="w-20 h-20 bg-brand-crimson rounded-full flex items-center justify-center mb-8 shadow-2xl animate-pulse">
            <CheckCircle2 size={40} className="text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-black text-white mb-6 tracking-tighter uppercase">
            REDIRECCIONANDO <span className="text-brand-crimson">A WHATSAPP...</span>
          </h2>
          <p className="text-xl text-white/60 font-light max-w-lg mx-auto uppercase tracking-widest leading-relaxed">
            Si la ventana no se abrió automáticamente, por favor verifique sus ventanas emergentes.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="mt-12 text-white/40 hover:text-brand-crimson text-[10px] font-black uppercase tracking-[0.3em] transition-colors"
          >
            ← Volver al formulario
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="contacto" className="py-24 bg-brand-dark relative overflow-hidden flex items-center">
      {/* Capas decorativas sutiles */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-brand-dark to-brand-dark opacity-40 pointer-events-none"></div>
      
      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10 w-full">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          
          {/* Columna de Texto Persuasivo - Breve y Humano */}
          <div className="md:col-span-7 text-left">
            <div className="inline-block h-1 w-12 bg-brand-crimson mb-6"></div>
            <h2 className="text-5xl md:text-7xl font-heading font-black text-white mb-6 tracking-tighter leading-[0.9] uppercase">
              HABLEMOS DE <br /> <span className="text-brand-crimson">SU PROYECTO.</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/80 font-light leading-relaxed max-w-lg">
              Evite riesgos y costos extra. Cuéntenos qué necesita; nosotros ponemos la ingeniería, el orden y la garantía.
            </p>
          </div>

          {/* Columna de Formulario Minimalista */}
          <div className="md:col-span-5 bg-white/5 backdrop-blur-sm border border-white/10 p-8 md:p-10 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-brand-crimson uppercase tracking-widest ml-1">Sus Datos</label>
                <input 
                  required
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-brand-dark border-b border-white/20 px-4 py-4 text-white focus:outline-none focus:border-brand-crimson transition-colors placeholder:text-white/20 text-lg"
                  placeholder="Nombre Completo"
                />
              </div>

              <div className="space-y-2 pt-2">
                <label className="text-[10px] font-black text-brand-crimson uppercase tracking-widest ml-1">Su Consulta</label>
                <textarea 
                  required
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-brand-dark border-b border-white/20 px-4 py-4 text-white focus:outline-none focus:border-brand-crimson transition-colors resize-none placeholder:text-white/20 text-lg"
                  placeholder="¿En qué podemos ayudarle?"
                ></textarea>
              </div>

              <div className="flex justify-center mt-6">
                <button 
                  type="submit"
                  className="w-full md:w-auto bg-brand-crimson text-white px-8 py-6 font-black uppercase tracking-[0.25em] text-xs hover:bg-white hover:text-brand-dark transition-all flex items-center justify-center gap-3 group"
                >
                  AGENDAR CONSULTA
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ConversionZone;
