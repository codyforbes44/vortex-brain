import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { VortexItem, VortexItemStatus, useUpdateVortexItem } from '@/hooks/useVortexItems';
import { cn } from '@/lib/utils';

interface KanbanViewProps {
  items: VortexItem[];
}

const COLUMNS: { id: VortexItemStatus; label: string }[] = [
  { id: 'to_read', label: 'To Read' },
  { id: 'in_progress', label: 'In Progress' },
  { id: 'completed', label: 'Completed' },
];

const KanbanView = ({ items }: KanbanViewProps) => {
  const [draggedItem, setDraggedItem] = useState<VortexItem | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<VortexItemStatus | null>(null);
  const updateItem = useUpdateVortexItem();

  const handleDragStart = (e: React.DragEvent, item: VortexItem) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverColumn(null);
  };

  const handleDragOver = (e: React.DragEvent, columnId: VortexItemStatus) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverColumn(columnId);
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  const handleDrop = (e: React.DragEvent, columnId: VortexItemStatus) => {
    e.preventDefault();
    if (draggedItem && draggedItem.status !== columnId) {
      updateItem.mutate({
        id: draggedItem.id,
        updates: { status: columnId },
      });
    }
    setDraggedItem(null);
    setDragOverColumn(null);
  };

  const getColumnItems = (columnId: VortexItemStatus) => {
    return items.filter((item) => item.status === columnId);
  };

  return (
    <div className="flex gap-4 p-4 overflow-x-auto h-full">
      {COLUMNS.map((column) => (
        <div
          key={column.id}
          className={cn(
            'flex-shrink-0 w-72 bg-card rounded-md shadow-sm transition-colors',
            dragOverColumn === column.id && 'ring-2 ring-primary bg-primary/5'
          )}
          onDragOver={(e) => handleDragOver(e, column.id)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, column.id)}
        >
          <div className="p-3 border-b border-border/50">
            <h3 className="font-medium flex items-center gap-2">
              {column.label}
              <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                {getColumnItems(column.id).length}
              </span>
            </h3>
          </div>
          <div className="p-2 flex flex-col gap-2 min-h-[200px]">
            {getColumnItems(column.id).map((item) => (
              <Card
                key={item.id}
                draggable
                onDragStart={(e) => handleDragStart(e, item)}
                onDragEnd={handleDragEnd}
                className={cn(
                  'p-3 bg-background hover:shadow-md transition-all cursor-grab active:cursor-grabbing',
                  draggedItem?.id === item.id && 'opacity-50 ring-2 ring-primary'
                )}
              >
                <h4 className="text-sm font-medium mb-1 line-clamp-2">{item.title}</h4>
                <div className="mb-2">
                  <span className="px-2 py-0.5 rounded-full bg-primary/10 text-xs font-medium">
                    {item.type}
                  </span>
                </div>
                {item.pitch && (
                  <p className="text-xs text-muted-foreground line-clamp-2">{item.pitch}</p>
                )}
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KanbanView;
