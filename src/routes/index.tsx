import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Flowm8 — Que tu negocio fluya solo" },
      { name: "description", content: "Consultoría de automatización con IA para PYMES. Recupera hasta 13 horas a la semana con sistemas claros que se adaptan a cómo ya trabajas." },
      { property: "og:title", content: "Flowm8 — Que tu negocio fluya solo" },
      { property: "og:description", content: "Automatización con calidez humana. Captura, procesa y entrega — sin que tengas que copiar y pegar." },
    ],
  }),
  component: Index,
});

const carouselItems = ["CRM", "Pedidos", "Facturas", "Seguimientos", "Inventario", "Reservas", "Reportes", "Captura", "Procesa", "Entrega", "Email", "WhatsApp"];

function Placeholder({ className = "", label = "" }: { className?: string; label?: string }) {
  return (
    <div className={`flex items-center justify-center rounded-2xl border border-dashed border-foreground/15 bg-foreground/[0.03] text-xs uppercase tracking-widest text-muted-foreground ${className}`}>
      {label || "Imagen"}
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/70 border-b border-foreground/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <span className="inline-block w-7 h-7 rounded-lg bg-primary" />
          Flowm8
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-foreground/70">
          <a href="#problema" className="hover:text-foreground transition">El problema</a>
          <a href="#como" className="hover:text-foreground transition">Cómo funciona</a>
          <a href="#contacto" className="hover:text-foreground transition">Conversemos</a>
        </nav>
        <a href="#contacto" className="inline-flex items-center rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:opacity-90 transition">
          Pide tu propuesta gratis
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="max-w-7xl mx-auto px-6 pt-16 md:pt-24 pb-16">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl md:text-7xl font-semibold leading-[1.05] text-balance">
            Que tu negocio <em className="not-italic text-primary">fluya</em> solo
          </h1>
          <p className="mt-6 text-lg md:text-xl text-foreground/70 max-w-xl text-balance">
            Recupera hasta 13 horas a la semana automatizando lo repetitivo con sistemas claros que se adaptan a cómo ya trabajas.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#contacto" className="inline-flex items-center rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:opacity-90 transition">
              Pide tu propuesta gratis
            </a>
            <a href="#como" className="inline-flex items-center rounded-full border border-foreground/20 px-6 py-3 text-sm font-medium hover:bg-foreground/5 transition">
              Ver cómo funciona
            </a>
          </div>
          <dl className="mt-12 grid grid-cols-3 gap-6 max-w-lg">
            {[
              ["13h", "ahorradas x semana"],
              ["x8", "leads cualificados"],
              ["6 sem", "implementación típica"],
            ].map(([n, l]) => (
              <div key={l}>
                <dt className="text-3xl md:text-4xl font-semibold text-secondary">{n}</dt>
                <dd className="mt-1 text-xs text-muted-foreground leading-snug">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative">
          <div className="aspect-square rounded-3xl overflow-hidden bg-card border border-foreground/10 shadow-[0_30px_60px_-20px_rgba(15,42,63,0.25)]">
            <img src={heroImg} alt="Mascota m8 con tareas automatizadas" className="w-full h-full object-cover" width={1024} height={1024} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = [...carouselItems, ...carouselItems];
  return (
    <section className="border-y border-foreground/10 bg-foreground/[0.02] py-6 overflow-hidden">
      <div className="marquee gap-12 text-2xl md:text-3xl font-medium text-secondary/80">
        {items.map((it, i) => (
          <span key={i} className="flex items-center gap-12 whitespace-nowrap">
            {it}
            <span className="w-2 h-2 rounded-full bg-primary" />
          </span>
        ))}
      </div>
    </section>
  );
}

function Problema() {
  return (
    <section id="problema" className="max-w-7xl mx-auto px-6 py-24">
      <div className="max-w-3xl">
        <h2 className="text-4xl md:text-5xl font-semibold leading-tight text-balance">
          Tu equipo pierde 13 horas a la semana en tareas que ya nadie debería hacer a mano.
        </h2>
        <p className="mt-5 text-lg text-foreground/70 text-balance">
          Responder los mismos emails. Pasar pedidos de un sitio a otro. Recordar seguimientos. Cuadrar inventario. Pequeñas cosas que, juntas, te roban la semana.
        </p>
      </div>

      <div className="mt-12 grid md:grid-cols-2 gap-6">
        <div className="rounded-3xl border border-foreground/10 bg-card p-8">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Antes</span>
          <h3 className="mt-2 text-2xl font-semibold">Caos manual</h3>
          <ul className="mt-5 space-y-3 text-foreground/80">
            <li>• Cada lead se contesta a mano (cuando alguien recuerda)</li>
            <li>• Pedidos copiados entre 4 herramientas distintas</li>
            <li>• Reportes que nadie lee porque tardan media tarde</li>
          </ul>
          <div className="mt-6 grid grid-cols-3 gap-3">
            {[1,2,3].map(i => <Placeholder key={i} className="aspect-square" label={`img ${i}`} />)}
          </div>
        </div>

        <div className="rounded-3xl border border-secondary/20 bg-secondary text-secondary-foreground p-8">
          <span className="text-xs uppercase tracking-widest opacity-60">Después</span>
          <h3 className="mt-2 text-2xl font-semibold">Foco en lo que importa</h3>
          <ul className="mt-5 space-y-3 opacity-90">
            <li>• Cada lead se responde, clasifica y agenda solo</li>
            <li>• Los pedidos llegan donde tienen que llegar</li>
            <li>• Un dashboard semanal con lo que de verdad mueve el negocio</li>
          </ul>
          <div className="mt-6 grid grid-cols-3 gap-3">
            {[1,2,3].map(i => (
              <div key={i} className="aspect-square rounded-2xl border border-dashed border-white/20 bg-white/5 flex items-center justify-center text-xs uppercase tracking-widest opacity-60">
                img {i}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Como() {
  const steps = [
    { n: "01", title: "Recoge todo lo que entra.", text: "Emails, formularios, WhatsApp, pedidos en línea. m8 lo agarra todo y lo entiende —sin que tengas que copiar y pegar—.", label: "Captura" },
    { n: "02", title: "Lo entiende y lo ordena.", text: "Clasifica, prioriza, dispara la respuesta correcta o avisa al humano correcto. Las reglas las pones tú; m8 las ejecuta a las 3am sin quejarse.", label: "Procesa" },
    { n: "03", title: "Lo deja donde tiene que estar", text: "En tu CRM, en una hoja, en un mensaje al cliente, en un reporte el lunes por la mañana. Resultado limpio, listo para usar.", label: "Entrega" },
  ];
  return (
    <section id="como" className="max-w-7xl mx-auto px-6 py-24">
      <div className="max-w-3xl">
        <h2 className="text-4xl md:text-5xl font-semibold leading-tight text-balance">
          Un sistema de tres pasos. <span className="text-primary">Captura. Procesa. Entrega.</span>
        </h2>
        <p className="mt-5 text-lg text-foreground/70 text-balance">
          No vendemos magia ni un software más. Diseñamos un flujo a medida sobre las herramientas que ya usas — y te enseñamos a vivir con él.
        </p>
      </div>

      <div className="mt-12 grid md:grid-cols-3 gap-6">
        {steps.map(s => (
          <article key={s.n} className="rounded-3xl border border-foreground/10 bg-card p-6 flex flex-col">
            <Placeholder className="aspect-[4/3] mb-6" label={s.label} />
            <span className="text-xs font-mono text-primary">{s.n} / {s.label}</span>
            <h3 className="mt-2 text-xl font-semibold">{s.title}</h3>
            <p className="mt-3 text-foreground/70">{s.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Caso() {
  const stats = [
    ["-93%", "tiempo operativo"],
    ["+41%", "tasa de respuesta"],
    ["x8", "leads cualificados"],
    ["12 min", "al día de gestión"],
  ];
  return (
    <section className="bg-secondary text-secondary-foreground">
      <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12">
        <div>
          <span className="text-xs uppercase tracking-widest opacity-60">Caso real · Logística</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-semibold leading-tight text-balance">
            De 3 horas/día en email a <span className="text-primary">12 minutos.</span>
          </h2>
          <p className="mt-5 text-lg opacity-80 text-balance">
            Captación de leads completamente automatizada en 6 semanas. El sistema responde, filtra y agenda casi solo — el equipo solo entra a los casos que de verdad necesitan una persona.
          </p>
          <blockquote className="mt-8 border-l-2 border-primary pl-5 text-xl italic opacity-90">
            “Ahora el sistema responde, filtra y agenda casi solo. Recuperamos las mañanas.”
          </blockquote>
        </div>
        <dl className="grid grid-cols-2 gap-4 self-center">
          {stats.map(([n, l]) => (
            <div key={l} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <dt className="text-3xl md:text-4xl font-semibold text-primary">{n}</dt>
              <dd className="mt-2 text-sm opacity-70">{l}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function Carlos() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
      <Placeholder className="aspect-[4/5] rounded-3xl" label="Carlos & m8" />
      <div>
        <span className="text-xs uppercase tracking-widest text-muted-foreground">Conoce a Carlos & m8</span>
        <h2 className="mt-3 text-4xl md:text-5xl font-semibold leading-tight text-balance">
          Una persona, una mascota, un sistema que fluye solo.
        </h2>
        <p className="mt-5 text-lg text-foreground/70">
          Soy Carlos Ruíz, consultor de automatización. Trabajo con dueños de comercio que quieren crecer sin contratar más manos para hacer lo mismo. m8 es nuestro copiloto: pequeño, paciente, y siempre encendido.
        </p>
        <p className="mt-4 text-lg text-foreground/70">
          Nada de jerga. Nada de SaaS que no necesitas. Solo sistemas claros que ahorran tiempo desde el primer mes.
        </p>
        <a href="#contacto" className="mt-8 inline-flex items-center rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:opacity-90 transition">
          Conversemos
        </a>
      </div>
    </section>
  );
}

function Contacto() {
  const automatizables = ["Atención al cliente","Pedidos / órdenes","Inventario","Reservas","Reportes y dashboards","Marketing y leads","Facturación","Otra cosa"];
  return (
    <section id="contacto" className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16">
      <div>
        <h2 className="text-4xl md:text-5xl font-semibold leading-tight text-balance">
          Cuéntanos qué te roba la semana
        </h2>
        <p className="mt-5 text-lg text-foreground/70 text-balance">
          Te respondemos en menos de 24h con una primera lectura y, si tiene sentido, agendamos una llamada de 30 minutos.
        </p>
        <ul className="mt-10 space-y-4 text-foreground/80">
          <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-primary" /> hola@flowm8.com</li>
          <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-primary" /> +56 8765 4321</li>
          <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-primary" /> Respuesta en menos de 24h</li>
        </ul>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); alert("Gracias, te respondemos en menos de 24h."); }} className="rounded-3xl border border-foreground/10 bg-card p-8 space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Nombre" name="nombre" />
          <Field label="Negocio" name="negocio" />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Email" name="email" type="email" />
          <Field label="Tamaño del equipo" name="equipo" />
        </div>
        <div>
          <label className="text-sm font-medium">¿Qué te gustaría automatizar?</label>
          <div className="mt-3 flex flex-wrap gap-2">
            {automatizables.map(a => (
              <label key={a} className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-background px-3 py-1.5 text-sm cursor-pointer hover:border-primary transition">
                <input type="checkbox" name="auto" value={a} className="accent-primary" />
                {a}
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="text-sm font-medium">Cuéntanos un poco más</label>
          <textarea rows={4} name="mensaje" className="mt-2 w-full rounded-2xl border border-foreground/15 bg-background px-4 py-3 outline-none focus:border-primary transition" />
        </div>
        <button type="submit" className="w-full rounded-full bg-primary text-primary-foreground px-6 py-3.5 text-sm font-medium hover:opacity-90 transition">
          Enviar propuesta
        </button>
      </form>
    </section>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div>
      <label className="text-sm font-medium" htmlFor={name}>{label}</label>
      <input id={name} name={name} type={type} className="mt-2 w-full rounded-2xl border border-foreground/15 bg-background px-4 py-3 outline-none focus:border-primary transition" />
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-foreground/10 bg-foreground/[0.02]">
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-1">
          <div className="text-3xl font-bold tracking-tight">Flowm8</div>
          <p className="mt-3 text-sm text-foreground/70">
            Consultoría de automatización con IA para PYMES. Sistemas claros, crecimiento sereno, automatización con calidez humana.
          </p>
        </div>
        <FooterCol title="Producto" items={["Cómo funciona", "Casos"]} />
        <FooterCol title="Empresa" items={["Sobre Carlos", "Notas", "Contacto"]} />
        <FooterCol title="Contacto" items={["hola@flowm8.com", "+56 8765 4321"]} />
      </div>
      <div className="border-t border-foreground/10">
        <div className="max-w-7xl mx-auto px-6 py-6 text-sm text-foreground/60 flex flex-wrap justify-between gap-3">
          <span>© 2026 Flowm8.</span>
          <span>Que tu negocio fluya solo.</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">{title}</h4>
      <ul className="mt-4 space-y-2 text-foreground/80">
        {items.map(i => <li key={i}><a href="#" className="hover:text-primary transition">{i}</a></li>)}
      </ul>
    </div>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Problema />
        <Como />
        <Caso />
        <Carlos />
        <Contacto />
      </main>
      <Footer />
    </div>
  );
}
