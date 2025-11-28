import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Shield, Search, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

const Patients = () => {
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

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Patient Registration Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <UserPlus className="h-6 w-6 text-primary" />
                  <div>
                    <CardTitle className="text-2xl">Patient Registration</CardTitle>
                    <CardDescription>Register a new patient with Aadhaar verification</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Aadhaar Section */}
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <Label htmlFor="aadhaar" className="text-base font-semibold mb-2 block">
                    Aadhaar Number *
                  </Label>
                  <div className="flex gap-2">
                    <Input 
                      id="aadhaar" 
                      placeholder="XXXX-XXXX-XXXX" 
                      maxLength={14}
                      className="font-mono"
                    />
                    <Button variant="default">Verify</Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Patient details will auto-fill upon successful Aadhaar verification
                  </p>
                </div>

                {/* Personal Information */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullname">Full Name *</Label>
                    <Input id="fullname" placeholder="As per Aadhaar" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age">Age *</Label>
                    <Input id="age" type="number" placeholder="Years" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender *</Label>
                    <Select>
                      <SelectTrigger id="gender">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="blood-group">Blood Group</Label>
                    <Select>
                      <SelectTrigger id="blood-group">
                        <SelectValue placeholder="Select blood group" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="a+">A+</SelectItem>
                        <SelectItem value="a-">A-</SelectItem>
                        <SelectItem value="b+">B+</SelectItem>
                        <SelectItem value="b-">B-</SelectItem>
                        <SelectItem value="ab+">AB+</SelectItem>
                        <SelectItem value="ab-">AB-</SelectItem>
                        <SelectItem value="o+">O+</SelectItem>
                        <SelectItem value="o-">O-</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="mobile">Mobile Number *</Label>
                    <Input id="mobile" type="tel" placeholder="+91 XXXXXXXXXX" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="patient@example.com" />
                  </div>
                </div>

                {/* Medical History */}
                <div className="space-y-2">
                  <Label htmlFor="allergies">Known Allergies</Label>
                  <Textarea 
                    id="allergies" 
                    placeholder="List any known allergies (medications, food, etc.)"
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="medical-history">Medical History</Label>
                  <Textarea 
                    id="medical-history" 
                    placeholder="Chronic conditions, previous reactions to vaccines, etc."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="current-medications">Current Medications</Label>
                  <Textarea 
                    id="current-medications" 
                    placeholder="List current medications and dosages"
                    rows={2}
                  />
                </div>

                {/* Emergency Contact */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="emergency-contact">Emergency Contact Name</Label>
                    <Input id="emergency-contact" placeholder="Full name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergency-phone">Emergency Contact Phone</Label>
                    <Input id="emergency-phone" type="tel" placeholder="+91 XXXXXXXXXX" />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button className="flex-1">Register Patient</Button>
                  <Button variant="outline" className="flex-1">Clear Form</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Patient Search Sidebar */}
          <div className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Search className="h-5 w-5 text-primary" />
                  <CardTitle>Search Patients</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="search-aadhaar">Aadhaar Number</Label>
                  <Input id="search-aadhaar" placeholder="XXXX-XXXX-XXXX" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="search-name">Name</Label>
                  <Input id="search-name" placeholder="Patient name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="search-mobile">Mobile</Label>
                  <Input id="search-mobile" placeholder="+91 XXXXXXXXXX" />
                </div>
                <Button className="w-full">Search</Button>
              </CardContent>
            </Card>

            <Card className="shadow-card bg-primary/5">
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Patients</span>
                  <span className="font-semibold">856</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Registered Today</span>
                  <span className="font-semibold text-accent">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Active Records</span>
                  <span className="font-semibold">842</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Patients;
