import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Calculator, Menu, Rss, Info, Mail, HeartHandshake as Handshake, ChevronDown, Activity, HeartPulse, Target, Flame, BrainCircuit, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { to: '/', label: 'Home' },
  {
    title: 'Calculators',
    items: [
      { to: '/financial-calculators', label: 'Financial' },
      { 
        to: '/health-fitness-calculators', 
        label: 'Health & Fitness',
        subItems: [
            { to: '/health/tdee-calculator', label: 'TDEE', icon: <Activity className="w-4 h-4 mr-2" /> },
            { to: '/health/bmi-calculator', label: 'BMI', icon: <HeartPulse className="w-4 h-4 mr-2" /> },
            { to: '/health/macro-calculator', label: 'Macro', icon: <Target className="w-4 h-4 mr-2" /> },
            { to: '/health/calories-burned-calculator', label: 'Calories Burned', icon: <Flame className="w-4 h-4 mr-2" /> },
            { to: '/health/weight-loss-calculator', label: 'Weight Loss', icon: <TrendingDown className="w-4 h-4 mr-2" /> },
            { to: '/health/body-fat-calculator', label: 'Body Fat', icon: <BrainCircuit className="w-4 h-4 mr-2" /> },
        ]
      },
      { to: '/math-science-calculators', label: 'Math & Science' },
      { to: '/lifestyle-everyday-calculators', label: 'Lifestyle & Everyday' },
    ],
  },
  { to: '/blog', label: 'Blog' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-lg">
      <nav className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-2 group" onClick={() => setMobileMenuOpen(false)}>
          <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
            <Calculator className="h-6 w-6 text-primary" />
          </div>
          <span className="font-bold text-xl tracking-tight text-white">CalcZoon</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            link.items ? (
              <DropdownMenu key={link.title}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-1 text-slate-300 hover:text-primary text-sm font-medium">
                    {link.title}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-slate-800/90 backdrop-blur-sm border-slate-700 text-slate-200">
                  {link.items.map((item) => (
                    item.subItems ? (
                        <DropdownMenuSub key={item.to}>
                            <DropdownMenuSubTrigger>
                                <NavLink to={item.to} className={({ isActive }) => `w-full text-left flex items-center p-2 rounded-sm text-sm hover:bg-slate-700 focus:bg-slate-700 ${isActive ? 'text-primary' : ''}`}>
                                    {item.label}
                                </NavLink>
                            </DropdownMenuSubTrigger>
                             <DropdownMenuPortal>
                                <DropdownMenuSubContent className="bg-slate-800/90 backdrop-blur-sm border-slate-700 text-slate-200">
                                    {item.subItems.map((subItem) => (
                                        <DropdownMenuItem key={subItem.to} asChild>
                                            <NavLink to={subItem.to} className={({ isActive }) => `w-full text-left flex items-center p-2 rounded-sm text-sm hover:bg-slate-700 focus:bg-slate-700 ${isActive ? 'text-primary' : ''}`}>
                                                {subItem.icon}{subItem.label}
                                            </NavLink>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuSubContent>
                             </DropdownMenuPortal>
                        </DropdownMenuSub>
                    ) : (
                        <DropdownMenuItem key={item.to} asChild>
                            <NavLink to={item.to} className={({ isActive }) => `w-full text-left flex items-center p-2 rounded-sm text-sm hover:bg-slate-700 focus:bg-slate-700 ${isActive ? 'text-primary' : ''}`}>
                                {item.label}
                            </NavLink>
                        </DropdownMenuItem>
                    )
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium transition-colors text-slate-300 hover:text-primary ${isActive ? 'text-primary bg-slate-800' : ''}`}
              >
                {link.label}
              </NavLink>
            )
          ))}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs bg-slate-900 border-l-slate-800 text-white">
              <SheetHeader>
                <SheetTitle className="text-2xl text-primary flex items-center">
                  <Calculator className="mr-2" /> CalcZoon Menu
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-2 mt-6">
                <NavLink to="/" onClick={() => setMobileMenuOpen(false)} className={({isActive}) => `p-3 rounded-md ${isActive ? 'bg-slate-800 text-primary' : 'text-slate-300'}`}>Home</NavLink>
                <Accordion type="single" collapsible>
                    <AccordionItem value="calculators" className="border-b-0">
                        <AccordionTrigger className="p-3 hover:no-underline rounded-md text-slate-300 hover:text-primary">Calculators</AccordionTrigger>
                        <AccordionContent className="pl-4">
                            <NavLink to="/health-fitness-calculators" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-300 hover:text-primary">Health & Fitness</NavLink>
                            <NavLink to="/financial-calculators" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-300 hover:text-primary">Financial</NavLink>
                            <NavLink to="/math-science-calculators" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-300 hover:text-primary">Math & Science</NavLink>
                            <NavLink to="/lifestyle-everyday-calculators" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-300 hover:text-primary">Lifestyle</NavLink>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                <NavLink to="/blog" onClick={() => setMobileMenuOpen(false)} className={({isActive}) => `p-3 rounded-md ${isActive ? 'bg-slate-800 text-primary' : 'text-slate-300'}`}>Blog</NavLink>
                <NavLink to="/about" onClick={() => setMobileMenuOpen(false)} className={({isActive}) => `p-3 rounded-md ${isActive ? 'bg-slate-800 text-primary' : 'text-slate-300'}`}>About</NavLink>
                <NavLink to="/contact" onClick={() => setMobileMenuOpen(false)} className={({isActive}) => `p-3 rounded-md ${isActive ? 'bg-slate-800 text-primary' : 'text-slate-300'}`}>Contact</NavLink>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default Header;