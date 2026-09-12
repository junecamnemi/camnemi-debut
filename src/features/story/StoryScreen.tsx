import { Icon } from '../../components/Icon';
import { HeroCarousel } from '../../components/HeroCarousel';
import { useI18n } from '../../i18n';

interface Epi { no: number; title: string; desc: string; state: 'done' | 'now' | 'locked' }

const EPISODES: Epi[] = [
  { no: 1, title: 'First Step: Hangul', desc: 'Agency opens · Aran joins', state: 'now' },
  { no: 2, title: 'Nice to Meet You', desc: 'Self-introduction', state: 'locked' },
  { no: 3, title: 'Our Schedule', desc: 'Time & dates', state: 'locked' },
  { no: 4, title: 'With a Senior Idol', desc: 'Manners & greetings', state: 'locked' },
  { no: 5, title: 'Stage Outfit', desc: 'Shopping', state: 'locked' },
  { no: 6, title: 'Dinner After Practice', desc: 'Food & ordering', state: 'locked' },
  { no: 7, title: 'Moving In', desc: 'Transport & places', state: 'locked' },
  { no: 8, title: 'Joint Stage', desc: 'Collab with seniors', state: 'locked' },
  { no: 9, title: 'Team Project', desc: 'Suggestions', state: 'locked' },
  { no: 10, title: 'Recording Day', desc: 'Ability & possibility', state: 'locked' },
  { no: 11, title: 'Concept & Styling', desc: 'Colors & appearance', state: 'locked' },
  { no: 12, title: 'Collab Song', desc: 'Music show', state: 'locked' },
  { no: 13, title: 'Debut Prep', desc: 'Reasons & causes', state: 'locked' },
  { no: 14, title: 'Rehearsal', desc: 'Review', state: 'locked' },
  { no: 15, title: 'Interview', desc: 'Feelings & announcement', state: 'locked' },
  { no: 16, title: 'Debut Stage', desc: 'TOPIK I Level 2 · Music video', state: 'locked' },
];

/** Story — episode list (EP.1–16 to debut) */
export function StoryScreen() {
  const { t } = useI18n();
  const done = EPISODES.filter((e) => e.state === 'done').length;

  return (
    <>
      <HeroCarousel badge={t('story_hero_badge')} title={t('story_hero_title')} subtitle={t('story_hero_sub')} />

      <div className="appbar">
        <span className="appbar__brand">{t('story')}</span>
        <span className="appbar__right">EP.{done}/{EPISODES.length}</span>
      </div>

      <div className="screen">
        <div className="block">
          {EPISODES.map((e) => (
            <button key={e.no} className={`epi${e.state === 'locked' ? ' is-locked' : ''}`} disabled={e.state === 'locked'}>
              <span className={`epi__no${e.state === 'done' ? ' is-done' : e.state === 'now' ? ' is-now' : ''}`}>{e.no}</span>
              <span className="epi__txt">
                <span className="epi__t">{e.title}</span>
                <span className="epi__d">{e.desc}</span>
              </span>
              {e.state === 'done' ? <span className="epi__st">✓</span>
                : e.state === 'now' ? <span className="epi__play"><Icon name="play" size={16} /></span>
                : <span className="epi__lock"><Icon name="lock" size={15} /></span>}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
