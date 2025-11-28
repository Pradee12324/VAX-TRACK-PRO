import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Shield, AlertCircle, Upload } from "lucide-react";
import { Link } from "react-router-dom";

const ADRReport = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card shadow-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/dashboard" className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                VaxTrack Pro
              </h1>
            </Link>
            <Button variant="outline" asChild>
              <Link to="/dashboard">Back to Dashboard</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="shadow-elevated">
          <CardHeader>
            <div className="flex items-center gap-3">
              <AlertCircle className="h-6 w-6 text-destructive" />
              <div>
                <CardTitle className="text-2xl">Adverse Drug Reaction Report</CardTitle>
                <CardDescription>Report and track adverse reactions following vaccination (WHO Yellow Card Format)</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Patient Information */}
            <div className="p-4 bg-muted/50 rounded-lg">
              <h3 className="font-semibold mb-4">Patient Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="patient-search">Search Patient</Label>
                  <Input id="patient-search" placeholder="Aadhaar / Name / Mobile" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="patient-name">Patient Name</Label>
                  <Input id="patient-name" placeholder="Auto-filled from search" disabled />
                </div>
              </div>
            </div>

            {/* Vaccination Details */}
            <div>
              <h3 className="font-semibold mb-4">Vaccination Details</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vaccine-name">Vaccine Name *</Label>
                  <Select>
                    <SelectTrigger id="vaccine-name">
                      <SelectValue placeholder="Select vaccine" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="covid19">COVID-19</SelectItem>
                      <SelectItem value="hepatitisb">Hepatitis B</SelectItem>
                      <SelectItem value="hpv">HPV</SelectItem>
                      <SelectItem value="influenza">Influenza</SelectItem>
                      <SelectItem value="bcg">BCG</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="batch-number">Batch/Lot Number *</Label>
                  <Input id="batch-number" placeholder="Enter batch number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vaccination-date">Date of Vaccination *</Label>
                  <Input id="vaccination-date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dose-number">Dose Number</Label>
                  <Select>
                    <SelectTrigger id="dose-number">
                      <SelectValue placeholder="Select dose" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">First Dose</SelectItem>
                      <SelectItem value="2">Second Dose</SelectItem>
                      <SelectItem value="3">Booster</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* ADR Details */}
            <div className="p-4 bg-destructive/5 border border-destructive/20 rounded-lg">
              <h3 className="font-semibold mb-4 text-destructive flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Adverse Reaction Details
              </h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reaction-onset">Time of Onset *</Label>
                  <Input id="reaction-onset" type="datetime-local" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="severity">Severity Classification *</Label>
                  <Select>
                    <SelectTrigger id="severity">
                      <SelectValue placeholder="Select severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mild">Mild - Minor discomfort, no medical intervention</SelectItem>
                      <SelectItem value="moderate">Moderate - Medical attention required</SelectItem>
                      <SelectItem value="severe">Severe - Hospitalization required</SelectItem>
                      <SelectItem value="anaphylaxis">Anaphylaxis - Life-threatening emergency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="symptoms">Symptoms Observed *</Label>
                  <Textarea 
                    id="symptoms" 
                    placeholder="Describe symptoms in detail (e.g., rash, fever, breathing difficulty, swelling)"
                    rows={4}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="vital-signs">Vital Signs</Label>
                    <Textarea 
                      id="vital-signs" 
                      placeholder="BP, Pulse, Temperature, SpO2"
                      rows={2}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="treatment">Treatment Provided</Label>
                    <Textarea 
                      id="treatment" 
                      placeholder="Medications, interventions"
                      rows={2}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="outcome">Outcome *</Label>
                  <Select>
                    <SelectTrigger id="outcome">
                      <SelectValue placeholder="Select outcome" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recovered">Recovered</SelectItem>
                      <SelectItem value="recovering">Recovering</SelectItem>
                      <SelectItem value="not-recovered">Not Recovered</SelectItem>
                      <SelectItem value="hospitalized">Hospitalized</SelectItem>
                      <SelectItem value="fatal">Fatal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Supporting Evidence */}
            <div>
              <h3 className="font-semibold mb-4">Supporting Evidence</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="images">Upload Images/Photos</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-1">Click to upload or drag and drop</p>
                    <p className="text-xs text-muted-foreground">Photos of symptoms, rash, swelling, etc.</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="audio-notes">Audio Notes (Optional)</Label>
                  <Button variant="outline" className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Record or Upload Audio Note
                  </Button>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-2">
              <Label htmlFor="additional-notes">Additional Notes</Label>
              <Textarea 
                id="additional-notes" 
                placeholder="Any other relevant information, patient history, or observations"
                rows={3}
              />
            </div>

            {/* Risk Flag */}
            <div className="p-4 bg-warning/10 border border-warning/30 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-warning mt-0.5" />
                <div>
                  <p className="font-medium text-warning-foreground">Automatic Risk Assessment</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    System will automatically flag serious reactions for immediate review and potential regulatory reporting
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button className="flex-1 bg-destructive hover:bg-destructive/90">Submit ADR Report</Button>
              <Button variant="outline" className="flex-1">Save as Draft</Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ADRReport;
