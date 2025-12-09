-- Rename cortex_items table to vortex_items
ALTER TABLE public.cortex_items RENAME TO vortex_items;

-- Update RLS policies with new table name
ALTER POLICY "Users can create their own cortex items" ON public.vortex_items RENAME TO "Users can create their own vortex items";
ALTER POLICY "Users can delete their own cortex items" ON public.vortex_items RENAME TO "Users can delete their own vortex items";
ALTER POLICY "Users can update their own cortex items" ON public.vortex_items RENAME TO "Users can update their own vortex items";
ALTER POLICY "Users can view their own cortex items" ON public.vortex_items RENAME TO "Users can view their own vortex items";