
-- Roles enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- user_roles table
CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function for safe role checks
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage roles"
ON public.user_roles FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Tighten contactos policies
DROP POLICY IF EXISTS "Solo autenticados pueden ver contactos" ON public.contactos;
DROP POLICY IF EXISTS "Autenticados pueden actualizar contactos" ON public.contactos;

CREATE POLICY "Admins can view contactos"
ON public.contactos FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update contactos"
ON public.contactos FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete contactos"
ON public.contactos FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Tighten servicios mutation policies
DROP POLICY IF EXISTS "Autenticados pueden crear servicios" ON public.servicios;
DROP POLICY IF EXISTS "Autenticados pueden actualizar servicios" ON public.servicios;
DROP POLICY IF EXISTS "Autenticados pueden eliminar servicios" ON public.servicios;

CREATE POLICY "Admins can create servicios"
ON public.servicios FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update servicios"
ON public.servicios FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete servicios"
ON public.servicios FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
