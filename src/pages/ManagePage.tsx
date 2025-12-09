import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatedTransition } from '@/components/AnimatedTransition';
import { useAnimateIn } from '@/lib/animations';
import { SEOHead } from '@/components/SEOHead';
import VortexTable from '@/components/manage/VortexTable';
import VortexSidebar from '@/components/manage/VortexSidebar';
import ViewSwitcher from '@/components/manage/ViewSwitcher';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Check, Edit2, X, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Toaster } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

const ManagePage = () => {
  const showContent = useAnimateIn(false, 300);
  const [viewType, setViewType] = useState<'table' | 'grid' | 'list' | 'kanban'>('table');
  const [libraryTitle, setLibraryTitle] = useState('Vortex Library');
  const [isEditing, setIsEditing] = useState(false);
  const [tempTitle, setTempTitle] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('private');
  const [selectedItem, setSelectedItem] = useState<string | null>('overview');
  
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, isLoading, navigate]);

  const handleEditClick = () => {
    setTempTitle(libraryTitle);
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    if (tempTitle.trim()) {
      setLibraryTitle(tempTitle);
      setIsEditing(false);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleDialogSave = () => {
    if (tempTitle.trim()) {
      setLibraryTitle(tempTitle);
      setDialogOpen(false);
    }
  };

  const handleVortexSelect = (categoryId: string, itemId: string | null) => {
    setSelectedCategory(categoryId);
    setSelectedItem(itemId);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSaveClick();
    } else if (e.key === 'Escape') {
      handleCancelClick();
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-full mx-auto h-screen pt-24 pb-6">
      <SEOHead 
        title="Manage Your Knowledge"
        description="Organize your knowledge with Vortex's powerful management dashboard. Use Kanban boards, tables, grids, and lists to structure your second brain."
        keywords="knowledge management, organize notes, kanban board, personal dashboard"
        ogImage="/og-manage.png"
        ogImageAlt="Vortex - Organize Your Knowledge"
        noIndex={true}
      />
      <Toaster position="top-right" />
      <AnimatedTransition show={showContent} animation="slide-up">
        <div className="flex h-[calc(100vh-130px)]">
          <VortexSidebar 
            onVortexSelect={handleVortexSelect}
            selectedCategoryId={selectedCategory}
            selectedItemId={selectedItem}
          />
          <div className="flex-1 overflow-x-auto">
            <div className="flex items-center justify-between px-4 py-2 border-b border-border/50">
              {isEditing ? (
                <div className="flex items-center gap-2">
                  <Input
                    value={tempTitle}
                    onChange={(e) => setTempTitle(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="h-8 text-xl font-semibold w-64"
                    autoFocus
                  />
                  <Button size="icon" variant="ghost" onClick={handleSaveClick}>
                    <Check size={18} className="text-green-500" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={handleCancelClick}>
                    <X size={18} className="text-red-500" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-semibold">{libraryTitle}</h2>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={handleEditClick}
                    className="h-8 w-8"
                  >
                    <Edit2 size={14} />
                  </Button>
                </div>
              )}
              <TooltipProvider>
                <ViewSwitcher activeView={viewType} onViewChange={setViewType} />
              </TooltipProvider>
            </div>
            <VortexTable 
              viewType={viewType} 
              categoryId={selectedCategory}
              vortexId={selectedItem}
            />
          </div>
        </div>
      </AnimatedTransition>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Library Title</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              value={tempTitle}
              onChange={(e) => setTempTitle(e.target.value)}
              className="w-full"
              placeholder="Enter a title for your library"
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleDialogSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManagePage;
