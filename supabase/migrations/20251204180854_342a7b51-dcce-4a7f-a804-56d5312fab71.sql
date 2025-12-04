-- Add status column to cortex_items for Kanban tracking
ALTER TABLE public.cortex_items 
ADD COLUMN status text NOT NULL DEFAULT 'to_read';

-- Add check constraint for valid status values
ALTER TABLE public.cortex_items 
ADD CONSTRAINT valid_status CHECK (status IN ('to_read', 'in_progress', 'completed'));