import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wrench } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const PlaceholderCalculator = ({ toolName }) => {
  const { toast } = useToast();

  const handleCalculate = (e) => {
    e.preventDefault();
    toast({
      title: "Coming Soon!",
      description: `🚧 The ${toolName} isn't implemented yet—but you can request it in your next prompt! 🚀`,
    });
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-2xl text-white flex items-center gap-2">
          <Wrench className="w-6 h-6 text-emerald-400" />
          {toolName}
        </CardTitle>
        <CardDescription className="text-slate-400">
          This calculator is under construction. More features coming soon!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center h-40 bg-slate-900/50 border border-dashed border-slate-600 rounded-lg">
          <p className="text-slate-500">Calculator inputs will be here.</p>
        </div>
        <Button onClick={handleCalculate} className="w-full mt-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold py-6 text-lg shadow-lg">
          Calculate (Coming Soon)
        </Button>
      </CardContent>
    </Card>
  );
};

export default PlaceholderCalculator;