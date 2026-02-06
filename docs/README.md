# 📚 Documentação do Projeto Constitution

Este diretório contém a documentação técnica do projeto.

## 📄 Documentos Disponíveis

### [PATCHES.md](./PATCHES.md)
Documentação completa de todas as modificações aplicadas à biblioteca Canopy IIIF através do sistema patch-package.

**Conteúdo:**
- Sistema de cores customizadas
- Ajustes de layout no header
- Guia de atualização da biblioteca
- Troubleshooting comum
- Checklist de verificação

**Quando consultar:**
- Antes de atualizar a biblioteca `@canopy-iiif/app`
- Ao debugar problemas de estilo ou layout
- Para entender as customizações aplicadas
- Ao resolver conflitos de patch após updates

---

## 🔄 Workflows e Deploy

### Deploy Automático (GitHub Pages)
O projeto usa GitHub Actions para deploy automático:
- **Trigger:** Push na branch `main`
- **Workflow:** `.github/workflows/deploy-pages.yml`
- **Processo:**
  1. Instala dependências (`npm ci`)
  2. Aplica patches automaticamente (`postinstall`)
  3. Verifica se patches foram aplicados
  4. Builda o site estático
  5. Deploy no GitHub Pages

### Atualização da Biblioteca
Para atualizar o `@canopy-iiif/app`:
- **Workflow:** `.github/workflows/update-canopy-app.yml`
- **Como usar:** Actions → Update Canopy App → Run workflow
- **Resultado:** Cria Pull Request com a atualização

---

## 🛠️ Para Desenvolvedores

### Modificar Patches Existentes

```bash
# 1. Edite os arquivos em node_modules/@canopy-iiif/app/
vim node_modules/@canopy-iiif/app/ui/styles/index.css

# 2. Recrie o patch
npx patch-package @canopy-iiif/app

# 3. Atualize a documentação
# Edite: docs/PATCHES.md

# 4. Commit
git add patches/ docs/
git commit -m "feat: atualiza customizações do Canopy"
```

### Adicionar Novos Patches

Siga o mesmo processo acima, mas documente as novas mudanças em [PATCHES.md](./PATCHES.md).

---

## 📖 Links Úteis

- [Canopy IIIF Documentation](https://canopy-iiif.github.io/docs/)
- [Patch Package - GitHub](https://github.com/ds300/patch-package)
- [IIIF Presentation API](https://iiif.io/api/presentation/)
- [GitHub Pages Documentation](https://docs.github.com/pages)

---

**Última atualização:** Fevereiro 2026
