import { ArrowRightLeft, CalendarCheck, CheckCircle2, ChevronRight, Clock3, CreditCard, Crown, QrCode, ShieldCheck, Snowflake, XCircle } from 'lucide-react';

export function PlanPage({ onToast }: { onToast: (message: string) => void }) {
  return (
    <div className="page">
      <header className="page-header">
        <span className="eyebrow">Sua assinatura</span>
        <h1>Meu plano</h1>
        <p>Consulte os benefícios, pagamentos e dados do seu acesso.</p>
      </header>

      <section className="membership-card">
        <div className="membership-card__glow" />
        <div className="membership-card__brand">
          <img src="/fit-house-logo.png" alt="Fit House" />
          <span>FIT HOUSE</span>
        </div>
        <div className="membership-card__plan">
          <span>PLANO</span>
          <strong>Estudante</strong>
          <small>Acesso completo</small>
        </div>
        <div className="membership-card__footer">
          <div><span>ALUNO</span><strong>LUCAS WOLFF</strong></div>
          <div><span>VÁLIDO ATÉ</span><strong>12/06/2027</strong></div>
        </div>
      </section>

      <button className="qr-access" onClick={() => onToast('Código de acesso atualizado com sucesso.') }>
        <div className="qr-access__icon"><QrCode size={28} /></div>
        <div><strong>Abrir acesso digital</strong><span>Use na catraca da academia</span></div>
        <span className="live-dot">ATIVO</span>
      </button>

      <section className="section-block">
        <div className="section-heading">
          <div><span className="eyebrow">Seu plano inclui</span><h2>Benefícios</h2></div>
        </div>
        <div className="benefits-grid">
          {[
            ['Acesso ilimitado', 'Todos os dias e horários', Clock3],
            ['Avaliação física', 'A cada 90 dias', CalendarCheck],
            ['Treino personalizado', 'Atualização mensal', Crown],
            ['Suporte especializado', 'Equipe Fit House', ShieldCheck],
          ].map(([title, text, Icon]) => (
            <article className="benefit-card" key={String(title)}>
              <div><Icon size={20} /></div><strong>{String(title)}</strong><span>{String(text)}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <div><span className="eyebrow">Financeiro</span><h2>Próximo pagamento</h2></div>
        </div>
        <article className="payment-card">
          <div className="payment-card__icon"><CreditCard size={21} /></div>
          <div><span>Mensalidade Estudante</span><strong>R$ 129,90</strong><small>Vencimento em 12/08/2026</small></div>
          <div className="payment-status"><CheckCircle2 size={16} /> Em dia</div>
        </article>
        <button className="secondary-button" onClick={() => onToast('Histórico financeiro aberto em modo demonstrativo.')}>Ver histórico de pagamentos</button>
      </section>

      <section className="section-block section-block--last">
        <div className="section-heading">
          <div><span className="eyebrow">Gerenciar</span><h2>Seu plano</h2></div>
        </div>
        <div className="plan-actions-card">
          <button className="plan-action-row" onClick={() => onToast('Solicitação de alteração de plano enviada. Nossa equipe entrará em contato em breve.')}>
            <div className="plan-action-row__icon plan-action-row__icon--neutral"><ArrowRightLeft size={18} /></div>
            <div>
              <strong>Alterar plano</strong>
              <span>Mude para um plano diferente</span>
            </div>
            <ChevronRight size={16} className="plan-action-row__chevron" />
          </button>
          <button className="plan-action-row" onClick={() => onToast('Solicitação de congelamento enviada. Nossa equipe entrará em contato em breve.')}>
            <div className="plan-action-row__icon plan-action-row__icon--blue"><Snowflake size={18} /></div>
            <div>
              <strong>Congelar plano</strong>
              <span>Pause temporariamente seu acesso</span>
            </div>
            <ChevronRight size={16} className="plan-action-row__chevron" />
          </button>
          <button className="plan-action-row plan-action-row--danger" onClick={() => onToast('Solicitação de cancelamento recebida. Nossa equipe entrará em contato em breve.')}>
            <div className="plan-action-row__icon plan-action-row__icon--red"><XCircle size={18} /></div>
            <div>
              <strong>Cancelar plano</strong>
              <span>Encerre sua assinatura</span>
            </div>
            <ChevronRight size={16} className="plan-action-row__chevron" />
          </button>
        </div>
      </section>
    </div>
  );
}
