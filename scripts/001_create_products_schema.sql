-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('displays', 'peripherals', 'parts')),
  subcategory TEXT,
  image_url TEXT,
  stock INTEGER DEFAULT 0,
  specs JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on products
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Allow everyone to view products
CREATE POLICY "products_select_all"
  ON products FOR SELECT
  USING (true);

-- Only admins can insert products (we'll check user_metadata.is_admin)
CREATE POLICY "products_insert_admin"
  ON products FOR INSERT
  WITH CHECK (
    (SELECT raw_user_meta_data->>'is_admin' FROM auth.users WHERE id = auth.uid()) = 'true'
  );

-- Only admins can update products
CREATE POLICY "products_update_admin"
  ON products FOR UPDATE
  USING (
    (SELECT raw_user_meta_data->>'is_admin' FROM auth.users WHERE id = auth.uid()) = 'true'
  );

-- Only admins can delete products
CREATE POLICY "products_delete_admin"
  ON products FOR DELETE
  USING (
    (SELECT raw_user_meta_data->>'is_admin' FROM auth.users WHERE id = auth.uid()) = 'true'
  );

-- Create index for category filtering
CREATE INDEX idx_products_category ON products(category);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-update updated_at
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
