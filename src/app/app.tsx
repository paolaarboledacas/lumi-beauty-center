import { CalendarDays, Check, Sparkles, Users } from 'lucide-react'

import { ThemeToggle } from '@/components/common/theme-toggle'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsPanel, TabsTab } from '@/components/ui/tabs'
import { TreatmentPage } from '@/features/treatments'

const views = [
  {
    value: 'project',
    label: 'The project',
    title: 'One app to manage the day of a',
    highlight: 'beauty center',
    points: [
      'Keep treatments, clients and appointments in one place',
      'Start from a base with the design already done',
      'Build the real features one at a time',
    ],
  },
  {
    value: 'template',
    label: 'The template',
    title: 'A base that is ready for',
    highlight: 'your first feature',
    points: [
      'A design system with colors, type and components',
      'A folder structure with four layers per feature',
      'One example feature to copy',
    ],
  },
]

const features = [
  {
    icon: Sparkles,
    title: 'Treatments',
    description: 'The services the center offers.',
  },
  {
    icon: Users,
    title: 'Clients',
    description: 'The people who visit the center.',
  },
  {
    icon: CalendarDays,
    title: 'Appointments',
    description: 'Which client comes, for which treatment and when.',
  },
]

const stack = ['Vite', 'React', 'TypeScript', 'Tailwind CSS', 'shadcn/ui']

export function App() {
  return (
    <div className="mx-auto flex min-h-svh w-full max-w-6xl flex-col px-6 sm:px-10">
      <header className="flex items-center justify-between py-6">
        <p className="flex items-center gap-2.5 font-heading text-xl font-bold">
          <span className="flex size-9 items-center justify-center rounded-full bg-brand text-brand-foreground">
            <Sparkles className="size-4.5" aria-hidden />
          </span>
          Lumi
        </p>
        <ThemeToggle />
      </header>

      <main className="flex flex-col gap-24 pt-10 pb-24 sm:gap-32 sm:pt-16">
        <TreatmentPage />
        <Tabs defaultValue="project">
          <TabsList aria-label="What to read about">
            {views.map(({ value, label }) => (
              <TabsTab key={value} value={value}>
                {label}
              </TabsTab>
            ))}
          </TabsList>

          {views.map(({ value, title, highlight, points }) => (
            <TabsPanel key={value} value={value} className="mt-10">
              <h1 className="max-w-4xl text-4xl leading-[1.08] text-balance sm:text-6xl lg:text-[4.25rem]">
                {title} <span className="text-brand">{highlight}</span>
              </h1>
              <ul className="mt-9 flex flex-col gap-4 text-lg">
                {points.map((point) => (
                  <li key={point} className="flex items-center gap-3">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-accent text-brand">
                      <Check className="size-4" strokeWidth={3} aria-hidden />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </TabsPanel>
          ))}

          <Button size="lg" className="mt-10">
            <Sparkles aria-hidden />
            Get started
          </Button>
        </Tabs>

        <section aria-labelledby="features-title">
          <p className="text-[0.8125rem] font-bold tracking-wider text-muted-foreground uppercase">
            The features
          </p>
          <h2
            id="features-title"
            className="mt-4 max-w-4xl text-3xl leading-[1.1] text-balance sm:text-5xl"
          >
            The real features are <span className="text-brand">still to build</span>
          </h2>
          <ul className="mt-10 grid gap-5 sm:grid-cols-3">
            {features.map(({ icon: Icon, title, description }) => (
              <li key={title} className="rounded-3xl bg-muted p-7">
                <span className="flex size-11 items-center justify-center rounded-full bg-background text-brand">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-6 text-xl">{title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{description}</p>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="mt-auto flex flex-col gap-5 border-t py-8 lg:flex-row lg:items-center lg:justify-between">
        <ul className="flex flex-wrap gap-2" aria-label="Stack">
          {stack.map((tool) => (
            <li key={tool} className="rounded-full border px-4 py-1.5 text-sm font-medium">
              {tool}
            </li>
          ))}
        </ul>
        <p className="text-sm text-muted-foreground">
          Each feature has four layers: domain, application, infrastructure and ui.
        </p>
      </footer>
    </div>
  )
}
