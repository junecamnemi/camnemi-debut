import { Icon } from './Icon';

export type TabKey = 'home' | 'train' | 'story' | 'cards' | 'my';

const TABS: { key: TabKey; label: string; icon: string }[] = [
  { key: 'home', label: '홈', icon: 'home' },
  { key: 'train', label: '훈련', icon: 'train' },
  { key: 'story', label: '스토리', icon: 'story' },
  { key: 'cards', label: '컬렉션', icon: 'cards' },
  { key: 'my', label: 'My', icon: 'user' },
];

export function TabBar({ active, onTab }: { active: TabKey; onTab: (t: TabKey) => void }) {
  return (
    <nav className="tabbar">
      {TABS.map((t) => (
        <button
          key={t.key}
          className={`tabbar__item${active === t.key ? ' is-active' : ''}`}
          onClick={() => onTab(t.key)}
          aria-current={active === t.key}
        >
          <Icon name={t.icon} size={21} />
          <span>{t.label}</span>
        </button>
      ))}
    </nav>
  );
}
