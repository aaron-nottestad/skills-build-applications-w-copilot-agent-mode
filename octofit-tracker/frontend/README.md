# OctoFit Tracker frontend

The presentation tier uses React 19, Vite, Bootstrap, and `react-router-dom`.

## API environment

Define `VITE_CODESPACE_NAME` in `octofit-tracker/frontend/.env.local` with the name of the GitHub Codespace running the API:

```env
VITE_CODESPACE_NAME=your-codespace-name
```

Vite must be restarted after changing `.env.local`. In a GitHub Codespace, the Vite config also maps the platform-provided `CODESPACE_NAME` into `import.meta.env.VITE_CODESPACE_NAME` when the `VITE_` variable is not defined. The app requests data from `https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/`. When neither value is available during local development, it safely falls back to `http://localhost:8000` rather than generating an `undefined` URL.

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
