import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Auth = () => {
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email");

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-2">
            <Shield className="h-10 w-10 text-primary" />
            <span className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              VaxTrack Pro
            </span>
          </Link>
          <p className="text-muted-foreground">Secure access for licensed pharmacists</p>
        </div>

        {/* Auth Card */}
        <Card className="shadow-elevated">
          <CardHeader>
            <CardTitle className="text-2xl">Welcome</CardTitle>
            <CardDescription>Sign in to your pharmacist account</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              {/* Sign In Tab */}
              <TabsContent value="signin" className="space-y-4">
                <div className="flex gap-2 mb-4">
                  <Button
                    variant={loginMethod === "email" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setLoginMethod("email")}
                    className="flex-1"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Button>
                  <Button
                    variant={loginMethod === "phone" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setLoginMethod("phone")}
                    className="flex-1"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Phone
                  </Button>
                </div>

                {loginMethod === "email" ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signin-email">Email</Label>
                      <Input id="signin-email" type="email" placeholder="pharmacist@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signin-password">Password</Label>
                      <Input id="signin-password" type="password" />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signin-phone">Mobile Number</Label>
                      <Input id="signin-phone" type="tel" placeholder="+91 XXXXXXXXXX" />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      You'll receive an OTP to verify your phone number
                    </p>
                  </div>
                )}

                <Button className="w-full" asChild>
                  <Link to="/dashboard">
                    {loginMethod === "email" ? "Sign In" : "Send OTP"}
                  </Link>
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Forgot password? <a href="#" className="text-primary hover:underline">Reset it here</a>
                </p>
              </TabsContent>

              {/* Sign Up Tab */}
              <TabsContent value="signup" className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input id="signup-name" placeholder="Dr. Rajesh Kumar" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input id="signup-email" type="email" placeholder="pharmacist@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-phone">Mobile Number</Label>
                    <Input id="signup-phone" type="tel" placeholder="+91 XXXXXXXXXX" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-license">Pharmacy License Number</Label>
                    <Input id="signup-license" placeholder="PH-XXXXX-XXXX" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input id="signup-password" type="password" />
                  </div>
                </div>

                <Button className="w-full" asChild>
                  <Link to="/dashboard">Create Account</Link>
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  By signing up, you agree to our Terms & Conditions and Privacy Policy
                </p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Admin Note */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Admin access? <a href="#" className="text-primary hover:underline font-medium">Contact support</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
