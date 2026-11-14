import Icon from './Icon';
import { useLanguage } from '../context/LanguageContext';

/**
 * Sits bottom-left so it never fights the WhatsApp widget on the right, and
 * clears the mobile action bar and the phone's home indicator.
 */
const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();
  const next = language === 'en' ? 'हिन्दी' : 'English';

  return (
    <button
      onClick={toggleLanguage}
      aria-label={language === 'en' ? 'हिन्दी में पढ़ें' : 'Read in English'}
      className="group fixed left-4 z-[70] lg:!bottom-6 inline-flex items-center gap-2 rounded-full border border-line bg-paper/95 px-4 py-2.5 text-[14px] font-bold text-ink shadow-lift backdrop-blur-xl transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-lift-lg active:translate-y-0"
      style={{ bottom: 'calc(92px + env(safe-area-inset-bottom, 0px))' }}
    >
      <Icon n="translate" size={18} />
      {next}
    </button>
  );
};

export default LanguageToggle;
