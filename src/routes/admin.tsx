import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pencil, Trash2, LogOut } from "lucide-react";

type Contacto = {
  id: string;
  nombre: string;
  negocio: string;
  email: string;
  tamano_equipo: string | null;
  servicios: string[];
  mensaje: string | null;
  created_at: string;
  estado: "nuevo" | "en_espera" | "cerrado";
};

type Servicio = { id: string; nombre: string };

const ESTADO_LABELS: Record<Contacto["estado"], string> = {
  nuevo: "Nuevo",
  en_espera: "En espera",
  cerrado: "Cerrado",
};

const ESTADO_STYLES: Record<Contacto["estado"], string> = {
  nuevo: "bg-[#C75D2C]/10 text-[#C75D2C] border-[#C75D2C]/30",
  en_espera: "bg-amber-500/10 text-amber-700 border-amber-500/30",
  cerrado: "bg-muted text-muted-foreground border-border",
};

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

function AdminPage() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [contactos, setContactos] = useState<Contacto[]>([]);
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [nuevo, setNuevo] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const loadContactos = async () => {
    const { data, error } = await supabase
      .from("contactos")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    else setContactos((data as Contacto[]) || []);
  };

  const loadServicios = async () => {
    const { data, error } = await supabase.from("servicios").select("*").order("nombre");
    if (error) toast.error(error.message);
    else setServicios((data as Servicio[]) || []);
  };

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      if (!data.session) {
        navigate({ to: "/login" });
        return;
      }
      setReady(true);
      loadContactos();
      loadServicios();
    });
    return () => {
      mounted = false;
    };
  }, [navigate]);

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Cargando...
      </div>
    );
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/login" });
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevo.trim()) return;
    const { error } = await supabase.from("servicios").insert({ nombre: nuevo.trim() });
    if (error) return toast.error(error.message);
    setNuevo("");
    toast.success("Servicio creado");
    loadServicios();
  };

  const handleUpdate = async (id: string) => {
    if (!editValue.trim()) return;
    const { error } = await supabase.from("servicios").update({ nombre: editValue.trim() }).eq("id", id);
    if (error) return toast.error(error.message);
    setEditId(null);
    toast.success("Servicio actualizado");
    loadServicios();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar este servicio?")) return;
    const { error } = await supabase.from("servicios").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Servicio eliminado");
    loadServicios();
  };

  const handleEstadoChange = async (id: string, estado: Contacto["estado"]) => {
    const prev = contactos;
    setContactos((cs) => cs.map((c) => (c.id === id ? { ...c, estado } : c)));
    const { error } = await supabase.from("contactos").update({ estado }).eq("id", id);
    if (error) {
      setContactos(prev);
      toast.error(error.message);
    } else {
      toast.success("Estado actualizado");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-foreground">Flowm8 · Admin</Link>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4" /> Salir
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <Tabs defaultValue="contactos">
          <TabsList>
            <TabsTrigger value="contactos">Contactos</TabsTrigger>
            <TabsTrigger value="servicios">Servicios</TabsTrigger>
          </TabsList>

          <TabsContent value="contactos" className="mt-6">
            <div className="border border-border rounded-xl overflow-hidden bg-card">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Negocio</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Equipo</TableHead>
                    <TableHead>Servicios</TableHead>
                    <TableHead>Mensaje</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contactos.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                        Aún no hay contactos.
                      </TableCell>
                    </TableRow>
                  ) : (
                    contactos.map((c) => (
                      <TableRow key={c.id}>
                        <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                          {new Date(c.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{c.nombre}</TableCell>
                        <TableCell>{c.negocio}</TableCell>
                        <TableCell>{c.email}</TableCell>
                        <TableCell>{c.tamano_equipo || "—"}</TableCell>
                        <TableCell className="max-w-xs">{c.servicios?.join(", ") || "—"}</TableCell>
                        <TableCell className="max-w-md text-sm">{c.mensaje || "—"}</TableCell>
                        <TableCell>
                          <Select
                            value={c.estado}
                            onValueChange={(v) => handleEstadoChange(c.id, v as Contacto["estado"])}
                          >
                            <SelectTrigger className={`h-8 w-[130px] border ${ESTADO_STYLES[c.estado]}`}>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="nuevo">Nuevo</SelectItem>
                              <SelectItem value="en_espera">En espera</SelectItem>
                              <SelectItem value="cerrado">Cerrado</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="servicios" className="mt-6 space-y-6">
            <form onSubmit={handleCreate} className="flex gap-2 max-w-md">
              <Input
                placeholder="Nuevo servicio"
                value={nuevo}
                onChange={(e) => setNuevo(e.target.value)}
              />
              <Button type="submit">Agregar</Button>
            </form>

            <div className="border border-border rounded-xl overflow-hidden bg-card">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead className="w-32 text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {servicios.map((s) => (
                    <TableRow key={s.id}>
                      <TableCell>
                        {editId === s.id ? (
                          <Input
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleUpdate(s.id)}
                            autoFocus
                          />
                        ) : (
                          s.nombre
                        )}
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        {editId === s.id ? (
                          <>
                            <Button size="sm" onClick={() => handleUpdate(s.id)}>Guardar</Button>
                            <Button size="sm" variant="ghost" onClick={() => setEditId(null)}>Cancelar</Button>
                          </>
                        ) : (
                          <>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => {
                                setEditId(s.id);
                                setEditValue(s.nombre);
                              }}
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button size="icon" variant="ghost" onClick={() => handleDelete(s.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}