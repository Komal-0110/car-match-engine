import { Car } from 'lucide-react'

export default function Header() {
  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-accent p-2">
            <Car className="h-6 w-6 text-accent-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">CarFind</h1>
            <p className="text-sm text-muted-foreground">Smart Car Recommendations</p>
          </div>
        </div>
        <nav className="flex items-center gap-6">
          <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">Browse</button>
          <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">Compare</button>
          <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">Saved</button>
          <button className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground hover:opacity-90 transition-opacity">
            Sign In
          </button>
        </nav>
      </div>
    </header>
  )
}
