import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function DoctorIn10Widget() {
  const { t, language } = useLanguage();
  const isHi = language === 'hi';

  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1); // 1: Chat, 2: Payment, 3: Wait, 4: Approved, 5: Video
  const [messages, setMessages] = useState([]);
  const [inputVal, setInputVal] = useState('');
  const [concern, setConcern] = useState('');
  const [uploadStatus, setUploadStatus] = useState(null);
  const bottomRef = useRef(null);
  const [timer, setTimer] = useState(0);

  // Auto-scroll chat
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, step]);

  // Video call timer
  useEffect(() => {
    let id;
    if (step === 5) {
      id = setInterval(() => setTimer(s => s + 1), 1000);
    }
    return () => clearInterval(id);
  }, [step]);

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
        ? "समझ गया! चलिए 10 मिनट का वीडियो कंसल्टेशन बुक करते हैं।\n\nफीस: ₹199 — UPI द्वारा भुगतान करें।"
        : "Got it! Let's book a quick 10-minute video consultation.\n\nConsultation fee: ₹199 only — pay via UPI." }]);
      setTimeout(() => setStep(2), 2000);
    }, 800);
  };

  const handleUpload = () => {
    setUploadStatus(isHi ? '✅ स्क्रीनशॉट अपलोड हो गया!' : '✅ Screenshot uploaded!');
  };

  const submitPayment = () => {
    setStep(3);
  };

  const simulateApproval = () => {
    setStep(4);
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Dr. Deepak Kumar is Ready!', { body: 'Join your video call now.' });
    }
  };

  const joinCall = () => {
    setStep(5);
  };

  const endCall = () => {
    setStep(1);
    setMessages(m => [...m, { from: 'bot', text: isHi
      ? '✅ कंसल्टेशन पूरा हुआ! आपका डिजिटल प्रिस्क्रिप्शन भेज दिया गया है।'
      : '✅ Consultation complete! Your digital prescription has been sent.'
    }]);
    setTimer(0);
  };

  const fmtTime = s => `${String(Math.floor(s / 60)).padStart(2,'0')}:${String(s % 60).padStart(2,'0')}`;

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
              <p className="text-white/70 text-xs m-0">
                {step === 5 ? '🔴 Live Video Call' : '🟢 Available · Replies in ~10 min'}
              </p>
            </div>
            {step > 1 && step < 5 && (
              <button onClick={() => setStep(1)} className="text-white/70 hover:text-white text-xs">Reset</button>
            )}
          </div>

          {/* STEP 1: Chat */}
          {step === 1 && (
            <>
              <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3" style={{ background: '#111b21', backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.02\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}>
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
              
              {/* Chips */}
              <div className="bg-[#111b21] p-3 border-t border-[#1e2840]">
                <div className="flex flex-wrap gap-2 mb-2">
                  {chips.map((c, i) => (
                    <button key={i} onClick={(e) => handleSend(e, c.text)} className="bg-[#1e2d36] border border-[#2a3942] text-[#e0e0e0] rounded-full px-3 py-1.5 text-xs hover:border-[#25D366] transition-colors">
                      {c.text}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Area */}
              <div className="bg-[#202c33] p-2 flex items-center gap-2 border-t border-[#2a3942]">
                <input
                  type="text"
                  value={inputVal}
                  onChange={e => setInputVal(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSend(e)}
                  placeholder="Type your concern..."
                  className="flex-1 bg-[#2a3942] border-none rounded-full px-4 py-2.5 text-sm text-white focus:outline-none placeholder:text-[#8696a0]"
                />
                <button onClick={handleSend} className="w-10 h-10 rounded-full bg-[#128C7E] flex items-center justify-center text-white shrink-0 hover:bg-[#25D366] transition-colors">
                  <span className="material-symbols-outlined text-[18px] ml-1">send</span>
                </button>
              </div>
            </>
          )}

          {/* STEP 2: Payment */}
          {step === 2 && (
            <div className="flex-1 bg-[#111b21] p-4 overflow-y-auto">
              <div className="bg-[#1e2d36] rounded-xl p-4 mb-4">
                <h4 className="text-white text-sm font-semibold mb-1">💊 Consultation Summary</h4>
                <p className="text-[#8696a0] text-xs">Your concern has been received. Book your slot now:</p>
                <div className="text-3xl font-bold text-[#25D366] my-3">₹199</div>
                <p className="text-[#e0e0e0] text-sm">Video consultation · 10-15 min</p>
              </div>
              
              <div className="mb-4">
                <p className="text-[#8696a0] text-xs mb-2">📸 Upload payment screenshot (UPI):</p>
                <div onClick={handleUpload} className="border-2 border-dashed border-[#2a3942] rounded-xl p-5 text-center cursor-pointer hover:border-[#25D366] hover:bg-[#25D366]/5 transition-colors">
                  <p className="text-[#e0e0e0] text-sm mb-1">{uploadStatus || '📂 Tap to upload screenshot'}</p>
                  {!uploadStatus && <span className="text-[#8696a0] text-[10px]">UPI · PhonePe · GPay accepted</span>}
                </div>
              </div>

              <div className="bg-[#1e2d36] rounded-xl p-3 mb-4 text-xs text-[#8696a0]">
                💳 UPI ID: <b className="text-white">deepakkumar@upi</b><br/>
                <span>Pay ₹199 and upload screenshot above</span>
              </div>

              <button onClick={submitPayment} disabled={!uploadStatus} className={`w-full py-3 rounded-lg font-bold text-sm transition-colors ${uploadStatus ? 'bg-[#25D366] text-black hover:bg-[#1fb358]' : 'bg-[#2a3942] text-[#8696a0] cursor-not-allowed'}`}>
                ✅ Submit & Request Doctor
              </button>
            </div>
          )}

          {/* STEP 3: Waiting */}
          {step === 3 && (
            <div className="flex-1 bg-[#111b21] p-6 text-center flex flex-col justify-center">
              <div className="text-5xl mb-4 animate-spin w-12 h-12 mx-auto border-4 border-[#25D366] border-t-transparent rounded-full"></div>
              <h4 className="text-white text-lg font-semibold mb-2">Request Sent!</h4>
              <p className="text-[#8696a0] text-sm mb-6">Dr. Deepak Kumar is reviewing your request</p>
              
              <div className="inline-flex items-center gap-2 bg-yellow-500/10 text-yellow-500 border border-yellow-500/30 px-4 py-1.5 rounded-full text-xs font-bold mx-auto mb-6">
                🟡 Pending Approval
              </div>

              <div className="bg-[#1e2d36] rounded-xl p-4 text-left mb-6">
                <p className="text-[#8696a0] text-xs mb-1">📋 Your request:</p>
                <p className="text-white text-sm">{concern}</p>
                <p className="text-[#25D366] text-[10px] mt-2">💰 Payment: Verified ✓</p>
              </div>

              {/* Dev Simulation Button */}
              <button onClick={simulateApproval} className="mt-auto text-[#8696a0] text-xs hover:text-white underline">
                [Dev Simulate: Doctor Approves]
              </button>
            </div>
          )}

          {/* STEP 4: Approved */}
          {step === 4 && (
            <div className="flex-1 bg-[#111b21] p-6 text-center flex flex-col justify-center">
              <div className="text-6xl mb-4 animate-bounce">🟢</div>
              <h4 className="text-[#25D366] text-xl font-bold mb-2">Doctor is Ready!</h4>
              <p className="text-[#8696a0] text-sm mb-6">Dr. Deepak has approved your request</p>
              
              <div className="bg-[#25D366]/10 border border-[#25D366]/30 rounded-xl p-4 mb-6">
                <p className="text-[#e0e0e0] text-xs">📱 Video call is ready. Join within <b className="text-[#25D366]">5 minutes</b>.</p>
              </div>

              <button onClick={joinCall} className="w-full bg-[#25D366] text-black font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:scale-[1.02] transition-transform">
                📹 Join Video Call Now
              </button>
            </div>
          )}

          {/* STEP 5: Video Call */}
          {step === 5 && (
            <div className="flex-1 bg-[#111b21] flex flex-col">
              <div className="flex-1 bg-black relative flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-2">👨‍⚕️</div>
                  <p className="text-[#8696a0] text-xs">Dr. Deepak Kumar</p>
                </div>
                {/* PIP User Video */}
                <div className="absolute bottom-4 right-4 w-20 h-28 bg-[#1a1a2e] border-2 border-[#2a3942] rounded-lg flex items-center justify-center text-3xl">🧑</div>
                {/* Live Tag */}
                <div className="absolute top-4 left-4 bg-black/60 rounded px-2 py-1 text-[10px] text-[#25D366] font-mono">
                  ● LIVE · {fmtTime(timer)}
                </div>
              </div>
              
              <div className="p-4 bg-[#111b21]">
                <div className="flex justify-center gap-4 mb-3">
                  <button className="w-12 h-12 rounded-full bg-[#1e2d36] text-white flex items-center justify-center border border-[#2a3942]">🎙️</button>
                  <button className="w-12 h-12 rounded-full bg-[#1e2d36] text-white flex items-center justify-center border border-[#2a3942]">📷</button>
                  <button onClick={endCall} className="w-12 h-12 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors">📵</button>
                </div>
                <p className="text-center text-[10px] text-[#8696a0]">End-to-end encrypted video consultation</p>
              </div>
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
