
CREATE TABLE public.servicios (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.servicios ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Servicios visibles para todos"
ON public.servicios FOR SELECT
USING (true);

CREATE TABLE public.contactos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  negocio TEXT NOT NULL,
  email TEXT NOT NULL,
  tamano_equipo TEXT,
  servicios TEXT[] NOT NULL DEFAULT '{}',
  mensaje TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.contactos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Cualquiera puede enviar el formulario"
ON public.contactos FOR INSERT
WITH CHECK (true);

CREATE POLICY "Solo autenticados pueden ver contactos"
ON public.contactos FOR SELECT
TO authenticated
USING (true);

INSERT INTO public.servicios (nombre) VALUES
  ('Atención al cliente'),
  ('Pedidos / órdenes'),
  ('Inventario'),
  ('Reservas'),
  ('Reportes y dashboards'),
  ('Marketing y leads'),
  ('Facturación'),
  ('Otra cosa');
