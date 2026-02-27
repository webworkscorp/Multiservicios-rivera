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
    { role: 'assistant', content: 'Hola. Soy el asistente virtual de Multiservicios Rivera. ¿En qué puedo ayudarte hoy?' }
  ]);
  // Estado para rastrear datos del usuario (Memoria Contextual)
  const [userData, setUserData] = useState({
    location: '',
    service: '',
    urgency: false,
    projectType: '', // residential | commercial
    detailsGiven: false
  });
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

  // Función auxiliar para actualizar memoria local (Regex) - Se mantiene para tracking interno
  const updateUserData = (input: string, currentData: typeof userData) => {
    const lowerInput = input.toLowerCase().trim();
    let newData = { ...currentData };

    // Urgencia
    if (lowerInput.match(/(urgente|ya|rápido|ahora|emergencia|fuga|corto|quemó|explotó|inundación|auxilio)/)) {
      newData.urgency = true;
    } else if (lowerInput.match(/(planeando|cotizar|futuro|pensando|presupuesto|idea|gustaría|veremos|calma|tranquilo)/)) {
      newData.urgency = false;
    }

    // Ubicación
    if (lowerInput.match(/(gam|san josé|alajuela|heredia|cartago|escazú|santa ana|rural|guanacaste|puntarenas|limón)/)) {
      newData.location = "identificada";
    }

    // Tipo de Proyecto
    if (lowerInput.match(/(casa|hogar|residencia|apartamento|condominio|habitacion|cuarto|sala|cocina|baño)/)) {
      newData.projectType = 'residential';
    } else if (lowerInput.match(/(local|comercio|oficina|negocio|empresa|industria|bodega|edificio|tienda)/)) {
      newData.projectType = 'commercial';
    }

    // Servicio
    if (lowerInput.match(/(electric|luz|breaker|tomacorriente|cableado|lampara|enchufe)/)) newData.service = 'electricidad';
    else if (lowerInput.match(/(fontaner|agua|tubo|cañería|fuga|bomba|grifo|lavabo|ducha)/)) newData.service = 'fontanería';
    else if (lowerInput.match(/(remodel|piso|pared|pintura|gypsum|cielo|ceramica|azulejo|ampliacion)/)) newData.service = 'remodelación';
    else if (lowerInput.match(/(solda|estructura|techo|verja|portón|metal|hierro|acero)/)) newData.service = 'estructuras';
    else if (lowerInput.match(/(red|datos|cámara|internet|voz|wifi|cableado)/)) newData.service = 'redes';

    // Detalles
    if (lowerInput.length > 15 && !newData.detailsGiven) {
      newData.detailsGiven = true;
    }
    
    return newData;
  };

  const generateAIResponse = async (userMessage: string, history: Message[], currentData: typeof userData) => {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const systemInstruction = `
        Actúa como un asesor humano real de "Multiservicios Rivera" (Costa Rica).
        Tu objetivo es ENTENDER lo que el cliente quiere y guiarlo a una visita técnica o cotización.

        DATOS QUE NECESITAS RECOLECTAR (No preguntes todo de golpe, ve natural):
        1. Servicio (Electricidad, Fontanería, Remodelación, Estructuras, Redes).
        2. Tipo de Proyecto (Residencial o Comercial).
        3. Ubicación (GAM o fuera).
        4. Detalles del problema.

        CONTEXTO ACTUAL DETECTADO (Úsalo para no repetir preguntas):
        - Servicio: ${currentData.service || 'No detectado aún'}
        - Tipo: ${currentData.projectType || 'No detectado aún'}
        - Ubicación: ${currentData.location || 'No detectada aún'}
        - Urgencia: ${currentData.urgency ? 'SÍ' : 'No/Por definir'}

        REGLAS DE COMPORTAMIENTO:
        - Habla con un tono natural, profesional y cercano.
        - Evita modismos excesivos, pero sé amable y directo.
        - NADA de lenguaje robótico o corporativo (prohibido: "ingeniería", "levantamiento", "transformación").
        - Respuestas CORTAS y DIRECTAS (máximo 2-3 frases).
        - Si el cliente da info parcial, asume o pregunta suavemente lo que falta.
        - Si es URGENTE -> Cierra de inmediato.
        - Si NO es urgente -> Enfócate en calidad y planificación.
        - NUNCA repitas una pregunta que ya se contestó.
        - MÁXIMO 1 pregunta por turno.

        CIERRE:
        - Cuando tengas clara la necesidad (Servicio + Lugar + Detalle), propón la visita/revisión.
        - Si el cliente pregunta precio, di que se necesita ver en sitio para no batear y ofrece visita.
        - Cuando propongas la visita o el contacto, añade al final de tu respuesta la etiqueta: [BUTTON]
        - Si el usuario ya aceptó o pidió contacto, responde confirmando y añade: [BUTTON]
      `;

      // Construct the full conversation history for the API
      const contents = history.map(msg => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      }));

      // Add the current user message
      contents.push({
        role: 'user',
        parts: [{ text: userMessage }]
      });

      const result = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction: systemInstruction,
        },
        contents: contents
      });

      let finalText = result.text || "";
      let triggerButton = false;

      if (finalText.includes('[BUTTON]')) {
        triggerButton = true;
        finalText = finalText.replace('[BUTTON]', '').trim();
      }

      return { text: finalText, triggerButton };

    } catch (error) {
      console.error("Error calling Gemini API:", error);
      // Fallback local logic if API fails
      return { 
        text: "Disculpa, tuve un pequeño problema de conexión. ¿Me decías?", 
        triggerButton: false 
      };
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading || interactionCount >= 7) return;

    const userMessage = input;
    setInput('');
    const newMessages = [...messages, { role: 'user' as const, content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);
    setShowProactive(false);

    // 1. Actualizar memoria local (Regex) para mantener el estado
    const newData = updateUserData(userMessage, userData);
    setUserData(newData);

    // 2. Llamar a la API
    const { text: responseText, triggerButton } = await generateAIResponse(userMessage, messages, newData);

    const newInteractionCount = interactionCount + 1;
    setInteractionCount(newInteractionCount);
    
    // Fallback: Si llevamos muchas interacciones, mostrar botón
    const showButton = triggerButton || newInteractionCount >= 7;

    setMessages(prev => [...prev, { 
      role: 'assistant', 
      content: responseText, 
      isTyping: true,
      showContactButton: showButton
    }]);
    setIsLoading(false);
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
                  <span className={`w-2 h-2 rounded-full ${interactionCount >= 7 ? 'bg-red-500' : 'bg-green-500 animate-pulse'}`}></span>
                  <span className="text-white/60 text-[10px] uppercase tracking-wider">{interactionCount >= 7 ? 'finalizado' : 'en línea'}</span>
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
                placeholder={interactionCount >= 7 ? "Chat finalizado. Por favor use el botón de contacto." : "Escriba su consulta..."}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 pr-12 text-sm focus:outline-none focus:border-brand-crimson focus:ring-1 focus:ring-brand-crimson transition-all placeholder:text-gray-400 text-brand-dark disabled:opacity-60 disabled:bg-gray-100"
                disabled={isLoading || interactionCount >= 7}
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim() || interactionCount >= 7}
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
