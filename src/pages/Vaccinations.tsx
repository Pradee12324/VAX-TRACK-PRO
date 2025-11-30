import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Shield, Search, Plus, Calendar as CalendarIcon, Syringe } from "lucide-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const Vaccinations = () => {
  const [date, setDate] = useState<Date>();
  const [isNewVaccination, setIsNewVaccination] = useState(false);

  const vaccineList = [
    "COVID-19 Booster",
    "Hepatitis B",
    "Influenza",
    "HPV",
    "BCG",
    "DPT",
    "Measles",
    "Polio",
    "Tetanus",
    "Typhoid"
  ];

  const recentVaccinations = [
    { id: 1, patient: "Rajesh Kumar", vaccine: "COVID-19 Booster", date: "2025-11-27", batch: "BT2025A", status: "Completed" },
    { id: 2, patient: "Priya Sharma", vaccine: "Hepatitis B", date: "2025-11-27", batch: "HB2025B", status: "Follow-up Due" },
    { id: 3, patient: "Amit Patel", vaccine: "Influenza", date: "2025-11-26", batch: "FL2025C", status: "Completed" },
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
              <Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">Dashboard</Link>
              <Link to="/patients" className="text-muted-foreground hover:text-foreground transition-colors">Patients</Link>
              <Link to="/vaccinations" className="text-primary font-medium">Vaccinations</Link>
              <Link to="/adr" className="text-muted-foreground hover:text-foreground transition-colors">ADR Reports</Link>
              <Link to="/quiz" className="text-muted-foreground hover:text-foreground transition-colors">Quiz</Link>
            </nav>
            <Button variant="outline">Sign Out</Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Vaccination Records</h2>
            <p className="text-muted-foreground">Manage and track vaccination administration</p>
          </div>
          <Button onClick={() => setIsNewVaccination(!isNewVaccination)} className="gap-2">
            <Plus className="h-4 w-4" />
            Record New Vaccination
          </Button>
        </div>

        {/* New Vaccination Form */}
        {isNewVaccination && (
          <Card className="mb-8 shadow-elevated animate-in fade-in-50 duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Syringe className="h-5 w-5 text-primary" />
                Record New Vaccination
              </CardTitle>
              <CardDescription>Enter vaccination details for the patient</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="patient-search">Patient</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="patient-search"
                        placeholder="Search by name or Aadhaar..." 
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="vaccine">Vaccine</Label>
                    <Select>
                      <SelectTrigger id="vaccine">
                        <SelectValue placeholder="Select vaccine" />
                      </SelectTrigger>
                      <SelectContent>
                        {vaccineList.map((vaccine) => (
                          <SelectItem key={vaccine} value={vaccine.toLowerCase().replace(/\s+/g, '-')}>
                            {vaccine}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="batch">Batch Number</Label>
                    <Input id="batch" placeholder="Enter batch number" />
                  </div>

                  <div className="space-y-2">
                    <Label>Vaccination Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="site">Administration Site</Label>
                    <Select>
                      <SelectTrigger id="site">
                        <SelectValue placeholder="Select site" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="left-arm">Left Upper Arm</SelectItem>
                        <SelectItem value="right-arm">Right Upper Arm</SelectItem>
                        <SelectItem value="left-thigh">Left Thigh</SelectItem>
                        <SelectItem value="right-thigh">Right Thigh</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dose">Dose Number</Label>
                    <Select>
                      <SelectTrigger id="dose">
                        <SelectValue placeholder="Select dose" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">First Dose</SelectItem>
                        <SelectItem value="2">Second Dose</SelectItem>
                        <SelectItem value="3">Third Dose</SelectItem>
                        <SelectItem value="booster">Booster</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Clinical Notes</Label>
                  <Textarea 
                    id="notes"
                    placeholder="Any observations or special notes..."
                    className="min-h-[100px]"
                  />
                </div>

                <div className="flex gap-4">
                  <Button type="submit" className="flex-1">Record Vaccination</Button>
                  <Button type="button" variant="outline" onClick={() => setIsNewVaccination(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Vaccinations List */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Vaccinations</CardTitle>
            <CardDescription>Latest vaccination records administered</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentVaccinations.map((vax) => (
                <div 
                  key={vax.id} 
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Syringe className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{vax.patient}</p>
                      <p className="text-sm text-muted-foreground">{vax.vaccine}</p>
                      <p className="text-xs text-muted-foreground">Batch: {vax.batch}</p>
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-4">
                    <div>
                      <p className="text-sm font-medium">{vax.date}</p>
                      <Badge 
                        variant={vax.status === "Completed" ? "default" : "secondary"}
                        className="mt-1"
                      >
                        {vax.status}
                      </Badge>
                    </div>
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Vaccinations;
