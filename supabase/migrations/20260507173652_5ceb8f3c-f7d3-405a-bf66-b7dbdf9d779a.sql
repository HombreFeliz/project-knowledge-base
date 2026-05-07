CREATE POLICY "Autenticados pueden crear servicios" ON public.servicios FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Autenticados pueden actualizar servicios" ON public.servicios FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Autenticados pueden eliminar servicios" ON public.servicios FOR DELETE TO authenticated USING (true);