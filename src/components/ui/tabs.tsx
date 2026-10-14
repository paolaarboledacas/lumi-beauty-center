import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"
import { cn } from "cn"

function Tabs({ className, ...props }: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col items-start", className)}
      {...props}
    />
  )
}

function TabsList({ className, children, ...props }: TabsPrimitive.List.Props) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "relative z-0 inline-flex items-center rounded-full bg-muted p-1",
        className
      )}
      {...props}
    >
      {children}
      <TabsPrimitive.Indicator
        data-slot="tabs-indicator"
        className="absolute top-1/2 left-0 -z-10 h-(--active-tab-height) w-(--active-tab-width) translate-x-(--active-tab-left) -translate-y-1/2 rounded-full bg-background ring-1 ring-input transition-[translate,width] duration-200 ease-out motion-reduce:transition-none"
      />
    </TabsPrimitive.List>
  )
}

function TabsTab({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-tab"
      className={cn(
        "inline-flex h-11 cursor-pointer items-center justify-center rounded-full px-4 text-[0.8125rem] font-bold tracking-wider whitespace-nowrap text-muted-foreground uppercase outline-none select-none transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 data-active:text-foreground data-disabled:pointer-events-none data-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

function TabsPanel({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-panel"
      className={cn("outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTab, TabsPanel }
