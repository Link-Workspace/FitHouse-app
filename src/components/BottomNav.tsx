import { Dumbbell, Gift, Home, Settings, WalletCards } from 'lucide-react';
import type { TabId } from '../types';

const items = [
  { id: 'home' as const, label: 'Início', icon: Home },
  { id: 'workouts' as const, label: 'Treinos', icon: Dumbbell },
  { id: 'plan' as const, label: 'Plano', icon: WalletCards },
  { id: 'promos' as const, label: 'Promoções', icon: Gift },
  { id: 'settings' as const, label: 'Opções', icon: Settings },
];

type Props = {
  active: TabId;
  onChange: (tab: TabId) => void;
  labels?: Partial<Record<TabId, string>>;
};

export function BottomNav({ active, onChange, labels }: Props) {
  return (
    <nav className="bottom-nav" aria-label="Navegação principal">
      {items.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          className={`bottom-nav__item ${active === id ? 'is-active' : ''}`}
          onClick={() => onChange(id)}
          aria-current={active === id ? 'page' : undefined}
        >
          <span className="bottom-nav__icon"><Icon size={21} strokeWidth={2.2} /></span>
          <span>{labels?.[id] ?? label}</span>
        </button>
      ))}
    </nav>
  );
}
