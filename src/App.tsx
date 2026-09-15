import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Bike,
  ChevronRight,
  Eye,
  LockKeyhole,
  MapPin,
  MessageCircle,
  MessageSquareText,
  Package,
  Pencil,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  Trash2,
} from "lucide-react";

type Product = {
  id: number;
  type: "Moto" | "Bicicleta";
  title: string;
  meta: string;
  price: string;
  description: string;
  image: string;
  tone: "orange" | "lime" | "blue" | "pink";
};

const products: Product[] = [
  {
    id: 1,
    type: "Moto",
    title: "Honda Wave 110S",
    meta: "2023 · 8.400 km",
    price: "$ 2.450.000",
    description: "Agil, economica y lista para usar. Excelente estado general.",
    image: "https://images.pexels.com/photos/37773431/pexels-photo-37773431.jpeg?auto=compress&cs=tinysrgb&w=1400",
    tone: "orange",
  },
  {
    id: 2,
    type: "Moto",
    title: "Motomel S2 150",
    meta: "2022 · 12.100 km",
    price: "$ 1.980.000",
    description: "Comoda y versatil, con documentacion al dia.",
    image: "https://images.pexels.com/photos/18865724/pexels-photo-18865724.jpeg?auto=compress&cs=tinysrgb&w=1400",
    tone: "lime",
  },
  {
    id: 3,
    type: "Bicicleta",
    title: "MTB Rodado 29",
    meta: "21 velocidades · Aluminio",
    price: "$ 480.000",
    description: "Suspension delantera y frenos a disco. Ideal para ciudad y senderos.",
    image: "https://images.pexels.com/photos/7012009/pexels-photo-7012009.jpeg?auto=compress&cs=tinysrgb&w=1400",
    tone: "blue",
  },
  {
    id: 4,
    type: "Bicicleta",
    title: "Urbana Rodado 28",
    meta: "7 velocidades · Equipada",
    price: "$ 350.000",
    description: "Practica, liviana y preparada para moverte todos los dias.",
    image: "https://images.pexels.com/photos/7635132/pexels-photo-7635132.jpeg?auto=compress&cs=tinysrgb&w=1400",
    tone: "pink",
  },
];

function Brand({ admin = false }: { admin?: boolean }) {
  return (
    <span className={`brand${admin ? " admin-brand" : ""}`}>
      <span className="brand-mark">
        <Bike size={23} strokeWidth={2.4} />
      </span>
      <span>
        <strong>ESTACION 2 RUEDAS</strong>
        <small>{admin ? "ADMINISTRACION" : "MOTOS&CLETAS"}</small>
      </span>
    </span>
  );
}

function Storefront() {
  const [filter, setFilter] = useState<"Todas" | Product["type"]>("Todas");
  const [query, setQuery] = useState("");
  const visible = useMemo(
    () =>
      products.filter(
        (item) =>
          (filter === "Todas" || item.type === filter) &&
          item.title.toLowerCase().includes(query.toLowerCase()),
      ),
    [filter, query],
  );

  return (
    <main>
      <header className="site-header">
        <a className="brand-link" href="#inicio" aria-label="Estacion 2 Ruedas, inicio">
          <Brand />
        </a>
        <nav aria-label="Navegacion principal">
          <a href="#catalogo">Catalogo</a>
          <a href="#ubicacion">Donde estamos</a>
          <a href="/admin" className="admin-link">
            <ShieldCheck size={17} /> Administrar
          </a>
        </nav>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-orbit orbit-one" />
        <div className="hero-orbit orbit-two" />
        <div className="hero-copy">
          <span className="eyebrow">SAN MIGUEL DE TUCUMAN</span>
          <h1>
            Tu proxima
            <br />
            <em>aventura</em>
            <br />
            empieza aca.
          </h1>
          <p>Motos y bicicletas seleccionadas, listas para salir. Encontra la tuya y consultanos directamente.</p>
          <a className="primary-cta" href="#catalogo">
            Ver unidades <ChevronRight size={20} />
          </a>
        </div>
        <div className="hero-card">
          <img src={products[0].image} alt="Motocicleta roja de muestra" />
          <span className="available">Disponible ahora</span>
          <div className="hero-card-caption">
            <span>Destacada</span>
            <strong>Honda Wave 110S</strong>
          </div>
        </div>
        <div className="hero-number">02</div>
      </section>

      <section className="catalog" id="catalogo">
        <div className="section-heading">
          <div>
            <span className="eyebrow dark">CATALOGO</span>
            <h2>Elegi como moverte</h2>
          </div>
          <p>Publicaciones de muestra para definir el estilo visual.</p>
        </div>
        <div className="catalog-tools">
          <div className="filters" role="group" aria-label="Filtrar catalogo">
            {(["Todas", "Moto", "Bicicleta"] as const).map((name) => (
              <button key={name} className={filter === name ? "active" : ""} onClick={() => setFilter(name)}>
                {name === "Moto" ? "Motos" : name === "Bicicleta" ? "Bicicletas" : name}
              </button>
            ))}
          </div>
          <label className="search">
            <Search size={18} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar modelo" />
          </label>
        </div>
        <div className="product-grid">
          {visible.map((product) => (
            <article className={`product-card ${product.tone}`} key={product.id}>
              <div className="product-image">
                <img src={product.image} alt={product.title} loading="lazy" />
                <div className="product-image-shade" />
                <div className="product-badges">
                  <span className="type-badge">{product.type}</span>
                  <span className="featured-badge">
                    <Sparkles size={13} /> Seleccionada
                  </span>
                </div>
                <div className="image-price">
                  <small>Precio</small>
                  <strong>{product.price}</strong>
                </div>
              </div>
              <div className="product-body">
                <div className="product-title-row">
                  <div>
                    <p className="product-meta">{product.meta}</p>
                    <h3>{product.title}</h3>
                  </div>
                  <span className="card-number">0{product.id}</span>
                </div>
                <p className="product-description">{product.description}</p>
                <div className="product-bottom">
                  <span className="availability">
                    <i /> Disponible
                  </span>
                  <a
                    href={`https://wa.me/5493815448139?text=${encodeURIComponent(
                      `Hola, vi la publicacion de ${product.title} en Estacion 2 Ruedas. Sigue disponible?`,
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MessageCircle size={20} /> Consultar por WhatsApp <ArrowUpRight size={17} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="location" id="ubicacion">
        <div className="location-icon">
          <MapPin size={30} />
        </div>
        <div>
          <span>VENI A CONOCERNOS</span>
          <h2>Av. Alem 439</h2>
          <p>San Miguel de Tucuman</p>
        </div>
        <a href="https://wa.me/5493815448139" target="_blank" rel="noreferrer">
          <MessageCircle size={21} /> 381 544-8139
        </a>
      </section>

      <footer>
        <Brand />
        <p>Av. Alem 439 · San Miguel de Tucuman</p>
        <span>© 2026</span>
      </footer>
      <a className="floating-wa" href="https://wa.me/5493815448139" target="_blank" rel="noreferrer" aria-label="Abrir WhatsApp">
        <MessageCircle size={27} />
      </a>
    </main>
  );
}

function AdminSketch() {
  const [preview, setPreview] = useState(false);

  return (
    <main className="admin-page">
      {!preview ? (
        <section className="login-panel">
          <a href="/" className="back-link">
            <ArrowLeft size={17} /> Volver al catalogo
          </a>
          <div className="login-mark">
            <Bike size={33} />
          </div>
          <span className="admin-kicker">AREA PRIVADA</span>
          <h1>Administra tus publicaciones</h1>
          <p>Este es el boceto del acceso. La contrasena segura se configura en la version funcional.</p>
          <label>
            Contrasena
            <input type="password" placeholder="********" disabled />
          </label>
          <button onClick={() => setPreview(true)}>
            <LockKeyhole size={19} /> Ver panel de muestra
          </button>
          <small>Boceto visual - todavia no guarda cambios.</small>
        </section>
      ) : (
        <section className="dashboard-shell">
          <aside className="dashboard-side">
            <Brand admin />
            <div className="side-menu">
              <button className="selected">
                <Package size={19} /> Publicaciones
              </button>
              <button>
                <MessageSquareText size={19} /> Consultas
              </button>
              <a href="/">
                <Eye size={19} /> Ver catalogo
              </a>
            </div>
            <button className="back-dashboard" onClick={() => setPreview(false)}>
              <ArrowLeft size={18} /> Cerrar muestra
            </button>
          </aside>
          <div className="dashboard-content">
            <div className="dashboard-top">
              <div>
                <span>PANEL DE CONTROL</span>
                <h1>Publicaciones</h1>
              </div>
              <button className="new-item">
                <Plus size={19} /> Nueva publicacion
              </button>
            </div>
            <div className="stats">
              <div>
                <span>Publicadas</span>
                <strong>4</strong>
              </div>
              <div>
                <span>Motos</span>
                <strong>2</strong>
              </div>
              <div>
                <span>Bicicletas</span>
                <strong>2</strong>
              </div>
            </div>
            <div className="inventory">
              <div className="inventory-head">
                <strong>Inventario</strong>
                <span>4 unidades visibles</span>
              </div>
              {products.map((item) => (
                <article key={item.title}>
                  <div className="item-thumb">
                    <Bike size={24} />
                  </div>
                  <div className="item-name">
                    <strong>{item.title}</strong>
                    <span>{item.type}</span>
                  </div>
                  <strong>{item.price}</strong>
                  <span className="status">Publicada</span>
                  <div className="row-actions">
                    <button aria-label={`Editar ${item.title}`}>
                      <Pencil size={17} />
                    </button>
                    <button aria-label={`Eliminar ${item.title}`}>
                      <Trash2 size={17} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

export default function App() {
  return window.location.pathname.startsWith("/admin") ? <AdminSketch /> : <Storefront />;
}
