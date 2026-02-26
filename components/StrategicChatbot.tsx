import React, { useState, useRef, useEffect } from 'react';
import { X, Send } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface Message {
  role: 'user' | 'assistant';
  content: string;
  isTyping?: boolean;
  showContactButton?: boolean;
}

const TypingMessage: React.FC<{ text: string; onComplete?: () => void }> = ({ text, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 15);
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, onComplete]);

  return <>{displayedText}</>;
};

const StrategicChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProactive, setShowProactive] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hola. ¿En qué puedo ayudarte hoy con tu duda o proyecto?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [interactionCount, setInteractionCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setShowProactive(false);
      return;
    }

    const interval = setInterval(() => {
      setShowProactive(prev => !prev);
    }, 5000);

    return () => clearInterval(interval);
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);
    setShowProactive(false);

    try {
      const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
      
      if (!apiKey) {
        console.error("❌ ERROR CRÍTICO: No se encontró la API Key de Gemini.");
        console.error("SOLUCIÓN: Vaya a Settings > Environment Variables en Vercel y agregue 'GEMINI_API_KEY'.");
        throw new Error("Configuración incompleta: Falta la API Key.");
      }
      
      const ai = new GoogleGenAI({ apiKey });
      
      const systemInstruction = `
        Eres un experto técnico de "Multiservicios Rivera" (Rivera Engineering Group), una empresa líder en Costa Rica con más de 20 años de trayectoria y más de 150 proyectos entregados con éxito.
        
        Tu misión es entender las necesidades del usuario y resolver sus dudas técnicas con precisión, basándote ÚNICAMENTE en la información real de la empresa.
        
        INFORMACIÓN CLAVE DE LA EMPRESA (NO INVENTES DATOS):
        - Nombre: Multiservicios Rivera / Rivera Engineering Group.
        - Ubicación: Costa Rica (Código de país +506).
        - Experiencia: Más de 20 años.
        - Proyectos: Más de 150 obras entregadas.
        - Filosofía: "No vendemos trabajo, vendemos certeza". "Su obra, sin errores". Nos enfocamos en calidad técnica, orden y cumplimiento.
        - Contacto: Teléfono 8708-8047 / Email: les82rivera@hotmail.com
        
        SERVICIOS QUE OFRECEMOS (SOLO ESTOS):
        1. Sistemas de Potencia (Eléctrica): Tensión y transmisión eléctrica.
        2. Sistemas de Señales (Voz y Datos): Transmisión de voz/datos, alarmas, seguridad.
        3. Fontanería (Hidráulica): Agua potable, aguas pluviales, aguas negras, sistemas de bombeo.
        4. Sistemas Mecánicos Industriales: Redes de gases médicos e industriales.
        5. Soldaduras y Estructuras Metálicas.
        6. Acabados y Detalles de Lujo (Remodelación corporativa y residencial).
        7. Infraestructura: Redes de ventilación, cableado estructurado.
        
        PERSONALIDAD Y REGLAS:
        - Tono: Profesional, experto, directo, amable y "humano". Habla siempre en "nosotros".
        - EXTREMADAMENTE CONCISO: Tus respuestas deben ser cortas (máximo 2-3 oraciones). Ve al grano.
        - CERO ROBÓTICO: Evita frases como "Como modelo de lenguaje", "En base a mi información", "Es un placer ayudarte". Sé natural: "Claro, podemos revisar eso", "Entendido, lo hacemos así".
        - NO uses palabras como "senior", "asesoría" o "consultoría" de forma genérica. Usa "Asesoría Técnica Rivera" si es necesario.
        - NO inventes servicios que no están en la lista (ej. no hacemos jardinería ni limpieza doméstica simple).
        - Si te preguntan de dónde somos, di Costa Rica.
        - Si te preguntan cuántos años tenemos, di más de 20 años.
        - Responde las dudas técnicas de forma clara y útil.
        - NO sugieras ir al formulario de contacto en cada respuesta. Solo hazlo si el usuario pregunta cómo contratar o si la solución requiere una inspección física obligatoria.
        - Mantén la conversación fluida y centrada en ayudar.
      `;

      const chat = ai.chats.create({
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.5,
        },
        history: [
          { role: 'user', parts: [{ text: 'Hola, tengo una duda.' }] },
          ...messages.map(m => ({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.content }]
          }))
        ]
      });

      const result = await chat.sendMessage({ message: userMessage });
      
      if (!result || !result.text) {
        throw new Error("Respuesta vacía");
      }

      const response = result.text;
      const newInteractionCount = interactionCount + 1;
      setInteractionCount(newInteractionCount);
      
      const showButton = newInteractionCount >= 5;

      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: response, 
        isTyping: true,
        showContactButton: showButton
      }]);
    } catch (error: any) {
      console.error("Error en el Chatbot:", error);
      const errorMessage = "Lo siento, he tenido un problema técnico. Por favor, intente de nuevo o contacte directamente por WhatsApp.";
      setMessages(prev => [...prev, { role: 'assistant', content: errorMessage, isTyping: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <div className="fixed bottom-20 right-0 z-50 flex flex-col items-end">
        {!isOpen && (
          <div className={`mb-4 mr-4 bg-white/95 backdrop-blur-sm text-brand-dark px-5 py-3 rounded-2xl rounded-br-none shadow-2xl border border-brand-dark/5 text-xs font-bold transition-all duration-500 transform ${showProactive ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-90 pointer-events-none'}`}>
            ¿Cómo podemos ayudarte?
            <div className="absolute -bottom-2 right-0 w-4 h-4 bg-white/95 border-r border-b border-brand-dark/5 rotate-45"></div>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`transition-all duration-500 hover:scale-110 active:scale-95 flex items-center justify-center group ${isOpen ? 'w-14 h-14 bg-brand-dark text-white rotate-90 rounded-full shadow-2xl mr-4' : 'w-[130px] h-[130px] p-0 bg-transparent border-none outline-none shadow-none'}`}
          aria-label="Abrir asistente virtual"
        >
          {isOpen ? (
            <X size={24} />
          ) : (
            <img 
              src="https://i.imgur.com/2xdKPo4.png" 
              alt="Asistente Rivera"
              className="w-full h-full object-contain drop-shadow-2xl"
              referrerPolicy="no-referrer"
            />
          )}
        </button>
      </div>

      {isOpen && (
        <div className="fixed bottom-44 right-8 z-50 w-[90vw] md:w-[360px] max-h-[70vh] md:max-h-[520px] bg-white/95 backdrop-blur-md rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-brand-dark/5 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-300 origin-bottom-right">
          
          <div className="bg-brand-dark p-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg border border-white/10 overflow-hidden">
                <img 
                  src="https://i.imgur.com/2xdKPo4.png" 
                  alt="Avatar Asistente"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h3 className="text-white font-heading font-bold text-sm tracking-wide">ASISTENTE RIVERA</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-white/60 text-[10px] uppercase tracking-wider">en línea</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/40 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-5 space-y-5 bg-gray-50/30 scroll-smooth">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[88%] p-4 rounded-2xl text-[14px] leading-[1.6] shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-brand-dark text-white rounded-tr-none'
                      : 'bg-white text-brand-dark border border-gray-100 rounded-tl-none font-medium'
                  }`}
                >
                  {msg.role === 'assistant' && msg.isTyping ? (
                    <TypingMessage 
                      text={msg.content} 
                      onComplete={() => {
                        const newMessages = [...messages];
                        newMessages[index].isTyping = false;
                        setMessages(newMessages);
                      }} 
                    />
                  ) : (
                    <>
                      <div className="whitespace-pre-wrap">{msg.content}</div>
                      {msg.showContactButton && (
                        <div className="mt-3 pt-3 border-t border-gray-100 animate-in fade-in slide-in-from-top-2 duration-500">
                          <p className="text-xs text-gray-500 mb-2">¿Necesitas ayuda más específica?</p>
                          <a 
                            href="#contacto" 
                            onClick={(e) => {
                              e.preventDefault();
                              setIsOpen(false);
                              const contactSection = document.getElementById('contacto');
                              if (contactSection) {
                                contactSection.scrollIntoView({ behavior: 'smooth' });
                              }
                            }}
                            className="block w-full bg-brand-crimson text-white text-center py-2 rounded-lg text-xs font-bold hover:bg-red-700 transition-colors shadow-sm"
                          >
                            Ir al Formulario de Contacto
                          </a>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-brand-dark/40 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 bg-brand-dark/40 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-brand-dark/40 rounded-full animate-bounce"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 bg-white border-t border-gray-100 shrink-0">
            <div className="relative flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Escriba su consulta..."
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 pr-12 text-sm focus:outline-none focus:border-brand-crimson focus:ring-1 focus:ring-brand-crimson transition-all placeholder:text-gray-400 text-brand-dark"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="absolute right-2 p-2 bg-brand-dark text-white rounded-lg hover:bg-brand-crimson disabled:opacity-50 disabled:hover:bg-brand-dark transition-colors shadow-md"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StrategicChatbot;
