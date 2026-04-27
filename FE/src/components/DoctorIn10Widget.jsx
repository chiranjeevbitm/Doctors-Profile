import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';

const WA_PHONE_NUMBER = '918877556142'; // Dr. Deepak's WhatsApp

export default function DoctorIn10Widget() {
  const { t, language } = useLanguage();
  const isHi = language === 'hi';

  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1); // 1: Chat, 2: Payment Handoff
  const [messages, setMessages] = useState([]);
  const [inputVal, setInputVal] = useState('');
  const [concern, setConcern] = useState('');
  const bottomRef = useRef(null);

  // Auto-scroll chat
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, step]);

  const handleOpen = () => {
    setOpen(!open);
    if (!open && messages.length === 0) {
      setTimeout(() => {
        setMessages([
          { from: 'bot', text: isHi 
            ? '👋 नमस्ते! मैं Dr. Deepak Kumar हूँ। आपकी क्या समस्या है?' 
            : '👋 Hello! I am Dr. Deepak Kumar. What health concern can I help you with today?' },
          { from: 'bot', text: isHi 
            ? 'कृपया अपनी समस्या बताएं और हम 10 मिनट में वीडियो कॉल पर बात कर सकते हैं।'
            : 'Please describe your concern — we can connect via video call in 10 minutes.' }
        ]);
      }, 300);
    }
  };

  const handleSend = (e, presetText = null) => {
    e?.preventDefault();
    const text = presetText || inputVal.trim();
    if (!text) return;
    
    setMessages(m => [...m, { from: 'user', text }]);
    setConcern(text);
    setInputVal('');

    setTimeout(() => {
      setMessages(m => [...m, { from: 'bot', text: isHi 
        ? "समझ गया! चलिए 10 मिनट का वीडियो कंसल्टेशन बुक करते हैं।\n\nफीस: ₹199 — नीचे दी गई UPI ID पर भुगतान करें।"
        : "Got it! Let's book a quick 10-minute video consultation.\n\nConsultation fee: ₹199 only — please pay via UPI below." }]);
      setTimeout(() => setStep(2), 2000);
    }, 800);
  };

  const openWhatsApp = async () => {
    // Optional: Send to backend analytics before redirecting
    try {
      await fetch('http://localhost:8000/api/telemedicine/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patient_name: 'WhatsApp Lead',
          concern: concern,
          amount_paid: 199
        })
      });
    } catch (err) {
      console.warn("Backend logging failed, but proceeding to WhatsApp");
    }

    const message = isHi 
      ? `नमस्ते डॉक्टर, मुझे कंसल्टेशन चाहिए।\n\nसमस्या: ${concern}\n\nमेरा UPI पेमेंट का स्क्रीनशॉट: [कृपया यहाँ फोटो जोड़ें]`
      : `Hello Doctor, I need a consultation.\n\nConcern: ${concern}\n\nMy UPI Payment Screenshot: [Please attach photo here]`;
      
    const waUrl = `https://wa.me/${WA_PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
    
    // Close widget and reset
    setOpen(false);
    setTimeout(() => {
      setStep(1);
      setMessages([]);
    }, 500);
  };

  const chips = [
    { text: isHi ? 'बुखार और सिरदर्द 🤒' : 'Fever & Headache 🤒' },
    { text: isHi ? 'पेट में दर्द 🤢' : 'Stomach Pain 🤢' },
    { text: isHi ? 'लू लगना ☀️' : 'Heatstroke ☀️' },
  ];

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={handleOpen}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full flex items-center justify-center text-white text-3xl shadow-xl z-[9999] hover:scale-110 transition-transform"
        style={{
          background: '#25D366',
          boxShadow: '0 8px 32px rgba(37,211,102,0.4)',
          animation: open ? 'none' : 'wa-pulse-ring 2s infinite'
        }}
      >
        {open ? <span className="text-2xl material-symbols-outlined">close</span> : '💬'}
        {!open && <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 border-2 border-white rounded-full flex items-center justify-center text-[10px] font-bold">1</div>}
      </button>

      {/* Widget Window */}
      {open && (
        <div className="fixed bottom-24 right-4 md:right-6 w-[360px] max-w-[calc(100vw-32px)] bg-[#0d1117] border border-[#1e2840] rounded-2xl shadow-2xl flex flex-col z-[9998] overflow-hidden" style={{ height: '520px' }}>
          
          {/* Header */}
          <div className="bg-[#128C7E] px-4 py-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-xl shrink-0">👨‍⚕️</div>
            <div className="flex-1">
              <h4 className="text-white font-semibold text-sm m-0">Dr. Deepak Kumar</h4>
              <p className="text-white/70 text-xs m-0">🟢 Online · Replies instantly</p>
            </div>
            {step > 1 && (
              <button onClick={() => { setStep(1); setMessages([]); handleOpen(); handleOpen(); }} className="text-white/70 hover:text-white text-xs">Reset</button>
            )}
          </div>

          {/* Chat Flow */}
          {step === 1 && (
            <>
              <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3" style={{ background: '#111b21' }}>
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-2.5 rounded-xl text-sm leading-relaxed ${msg.from === 'user' ? 'bg-[#005c4b] text-white rounded-tr-sm' : 'bg-[#1e2d36] text-[#e8edf5] rounded-tl-sm'}`}>
                      {msg.text.split('\n').map((line, j) => <React.Fragment key={j}>{line}<br/></React.Fragment>)}
                      <div className="text-[10px] text-white/50 mt-1 text-right">Just now</div>
                    </div>
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>
              
              <div className="bg-[#111b21] p-3 border-t border-[#1e2840]">
                <div className="flex flex-wrap gap-2 mb-2">
                  {chips.map((c, i) => (
                    <button key={i} onClick={(e) => handleSend(e, c.text)} className="bg-[#1e2d36] border border-[#2a3942] text-[#e0e0e0] rounded-full px-3 py-1.5 text-xs hover:border-[#25D366] transition-colors">
                      {c.text}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-[#202c33] p-2 flex items-center gap-2 border-t border-[#2a3942]">
                <input
                  type="text"
                  value={inputVal}
                  onChange={e => setInputVal(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSend(e)}
                  placeholder={isHi ? "अपनी समस्या लिखें..." : "Type your concern..."}
                  className="flex-1 bg-[#2a3942] border-none rounded-full px-4 py-2.5 text-sm text-white focus:outline-none placeholder:text-[#8696a0]"
                />
                <button onClick={handleSend} className="w-10 h-10 rounded-full bg-[#128C7E] flex items-center justify-center text-white shrink-0 hover:bg-[#25D366] transition-colors">
                  <span className="material-symbols-outlined text-[18px] ml-1">send</span>
                </button>
              </div>
            </>
          )}

          {/* Step 2: Payment & WhatsApp Handoff */}
          {step === 2 && (
            <div className="flex-1 bg-[#111b21] p-5 flex flex-col items-center text-center justify-center">
              <div className="bg-[#1e2d36] rounded-xl p-5 mb-6 w-full shadow-lg">
                <h4 className="text-white text-sm font-semibold mb-2">💊 {isHi ? 'कंसल्टेशन फीस' : 'Consultation Fee'}</h4>
                <div className="text-4xl font-bold text-[#25D366] my-2">₹199</div>
                <p className="text-[#8696a0] text-xs mt-2">10-15 Min Video Call</p>
              </div>

              <div className="bg-[#1e2d36] rounded-xl p-4 mb-6 w-full text-sm text-[#8696a0] border border-[#2a3942]">
                <p className="mb-2">💳 UPI ID:</p>
                <p className="text-white font-mono text-lg font-bold select-all tracking-wider">deepakkumar@upi</p>
              </div>

              <p className="text-[#e0e0e0] text-sm mb-4">
                {isHi ? '1. ₹199 का भुगतान करें' : '1. Pay ₹199 using any UPI app'}<br/>
                {isHi ? '2. WhatsApp पर पेमेंट स्क्रीनशॉट भेजें' : '2. Send the screenshot on WhatsApp'}
              </p>

              <button onClick={openWhatsApp} className="w-full bg-[#25D366] text-black font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-[#1fb358] transition-colors shadow-[0_4px_14px_rgba(37,211,102,0.3)]">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                </svg>
                {isHi ? 'WhatsApp पर स्क्रीनशॉट भेजें' : 'Send Screenshot on WhatsApp'}
              </button>
            </div>
          )}

        </div>
      )}

      <style>{`
        @keyframes wa-pulse-ring {
          0%   { box-shadow: 0 0 0 0 rgba(37,211,102,0.7); }
          70%  { box-shadow: 0 0 0 15px rgba(37,211,102,0); }
          100% { box-shadow: 0 0 0 0 rgba(37,211,102,0); }
        }
      `}</style>
    </>
  );
}
