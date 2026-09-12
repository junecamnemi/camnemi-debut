import { MEMBERS } from '../../content/members';
import { PLAYER, STATE_LABEL } from '../../content/player';
import { Icon } from '../../components/Icon';
import { HeroCarousel } from '../../components/HeroCarousel';

/** My — 내 아이돌 프로필 · 커리어 · 학습 통계 · 숙련도 */
export function MyScreen() {
  const m = MEMBERS[PLAYER.memberId];
  const p = PLAYER;

  return (
    <>
      <div className="appbar">
        <span className="appbar__brand">GLOWSIS</span>
        <span style={{ marginLeft: 'auto', color: 'var(--ink-2)' }}><Icon name="gear" size={20} /></span>
      </div>

      <HeroCarousel
        small
        badge="내 프로필"
        title={`‘${p.stageName}’`}
        subtitle={`${m.ko} · ${p.careerStage}`}
      />

      <div className="screen">

        {/* profile */}
        <div className="profile">
          <img className="profile__av" src={m.portrait} alt={p.stageName} />
          <div className="profile__meta">
            <div className="profile__name">‘{p.stageName}’</div>
            <div className="profile__role">{m.ko} ({m.en}) · {m.role}</div>
            <span className="profile__stage">🎤 {p.careerStage}</span>
          </div>
          <button className="profile__edit">예명 변경</button>
        </div>

        {/* stats */}
        <div className="stats">
          <div className="stat">
            <div className="stat__v">{p.streakDays}<small>일</small></div>
            <div className="stat__k">연속 학습</div>
          </div>
          <div className="stat">
            <div className="stat__v">{p.studyDays}<small>일</small></div>
            <div className="stat__k">총 학습일</div>
          </div>
          <div className="stat">
            <div className="stat__v">{p.mastered}<small>개</small></div>
            <div className="stat__k">숙련 스킬</div>
          </div>
        </div>

        {/* career */}
        <div className="career">
          <div className="career__top">
            <span className="career__stage">데뷔까지</span>
            <span className="career__pct">{p.careerPct}%</span>
          </div>
          <div className="career__bar"><div className="career__fill" style={{ width: `${p.careerPct}%` }} /></div>
          <div className="career__steps"><span>입문</span><span>연습생</span><span>팀 프로젝트</span><span>데뷔 준비</span><span>데뷔</span></div>
        </div>

        {/* skills */}
        <div className="block">
          <div className="block__h">
            <span className="block__t">학습 스킬</span>
            <span className="block__more">전체 보기</span>
          </div>
          {p.skills.map((s) => (
            <div key={s.label} className="skill">
              <span className={`skill__badge ${s.state}`} />
              <span className="skill__label">{s.label}</span>
              <span className="skill__unit">{s.unit}</span>
              <span className={`skill__state ${s.state}`}>{STATE_LABEL[s.state]}</span>
            </div>
          ))}
        </div>

        {/* cards preview */}
        <div className="block">
          <div className="block__h">
            <span className="block__t">포토카드</span>
            <span className="block__more">{p.cards.filter(c => c.owned).length} / {p.cards.length}</span>
          </div>
          <div className="cardgrid">
            {p.cards.slice(0, 3).map((c) => (
              <div key={c.id} className={`pcard${c.owned ? '' : ' is-locked'}`}>
                <img src={c.img} alt="" />
                {!c.owned && <div className="pcard__lock"><Icon name="lock" size={20} /></div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
