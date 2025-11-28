import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Users, AlertCircle, GraduationCap, Activity, FileCheck } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      icon: Users,
      title: "Patient Management",
      description: "Register patients with Aadhaar integration and maintain comprehensive medical histories"
    },
    {
      icon: Activity,
      title: "Vaccination Tracking",
      description: "Track all vaccinations, schedule follow-ups, and generate QR code certificates"
    },
    {
      icon: AlertCircle,
      title: "ADR Monitoring",
      description: "Report and track adverse drug reactions with WHO-standard protocols"
    },
    {
      icon: GraduationCap,
      title: "Knowledge Testing",
      description: "Enhance skills with scenario-based quizzes on vaccine safety and emergency handling"
    },
    {
      icon: FileCheck,
      title: "Compliance Ready",
      description: "HIPAA-compliant data protection with encrypted storage and audit logs"
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Enterprise-grade security with role-based access and complete data protection"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border bg-card shadow-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                VaxTrack Pro
              </h1>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" asChild>
                <Link to="/auth">Sign In</Link>
              </Button>
              <Button asChild>
                <Link to="/dashboard">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-hero py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-3xl space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <h2 className="text-4xl md:text-6xl font-bold leading-tight">
              Professional Vaccination
              <span className="block bg-gradient-primary bg-clip-text text-transparent">
                Management Platform
              </span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Empower your pharmacy practice with comprehensive vaccination tracking, 
              ADR monitoring, and continuous education—all in one secure platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" className="text-lg" asChild>
                <Link to="/dashboard">Start Managing Vaccinations</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg" asChild>
                <Link to="/quiz">Take Knowledge Quiz</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 md:py-28 container mx-auto px-4">
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need for Safe Vaccination Practice
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A complete toolkit designed specifically for licensed pharmacists administering vaccinations
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <Card 
              key={idx} 
              className="p-6 hover:shadow-elevated transition-all duration-300 border-border bg-card"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <feature.icon className="h-12 w-12 text-primary mb-4" />
              <h4 className="text-xl font-semibold mb-3">{feature.title}</h4>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-primary py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h3 className="text-3xl md:text-4xl font-bold">
              Ready to Elevate Your Vaccination Practice?
            </h3>
            <p className="text-lg text-primary-foreground/90">
              Join pharmacists who trust VaxTrack Pro for managing vaccinations safely and efficiently
            </p>
            <Button size="lg" variant="secondary" className="text-lg" asChild>
              <Link to="/auth">Create Your Account</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="font-semibold text-foreground">VaxTrack Pro</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 VaxTrack Pro. Secure, Compliant, Professional.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
