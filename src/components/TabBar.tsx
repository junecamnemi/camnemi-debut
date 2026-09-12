import { Icon } from './Icon';
import { useI18n, type TKey } from '../i18n';

export type TabKey = 'home' | 'train' | 'story' | 'cards' | 'my';

const TABS: { key: TabKey; labelKey: TKey; icon: string }[] = [
  { key: 'home', labelKey: 'tab_home', icon: 'home' },
  { key: 'train', labelKey: 'tab_train', icon: 'train' },
  { key: 'story', labelKey: 'tab_story', icon: 'story' },
  { key: 'cards', labelKey: 'tab_cards', icon: 'cards' },
  { key: 'my', labelKey: 'tab_my', icon: 'user' },
];

export function TabBar({ active, onTab }: { active: TabKey; onTab: (t: TabKey) => void }) {
  const { t } = useI18n();
  return (
    <nav className="tabbar">
      {TABS.map((tab) => (
        <button
          key={tab.key}
          className={`tabbar__item${active === tab.key ? ' is-active' : ''}`}
          onClick={() => onTab(tab.key)}
        >
          <span className="tabbar__ic"><Icon name={tab.icon} size={21} filled={active === tab.key} /></span>
          <span className="tabbar__lb">{t(tab.labelKey)}</span>
        </button>
      ))}
    </nav>
  );
}
