import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Shield, Syringe, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const RecordVaccination = () => {
  const vaccines = [
    "COVID-19",
    "COVID-19 Booster",
    "Hepatitis B",
    "HPV",
    "Influenza",
    "BCG",
    "MMR",
    "Pneumococcal",
    "Tdap",
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
            <Button variant="outline" asChild>
              <Link to="/dashboard" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Syringe className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold">Record Vaccination</h2>
            </div>
            <p className="text-muted-foreground">
              Record a new vaccination administration for a patient
            </p>
          </div>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Vaccination Details</CardTitle>
              <CardDescription>
                Enter the vaccination information and patient details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                {/* Patient Selection */}
                <div className="space-y-2">
                  <Label htmlFor="patient">Patient</Label>
                  <Select>
                    <SelectTrigger id="patient">
                      <SelectValue placeholder="Search patient by name or Aadhaar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Rajesh Kumar - 1234 5678 9012</SelectItem>
                      <SelectItem value="2">Priya Sharma - 2345 6789 0123</SelectItem>
                      <SelectItem value="3">Amit Patel - 3456 7890 1234</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Vaccine Selection */}
                <div className="space-y-2">
                  <Label htmlFor="vaccine">Vaccine Name *</Label>
                  <Select>
                    <SelectTrigger id="vaccine">
                      <SelectValue placeholder="Select vaccine" />
                    </SelectTrigger>
                    <SelectContent>
                      {vaccines.map((vaccine) => (
                        <SelectItem key={vaccine} value={vaccine.toLowerCase().replace(/\s+/g, "-")}>
                          {vaccine}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Batch Number */}
                <div className="space-y-2">
                  <Label htmlFor="batch">Batch Number *</Label>
                  <Input id="batch" placeholder="Enter batch number" />
                </div>

                {/* Dose Number */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dose">Dose Number *</Label>
                    <Select>
                      <SelectTrigger id="dose">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1st Dose</SelectItem>
                        <SelectItem value="2">2nd Dose</SelectItem>
                        <SelectItem value="3">3rd Dose</SelectItem>
                        <SelectItem value="booster">Booster</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="administered">Administration Date *</Label>
                    <Input id="administered" type="date" />
                  </div>
                </div>

                {/* Follow-up Information */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="followup">Follow-up Type</Label>
                    <Select>
                      <SelectTrigger id="followup">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No follow-up required</SelectItem>
                        <SelectItem value="7days">7 days check-in</SelectItem>
                        <SelectItem value="14days">14 days check-in</SelectItem>
                        <SelectItem value="nextdose">Next dose required</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nextdose">Next Dose Due</Label>
                    <Input id="nextdose" type="date" />
                  </div>
                </div>

                {/* Notes */}
                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any additional observations or special instructions..."
                    rows={4}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <Button type="submit" className="flex-1">
                    <Syringe className="h-4 w-4 mr-2" />
                    Record Vaccination
                  </Button>
                  <Button type="button" variant="outline" asChild>
                    <Link to="/dashboard">Cancel</Link>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default RecordVaccination;
