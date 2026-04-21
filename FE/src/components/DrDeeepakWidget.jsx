import React, { useState, useEffect, useRef } from 'react';

// ─── CONFIG ────────────────────────────────────────────────────────────────
const DOCTOR_PHONE   = '919546519953';
const DOCTOR_NAME    = 'Dr. Deepak Kumar';
const CLINIC_NAME    = 'Arogya Clinic';

// ─── CHAT FLOW DEFINITION ──────────────────────────────────────────────────
// Each step has a bot message + either free-text input or quick-reply chips
const STEPS = [
  {
    id: 'concern',
    bot: `Hello! 👋 I'm the ${CLINIC_NAME} assistant.\n\nWhat is your main health concern today?`,
    placeholder: 'e.g. Fever, Cough, Stomach pain…',
    type: 'text',
  },
  {
    id: 'duration',
    bot: 'How long have you been experiencing this?',
    placeholder: 'e.g. 2 days, 1 week…',
    chips: ['Since today', '2–3 days', '4–7 days', 'More than 1 week'],
    type: 'chips',
  },
  {
    id: 'severity',
    bot: 'How would you rate the severity of your symptoms?',
    chips: ['🟢 Mild', '🟡 Moderate', '🔴 Severe'],
    type: 'chips',
  },
  {
    id: 'medication',
    bot: 'Are you currently taking any medication for this?',
    chips: ['No medication', 'Yes, OTC medicine', 'Yes, prescribed medicine', 'Not sure'],
    type: 'chips',
  },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────
function buildWhatsAppMessage(answers) {
  const clean = (s) => s.replace(/[🟢🟡🔴]/gu, '').trim();
  return encodeURIComponent(
    `Hello ${DOCTOR_NAME}! I've filled out the pre-consultation form:\n\n` +
    `🩺 *Concern:* ${answers.concern}\n` +
    `⏱️ *Duration:* ${answers.duration}\n` +
    `📊 *Severity:* ${clean(answers.severity)}\n` +
    `💊 *Medication:* ${answers.medication}\n\n` +
    `Please help me with further guidance.`
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────
export default function DrDeeepakWidget() {
  const [open, setOpen]           = useState(false);
  const [step, setStep]           = useState(0);           // current question index
  const [messages, setMessages]   = useState([]);           // chat history
  const [inputVal, setInputVal]   = useState('');
  const [answers, setAnswers]     = useState({});
  const [done, setDone]           = useState(false);
  const [shake, setShake]         = useState(false);        // pulse on new message
  const [unread, setUnread]       = useState(false);
  const bottomRef                 = useRef(null);
  const inputRef                  = useRef(null);

  // ── Open widget & seed first bot message ─────────────────────────────
  const handleOpen = () => {
    setOpen(true);
    setUnread(false);
    if (messages.length === 0) {
      pushBot(STEPS[0].bot, 0);
    }
  };

  // ── Show notification dot after 4 s if widget is closed ──────────────
  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => setUnread(true), 4000);
      return () => clearTimeout(t);
    }
  }, [open]);

  // ── Auto-scroll to bottom on new messages ─────────────────────────────
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // ── Focus text input when step changes ────────────────────────────────
  useEffect(() => {
    if (open && STEPS[step]?.type === 'text') {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [step, open]);

  // ─── Push helpers ──────────────────────────────────────────────────────
  const pushBot = (text, delay = 500) => {
    setTimeout(() => {
      setMessages((m) => [...m, { from: 'bot', text }]);
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }, delay);
  };

  const pushUser = (text) => {
    setMessages((m) => [...m, { from: 'user', text }]);
  };

  // ─── Advance conversation ──────────────────────────────────────────────
  const advance = (value) => {
    const currentStep = STEPS[step];
    const newAnswers  = { ...answers, [currentStep.id]: value };
    setAnswers(newAnswers);
    pushUser(value);
    setInputVal('');

    const nextStep = step + 1;

    if (nextStep < STEPS.length) {
      setStep(nextStep);
      pushBot(STEPS[nextStep].bot);
    } else {
      // All 4 rounds done — show summary + CTA
      setDone(true);
      pushBot(
        `✅ Thanks! Here's your summary:\n\n` +
        `🩺 Concern: ${newAnswers.concern}\n` +
        `⏱️ Duration: ${newAnswers.duration}\n` +
        `📊 Severity: ${newAnswers.severity.replace(/[🟢🟡🔴]/gu, '').trim()}\n` +
        `💊 Medication: ${newAnswers.medication}\n\n` +
        `Tap the button below to send this to ${DOCTOR_NAME} on WhatsApp!`
      );
    }
  };

  // ─── Text submit ──────────────────────────────────────────────────────
  const handleSubmit = (e) => {
    e?.preventDefault();
    const val = inputVal.trim();
    if (!val) return;
    advance(val);
  };

  // ─── Open WhatsApp with summary ───────────────────────────────────────
  const openWhatsApp = () => {
    const msg = buildWhatsAppMessage(answers);
    window.open(`https://wa.me/${DOCTOR_PHONE}?text=${msg}`, '_blank');
  };

  // ─── Reset ────────────────────────────────────────────────────────────
  const resetChat = () => {
    setStep(0);
    setMessages([]);
    setAnswers({});
    setDone(false);
    setInputVal('');
    pushBot(STEPS[0].bot, 0);
  };

  // ─────────────────────────────────────────────────────────────────────
  //  RENDER
  // ─────────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── Floating Launcher Button ────────────────────────────────── */}
      <button
        id="dr-deepak-widget-launcher"
        onClick={open ? () => setOpen(false) : handleOpen}
        aria-label="Open pre-consultation chat"
        style={{
          position:     'fixed',
          bottom:       '28px',
          right:        '28px',
          zIndex:       9999,
          width:        '60px',
          height:       '60px',
          borderRadius: '50%',
          border:       'none',
          cursor:       'pointer',
          background:   'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
          boxShadow:    '0 6px 24px rgba(37,211,102,0.55)',
          display:      'flex',
          alignItems:   'center',
          justifyContent: 'center',
          transition:   'transform 0.2s ease, box-shadow 0.2s ease',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform  = 'scale(1.1)';
          e.currentTarget.style.boxShadow  = '0 10px 32px rgba(37,211,102,0.7)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform  = 'scale(1)';
          e.currentTarget.style.boxShadow  = '0 6px 24px rgba(37,211,102,0.55)';
        }}
      >
        {open ? (
          // X icon when open
          <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
            <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        ) : (
          // WhatsApp icon when closed
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="28" height="28" fill="white">
            <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
          </svg>
        )}

        {/* Unread dot */}
        {unread && !open && (
          <span style={{
            position:    'absolute',
            top:         '2px',
            right:       '2px',
            width:       '14px',
            height:      '14px',
            borderRadius: '50%',
            background:  '#FF3B30',
            border:      '2px solid white',
            animation:   'wa-pulse-dot 1.5s ease-in-out infinite',
          }} />
        )}
      </button>

      {/* ── Chat Window ─────────────────────────────────────────────── */}
      {open && (
        <div
          id="dr-deepak-widget-window"
          style={{
            position:      'fixed',
            bottom:        '102px',
            right:         '28px',
            zIndex:        9998,
            width:         '360px',
            maxWidth:      'calc(100vw - 40px)',
            borderRadius:  '20px',
            overflow:      'hidden',
            boxShadow:     '0 20px 60px rgba(0,0,0,0.18)',
            display:       'flex',
            flexDirection: 'column',
            background:    '#f0f4f8',
            animation:     'wa-slide-up 0.3s ease',
            fontFamily:    "'Inter', 'Segoe UI', sans-serif",
          }}
        >
          {/* Header */}
          <div style={{
            background:  'linear-gradient(135deg, #128C7E 0%, #075E54 100%)',
            padding:     '16px 20px',
            display:     'flex',
            alignItems:  'center',
            gap:         '12px',
          }}>
            {/* Avatar */}
            <div style={{
              width:        '44px',
              height:       '44px',
              borderRadius: '50%',
              background:   'rgba(255,255,255,0.2)',
              display:      'flex',
              alignItems:   'center',
              justifyContent: 'center',
              fontSize:     '22px',
              flexShrink:   0,
            }}>🩺</div>
            <div style={{ flex: 1 }}>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: '15px' }}>
                {CLINIC_NAME}
              </div>
              <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '12px' }}>
                Pre-consultation form · {STEPS.length} quick questions
              </div>
            </div>
            {/* Reset */}
            <button
              onClick={resetChat}
              title="Start over"
              style={{
                background: 'rgba(255,255,255,0.15)',
                border: 'none',
                borderRadius: '8px',
                padding: '6px 8px',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: 600,
              }}
            >↺ Reset</button>
          </div>

          {/* Progress bar */}
          <div style={{ height: '3px', background: 'rgba(18,140,126,0.12)' }}>
            <div style={{
              height:     '100%',
              background: 'linear-gradient(90deg, #25D366, #128C7E)',
              width:      `${Math.min((step / STEPS.length) * 100, 100)}%`,
              transition: 'width 0.4s ease',
            }} />
          </div>

          {/* Messages */}
          <div style={{
            flex:       1,
            overflowY:  'auto',
            padding:    '16px 14px',
            display:    'flex',
            flexDirection: 'column',
            gap:        '10px',
            maxHeight:  '320px',
            minHeight:  '200px',
          }}>
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display:       'flex',
                  justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start',
                  animation:     'wa-msg-in 0.25s ease',
                }}
              >
                <div style={{
                  maxWidth:     '82%',
                  padding:      '10px 14px',
                  borderRadius: msg.from === 'user'
                    ? '16px 16px 4px 16px'
                    : '16px 16px 16px 4px',
                  background:   msg.from === 'user'
                    ? 'linear-gradient(135deg, #25D366, #128C7E)'
                    : '#fff',
                  color:        msg.from === 'user' ? '#fff' : '#1a1a2e',
                  fontSize:     '13.5px',
                  lineHeight:   '1.55',
                  whiteSpace:   'pre-line',
                  boxShadow:    '0 2px 8px rgba(0,0,0,0.07)',
                }}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input area */}
          {!done ? (
            <div style={{
              borderTop:  '1px solid rgba(0,0,0,0.06)',
              background: '#fff',
              padding:    '12px 14px',
            }}>
              {/* Quick-reply chips */}
              {STEPS[step]?.type === 'chips' && (
                <div style={{
                  display:   'flex',
                  flexWrap:  'wrap',
                  gap:       '8px',
                  marginBottom: '0',
                }}>
                  {STEPS[step].chips.map((chip) => (
                    <button
                      key={chip}
                      onClick={() => advance(chip)}
                      style={{
                        padding:      '8px 14px',
                        borderRadius: '20px',
                        border:       '1.5px solid #25D366',
                        background:   '#f0fdf4',
                        color:        '#128C7E',
                        fontWeight:   600,
                        fontSize:     '13px',
                        cursor:       'pointer',
                        transition:   'all 0.15s ease',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = '#25D366';
                        e.currentTarget.style.color      = '#fff';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = '#f0fdf4';
                        e.currentTarget.style.color      = '#128C7E';
                      }}
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              )}

              {/* Free-text input */}
              {STEPS[step]?.type === 'text' && (
                <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px' }}>
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputVal}
                    onChange={e => setInputVal(e.target.value)}
                    placeholder={STEPS[step].placeholder}
                    style={{
                      flex:         1,
                      padding:      '10px 14px',
                      borderRadius: '12px',
                      border:       '1.5px solid #e2e8f0',
                      fontSize:     '13.5px',
                      outline:      'none',
                      transition:   'border-color 0.2s',
                    }}
                    onFocus={e  => e.target.style.borderColor = '#25D366'}
                    onBlur={e   => e.target.style.borderColor = '#e2e8f0'}
                  />
                  <button
                    type="submit"
                    style={{
                      padding:      '10px 16px',
                      borderRadius: '12px',
                      border:       'none',
                      background:   'linear-gradient(135deg, #25D366, #128C7E)',
                      color:        '#fff',
                      fontWeight:   700,
                      fontSize:     '13px',
                      cursor:       'pointer',
                    }}
                  >
                    Send ➤
                  </button>
                </form>
              )}
            </div>
          ) : (
            /* Done state — WhatsApp CTA */
            <div style={{
              borderTop:  '1px solid rgba(0,0,0,0.06)',
              background: '#fff',
              padding:    '14px',
              display:    'flex',
              flexDirection: 'column',
              gap:        '8px',
            }}>
              <button
                id="dr-deepak-widget-whatsapp-cta"
                onClick={openWhatsApp}
                style={{
                  width:       '100%',
                  padding:     '14px',
                  borderRadius: '14px',
                  border:      'none',
                  background:  'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                  color:       '#fff',
                  fontWeight:  800,
                  fontSize:    '15px',
                  cursor:      'pointer',
                  display:     'flex',
                  alignItems:  'center',
                  justifyContent: 'center',
                  gap:         '10px',
                  boxShadow:   '0 4px 16px rgba(37,211,102,0.4)',
                  transition:  'opacity 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="20" height="20" fill="white">
                  <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                </svg>
                Send to {DOCTOR_NAME} on WhatsApp
              </button>
              <button
                onClick={resetChat}
                style={{
                  width:       '100%',
                  padding:     '10px',
                  borderRadius: '12px',
                  border:      '1.5px solid #e2e8f0',
                  background:  'transparent',
                  color:       '#64748b',
                  fontWeight:  600,
                  fontSize:    '13px',
                  cursor:      'pointer',
                }}
              >
                ↺ Start over
              </button>
            </div>
          )}

          {/* Footer */}
          <div style={{
            background:  '#f8fafc',
            textAlign:   'center',
            padding:     '8px',
            fontSize:    '11px',
            color:       '#94a3b8',
            borderTop:   '1px solid rgba(0,0,0,0.04)',
          }}>
            🔒 Your details go directly to {DOCTOR_NAME}
          </div>
        </div>
      )}

      {/* ── Animations ─────────────────────────────────────────────── */}
      <style>{`
        @keyframes wa-slide-up {
          from { opacity: 0; transform: translateY(20px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        @keyframes wa-msg-in {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0);   }
        }
        @keyframes wa-pulse-dot {
          0%, 100% { transform: scale(1);   opacity: 1; }
          50%       { transform: scale(1.3); opacity: 0.7; }
        }
        @keyframes wa-pulse-ring {
          0%   { transform: scale(1);   opacity: 0.6; }
          70%  { transform: scale(1.7); opacity: 0;   }
          100% { transform: scale(1.7); opacity: 0;   }
        }
        #dr-deepak-widget-launcher::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: rgba(37,211,102,0.4);
          animation: wa-pulse-ring 2.2s ease-out infinite;
          z-index: -1;
        }
      `}</style>
    </>
  );
}
