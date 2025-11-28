import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Shield, GraduationCap, CheckCircle, XCircle, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      question: "A patient develops severe facial swelling and difficulty breathing 10 minutes after vaccination. What is your immediate action?",
      options: [
        "Administer oral antihistamine and observe for 30 minutes",
        "Call emergency services and prepare to administer epinephrine",
        "Ask patient to rest and monitor symptoms",
        "Document the reaction and schedule follow-up"
      ],
      correct: 1,
      explanation: "This is anaphylaxis - a life-threatening emergency requiring immediate epinephrine administration and emergency medical services."
    },
    {
      question: "Which of the following is an absolute contraindication for vaccination?",
      options: [
        "Mild cold symptoms",
        "Previous severe allergic reaction to vaccine component",
        "Patient taking antibiotics",
        "Recent travel history"
      ],
      correct: 1,
      explanation: "A previous severe allergic reaction to a vaccine component is an absolute contraindication. Mild illness is not."
    },
    {
      question: "How long should a patient be observed after vaccination for adverse reactions?",
      options: [
        "5 minutes",
        "15 minutes minimum",
        "30 minutes",
        "No observation needed"
      ],
      correct: 1,
      explanation: "A minimum of 15 minutes observation is recommended, with 30 minutes for high-risk patients or those with previous allergies."
    }
  ];

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
    } else {
      setShowResult(true);
    }
  };

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
              <Link to="/dashboard">Exit Quiz</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {!showResult ? (
          <div className="space-y-6">
            {/* Quiz Header */}
            <Card className="shadow-card bg-gradient-primary text-primary-foreground">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <GraduationCap className="h-6 w-6" />
                    <div>
                      <CardTitle className="text-2xl">Pharmacist Knowledge Assessment</CardTitle>
                      <CardDescription className="text-primary-foreground/80">
                        Test your knowledge on vaccine safety and ADR management
                      </CardDescription>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm opacity-80">Question</div>
                    <div className="text-2xl font-bold">{currentQuestion + 1}/{questions.length}</div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Progress Bar */}
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>

            {/* Question Card */}
            <Card className="shadow-elevated">
              <CardHeader>
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold">
                    {currentQuestion + 1}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl leading-relaxed">
                      {questions[currentQuestion].question}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
                  {questions[currentQuestion].options.map((option, idx) => (
                    <div key={idx} className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value={idx.toString()} id={`option-${idx}`} />
                      <Label 
                        htmlFor={`option-${idx}`}
                        className="flex-1 cursor-pointer text-base"
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                {selectedAnswer && (
                  <div className={`p-4 rounded-lg border ${
                    parseInt(selectedAnswer) === questions[currentQuestion].correct
                      ? 'bg-accent/10 border-accent'
                      : 'bg-destructive/10 border-destructive'
                  }`}>
                    <div className="flex items-start gap-3">
                      {parseInt(selectedAnswer) === questions[currentQuestion].correct ? (
                        <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                      )}
                      <div>
                        <p className="font-medium mb-1">
                          {parseInt(selectedAnswer) === questions[currentQuestion].correct 
                            ? "Correct!" 
                            : "Incorrect"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {questions[currentQuestion].explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-end pt-4">
                  <Button 
                    onClick={handleNext}
                    disabled={!selectedAnswer}
                    size="lg"
                  >
                    {currentQuestion < questions.length - 1 ? "Next Question" : "View Results"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Timer Card */}
            <Card className="shadow-card">
              <CardContent className="py-4">
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">No time limit - take your time to think through each question</span>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card className="shadow-elevated">
            <CardHeader>
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-primary mb-4">
                  <GraduationCap className="h-10 w-10 text-primary-foreground" />
                </div>
                <CardTitle className="text-3xl">Quiz Complete!</CardTitle>
                <CardDescription className="text-lg">
                  You've completed the pharmacist knowledge assessment
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center p-8 bg-muted/50 rounded-lg">
                <div className="text-5xl font-bold text-primary mb-2">2/3</div>
                <div className="text-lg text-muted-foreground">Questions Answered Correctly</div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Learning Points:</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex gap-2">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                    <span>Always be prepared for anaphylaxis with epinephrine readily available</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                    <span>Observe patients for at least 15 minutes post-vaccination</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                    <span>Review absolute and relative contraindications regularly</span>
                  </li>
                </ul>
              </div>

              <div className="flex gap-3 pt-4">
                <Button className="flex-1" onClick={() => {
                  setCurrentQuestion(0);
                  setSelectedAnswer("");
                  setShowResult(false);
                }}>
                  Retake Quiz
                </Button>
                <Button variant="outline" className="flex-1" asChild>
                  <Link to="/dashboard">Back to Dashboard</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Quiz;
