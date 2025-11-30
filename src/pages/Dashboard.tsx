import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Users, Syringe, AlertCircle, Calendar, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const stats = [
    { label: "Total Vaccinations", value: "1,247", icon: Syringe, trend: "+12%" },
    { label: "Active Patients", value: "856", icon: Users, trend: "+8%" },
    { label: "Pending Follow-ups", value: "23", icon: Calendar, trend: "-5%" },
    { label: "ADR Reports", value: "7", icon: AlertCircle, trend: "+2" },
  ];

  const recentVaccinations = [
    { patient: "Rajesh Kumar", vaccine: "COVID-19 Booster", date: "2025-11-27", status: "Completed" },
    { patient: "Priya Sharma", vaccine: "Hepatitis B", date: "2025-11-27", status: "Follow-up Due" },
    { patient: "Amit Patel", vaccine: "Influenza", date: "2025-11-26", status: "Completed" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card shadow-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                VaxTrack Pro
              </h1>
            </div>
            <nav className="hidden md:flex gap-6">
              <Link to="/dashboard" className="text-primary font-medium">Dashboard</Link>
              <Link to="/patients" className="text-muted-foreground hover:text-foreground transition-colors">Patients</Link>
              <Link to="/vaccinations" className="text-muted-foreground hover:text-foreground transition-colors">Vaccinations</Link>
              <Link to="/adr" className="text-muted-foreground hover:text-foreground transition-colors">ADR Reports</Link>
              <Link to="/quiz" className="text-muted-foreground hover:text-foreground transition-colors">Quiz</Link>
            </nav>
            <Button variant="outline">Sign Out</Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome back, Dr. Singh</h2>
          <p className="text-muted-foreground">Here's what's happening with your vaccination practice today</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <Card key={idx} className="shadow-card hover:shadow-elevated transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
                <p className="text-xs text-accent flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  {stat.trend} from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Button className="h-20" variant="outline" asChild>
            <Link to="/patients/new" className="flex flex-col gap-2">
              <Users className="h-6 w-6" />
              <span>Register New Patient</span>
            </Link>
          </Button>
          <Button className="h-20" asChild>
            <Link to="/vaccinations/new" className="flex flex-col gap-2">
              <Syringe className="h-6 w-6" />
              <span>Record Vaccination</span>
            </Link>
          </Button>
          <Button className="h-20" variant="outline" asChild>
            <Link to="/adr/new" className="flex flex-col gap-2">
              <AlertCircle className="h-6 w-6" />
              <span>Report ADR</span>
            </Link>
          </Button>
        </div>

        {/* Recent Activity */}
        <Tabs defaultValue="vaccinations" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="vaccinations">Recent Vaccinations</TabsTrigger>
            <TabsTrigger value="followups">Follow-ups</TabsTrigger>
          </TabsList>
          
          <TabsContent value="vaccinations">
            <Card>
              <CardHeader>
                <CardTitle>Recent Vaccinations</CardTitle>
                <CardDescription>Latest vaccination records from your practice</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentVaccinations.map((vax, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                      <div>
                        <p className="font-medium">{vax.patient}</p>
                        <p className="text-sm text-muted-foreground">{vax.vaccine}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{vax.date}</p>
                        <p className={`text-xs ${vax.status === 'Completed' ? 'text-accent' : 'text-warning'}`}>
                          {vax.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="followups">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Follow-ups</CardTitle>
                <CardDescription>Patients due for follow-up doses</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground py-8">
                  23 patients scheduled for follow-up vaccinations this week
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
