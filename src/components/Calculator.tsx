import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Plus, Minus, X, Divide, RotateCcw } from "lucide-react";

export const Calculator = () => {
  const [firstNumber, setFirstNumber] = useState<string>("");
  const [secondNumber, setSecondNumber] = useState<string>("");
  const [result, setResult] = useState<string>("");

  const handleOperation = (operation: string) => {
    const num1 = parseFloat(firstNumber);
    const num2 = parseFloat(secondNumber);
    
    if (isNaN(num1) || isNaN(num2)) {
      setResult("Please enter valid numbers");
      return;
    }

    let calculatedResult: number;
    
    switch (operation) {
      case "add":
        calculatedResult = num1 + num2;
        break;
      case "subtract":
        calculatedResult = num1 - num2;
        break;
      case "multiply":
        calculatedResult = num1 * num2;
        break;
      case "divide":
        if (num2 === 0) {
          setResult("Cannot divide by zero");
          return;
        }
        calculatedResult = num1 / num2;
        break;
      default:
        return;
    }
    
    setResult(calculatedResult.toString());
  };

  const handleClear = () => {
    setFirstNumber("");
    setSecondNumber("");
    setResult("");
  };

  const operations = [
    { id: "add", icon: Plus, label: "Add", color: "primary" },
    { id: "subtract", icon: Minus, label: "Subtract", color: "secondary" },
    { id: "multiply", icon: X, label: "Multiply", color: "accent" },
    { id: "divide", icon: Divide, label: "Divide", color: "primary" },
  ];

  return (
    <div className="min-h-screen bg-gradient-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-calculator-surface border-border shadow-calculator backdrop-blur-sm">
        <div className="p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Calculator
            </h1>
            <p className="text-muted-foreground">
              Enter two numbers and choose an operation
            </p>
          </div>

          {/* Input Fields */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                First Number
              </label>
              <Input
                type="number"
                placeholder="Enter first number"
                value={firstNumber}
                onChange={(e) => setFirstNumber(e.target.value)}
                className="bg-calculator-glass border-border focus:ring-primary focus:border-primary transition-smooth text-lg"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Second Number
              </label>
              <Input
                type="number"
                placeholder="Enter second number"
                value={secondNumber}
                onChange={(e) => setSecondNumber(e.target.value)}
                className="bg-calculator-glass border-border focus:ring-primary focus:border-primary transition-smooth text-lg"
              />
            </div>
          </div>

          {/* Operation Buttons */}
          <div className="grid grid-cols-2 gap-3">
            {operations.map((op) => {
              const IconComponent = op.icon;
              return (
                <Button
                  key={op.id}
                  onClick={() => handleOperation(op.id)}
                  variant="outline"
                  size="lg"
                  className={`
                    bg-gradient-primary hover:shadow-glow border-border 
                    text-primary-foreground hover:text-primary-foreground
                    transition-bounce hover:scale-105 active:scale-95
                    shadow-button
                  `}
                >
                  <IconComponent className="w-4 h-4 mr-2" />
                  {op.label}
                </Button>
              );
            })}
          </div>

          {/* Clear Button */}
          <Button
            onClick={handleClear}
            variant="outline"
            size="lg"
            className="w-full bg-destructive/10 hover:bg-destructive/20 border-destructive/30 text-destructive hover:text-destructive transition-smooth"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Clear All
          </Button>

          {/* Result Display */}
          {result && (
            <div className="mt-6 p-4 bg-calculator-glass border border-border rounded-lg">
              <label className="text-sm font-medium text-foreground block mb-2">
                Result
              </label>
              <div className="text-2xl font-bold text-primary break-all">
                {result}
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};