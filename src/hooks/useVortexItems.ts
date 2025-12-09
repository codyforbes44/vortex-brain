import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

export type VortexItemStatus = 'to_read' | 'in_progress' | 'completed';

export type VortexItem = {
  id: string;
  title: string;
  url: string;
  type: string;
  created_date: string;
  source: string;
  keywords: string[];
  pitch: string | null;
  writer: string | null;
  user_id: string | null;
  created_at: string;
  updated_at: string;
  status: VortexItemStatus;
};

export type VortexItemInsert = Omit<VortexItem, 'id' | 'created_at' | 'updated_at' | 'user_id' | 'status'> & { status?: VortexItemStatus };
export type VortexItemUpdate = Partial<VortexItemInsert & { status: VortexItemStatus }>;

export const useVortexItems = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['vortex-items', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('vortex_items')
        .select('*')
        .order('created_date', { ascending: false });

      if (error) {
        console.error('Error fetching vortex items:', error);
        throw error;
      }

      return data as VortexItem[];
    },
    enabled: !!user,
  });
};

export const useCreateVortexItem = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (item: VortexItemInsert) => {
      if (!user?.id) throw new Error('Not authenticated');
      
      const { data, error } = await supabase
        .from('vortex_items')
        .insert({ ...item, user_id: user.id })
        .select()
        .single();

      if (error) {
        console.error('Error creating vortex item:', error);
        throw error;
      }

      return data as VortexItem;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vortex-items'] });
      toast.success('Item created successfully');
    },
    onError: (error) => {
      toast.error('Failed to create item: ' + error.message);
    },
  });
};

export const useUpdateVortexItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: VortexItemUpdate }) => {
      const { data, error } = await supabase
        .from('vortex_items')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating vortex item:', error);
        throw error;
      }

      return data as VortexItem;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vortex-items'] });
      toast.success('Item updated successfully');
    },
    onError: (error) => {
      toast.error('Failed to update item: ' + error.message);
    },
  });
};

export const useDeleteVortexItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('vortex_items')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting vortex item:', error);
        throw error;
      }

      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vortex-items'] });
      toast.success('Item deleted successfully');
    },
    onError: (error) => {
      toast.error('Failed to delete item: ' + error.message);
    },
  });
};
