import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Users, Syringe, AlertCircle, Calendar, TrendingUp } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";

interface VaccinationWithPatient {
  id: string;
  vaccine_name: string;
  administered_at: string;
  next_dose_due: string | null;
  status: string;
  follow_up_type: string | null;
  patient: {
    full_name: string;
  };
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalVaccinations: 0,
    activePatients: 0,
    pendingFollowups: 0,
    adrReports: 0,
  });
  const [recentVaccinations, setRecentVaccinations] = useState<VaccinationWithPatient[]>([]);
  const [followUpVaccinations, setFollowUpVaccinations] = useState<VaccinationWithPatient[]>([]);
  const [userName, setUserName] = useState("Dr. Singh");

  useEffect(() => {
    checkAuth();
    fetchDashboardData();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate("/auth");
      return;
    }

    // Fetch user profile
    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name")
      .eq("user_id", user.id)
      .single();

    if (profile?.full_name) {
      setUserName(profile.full_name);
    }
  };

  const fetchDashboardData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch total vaccinations
      const { count: vaccinationCount } = await supabase
        .from("vaccinations")
        .select("*", { count: "exact", head: true })
        .eq("pharmacist_id", user.id);

      // Fetch active patients
      const { count: patientCount } = await supabase
        .from("patients")
        .select("*", { count: "exact", head: true })
        .eq("pharmacist_id", user.id);

      // Fetch pending follow-ups
      const { count: followUpCount } = await supabase
        .from("vaccinations")
        .select("*", { count: "exact", head: true })
        .eq("pharmacist_id", user.id)
        .eq("status", "follow_up_due");

      // Fetch ADR reports
      const { count: adrCount } = await supabase
        .from("adr_reports")
        .select("*", { count: "exact", head: true })
        .eq("pharmacist_id", user.id);

      setStats({
        totalVaccinations: vaccinationCount || 0,
        activePatients: patientCount || 0,
        pendingFollowups: followUpCount || 0,
        adrReports: adrCount || 0,
      });

      // Fetch recent vaccinations with patient names
      const { data: vaccinations, error: vacError } = await supabase
        .from("vaccinations")
        .select(`
          id,
          vaccine_name,
          administered_at,
          next_dose_due,
          status,
          follow_up_type,
          patient:patients(full_name)
        `)
        .eq("pharmacist_id", user.id)
        .order("administered_at", { ascending: false })
        .limit(5);

      if (vacError) throw vacError;
      setRecentVaccinations(vaccinations as any || []);

      // Fetch follow-up vaccinations
      const { data: followUps, error: followUpError } = await supabase
        .from("vaccinations")
        .select(`
          id,
          vaccine_name,
          administered_at,
          next_dose_due,
          status,
          follow_up_type,
          patient:patients(full_name)
        `)
        .eq("pharmacist_id", user.id)
        .eq("status", "follow_up_due")
        .order("next_dose_due", { ascending: true });

      if (followUpError) throw followUpError;
      setFollowUpVaccinations(followUps as any || []);

    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const formatFollowUpType = (type: string | null) => {
    if (!type) return "";
    return type === "1_week" ? "1 Week" : type === "1_month" ? "1 Month" : type;
  };

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
            <Button variant="outline" onClick={handleSignOut}>Sign Out</Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome back, {userName}</h2>
          <p className="text-muted-foreground">Here's what's happening with your vaccination practice today</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-card hover:shadow-elevated transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Vaccinations
              </CardTitle>
              <Syringe className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalVaccinations}</div>
              <p className="text-xs text-muted-foreground mt-1">All time vaccinations</p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-elevated transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Patients
              </CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.activePatients}</div>
              <p className="text-xs text-muted-foreground mt-1">Registered patients</p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-elevated transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Pending Follow-ups
              </CardTitle>
              <Calendar className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.pendingFollowups}</div>
              <p className="text-xs text-muted-foreground mt-1">Doses due</p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-elevated transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                ADR Reports
              </CardTitle>
              <AlertCircle className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.adrReports}</div>
              <p className="text-xs text-muted-foreground mt-1">Total reports</p>
            </CardContent>
          </Card>
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
                {loading ? (
                  <p className="text-center text-muted-foreground py-8">Loading...</p>
                ) : recentVaccinations.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No vaccinations recorded yet</p>
                ) : (
                  <div className="space-y-4">
                    {recentVaccinations.map((vax) => (
                      <div key={vax.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                        <div>
                          <p className="font-medium">{vax.patient.full_name}</p>
                          <p className="text-sm text-muted-foreground">{vax.vaccine_name}</p>
                          {vax.follow_up_type && (
                            <p className="text-xs text-accent mt-1">
                              Follow-up: {formatFollowUpType(vax.follow_up_type)}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">
                            {formatDistanceToNow(new Date(vax.administered_at), { addSuffix: true })}
                          </p>
                          <p className={`text-xs ${vax.status === 'completed' ? 'text-accent' : 'text-warning'}`}>
                            {vax.status === 'completed' ? 'Completed' : 'Follow-up Due'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="followups">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Follow-ups</CardTitle>
                <CardDescription>Patients due for follow-up doses (1 week / 1 month)</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <p className="text-center text-muted-foreground py-8">Loading...</p>
                ) : followUpVaccinations.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    No follow-up vaccinations scheduled
                  </p>
                ) : (
                  <div className="space-y-4">
                    {followUpVaccinations.map((vax) => (
                      <div key={vax.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                        <div>
                          <p className="font-medium">{vax.patient.full_name}</p>
                          <p className="text-sm text-muted-foreground">{vax.vaccine_name}</p>
                          <p className="text-xs text-accent mt-1">
                            Follow-up Type: {formatFollowUpType(vax.follow_up_type)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">
                            Due: {vax.next_dose_due ? formatDistanceToNow(new Date(vax.next_dose_due), { addSuffix: true }) : 'N/A'}
                          </p>
                          <p className="text-xs text-warning">
                            {vax.next_dose_due ? new Date(vax.next_dose_due).toLocaleDateString() : ''}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
