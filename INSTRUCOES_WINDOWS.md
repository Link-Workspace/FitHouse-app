# Como executar no Windows

1. Instale o Node.js 20 LTS ou mais recente.
2. Extraia o projeto para uma pasta local, por exemplo `C:\Projetos\fit-house-app`.
3. Abra essa pasta no VS Code.
4. No terminal do VS Code, confirme as versões:

```powershell
node -v
npm -v
```

5. Instale as dependências:

```powershell
npm install --no-audit --no-fund
```

6. Execute o projeto:

```powershell
npm run dev
```

7. Abra no navegador o endereço mostrado no terminal, normalmente `http://localhost:5173`.

## Se uma instalação anterior ficou travada

Interrompa com `Ctrl + C` e execute no PowerShell, dentro da pasta do projeto:

```powershell
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
npm cache verify
npm install --no-audit --no-fund
```

Não execute o projeto diretamente dentro do arquivo ZIP. Extraia todos os arquivos antes.
