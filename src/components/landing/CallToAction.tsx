import { Button } from '@/components/ui/button';
import { AnimatedTransition } from '@/components/AnimatedTransition';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CallToActionProps {
  show: boolean;
}

export const CallToAction = ({ show }: CallToActionProps) => {
  const navigate = useNavigate();

  return (
    <AnimatedTransition show={show} animation="slide-up" duration={600}>
      <div className="py-16 md:py-24 text-primary-foreground rounded-2xl text-center bg-gradient-to-r from-primary to-primary/80 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 bg-grid-white/10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6" />
            <span className="text-sm font-medium uppercase tracking-wider opacity-90">Start for free</span>
          </div>
          
          <h2 className="text-4xl font-bold mb-4 md:text-7xl">Get Started Today</h2>
          <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto px-4">
            Transform how you capture, organize, and retrieve knowledge with AI-powered intelligence.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              variant="secondary"
              className="rounded-full px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
              onClick={() => navigate('/auth')}
            >
              Get Started Free
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="rounded-full px-8 py-6 text-base font-medium bg-transparent text-primary-foreground border-primary-foreground/50 hover:bg-primary-foreground/10 transition-all duration-300"
              onClick={() => navigate('/how')}
            >
              See How it Works
            </Button>
          </div>
        </div>
      </div>
    </AnimatedTransition>
  );
};
