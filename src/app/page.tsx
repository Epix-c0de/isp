import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wifi, CreditCard, Users, Shield, Zap, BarChart3, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Wifi className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold tracking-tight">IPS Software</span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
            <Link href="#pricing" className="hover:text-primary transition-colors">Pricing</Link>
            <Link href="#about" className="hover:text-primary transition-colors">About</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">Login</Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center text-center space-y-8">
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                <Zap className="mr-1 h-3.5 w-3.5" />
                <span>Next-Gen ISP Management</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600 dark:to-blue-400">
                Automate Your ISP Business <br className="hidden md:block" /> with Ease
              </h1>
              <p className="max-w-[700px] text-lg text-muted-foreground md:text-xl">
                The all-in-one solution for billing, hotspot management, PPPoE automation, and user controls. Built for modern ISPs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Link href="/dashboard">
                  <Button size="lg" className="w-full sm:w-auto text-base h-12 px-8">
                    Start Assessment
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#demos">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto text-base h-12 px-8">
                    View Interactive Demo
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Background decoration */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-10 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary to-blue-500 rounded-full blur-[100px]" />
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-20 bg-slate-50 dark:bg-slate-900/50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Everything You Need to Scale</h2>
              <p className="max-w-[700px] mx-auto text-muted-foreground">
                Comprehensive tools designed to streamline operations and maximize revenue.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<CreditCard className="h-8 w-8 text-blue-500" />}
                title="Automated Billing"
                description="Auto-generate invoices, track payments, and send SMS reminders via M-Pesa integration."
              />
              <FeatureCard
                icon={<Wifi className="h-8 w-8 text-green-500" />}
                title="Hotspot Management"
                description="Generate vouchers, manage bandwidth limits, and track active hotspot sessions in real-time."
              />
              <FeatureCard
                icon={<Shield className="h-8 w-8 text-purple-500" />}
                title="PPPoE Automation"
                description="Seamless MikroTik integration for automatic user creation, suspension, and reactivation."
              />
              <FeatureCard
                icon={<BarChart3 className="h-8 w-8 text-orange-500" />}
                title="Analytics Dashboard"
                description="Visual insights into revenue, data usage, and network health metrics."
              />
              <FeatureCard
                icon={<Users className="h-8 w-8 text-red-500" />}
                title="User Portal"
                description="Self-service portal for customers to check usage, pay bills, and manage their plans."
              />
              <FeatureCard
                icon={<Zap className="h-8 w-8 text-yellow-500" />}
                title="Instant Activation"
                description="Zero-touch provisioning ensures customers get online immediately after payment."
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="py-10 border-t bg-background">
        <div className="container px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Wifi className="h-5 w-5 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">© 2024 IPS Software. All rights reserved.</p>
          </div>
          <nav className="flex gap-6 text-sm text-muted-foreground">
            <Link href="#" className="hover:underline">Terms</Link>
            <Link href="#" className="hover:underline">Privacy</Link>
            <Link href="#" className="hover:underline">Contact</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card className="border-border/50 bg-background/50 hover:bg-background hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
          {icon}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base leading-relaxed">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
