import { Check, ChevronRight, Dumbbell, Play, Timer, TrendingUp } from 'lucide-react';
import type { Workout } from '../types';

type Props = {
  workouts: Workout[];
  completedWorkouts: string[];
  onOpenWorkout: (workout: Workout) => void;
};

export function WorkoutsPage({ workouts, completedWorkouts, onOpenWorkout }: Props) {
  return (
    <div className="page">
      <header className="page-header">
        <span className="eyebrow">Planejamento semanal</span>
        <h1>Meus treinos</h1>
        <p>Seu treino foi montado para evolução contínua e execução segura.</p>
      </header>

      <section className="trainer-card">
        <div className="trainer-avatar">CM</div>
        <div>
          <span>Personal responsável</span>
          <strong>Camila Martins</strong>
          <small>CREF 012345-G/SC</small>
        </div>
        <button className="icon-button icon-button--soft"><ChevronRight size={19} /></button>
      </section>

      <section className="week-overview">
        {['S', 'T', 'Q', 'Q', 'S', 'S', 'D'].map((day, index) => (
          <div key={`${day}-${index}`} className={`week-day ${[0, 1, 3, 4].includes(index) ? 'has-workout' : ''} ${index === 0 ? 'is-today' : ''}`}>
            <span>{day}</span><i />
          </div>
        ))}
      </section>

      <div className="section-heading section-heading--tight">
        <div>
          <span className="eyebrow">4 sessões</span>
          <h2>Plano atual</h2>
        </div>
        <div className="goal-chip"><TrendingUp size={15} /> Hipertrofia</div>
      </div>

      <section className="workout-list">
        {workouts.map((workout) => {
          const completed = completedWorkouts.includes(workout.id);
          return (
            <button key={workout.id} className="workout-card" onClick={() => onOpenWorkout(workout)}>
              <div className="workout-card__day" style={{ background: workout.accent }}>
                <span>{workout.day}</span>
                {completed ? <Check size={20} /> : <Dumbbell size={20} />}
              </div>
              <div className="workout-card__body">
                <div className="workout-card__titleline">
                  <div><span>{workout.title}</span><strong>{workout.subtitle}</strong></div>
                  <ChevronRight size={19} />
                </div>
                <div className="workout-card__meta">
                  <span><Timer size={14} /> {workout.duration} min</span>
                  <span>{workout.exercises.length} exercícios</span>
                  <span>{workout.level}</span>
                </div>
                <div className="workout-card__footer">
                  <span className={completed ? 'status-badge status-badge--done' : 'status-badge'}>
                    {completed ? 'Concluído' : 'Disponível'}
                  </span>
                  <span className="play-link"><Play size={14} fill="currentColor" /> Abrir</span>
                </div>
              </div>
            </button>
          );
        })}
      </section>
    </div>
  );
}
