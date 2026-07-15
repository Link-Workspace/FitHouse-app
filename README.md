# Fit House App

Aplicativo mobile-first da academia Fit House, criado em React + TypeScript + Vite e preparado para empacotamento Android/iOS com Capacitor.

## Funcionalidades implementadas

- Login demonstrativo hardcoded.
- Início com próximo treino, progresso semanal, sequência, promoções e avisos.
- Treinos semanais com séries, repetições, descanso, marcação de exercícios e conclusão.
- Vídeos locais de demonstração dos movimentos.
- Notificações com status lida/não lida.
- Plano Premium, benefícios, situação financeira e acesso digital.
- Promoções de suplementos, cupons copiáveis e inscrição em sorteio.
- Opções de idioma, notificações, privacidade, feedback e logout.
- Persistência local de login e treinos concluídos.
- Layout responsivo e preparado para PWA.

## Rodar no VS Code

1. Abra a pasta do projeto no VS Code.
2. Abra o terminal integrado.
3. Execute:

```bash
npm install
npm run dev
```

Depois, abra o endereço exibido pelo Vite, normalmente `http://localhost:5173`.

## Gerar versão web de produção

```bash
npm run build
npm run preview
```

## Android e iOS com Capacitor

As pastas nativas `android` e `ios` já estão incluídas no projeto. Depois de alterar a interface, sincronize os arquivos web:

```bash
npm run cap:sync
```

Para abrir os projetos nativos:

```bash
npm run android
npm run ios
```

O Android exige Android Studio. O iOS exige macOS com Xcode.

## Observação

Todo o conteúdo e as ações estão em modo demonstrativo/hardcoded. Para produção, conecte autenticação, banco de dados, API, pagamentos, notificações push e painel administrativo.

## Correção da instalação no Windows

Este pacote usa o registro público oficial do npm. Extraia o ZIP antes de abrir no VS Code e utilize Node.js 20 LTS ou superior.

```bash
npm install --no-audit --no-fund
npm run dev
```
