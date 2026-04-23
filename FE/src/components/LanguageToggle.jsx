import { useLanguage } from '../context/LanguageContext';

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      style={{
        position: 'fixed',
        bottom: '100px',
        right: '20px',
        width: '55px',
        height: '55px',
        borderRadius: '50%',
        backgroundColor: '#2563eb',
        color: 'white',
        border: 'none',
        fontWeight: '700',
        fontSize: '14px',
        cursor: 'pointer',
        boxShadow: '0 4px 15px rgba(37, 99, 235, 0.4)',
        zIndex: '9999',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onMouseOver={(e) => {
        e.target.style.transform = 'scale(1.1)';
        e.target.style.boxShadow = '0 6px 20px rgba(37, 99, 235, 0.5)';
      }}
      onMouseOut={(e) => {
        e.target.style.transform = 'scale(1)';
        e.target.style.boxShadow = '0 4px 15px rgba(37, 99, 235, 0.4)';
      }}
    >
      {language === 'en' ? 'हिन्दी' : 'ENG'}
    </button>
  );
};

export default LanguageToggle;