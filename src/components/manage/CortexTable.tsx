import React, { useState } from 'react';
import { Search, Filter, Plus, Move, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import TableView from './views/TableView';
import GridView from './views/GridView';
import ListView from './views/ListView';
import KanbanView from './views/KanbanView';
import { useCortexItems, useCreateCortexItem, useDeleteCortexItem, CortexItem } from '@/hooks/useCortexItems';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';

interface CortexTableProps {
  viewType?: 'table' | 'grid' | 'list' | 'kanban';
  categoryId?: string;
  cortexId?: string | null;
}

const CortexTable = ({ viewType = 'table', categoryId = 'private', cortexId = 'overview' }: CortexTableProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [moveDialogOpen, setMoveDialogOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [targetCortex, setTargetCortex] = useState<string>('');
  const [newItem, setNewItem] = useState({
    title: '',
    url: '',
    type: 'Article',
    source: '',
    keywords: '',
    pitch: '',
    writer: ''
  });

  const { data: cortexItems = [], isLoading, error } = useCortexItems();
  const createMutation = useCreateCortexItem();
  const deleteMutation = useDeleteCortexItem();
  
  const getActiveCortexName = () => {
    const categories = [
      {
        id: 'shared',
        items: [
          { id: 'shared-1', name: 'Second Brain' },
          { id: 'shared-2', name: 'OSS' },
          { id: 'shared-3', name: 'Artificial Intelligence' },
        ]
      },
      {
        id: 'team',
        items: [
          { id: 'team-1', name: 'Brainboard Competitors' },
          { id: 'team-2', name: 'Visualize Terraform' },
          { id: 'team-3', name: 'CI/CD Engine' },
        ]
      },
      {
        id: 'private',
        items: [
          { id: 'overview', name: 'Overview' },
          { id: 'private-1', name: 'UXUI' },
          { id: 'private-2', name: 'Space' },
          { id: 'private-3', name: 'Cloud Computing' },
        ]
      }
    ];
    
    if (cortexId === null) {
      return "All";
    }
    
    const category = categories.find(c => c.id === categoryId);
    if (!category) return "Unknown";
    
    const item = category.items.find(i => i.id === cortexId);
    return item ? item.name : "Unknown";
  };
  
  const getFilteredItems = () => {
    const activeCortexName = getActiveCortexName().toLowerCase();
    
    if (cortexId === 'overview') {
      return searchQuery 
        ? cortexItems.filter(item => 
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (item.writer?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
          )
        : cortexItems;
    }
    
    let cortexFiltered = cortexItems.filter(item => 
      item.keywords.some(keyword => keyword.toLowerCase() === activeCortexName.toLowerCase())
    );
    
    if (cortexFiltered.length === 0) {
      cortexFiltered = cortexItems.filter(item => 
        item.keywords.some(keyword => keyword.toLowerCase().includes(activeCortexName.toLowerCase())) ||
        item.title.toLowerCase().includes(activeCortexName.toLowerCase())
      );
    }
    
    return searchQuery 
      ? cortexFiltered.filter(item => 
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (item.writer?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
        )
      : cortexFiltered;
  };
  
  const filteredItems = getFilteredItems();

  const handleSelectItem = (id: string) => {
    setSelectedItems(prev => {
      if (prev.includes(id)) {
        return prev.filter(itemId => itemId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleMoveItems = () => {
    if (!targetCortex) return;
    
    toast.success(`Moved ${selectedItems.length} items to ${targetCortex}`);
    setSelectedItems([]);
    setMoveDialogOpen(false);
    setTargetCortex('');
  };

  const handleDeleteSelected = async () => {
    for (const id of selectedItems) {
      await deleteMutation.mutateAsync(id);
    }
    setSelectedItems([]);
  };

  const handleCreateItem = async () => {
    if (!newItem.title || !newItem.url) {
      toast.error('Title and URL are required');
      return;
    }

    await createMutation.mutateAsync({
      title: newItem.title,
      url: newItem.url,
      type: newItem.type,
      source: newItem.source,
      keywords: newItem.keywords.split(',').map(k => k.trim()).filter(Boolean),
      pitch: newItem.pitch || null,
      writer: newItem.writer || null,
      created_date: new Date().toISOString(),
    });

    setNewItem({ title: '', url: '', type: 'Article', source: '', keywords: '', pitch: '', writer: '' });
    setCreateDialogOpen(false);
  };

  const cortexOptions = [
    { id: 'shared-1', name: 'Second Brain' },
    { id: 'shared-2', name: 'OSS' },
    { id: 'shared-3', name: 'Artificial Intelligence' },
    { id: 'team-1', name: 'Brainboard Competitors' },
    { id: 'team-2', name: 'Visualize Terraform' },
    { id: 'team-3', name: 'CI/CD Engine' },
    { id: 'private-1', name: 'UXUI' },
    { id: 'private-2', name: 'Space' },
    { id: 'private-3', name: 'Cloud Computing' },
  ];

  if (error) {
    return (
      <div className="flex items-center justify-center h-full text-destructive">
        <p>Error loading items: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-border/50">
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <Input 
            placeholder="Search cortexes..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {selectedItems.length > 0 && (
            <>
              <Button variant="outline" size="sm" onClick={() => setMoveDialogOpen(true)}>
                <Move size={16} className="mr-2" />
                Move ({selectedItems.length})
              </Button>
              <Button variant="destructive" size="sm" onClick={handleDeleteSelected}>
                <Trash2 size={16} className="mr-2" />
                Delete ({selectedItems.length})
              </Button>
            </>
          )}
          <Button variant="outline" size="sm">
            <Filter size={16} className="mr-2" />
            Filter
          </Button>
          <Button size="sm" onClick={() => setCreateDialogOpen(true)}>
            <Plus size={16} className="mr-2" />
            New Cortex
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto">
        {isLoading ? (
          <div className="p-4 space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <p>No cortex items found for this section.</p>
          </div>
        ) : (
          <>
            {viewType === 'table' && (
              <TableView 
                items={filteredItems} 
                selectedItems={selectedItems}
                onSelectItem={handleSelectItem}
              />
            )}
            {viewType === 'grid' && (
              <GridView 
                items={filteredItems}
                selectedItems={selectedItems}
                onSelectItem={handleSelectItem}
              />
            )}
            {viewType === 'list' && (
              <ListView 
                items={filteredItems}
                selectedItems={selectedItems}
                onSelectItem={handleSelectItem}
              />
            )}
            {viewType === 'kanban' && <KanbanView items={filteredItems} />}
          </>
        )}
      </div>

      {/* Move Dialog */}
      <Dialog open={moveDialogOpen} onOpenChange={setMoveDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Move to Cortex</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Select onValueChange={setTargetCortex} value={targetCortex}>
              <SelectTrigger>
                <SelectValue placeholder="Select target cortex" />
              </SelectTrigger>
              <SelectContent>
                {cortexOptions.map(option => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setMoveDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleMoveItems} disabled={!targetCortex}>
              Move Items
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Create New Cortex Item</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={newItem.title}
                onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                placeholder="Enter title..."
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="url">URL *</Label>
              <Input
                id="url"
                value={newItem.url}
                onChange={(e) => setNewItem({ ...newItem, url: e.target.value })}
                placeholder="/cortex/..."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="type">Type</Label>
                <Select value={newItem.type} onValueChange={(v) => setNewItem({ ...newItem, type: v })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Article">Article</SelectItem>
                    <SelectItem value="Guide">Guide</SelectItem>
                    <SelectItem value="Collection">Collection</SelectItem>
                    <SelectItem value="Template">Template</SelectItem>
                    <SelectItem value="Code">Code</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="source">Source</Label>
                <Input
                  id="source"
                  value={newItem.source}
                  onChange={(e) => setNewItem({ ...newItem, source: e.target.value })}
                  placeholder="Source..."
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="keywords">Keywords (comma-separated)</Label>
              <Input
                id="keywords"
                value={newItem.keywords}
                onChange={(e) => setNewItem({ ...newItem, keywords: e.target.value })}
                placeholder="AI, Machine Learning, ..."
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="pitch">Pitch</Label>
              <Textarea
                id="pitch"
                value={newItem.pitch}
                onChange={(e) => setNewItem({ ...newItem, pitch: e.target.value })}
                placeholder="Brief description..."
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="writer">Writer</Label>
              <Input
                id="writer"
                value={newItem.writer}
                onChange={(e) => setNewItem({ ...newItem, writer: e.target.value })}
                placeholder="Author name..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateItem} disabled={createMutation.isPending}>
              {createMutation.isPending ? 'Creating...' : 'Create Item'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CortexTable;
