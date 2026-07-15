import { Check, Copy, Gift, Sparkles, Ticket } from 'lucide-react';
import type { Promotion } from '../types';

type Props = {
  promotions: Promotion[];
  enteredRaffles: string[];
  onCopy: (coupon: string) => void;
  onEnterRaffle: (id: string) => void;
};

export function PromotionsPage({ promotions, enteredRaffles, onCopy, onEnterRaffle }: Props) {
  return (
    <div className="page">
      <header className="page-header">
        <span className="eyebrow">Vantagens exclusivas</span>
        <h1>Promoções</h1>
        <p>Ofertas, produtos e sorteios disponíveis para alunos Fit House.</p>
      </header>

      <section className="highlight-promo">
        <div className="highlight-promo__badge"><Sparkles size={14} /> DESTAQUE</div>
        <div><span>Kit Performance Fit House</span><h2>Treine, acumule pontos e ganhe.</h2><p>Complete 12 check-ins no mês para receber um número extra no sorteio.</p></div>
        <div className="highlight-promo__icon"><Gift size={42} /></div>
      </section>

      <div className="section-heading section-heading--tight">
        <div><span className="eyebrow">Loja interna</span><h2>Suplementos</h2></div>
      </div>
      <section className="product-grid">
        {promotions.filter((promo) => promo.kind === 'supplement').map((promo) => (
          <article key={promo.id} className="product-card">
            <div className="product-card__visual">
              {promo.image
                ? <img src={promo.image} alt={promo.title} className="product-card__img" />
                : null
              }
              <span>{promo.badge}</span>
            </div>
            <div className="product-card__body">
              <span className="product-card__deadline">{promo.endDate}</span>
              <h3>{promo.title}</h3>
              <p>{promo.description}</p>
              <div className="price-line"><del>{promo.oldPrice}</del><strong>{promo.price}</strong></div>
              <button className="coupon-button" onClick={() => onCopy(promo.coupon ?? '')}>
                <span><Ticket size={16} /> {promo.coupon}</span><Copy size={16} />
              </button>
            </div>
          </article>
        ))}
      </section>

      <div className="section-heading section-heading--tight">
        <div><span className="eyebrow">Participe</span><h2>Sorteios</h2></div>
      </div>
      {promotions.filter((promo) => promo.kind === 'raffle').map((promo) => {
        const entered = enteredRaffles.includes(promo.id);
        return (
          <article key={promo.id} className="raffle-card">
            <div className="raffle-card__visual"><Gift size={34} /></div>
            <div className="raffle-card__body">
              <span>{promo.badge} • {promo.endDate}</span>
              <h3>{promo.title}</h3>
              <p>{promo.description}</p>
              <button className={`primary-button ${entered ? 'primary-button--success' : ''}`} onClick={() => onEnterRaffle(promo.id)} disabled={entered}>
                {entered ? <><Check size={17} /> Inscrição confirmada</> : 'Participar do sorteio'}
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}
