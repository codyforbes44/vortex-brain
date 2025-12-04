import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export type CortexItem = {
  id: string;
  title: string;
  url: string;
  type: string;
  created_date: string;
  source: string;
  keywords: string[];
  pitch: string | null;
  writer: string | null;
  created_at: string;
  updated_at: string;
};

export type CortexItemInsert = Omit<CortexItem, 'id' | 'created_at' | 'updated_at'>;
export type CortexItemUpdate = Partial<CortexItemInsert>;

export const useCortexItems = () => {
  return useQuery({
    queryKey: ['cortex-items'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('cortex_items')
        .select('*')
        .order('created_date', { ascending: false });

      if (error) {
        console.error('Error fetching cortex items:', error);
        throw error;
      }

      return data as CortexItem[];
    },
  });
};

export const useCreateCortexItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (item: CortexItemInsert) => {
      const { data, error } = await supabase
        .from('cortex_items')
        .insert(item)
        .select()
        .single();

      if (error) {
        console.error('Error creating cortex item:', error);
        throw error;
      }

      return data as CortexItem;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cortex-items'] });
      toast.success('Item created successfully');
    },
    onError: (error) => {
      toast.error('Failed to create item: ' + error.message);
    },
  });
};

export const useUpdateCortexItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: CortexItemUpdate }) => {
      const { data, error } = await supabase
        .from('cortex_items')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating cortex item:', error);
        throw error;
      }

      return data as CortexItem;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cortex-items'] });
      toast.success('Item updated successfully');
    },
    onError: (error) => {
      toast.error('Failed to update item: ' + error.message);
    },
  });
};

export const useDeleteCortexItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('cortex_items')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting cortex item:', error);
        throw error;
      }

      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cortex-items'] });
      toast.success('Item deleted successfully');
    },
    onError: (error) => {
      toast.error('Failed to delete item: ' + error.message);
    },
  });
};
