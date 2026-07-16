import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Bell, Check, ChevronRight, CirclePlay, Dumbbell, Eye, EyeOff, LockKeyhole, Mail, Play, ShieldCheck, Timer } from 'lucide-react';
import { BottomNav } from './components/BottomNav';
import { Modal } from './components/Modal';
import { Toast } from './components/Toast';
import { initialNotifications, promotions, workouts } from './data';
import { HomePage } from './pages/HomePage';
import { PlanPage } from './pages/PlanPage';
import { PromotionsPage } from './pages/PromotionsPage';
import { SettingsPage } from './pages/SettingsPage';
import { WorkoutsPage } from './pages/WorkoutsPage';
import type { Exercise, GymNotification, Language, TabId, Workout } from './types';

const navLabels: Record<Language, Record<TabId, string>> = {
  pt: { home: 'Início', workouts: 'Treinos', plan: 'Plano', promos: 'Promoções', settings: 'Opções' },
  en: { home: 'Home', workouts: 'Workouts', plan: 'Plan', promos: 'Offers', settings: 'Settings' },
  es: { home: 'Inicio', workouts: 'Rutinas', plan: 'Plan', promos: 'Ofertas', settings: 'Opciones' },
};

function App() {
  const [loggedIn, setLoggedIn] = useState(() => localStorage.getItem('fit-house-login') === 'true');
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<GymNotification[]>(initialNotifications);
  const [completedWorkouts, setCompletedWorkouts] = useState<string[]>(() => JSON.parse(localStorage.getItem('fit-house-completed') ?? '[]'));
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  const [enteredRaffles, setEnteredRaffles] = useState<string[]>([]);
  const [language, setLanguage] = useState<Language>('pt');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [toast, setToast] = useState<string | null>(null);

  const unreadCount = notifications.filter((item) => !item.read).length;
  const nextWorkout = useMemo(() => {
    const weekday = new Date().getDay();
    if (weekday <= 1) return workouts[0];
    if (weekday === 2 || weekday === 3) return workouts[1];
    if (weekday === 4) return workouts[2];
    return workouts[3];
  }, []);

  useEffect(() => {
    localStorage.setItem('fit-house-completed', JSON.stringify(completedWorkouts));
  }, [completedWorkouts]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const showToast = (message: string) => setToast(message);

  const openWorkout = (workout: Workout) => {
    setSelectedWorkout(workout);
    setCompletedExercises([]);
  };

  const toggleExercise = (exerciseId: string) => {
    setCompletedExercises((current) => current.includes(exerciseId) ? current.filter((id) => id !== exerciseId) : [...current, exerciseId]);
  };

  const finishWorkout = () => {
    if (!selectedWorkout) return;
    setCompletedWorkouts((current) => current.includes(selectedWorkout.id) ? current : [...current, selectedWorkout.id]);
    setSelectedWorkout(null);
    setSelectedExercise(null);
    showToast('Treino concluído. Excelente trabalho!');
  };

  const handleCopy = async (coupon: string) => {
    try {
      await navigator.clipboard.writeText(coupon);
    } catch {
      // O fallback visual é suficiente no modo demonstrativo.
    }
    showToast(`Cupom ${coupon} copiado.`);
  };

  const handleEnterRaffle = (id: string) => {
    setEnteredRaffles((current) => [...current, id]);
    showToast('Inscrição no sorteio confirmada!');
  };

  const markNotificationRead = (id: string) => {
    setNotifications((current) => current.map((item) => item.id === id ? { ...item, read: true } : item));
  };

  const login = () => {
    localStorage.setItem('fit-house-login', 'true');
    setLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('fit-house-login');
    setLoggedIn(false);
    setActiveTab('home');
    showToast('Você saiu da conta.');
  };

  if (!loggedIn) return <LoginScreen onLogin={login} />;

  return (
    <div className="app-shell">
      <main className="app-content">
        {activeTab === 'home' && (
          <HomePage
            nextWorkout={nextWorkout}
            unreadCount={unreadCount}
            onOpenNotifications={() => setNotificationsOpen(true)}
            onOpenWorkout={openWorkout}
            onNavigatePromos={() => setActiveTab('promos')}
            completedCount={completedWorkouts.length}
          />
        )}
        {activeTab === 'workouts' && <WorkoutsPage workouts={workouts} completedWorkouts={completedWorkouts} onOpenWorkout={openWorkout} />}
        {activeTab === 'plan' && <PlanPage onToast={showToast} />}
        {activeTab === 'promos' && <PromotionsPage promotions={promotions} enteredRaffles={enteredRaffles} onCopy={handleCopy} onEnterRaffle={handleEnterRaffle} />}
        {activeTab === 'settings' && (
          <SettingsPage
            language={language}
            onLanguageChange={(lang) => { setLanguage(lang); showToast('Idioma atualizado.'); }}
            notificationsEnabled={notificationsEnabled}
            onNotificationsChange={(enabled) => { setNotificationsEnabled(enabled); showToast(enabled ? 'Notificações ativadas.' : 'Notificações desativadas.'); }}
            onPrivacy={() => setPrivacyOpen(true)}
            onFeedback={() => setFeedbackOpen(true)}
            onLogout={logout}
          />
        )}
      </main>

      <BottomNav active={activeTab} onChange={setActiveTab} labels={navLabels[language]} />
      <Toast message={toast} />

      <Modal open={Boolean(selectedWorkout)} onClose={() => { setSelectedWorkout(null); setSelectedExercise(null); }} title={selectedWorkout?.title} wide>
        {selectedWorkout && (
          <div className="workout-detail">
            <div className="workout-detail__hero" style={{ background: selectedWorkout.accent }}>
              <span>{selectedWorkout.day}</span>
              <h3>{selectedWorkout.subtitle}</h3>
              <div><span><Timer size={15} /> {selectedWorkout.duration} min</span><span>{selectedWorkout.exercises.length} exercícios</span></div>
            </div>
            <div className="workout-progress-line">
              <div><strong>{completedExercises.length}/{selectedWorkout.exercises.length}</strong><span> exercícios concluídos</span></div>
              <div className="linear-progress"><span style={{ width: `${(completedExercises.length / selectedWorkout.exercises.length) * 100}%` }} /></div>
            </div>
            <div className="exercise-list">
              {selectedWorkout.exercises.map((exercise, index) => {
                const done = completedExercises.includes(exercise.id);
                return (
                  <article key={exercise.id} className={`exercise-row ${done ? 'is-done' : ''}`}>
                    <button className="exercise-row__check" onClick={() => toggleExercise(exercise.id)} aria-label="Marcar exercício">
                      {done ? <Check size={17} /> : <span>{index + 1}</span>}
                    </button>
                    <button className="exercise-row__main" onClick={() => setSelectedExercise(exercise)}>
                      <div><strong>{exercise.name}</strong><span>{exercise.sets} séries • {exercise.reps} repetições • {exercise.rest}</span></div>
                      <span className="video-chip"><CirclePlay size={15} /> Vídeo</span>
                    </button>
                  </article>
                );
              })}
            </div>
            <button className="primary-button primary-button--full" onClick={finishWorkout}>
              <Check size={18} /> Concluir treino
            </button>
          </div>
        )}
      </Modal>

      <Modal open={Boolean(selectedExercise)} onClose={() => setSelectedExercise(null)} title={selectedExercise?.name} wide>
        {selectedExercise && (
          <div className="exercise-detail">
            <video src={selectedExercise.video} controls autoPlay loop playsInline poster={`${import.meta.env.BASE_URL}fit-house-logo.png`} />
            <div className="exercise-detail__meta">
              <div><span>Séries</span><strong>{selectedExercise.sets}</strong></div>
              <div><span>Repetições</span><strong>{selectedExercise.reps}</strong></div>
              <div><span>Descanso</span><strong>{selectedExercise.rest}</strong></div>
            </div>
            <div className="tips-card">
              <strong>Como executar corretamente</strong>
              {selectedExercise.tips.map((tip) => <span key={tip}><Check size={15} /> {tip}</span>)}
            </div>
          </div>
        )}
      </Modal>

      <Modal open={notificationsOpen} onClose={() => setNotificationsOpen(false)} title="Notificações">
        <div className="notification-list">
          {notifications.map((notification) => (
            <button key={notification.id} className={`notification-row ${notification.read ? '' : 'is-unread'}`} onClick={() => markNotificationRead(notification.id)}>
              <div className={`notification-row__icon notification-row__icon--${notification.category}`}><Bell size={18} /></div>
              <div><strong>{notification.title}</strong><p>{notification.body}</p><span>{notification.time}</span></div>
              {!notification.read && <i />}
            </button>
          ))}
        </div>
      </Modal>

      <Modal open={privacyOpen} onClose={() => setPrivacyOpen(false)} title="Política de privacidade">
        <div className="document-copy">
          <div className="document-copy__badge"><ShieldCheck size={22} /> Seus dados protegidos</div>
          <p>Este conteúdo é demonstrativo. Em produção, a política deverá explicar quais dados são coletados, por que são usados, por quanto tempo são armazenados e como o aluno pode solicitar correção ou exclusão.</p>
          <h3>Dados utilizados pelo aplicativo</h3>
          <p>Informações de cadastro, plano contratado, histórico de treinos, check-ins, preferências e comunicações com a academia.</p>
          <h3>Segurança</h3>
          <p>O projeto está preparado para receber autenticação segura, API própria e armazenamento protegido antes da publicação.</p>
        </div>
      </Modal>

      <Modal open={feedbackOpen} onClose={() => setFeedbackOpen(false)} title="Enviar feedback">
        <div className="feedback-form">
          <p>Sua opinião ajuda a Fit House a melhorar a experiência dos alunos.</p>
          <label>Como foi sua experiência?</label>
          <div className="rating-row">{['😞', '😕', '😐', '🙂', '😍'].map((emoji) => <button key={emoji}>{emoji}</button>)}</div>
          <label htmlFor="feedback">Mensagem</label>
          <textarea id="feedback" value={feedback} onChange={(event) => setFeedback(event.target.value)} placeholder="Conte o que podemos melhorar..." />
          <button className="primary-button primary-button--full" onClick={() => { setFeedback(''); setFeedbackOpen(false); showToast('Feedback enviado. Obrigado!'); }}>Enviar feedback</button>
        </div>
      </Modal>
    </div>
  );
}

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('aluno@fithouse.com.br');
  const [password, setPassword] = useState('123456');

  return (
    <div className="login-screen">
      <div className="login-screen__glow login-screen__glow--one" />
      <div className="login-screen__glow login-screen__glow--two" />
      <section className="login-card">
        <div className="login-logo"><img src={`${import.meta.env.BASE_URL}fit-house-logo.png`} alt="Fit House Academia" /></div>
        <div className="login-copy"><span>ÁREA DO ALUNO</span><h1>Seu treino, sua evolução.</h1><p>Acompanhe sua rotina e aproveite tudo o que a Fit House oferece.</p></div>
        <form onSubmit={(event) => { event.preventDefault(); onLogin(); }}>
          <label>E-mail</label>
          <div className="input-wrap"><Mail size={19} /><input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required /></div>
          <label>Senha</label>
          <div className="input-wrap"><LockKeyhole size={19} /><input value={password} onChange={(event) => setPassword(event.target.value)} type={showPassword ? 'text' : 'password'} required /><button type="button" onClick={() => setShowPassword((value) => !value)}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div>
          <button className="forgot-button" type="button">Esqueci minha senha</button>
          <button className="primary-button primary-button--full primary-button--login" type="submit">Entrar na conta <ChevronRight size={18} /></button>
        </form>
        <div className="demo-note"><Dumbbell size={17} /><span>Dados preenchidos para demonstração. Basta tocar em entrar.</span></div>
      </section>
    </div>
  );
}

export default App;
