import { Bell, ChevronRight, FileText, Globe2, HelpCircle, LockKeyhole, LogOut, MessageSquareMore, Moon, Shield, UserRound } from 'lucide-react';
import type { Language } from '../types';

type Props = {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  notificationsEnabled: boolean;
  onNotificationsChange: (enabled: boolean) => void;
  onPrivacy: () => void;
  onFeedback: () => void;
  onLogout: () => void;
};

export function SettingsPage({ language, onLanguageChange, notificationsEnabled, onNotificationsChange, onPrivacy, onFeedback, onLogout }: Props) {
  return (
    <div className="page">
      <header className="page-header">
        <span className="eyebrow">Preferências da conta</span>
        <h1>Opções</h1>
        <p>Personalize o aplicativo e consulte informações importantes.</p>
      </header>

      <section className="profile-card">
        <div className="profile-card__avatar">LW</div>
        <div><strong>Lucas Wolff</strong><span>lucas@exemplo.com</span><small>Aluno Premium</small></div>
        <button className="icon-button icon-button--soft"><ChevronRight size={19} /></button>
      </section>

      <div className="settings-group">
        <span className="settings-group__title">Preferências</span>
        <label className="settings-row">
          <div className="settings-row__icon"><Globe2 size={19} /></div>
          <div><strong>Idioma</strong><span>Escolha o idioma do aplicativo</span></div>
          <select value={language} onChange={(event) => onLanguageChange(event.target.value as Language)}>
            <option value="pt">Português</option>
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
        </label>
        <label className="settings-row">
          <div className="settings-row__icon"><Bell size={19} /></div>
          <div><strong>Notificações</strong><span>Avisos de treino e academia</span></div>
          <input className="switch" type="checkbox" checked={notificationsEnabled} onChange={(event) => onNotificationsChange(event.target.checked)} />
        </label>
        <div className="settings-row">
          <div className="settings-row__icon"><Moon size={19} /></div>
          <div><strong>Tema escuro</strong><span>Ativo por padrão</span></div>
          <span className="setting-value">Ativo</span>
        </div>
      </div>

      <div className="settings-group">
        <span className="settings-group__title">Conta e segurança</span>
        <button className="settings-row" onClick={() => undefined}>
          <div className="settings-row__icon"><UserRound size={19} /></div><div><strong>Dados pessoais</strong><span>Nome, telefone e informações</span></div><ChevronRight size={18} />
        </button>
        <button className="settings-row" onClick={onPrivacy}>
          <div className="settings-row__icon"><LockKeyhole size={19} /></div><div><strong>Política de privacidade</strong><span>Como seus dados são protegidos</span></div><ChevronRight size={18} />
        </button>
        <button className="settings-row" onClick={() => undefined}>
          <div className="settings-row__icon"><Shield size={19} /></div><div><strong>Segurança</strong><span>Senha e dispositivos conectados</span></div><ChevronRight size={18} />
        </button>
      </div>

      <div className="settings-group">
        <span className="settings-group__title">Ajuda</span>
        <button className="settings-row" onClick={onFeedback}>
          <div className="settings-row__icon"><MessageSquareMore size={19} /></div><div><strong>Enviar feedback</strong><span>Conte como podemos melhorar</span></div><ChevronRight size={18} />
        </button>
        <button className="settings-row" onClick={() => undefined}>
          <div className="settings-row__icon"><HelpCircle size={19} /></div><div><strong>Central de ajuda</strong><span>Dúvidas frequentes e suporte</span></div><ChevronRight size={18} />
        </button>
        <button className="settings-row" onClick={() => undefined}>
          <div className="settings-row__icon"><FileText size={19} /></div><div><strong>Termos de uso</strong><span>Versão 1.0</span></div><ChevronRight size={18} />
        </button>
      </div>

      <button className="logout-button" onClick={onLogout}><LogOut size={19} /> Sair da conta</button>
      <p className="app-version">Fit House App • versão 1.0.0</p>
    </div>
  );
}
