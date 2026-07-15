export type TabId = 'home' | 'workouts' | 'plan' | 'promos' | 'settings';
export type Language = 'pt' | 'en' | 'es';

export type Exercise = {
  id: string;
  name: string;
  muscle: string;
  sets: number;
  reps: string;
  rest: string;
  video: string;
  tips: string[];
};

export type Workout = {
  id: string;
  day: string;
  title: string;
  subtitle: string;
  duration: number;
  level: string;
  accent: string;
  exercises: Exercise[];
};

export type GymNotification = {
  id: string;
  title: string;
  body: string;
  time: string;
  category: 'treino' | 'academia' | 'pagamento' | 'promo';
  read: boolean;
};

export type Promotion = {
  id: string;
  kind: 'supplement' | 'raffle';
  title: string;
  description: string;
  badge: string;
  price?: string;
  oldPrice?: string;
  coupon?: string;
  endDate: string;
};
