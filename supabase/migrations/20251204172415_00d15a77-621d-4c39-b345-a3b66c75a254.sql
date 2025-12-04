-- Create cortex_items table
CREATE TABLE public.cortex_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  type TEXT NOT NULL,
  created_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  source TEXT NOT NULL,
  keywords TEXT[] DEFAULT '{}',
  pitch TEXT,
  writer TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.cortex_items ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (anyone can view cortex items)
CREATE POLICY "Anyone can view cortex items"
ON public.cortex_items
FOR SELECT
USING (true);

-- Create policy for authenticated users to insert
CREATE POLICY "Authenticated users can create cortex items"
ON public.cortex_items
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Create policy for authenticated users to update
CREATE POLICY "Authenticated users can update cortex items"
ON public.cortex_items
FOR UPDATE
TO authenticated
USING (true);

-- Create policy for authenticated users to delete
CREATE POLICY "Authenticated users can delete cortex items"
ON public.cortex_items
FOR DELETE
TO authenticated
USING (true);

-- Create updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_cortex_items_updated_at
BEFORE UPDATE ON public.cortex_items
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();