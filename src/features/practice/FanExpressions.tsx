import { FAN_EXPRESSIONS } from '../../content/fanExpressions';
import { useI18n } from '../../i18n';

/** 훈련(레슨) 탭의 어휘 종류 선택 아래 — 팬이라면 꼭 알아야 할 표현 */
export function FanExpressions() {
  const { t } = useI18n();
  return (
    <section className="fan">
      <div className="fan__head">
        <div className="fan__htx">
          <span className="fan__t">{t('fan_title')}</span>
          <p className="fan__sub">{t('fan_sub')}</p>
        </div>
        <span className="fan__n">{FAN_EXPRESSIONS.length}</span>
      </div>
      <div className="fan__grid">
        {FAN_EXPRESSIONS.map((e) => (
          <div key={e.ko} className="fanitem">
            <span className="fanitem__ko">{e.ko}</span>
            <span className="fanitem__rom">{e.rom}</span>
            <span className="fanitem__en">{e.en}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
