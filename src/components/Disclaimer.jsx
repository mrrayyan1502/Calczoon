import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Disclaimer = ({ text }) => {
  return (
    <Card className="bg-yellow-900/20 border-yellow-700/50 mt-8">
      <CardContent className="p-4">
        <div className="flex items-start">
          <AlertTriangle className="h-5 w-5 text-yellow-400 mr-3 mt-1 flex-shrink-0" />
          <div>
            <h2 className="text-lg font-semibold text-yellow-300">Disclaimer</h2>
            <p className="text-sm text-yellow-200/80">{text}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Disclaimer;