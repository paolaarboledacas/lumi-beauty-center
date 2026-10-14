# Lumi

Lumi is a scheduling app for a beauty center: it manages treatments, clients and appointments.
This repository is the base template. It has the design, the folder structure and one example feature; you build the real features.

Stack: Vite, React, TypeScript, Tailwind CSS and shadcn/ui (Base UI).

## Commands

| Command                                  | What it does                                     |
| ---------------------------------------- | ------------------------------------------------ |
| `pnpm install`                           | Installs the dependencies. Run it once at first. |
| `pnpm dev`                               | Starts the app at http://localhost:5173.         |
| `pnpm build`                             | Checks the types and builds the app.             |
| `pnpm lint`                              | Looks for code problems with ESLint.             |
| `pnpm format`                            | Formats the code with Prettier.                  |
| `pnpm dlx shadcn@latest add <component>` | Adds a shadcn component to `src/components/ui/`. |

Use **pnpm** only (no npm, no yarn). Before you commit, run `pnpm format`, `pnpm lint` and `pnpm build`.

## Folder structure

```
src/
  app/
    app.tsx                 # root component
    theme.ts                # light theme by default, saves the user's choice
  components/
    ui/                     # shadcn components (do not edit by hand)
    common/                 # our own reusable components
  lib/
    utils.ts                # shadcn cn() helper (do not edit)
  features/
    _template/              # example feature: copy it to start a new one
      domain/
      application/
      infrastructure/
      ui/
        components/
        pages/
        hooks/
      index.ts
    treatments/             # empty, you build it
    clients/                # empty, you build it
    appointments/           # empty, you build it
  main.tsx
  index.css                 # Lumi colors, fonts and radius
```

## The four layers

Each feature is a folder with four layers. Each layer has one job.

| Layer             | Contains                                                                                                                     | May import from                                                                                           |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `domain/`         | Entity types (`interface`/`type`) and **ports**: repository interfaces. Pure TypeScript, no React, no axios.                 | nothing outside `domain/`                                                                                 |
| `application/`    | **Use cases**: small plain functions that receive a repository (port) and do one thing.                                      | `domain/`                                                                                                 |
| `infrastructure/` | **Adapters** that implement the ports: in-memory with mock data now, HTTP (axios) later. Also exports the active repository. | `domain/`                                                                                                 |
| `ui/`             | React: pages, components, hooks. Hooks call use cases, passing the active repository.                                        | `application/`, `domain/` (types only), `infrastructure/` (only the active repository), `@/components/ui` |

In very simple words:

- **domain** says what things are (an `Item` has an `id` and a `name`) and what we need from the data (`findAll`, `findById`).
- **application** says what the app can do (`getItems`).
- **infrastructure** says where the data really comes from (an array today, an API later).
- **ui** shows the data on the screen.

Dependency direction (an arrow means "imports from"):

```
ui ──► application ──► domain ◄── infrastructure
 │                                      ▲
 └──── only the active repository ──────┘
```

Three rules:

1. A feature is used from outside only through its `index.ts`.
2. A use case receives the repository as a function parameter. No classes, no containers.
3. Repository methods always return a `Promise`. This way, changing mock data for a real API does not change the use cases or the UI.

## How to create a new feature

Example: `treatments`.

1. Copy the files of `src/features/_template/` into `src/features/treatments/` (the layer folders already exist; delete the `.gitkeep` of each folder you fill).
2. Rename `Item` to your entity (`Treatment`) in file names and in code: `item.ts` → `treatment.ts`, `ItemRepository` → `TreatmentRepository`, `getItems` → `getTreatments`, and so on. Add the fields your entity needs.
3. Implement the repository in `infrastructure/`: put your mock data in `treatments.mock.ts` and add the methods you need to the port and to the in-memory adapter.
4. Use it from a page: the hook calls the use case, the page renders the result. Export the page from `index.ts` and import it in `src/app/app.tsx` with `import { TreatmentsPage } from '@/features/treatments'`.

Read the comment at the top of each file in `_template`: it explains what that file is for.

## Naming

- Files and folders: `kebab-case` (`treatment-card.tsx`).
- Components and types: `PascalCase` (`TreatmentCard`).
- Functions and variables: `camelCase` (`getTreatments`).
- Everything in English.
