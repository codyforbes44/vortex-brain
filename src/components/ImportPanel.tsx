import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, Globe, Database, Type, Loader2 } from 'lucide-react';
import { ImportSource } from '@/lib/types';
import AnimatedTransition from './AnimatedTransition';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { useCreateCortexItem } from '@/hooks/useCortexItems';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const importSources: ImportSource[] = [
  {
    id: 'text',
    name: 'Text Input',
    type: 'text',
    icon: 'Type',
    description: 'Directly input or paste text content'
  },
  {
    id: 'url',
    name: 'Web URL',
    type: 'url',
    icon: 'Globe',
    description: 'Import content from websites and articles'
  },
  {
    id: 'csv',
    name: 'CSV File',
    type: 'csv',
    icon: 'FileText',
    description: 'Import structured data from CSV files'
  },
  {
    id: 'file',
    name: 'Document Upload',
    type: 'file',
    icon: 'Upload',
    description: 'Upload documents, PDFs, and other files'
  },
];

interface ImportSourceCardProps {
  source: ImportSource;
  onClick: () => void;
  isActive: boolean;
}

const ImportSourceCard: React.FC<ImportSourceCardProps> = ({ source, onClick, isActive }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const getIcon = () => {
    switch (source.icon) {
      case 'FileText': return <FileText size={24} />;
      case 'Database': return <Database size={24} />;
      case 'Globe': return <Globe size={24} />;
      case 'Upload': return <Upload size={24} />;
      case 'Type': return <Type size={24} />;
      default: return <FileText size={24} />;
    }
  };
  
  return (
    <div 
      className={cn(
        "glass-panel p-4 rounded-xl cursor-pointer transition-all duration-300",
        isActive ? "ring-2 ring-primary" : "",
        isHovered ? "translate-y-[-4px] shadow-md" : ""
      )}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
          {getIcon()}
        </div>
        <div>
          <h3 className="font-medium">{source.name}</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {source.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export const ImportPanel: React.FC = () => {
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const createItem = useCreateCortexItem();
  
  // Text input form state
  const [textForm, setTextForm] = useState({
    title: '',
    content: '',
    type: 'Note',
    source: 'Manual Input',
    keywords: '',
  });

  // URL input form state
  const [urlForm, setUrlForm] = useState({
    url: '',
    title: '',
    type: 'Article',
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, authLoading, navigate]);

  const handleTextSubmit = async () => {
    if (!textForm.title.trim()) {
      toast.error('Please enter a title');
      return;
    }

    try {
      await createItem.mutateAsync({
        title: textForm.title,
        pitch: textForm.content,
        type: textForm.type,
        source: textForm.source,
        url: '#',
        keywords: textForm.keywords.split(',').map(k => k.trim()).filter(Boolean),
        created_date: new Date().toISOString(),
        writer: null,
      });
      
      setTextForm({ title: '', content: '', type: 'Note', source: 'Manual Input', keywords: '' });
      toast.success('Item added to your Cortex!');
    } catch (error) {
      // Error handled by hook
    }
  };

  const handleUrlSubmit = async () => {
    if (!urlForm.url.trim()) {
      toast.error('Please enter a URL');
      return;
    }

    try {
      await createItem.mutateAsync({
        title: urlForm.title || urlForm.url,
        url: urlForm.url,
        type: urlForm.type,
        source: new URL(urlForm.url).hostname,
        pitch: null,
        keywords: [],
        created_date: new Date().toISOString(),
        writer: null,
      });
      
      setUrlForm({ url: '', title: '', type: 'Article' });
      toast.success('URL added to your Cortex!');
    } catch (error) {
      // Error handled by hook
    }
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {importSources.map(source => (
          <ImportSourceCard
            key={source.id}
            source={source}
            onClick={() => setSelectedSource(source.id)}
            isActive={selectedSource === source.id}
          />
        ))}
      </div>
      
      <AnimatedTransition
        show={!!selectedSource}
        animation="slide-up"
        className="mt-8 glass-panel p-6 rounded-xl"
      >
        {selectedSource === 'text' && (
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Add New Item</h3>
            <p className="text-muted-foreground">
              Directly input content to save to your Cortex.
            </p>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input 
                  id="title"
                  value={textForm.title}
                  onChange={(e) => setTextForm({ ...textForm, title: e.target.value })}
                  placeholder="Enter a title for this content"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select value={textForm.type} onValueChange={(v) => setTextForm({ ...textForm, type: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Note">Note</SelectItem>
                      <SelectItem value="Article">Article</SelectItem>
                      <SelectItem value="Video">Video</SelectItem>
                      <SelectItem value="Podcast">Podcast</SelectItem>
                      <SelectItem value="Book">Book</SelectItem>
                      <SelectItem value="Research">Research</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="source">Source</Label>
                  <Input 
                    id="source"
                    value={textForm.source}
                    onChange={(e) => setTextForm({ ...textForm, source: e.target.value })}
                    placeholder="e.g., Personal, Work"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="content">Content / Summary</Label>
                <Textarea 
                  id="content"
                  value={textForm.content}
                  onChange={(e) => setTextForm({ ...textForm, content: e.target.value })}
                  placeholder="Enter or paste your content here..."
                  className="min-h-32"
                />
              </div>
              <div>
                <Label htmlFor="keywords">Keywords (comma-separated)</Label>
                <Input 
                  id="keywords"
                  value={textForm.keywords}
                  onChange={(e) => setTextForm({ ...textForm, keywords: e.target.value })}
                  placeholder="e.g., AI, productivity, notes"
                />
              </div>
              <Button 
                onClick={handleTextSubmit} 
                disabled={createItem.isPending}
                className="w-full"
              >
                {createItem.isPending ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : null}
                Save to Cortex
              </Button>
            </div>
          </div>
        )}
        
        {selectedSource === 'url' && (
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Import from URL</h3>
            <p className="text-muted-foreground">
              Save a website or article URL to your Cortex.
            </p>
            <div className="space-y-4">
              <div>
                <Label htmlFor="url">Website URL *</Label>
                <Input 
                  id="url"
                  type="url"
                  value={urlForm.url}
                  onChange={(e) => setUrlForm({ ...urlForm, url: e.target.value })}
                  placeholder="https://example.com/article"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="urlTitle">Title (optional)</Label>
                  <Input 
                    id="urlTitle"
                    value={urlForm.title}
                    onChange={(e) => setUrlForm({ ...urlForm, title: e.target.value })}
                    placeholder="Custom title"
                  />
                </div>
                <div>
                  <Label htmlFor="urlType">Type</Label>
                  <Select value={urlForm.type} onValueChange={(v) => setUrlForm({ ...urlForm, type: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Article">Article</SelectItem>
                      <SelectItem value="Video">Video</SelectItem>
                      <SelectItem value="Podcast">Podcast</SelectItem>
                      <SelectItem value="Tool">Tool</SelectItem>
                      <SelectItem value="Reference">Reference</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button 
                onClick={handleUrlSubmit} 
                disabled={createItem.isPending}
                className="w-full"
              >
                {createItem.isPending ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : null}
                Import URL
              </Button>
            </div>
          </div>
        )}
        
        {selectedSource === 'csv' && (
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Import CSV File</h3>
            <p className="text-muted-foreground">
              CSV import coming soon. For now, use Text Input to add items manually.
            </p>
            <div className="border-2 border-dashed border-border rounded-xl p-10 text-center opacity-50">
              <Upload size={40} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                Coming soon
              </p>
            </div>
          </div>
        )}
        
        {selectedSource === 'file' && (
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Document Upload</h3>
            <p className="text-muted-foreground">
              File upload coming soon. For now, use Text Input to add items manually.
            </p>
            <div className="border-2 border-dashed border-border rounded-xl p-10 text-center opacity-50">
              <Upload size={40} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                Coming soon
              </p>
            </div>
          </div>
        )}
      </AnimatedTransition>
    </div>
  );
};

export default ImportPanel;
