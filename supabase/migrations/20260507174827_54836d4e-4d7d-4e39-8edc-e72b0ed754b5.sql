CREATE TYPE public.contacto_estado AS ENUM ('nuevo', 'en_espera', 'cerrado');

ALTER TABLE public.contactos
ADD COLUMN estado public.contacto_estado NOT NULL DEFAULT 'nuevo';

CREATE POLICY "Autenticados pueden actualizar contactos"
ON public.contactos
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);