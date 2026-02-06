# Modificações na Biblioteca Canopy IIIF

Este documento registra todas as modificações (patches) aplicadas à biblioteca `@canopy-iiif/app` para atender aos requisitos de design customizados do projeto.

## 📦 Patches Ativos

### @canopy-iiif/app v1.5.8

Data da modificação: Fevereiro 2026

#### 🎨 Sistema de Cores Customizadas

**Arquivo:** `ui/styles/index.css`

**Mudanças:**
- Implementado tema de cores completo usando CSS Custom Properties
- Definidas escalas de cores para accent (vermelho) e gray (cinza)

**Cores Principais:**
```css
--colors-accent: #dc3e42        /* Vermelho (cor de destaque) */
--colors-accentAlt: #ce2c31      /* Vermelho alternativo (mais escuro) */
--colors-accentMuted: #f4a9aa    /* Vermelho suave */
--colors-primary: #1c2024        /* Cinza escuro (texto principal) */
--colors-secondary: #fcfcfd      /* Quase branco (fundo) */
```

**Escala de Accent (Vermelho):**
- 50: `#fffcfc` (quase branco com toque de vermelho)
- 100: `#feebec`
- 200: `#ffdbdc`
- 300: `#fdbdbe`
- 400: `#f4a9aa`
- 500: `#eb8e90`
- 600: `#e5484d`
- **700: `#dc3e42`** ← Cor principal
- 800: `#ce2c31`
- 900: `#641723` (mais escuro)

**Escala de Gray:**
- 50: `#fcfcfd`
- 100: `#f0f0f3`
- 200: `#e8e8ec`
- 300: `#d9d9e0`
- 400: `#cdced6`
- 500: `#b9bbc6`
- 600: `#8b8d98` (muted)
- 700: `#80838d`
- 800: `#60646c`
- **900: `#1c2024`** ← Cor principal

**Motivo:** Nova identidade visual com paleta de cores personalizada.

---

#### 🧩 Header - Ajustes de Flexbox

**Arquivo:** `ui/styles/components/header/_header.scss`

##### 1. Brand Container (Mobile/Tablet)

**Mudanças:**
```scss
.canopy-header__brand {
  flex: 1 1 0%;            // ANTES: flex: 0 0 auto;
  max-width: 100vw;        // NOVO
  overflow: hidden;        // NOVO
}
```

**O que faz:**
- Permite que o brand (logo/título) ocupe espaço disponível em telas menores
- Previne overflow horizontal em dispositivos móveis
- Garante que o título longo não quebre o layout

**Motivo:** O título longo do projeto causava overflow em dispositivos móveis. Esta mudança faz o header se adaptar melhor a títulos extensos.

##### 2. Brand Container (Desktop - Breakpoint)

**Mudanças:**
```scss
@media (min-width: 768px) {
  .canopy-header__brand {
    flex: 0 0 auto;        // NOVO: Reverte para comportamento original
  }
}
```

**O que faz:**
- Em desktop, o brand volta ao tamanho natural (sem expansão)
- Mantém o layout original para telas grandes

**Motivo:** Em desktop há espaço suficiente, então o comportamento padrão funciona melhor.

---

## 🔄 Como Atualizar a Biblioteca

Quando houver uma nova versão do `@canopy-iiif/app`:

### 1. Atualizar via Workflow Automático (Recomendado)

1. Acesse: **Actions** → **Update Canopy App**
2. Clique em **Run workflow**
3. (Opcional) Digite a versão específica ou deixe em branco para `latest`
4. Revise o Pull Request gerado
5. **IMPORTANTE:** Após merge, você precisará:
   ```bash
   # Testar se o patch ainda funciona
   rm -rf node_modules
   npm install
   npm run build
   ```
6. Se houver conflitos, recrie o patch:
   ```bash
   # Refaça as modificações manualmente
   # Depois:
   npx patch-package @canopy-iiif/app
   ```

### 2. Atualizar Manualmente

```bash
# Atualizar para versão específica
npm install @canopy-iiif/app@1.6.0

# OU atualizar para a última
npm update @canopy-iiif/app

# Testar se patch foi aplicado
npm run dev
```

**Se o patch falhar:**
- Você verá avisos no terminal durante `npm install`
- Será necessário recriar o patch manualmente
- Refaça as modificações nos arquivos em `node_modules/@canopy-iiif/app/`
- Execute: `npx patch-package @canopy-iiif/app`
- Atualize este documento com a nova versão

---

## 📋 Checklist de Verificação

Após qualquer mudança na biblioteca ou nos patches:

- [ ] Patch aplicado com sucesso (`npm install` sem erros)
- [ ] Build local funciona (`npm run build`)
- [ ] Site renderiza corretamente (`npm run dev`)
- [ ] Cores customizadas visíveis no site
- [ ] Header não quebra em mobile (teste em iPhone SE)
- [ ] Header mantém layout em desktop (teste em 1920px)
- [ ] Deploy no GitHub Pages funcionou
- [ ] Documentação atualizada (este arquivo)

---

## 🐛 Troubleshooting

### Patch não é aplicado no GitHub Actions

**Sintoma:** Site deployado não tem as customizações

**Solução:**
1. Verifique se `patches/` está commitado no Git
2. Confirme que `package.json` tem `"postinstall": "patch-package"`
3. Veja os logs do workflow: deve aparecer `✔ @canopy-iiif/app@X.X.X`

### Conflito ao atualizar biblioteca

**Sintoma:** Erro durante `npm install` após update

**Solução:**
```bash
# 1. Remover patch anterior
rm patches/@canopy-iiif+app+*.patch

# 2. Reinstalar biblioteca limpa
rm -rf node_modules package-lock.json
npm install

# 3. Refazer modificações manualmente
# Edite: node_modules/@canopy-iiif/app/ui/styles/...

# 4. Criar novo patch
npx patch-package @canopy-iiif/app

# 5. Commit e push
git add patches/
git commit -m "fix: atualiza patch para @canopy-iiif/app@X.X.X"
```

---

## 📚 Referências

- **Biblioteca Original:** [@canopy-iiif/app](https://www.npmjs.com/package/@canopy-iiif/app)
- **Documentação Canopy:** https://canopy-iiif.github.io/docs/
- **Patch Package:** https://github.com/ds300/patch-package

---

## 📝 Histórico de Modificações

| Data | Versão | Autor | Mudanças |
|------|--------|-------|----------|
| 2026-02 | v1.5.8 | Equipe | Customização inicial: cores e header responsivo |

---

**Última atualização:** Fevereiro 2026
