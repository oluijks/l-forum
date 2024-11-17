# L-Forum

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
pnpm run dev --host 0.0.0.0
```

## Building

To create a production version of your app:

```bash
pnpm run build
```

You can preview the production build with:

```bash
npm run preview
```

To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
