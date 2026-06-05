import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getHistory, clearHistory } from '@/lib/history';
import { Trash2, History as HistoryIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import Seo from '@/components/Seo';

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleClearHistory = () => {
    clearHistory();
    setHistory([]);
  };

  const formatTimestamp = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  const renderCalculationDetails = (item) => {
    const details = Object.entries(item.result)
      .map(([key, value]) => `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`)
      .join(' | ');
    return <p className="text-sm text-slate-300">{details}</p>;
  };

  return (
    <>
      <Seo
        title="Calculation History"
        description="View your past calculations saved locally in your browser. Calczoon respects your privacy and does not store your calculation history on our servers."
        canonicalUrl="/history"
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-primary">Calculation History</h1>
              <CardDescription className="text-slate-300">Your recent calculations are saved locally in your browser for your convenience. We do not store this data on our servers.</CardDescription>
            </div>
            {history.length > 0 && (
              <Button variant="destructive" onClick={handleClearHistory}>
                <Trash2 className="mr-2 h-4 w-4" /> Clear History
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {history.length > 0 ? (
              <ul className="space-y-4">
                {history.map((item) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 bg-slate-800 rounded-lg border border-slate-700"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-white">{item.type}</h3>
                        {renderCalculationDetails(item)}
                      </div>
                      <p className="text-xs text-slate-400 whitespace-nowrap">{formatTimestamp(item.date)}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-12">
                <HistoryIcon className="mx-auto h-12 w-12 text-slate-500" />
                <h3 className="mt-2 text-xl font-semibold text-slate-200">No History Yet</h3>
                <p className="mt-1 text-sm text-slate-300">Your recent calculations will appear here after you use a tool.</p>
                <Button asChild className="mt-6">
                  <Link to="/tools">Explore Calculators</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
};

export default History;