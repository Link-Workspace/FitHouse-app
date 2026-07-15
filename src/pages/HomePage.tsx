import { ArrowRight, BellRing, CalendarDays, ChevronRight, Flame, Gift, MapPin, Play, Timer, Trophy } from 'lucide-react';
import { ProgressRing } from '../components/ProgressRing';
import type { Workout } from '../types';

type Props = {
  nextWorkout: Workout;
  unreadCount: number;
  onOpenNotifications: () => void;
  onOpenWorkout: (workout: Workout) => void;
  onNavigatePromos: () => void;
  completedCount: number;
};

export function HomePage({
  nextWorkout,
  unreadCount,
  onOpenNotifications,
  onOpenWorkout,
  onNavigatePromos,
  completedCount,
}: Props) {
  return (
    <div className="page page--home">
      <header className="topbar topbar--home">
        <div>
          <span className="eyebrow">Boa tarde,</span>
          <h1>Lucas <span>👋</span></h1>
        </div>
        <button className="notification-button" onClick={onOpenNotifications} aria-label="Abrir notificações">
          <BellRing size={21} />
          {unreadCount > 0 && <span className="notification-dot">{unreadCount}</span>}
        </button>
      </header>

      <section className="hero-workout" style={{ background: nextWorkout.accent }}>
        <div className="hero-workout__topline">
          <span className="pill pill--light"><CalendarDays size={14} /> Próximo treino</span>
          <span className="hero-workout__day">{nextWorkout.day}</span>
        </div>
        <div className="hero-workout__copy">
          <span>{nextWorkout.title}</span>
          <h2>{nextWorkout.subtitle}</h2>
          <div className="hero-workout__meta">
            <span><Timer size={15} /> {nextWorkout.duration} min</span>
          </div>
        </div>
        <button className="primary-button primary-button--light" onClick={() => onOpenWorkout(nextWorkout)}>
          <Play size={17} fill="currentColor" /> Ver treino
        </button>
        <div className="hero-workout__orb hero-workout__orb--one" />
        <div className="hero-workout__orb hero-workout__orb--two" />
      </section>

      <section className="quick-stats">
        <article className="stat-card">
          <div className="stat-card__icon stat-card__icon--red"><Flame size={20} /></div>
          <div><strong>12 dias</strong><span>Sequência</span></div>
        </article>
        <article className="stat-card">
          <div className="stat-card__icon stat-card__icon--bronze"><Trophy size={20} /></div>
          <div><strong>{completedCount}/4</strong><span>Treinos na semana</span></div>
        </article>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Sua evolução</span>
            <h2>Meta semanal</h2>
          </div>
          <button className="text-button">Detalhes <ChevronRight size={16} /></button>
        </div>
        <article className="progress-card">
          <ProgressRing value={completedCount * 25} label="" />
          <div className="progress-card__copy">
            <strong>Você está no caminho certo!</strong>
            <p>Complete mais {Math.max(0, 4 - completedCount)} treino(s) para alcançar sua meta da semana.</p>
            <div className="mini-bars">
              {[0, 1, 2, 3].map((index) => (
                <span key={index} className={index < completedCount ? 'is-done' : ''} />
              ))}
            </div>
          </div>
        </article>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Benefícios</span>
            <h2>Oferta para alunos</h2>
          </div>
        </div>
        <button className="promo-banner" onClick={onNavigatePromos}>
          <div className="promo-banner__icon"><Gift size={25} /></div>
          <div>
            <span>EXCLUSIVO FIT HOUSE</span>
            <strong>20% OFF em suplementos</strong>
            <small>Use o cupom FIT20 na recepção</small>
          </div>
          <ArrowRight size={20} />
        </button>
      </section>

      <section className="section-block section-block--last">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Avisos</span>
            <h2>Da academia</h2>
          </div>
        </div>
        <article className="notice-card">
          <div className="notice-card__date"><strong>19</strong><span>JUL</span></div>
          <div><strong>Aula especial de funcional</strong><p>Sábado às 9h • Vagas limitadas</p></div>
          <ChevronRight size={18} />
        </article>
      </section>
    </div>
  );
}
