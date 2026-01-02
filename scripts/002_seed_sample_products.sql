-- Seed sample products for displays
INSERT INTO products (name, description, price, category, subcategory, image_url, stock, specs) VALUES
  ('ASUS ROG Swift 27"', 'Premium gaming monitor with 240Hz refresh rate', 599.99, 'displays', 'Gaming Monitors', '/placeholder.svg?height=200&width=200', 15, '{"resolution": "2560x1440", "refresh_rate": "240Hz", "panel": "IPS", "response_time": "1ms"}'),
  ('LG UltraWide 34"', 'Curved ultrawide monitor for productivity', 449.99, 'displays', 'Ultrawide', '/placeholder.svg?height=200&width=200', 8, '{"resolution": "3440x1440", "refresh_rate": "144Hz", "panel": "IPS", "curve": "1800R"}'),
  ('Dell 24" Professional', 'Affordable professional display', 199.99, 'displays', 'Office', '/placeholder.svg?height=200&width=200', 25, '{"resolution": "1920x1080", "refresh_rate": "60Hz", "panel": "IPS", "adjustable": true}');

-- Seed sample products for peripherals
INSERT INTO products (name, description, price, category, subcategory, image_url, stock, specs) VALUES
  ('Logitech MX Master 3S', 'Premium wireless mouse for productivity', 99.99, 'peripherals', 'Mice', '/placeholder.svg?height=200&width=200', 30, '{"type": "wireless", "dpi": "8000", "buttons": 7, "battery": "70 days"}'),
  ('Keychron K8 Pro', 'Wireless mechanical keyboard', 109.99, 'peripherals', 'Keyboards', '/placeholder.svg?height=200&width=200', 20, '{"type": "mechanical", "switches": "hot-swappable", "layout": "TKL", "wireless": true}'),
  ('HyperX Cloud II', 'Gaming headset with 7.1 surround sound', 79.99, 'peripherals', 'Headsets', '/placeholder.svg?height=200&width=200', 40, '{"type": "wired", "drivers": "53mm", "surround": "7.1", "mic": "detachable"}');

-- Seed sample products for PC parts
INSERT INTO products (name, description, price, category, subcategory, image_url, stock, specs) VALUES
  ('AMD Ryzen 9 7950X', 'High-performance desktop processor', 549.99, 'parts', 'CPUs', '/placeholder.svg?height=200&width=200', 12, '{"cores": 16, "threads": 32, "base_clock": "4.5GHz", "boost_clock": "5.7GHz", "socket": "AM5"}'),
  ('NVIDIA RTX 4080', 'Premium graphics card for gaming and creation', 1199.99, 'parts', 'GPUs', '/placeholder.svg?height=200&width=200', 5, '{"memory": "16GB GDDR6X", "boost_clock": "2.51GHz", "tdp": "320W", "ports": "3xDP 1xHDMI"}'),
  ('Corsair Vengeance DDR5 32GB', 'High-speed memory kit', 159.99, 'parts', 'RAM', '/placeholder.svg?height=200&width=200', 50, '{"capacity": "32GB", "speed": "6000MHz", "type": "DDR5", "kit": "2x16GB"}'),
  ('Samsung 990 PRO 2TB', 'PCIe 4.0 NVMe SSD', 179.99, 'parts', 'Storage', '/placeholder.svg?height=200&width=200', 35, '{"capacity": "2TB", "interface": "PCIe 4.0", "read": "7450MB/s", "write": "6900MB/s"}');
