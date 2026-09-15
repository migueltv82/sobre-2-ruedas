import { useMemo, useState } from "react";
import {
  AlertCircle,
  ArrowLeft,
  ArrowUpDown,
  ArrowUpRight,
  Bike,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Eye,
  EyeOff,
  Filter,
  ImageOff,
  LockKeyhole,
  MapPin,
  MessageCircle,
  MessageSquareText,
  Package,
  Pencil,
  Plus,
  RefreshCw,
  Save,
  Search,
  ShieldCheck,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";

type ProductStatus = "Publicada" | "Pausada" | "Reservada" | "Borrador";
type ProductType = "Moto" | "Bicicleta";

type Product = {
  id: number;
  type: ProductType;
  title: string;
  meta: string;
  price: string;
  description: string;
  image: string;
  tone: "orange" | "lime" | "blue" | "pink";
  status: ProductStatus;
  stockCode: string;
  views: number;
  leads: number;
  updatedAt: string;
};

type AdminMode = "ready" | "loading" | "empty" | "error";
type ProductDraft = Pick<Product, "title" | "type" | "price" | "meta" | "description" | "status">;

const initialProducts: Product[] = [
  {
    id: 1,
    type: "Moto",
    title: "Honda Wave 110S",
    meta: "2023 / 8.400 km",
    price: "$ 2.450.000",
    description: "Agil, economica y lista para usar. Excelente estado general.",
    image: "https://images.pexels.com/photos/37773431/pexels-photo-37773431.jpeg?auto=compress&cs=tinysrgb&w=1400",
    tone: "orange",
    status: "Publicada",
    stockCode: "M-1042",
    views: 428,
    leads: 16,
    updatedAt: "Hoy, 10:24",
  },
  {
    id: 2,
    type: "Moto",
    title: "Motomel S2 150",
    meta: "2022 / 12.100 km",
    price: "$ 1.980.000",
    description: "Comoda y versatil, con documentacion al dia.",
    image: "https://images.pexels.com/photos/18865724/pexels-photo-18865724.jpeg?auto=compress&cs=tinysrgb&w=1400",
    tone: "lime",
    status: "Reservada",
    stockCode: "M-0981",
    views: 311,
    leads: 9,
    updatedAt: "Ayer, 18:05",
  },
  {
    id: 3,
    type: "Bicicleta",
    title: "MTB Rodado 29",
    meta: "21 velocidades / Aluminio",
    price: "$ 480.000",
    description: "Suspension delantera y frenos a disco. Ideal para ciudad y senderos.",
    image: "https://images.pexels.com/photos/7012009/pexels-photo-7012009.jpeg?auto=compress&cs=tinysrgb&w=1400",
    tone: "blue",
    status: "Publicada",
    stockCode: "B-2207",
    views: 194,
    leads: 6,
    updatedAt: "Lun, 09:18",
  },
  {
    id: 4,
    type: "Bicicleta",
    title: "Urbana Rodado 28",
    meta: "7 velocidades / Equipada",
    price: "$ 350.000",
    description: "Practica, liviana y preparada para moverte todos los dias.",
    image: "https://images.pexels.com/photos/7635132/pexels-photo-7635132.jpeg?auto=compress&cs=tinysrgb&w=1400",
    tone: "pink",
    status: "Borrador",
    stockCode: "B-1850",
    views: 0,
    leads: 0,
    updatedAt: "Sin publicar",
  },
];

const blankDraft: ProductDraft = {
  title: "",
  type: "Moto",
  price: "",
  meta: "",
  description: "",
  status: "Borrador",
};

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
  const [filter, setFilter] = useState<"Todas" | ProductType>("Todas");
  const [query, setQuery] = useState("");
  const visible = useMemo(
    () =>
      initialProducts.filter(
        (item) =>
          item.status === "Publicada" &&
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
          <img src={initialProducts[0].image} alt="Motocicleta roja de muestra" />
          <span className="available">Disponible ahora</span>
          <div className="hero-card-caption">
            <span>Destacada</span>
            <strong>Honda Wave 110S</strong>
          </div>
        </div>
      </section>

      <section className="catalog" id="catalogo">
        <div className="section-heading">
          <div>
            <span className="eyebrow dark">CATALOGO</span>
            <h2>Elegi como moverte</h2>
          </div>
          <p>Publicaciones activas del local listas para consultar por WhatsApp.</p>
        </div>
        <div className="catalog-tools">
          <div className="filters" role="group" aria-label="Filtrar catalogo">
            {(["Todas", "Moto", "Bicicleta"] as const).map((name) => (
              <button key={name} className={filter === name ? "active" : ""} onClick={() => setFilter(name)} type="button">
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
                    <MessageCircle size={20} /> Consultar <ArrowUpRight size={17} />
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
        <p>Av. Alem 439 / San Miguel de Tucuman</p>
        <span>2026</span>
      </footer>
      <a className="floating-wa" href="https://wa.me/5493815448139" target="_blank" rel="noreferrer" aria-label="Abrir WhatsApp">
        <MessageCircle size={27} />
      </a>
    </main>
  );
}

function statusIcon(status: ProductStatus) {
  if (status === "Publicada") return <CheckCircle2 size={14} />;
  if (status === "Reservada") return <Clock3 size={14} />;
  if (status === "Pausada") return <EyeOff size={14} />;
  return <Pencil size={14} />;
}

function buildDraft(product?: Product): ProductDraft {
  if (!product) return blankDraft;
  return {
    title: product.title,
    type: product.type,
    price: product.price,
    meta: product.meta,
    description: product.description,
    status: product.status,
  };
}

function AdminPanel() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [products, setProducts] = useState(initialProducts);
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<"Todas" | ProductType>("Todas");
  const [statusFilter, setStatusFilter] = useState<"Todos" | ProductStatus>("Todos");
  const [mode, setMode] = useState<AdminMode>("ready");
  const [selectedId, setSelectedId] = useState(initialProducts[0].id);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [draft, setDraft] = useState<ProductDraft>(buildDraft(initialProducts[0]));
  const [formError, setFormError] = useState("");

  const filteredProducts = useMemo(() => {
    const cleanQuery = query.trim().toLowerCase();
    return products.filter((product) => {
      const matchesQuery =
        product.title.toLowerCase().includes(cleanQuery) ||
        product.stockCode.toLowerCase().includes(cleanQuery) ||
        product.price.toLowerCase().includes(cleanQuery);
      const matchesType = typeFilter === "Todas" || product.type === typeFilter;
      const matchesStatus = statusFilter === "Todos" || product.status === statusFilter;
      return matchesQuery && matchesType && matchesStatus;
    });
  }, [products, query, statusFilter, typeFilter]);

  const selectedProduct = products.find((product) => product.id === selectedId) ?? products[0];
  const publishedCount = products.filter((product) => product.status === "Publicada").length;
  const totalLeads = products.reduce((sum, product) => sum + product.leads, 0);
  const totalViews = products.reduce((sum, product) => sum + product.views, 0);

  function openEditor(product?: Product) {
    setDraft(buildDraft(product));
    setFormError("");
    setSelectedId(product?.id ?? 0);
    setIsEditorOpen(true);
  }

  function saveDraft() {
    if (!draft.title.trim() || !draft.price.trim()) {
      setFormError("Completa modelo y precio para guardar la publicacion.");
      return;
    }

    if (selectedId === 0) {
      const nextProduct: Product = {
        id: Date.now(),
        ...draft,
        image: "",
        tone: "orange",
        stockCode: `${draft.type === "Moto" ? "M" : "B"}-${Math.floor(Math.random() * 9000) + 1000}`,
        views: 0,
        leads: 0,
        updatedAt: "Recien creada",
      };
      setProducts((current) => [nextProduct, ...current]);
      setSelectedId(nextProduct.id);
    } else {
      setProducts((current) =>
        current.map((product) =>
          product.id === selectedId
            ? {
                ...product,
                ...draft,
                updatedAt: "Actualizada ahora",
              }
            : product,
        ),
      );
    }

    setIsEditorOpen(false);
  }

  function removeSelectedProduct() {
    setProducts((current) => current.filter((product) => product.id !== selectedId));
    setSelectedId(products.find((product) => product.id !== selectedId)?.id ?? 0);
    setIsEditorOpen(false);
  }

  if (!isUnlocked) {
    return (
      <main className="admin-page auth-page">
        <section className="login-panel" aria-labelledby="admin-login-title">
          <a href="/" className="back-link">
            <ArrowLeft size={17} /> Volver al catalogo
          </a>
          <div className="login-mark">
            <Bike size={33} />
          </div>
          <span className="admin-kicker">AREA PRIVADA</span>
          <h1 id="admin-login-title">Administra tus publicaciones</h1>
          <p>Acceso de trabajo para cargar unidades, revisar consultas y controlar que se ve publicado.</p>
          <label>
            Contrasena
            <input type="password" placeholder="********" aria-describedby="password-help" />
          </label>
          <button onClick={() => setIsUnlocked(true)} type="button">
            <LockKeyhole size={19} /> Entrar al panel
          </button>
          <small id="password-help">Demo local: el boton permite entrar para trabajar el panel.</small>
        </section>
      </main>
    );
  }

  return (
    <main className="admin-page">
      <section className="dashboard-shell">
        <aside className="dashboard-side" aria-label="Administracion">
          <Brand admin />
          <div className="side-menu">
            <button className="selected" type="button">
              <Package size={19} /> Publicaciones
            </button>
            <button type="button">
              <MessageSquareText size={19} /> Consultas
            </button>
            <a href="/">
              <Eye size={19} /> Ver catalogo
            </a>
          </div>
          <button className="back-dashboard" onClick={() => setIsUnlocked(false)} type="button">
            <ArrowLeft size={18} /> Bloquear panel
          </button>
        </aside>

        <div className="dashboard-content">
          <header className="dashboard-top">
            <div>
              <span>PANEL DE CONTROL</span>
              <h1>Publicaciones</h1>
              <p>Control de inventario visible, estado comercial y consultas recibidas.</p>
            </div>
            <div className="admin-actions">
              <a className="catalog-link" href="/">
                <Eye size={18} /> Ver catalogo
              </a>
              <button className="new-item" onClick={() => openEditor()} type="button">
                <Plus size={19} /> Nueva publicacion
              </button>
            </div>
          </header>

          <section className="stats" aria-label="Resumen de publicaciones">
            <div>
              <span>Publicadas</span>
              <strong>{publishedCount}</strong>
            </div>
            <div>
              <span>Consultas</span>
              <strong>{totalLeads}</strong>
            </div>
            <div>
              <span>Vistas</span>
              <strong>{totalViews}</strong>
            </div>
          </section>

          <section className="admin-workspace">
            <div className="inventory-panel">
              <div className="inventory-head">
                <div>
                  <strong>Inventario</strong>
                  <span>{filteredProducts.length} unidades en esta vista</span>
                </div>
                <button type="button" onClick={() => setMode("loading")}>
                  <RefreshCw size={16} /> Probar carga
                </button>
              </div>

              <div className="inventory-toolbar">
                <label className="admin-search">
                  <Search size={17} />
                  <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar modelo, codigo o precio" />
                </label>
                <label>
                  <Filter size={15} />
                  <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value as "Todas" | ProductType)}>
                    <option>Todas</option>
                    <option>Moto</option>
                    <option>Bicicleta</option>
                  </select>
                </label>
                <label>
                  <ArrowUpDown size={15} />
                  <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as "Todos" | ProductStatus)}>
                    <option>Todos</option>
                    <option>Publicada</option>
                    <option>Reservada</option>
                    <option>Pausada</option>
                    <option>Borrador</option>
                  </select>
                </label>
              </div>

              <div className="state-switcher" aria-label="Estados de revision">
                {(["ready", "loading", "empty", "error"] as const).map((state) => (
                  <button className={mode === state ? "active" : ""} key={state} onClick={() => setMode(state)} type="button">
                    {state === "ready" ? "Datos" : state === "loading" ? "Carga" : state === "empty" ? "Vacio" : "Error"}
                  </button>
                ))}
              </div>

              {mode === "loading" && <AdminLoadingState />}
              {mode === "empty" && <AdminEmptyState onCreate={() => openEditor()} />}
              {mode === "error" && <AdminErrorState onRetry={() => setMode("ready")} />}
              {mode === "ready" && (
                <div className="inventory-table" role="table" aria-label="Inventario del local">
                  <div className="inventory-row inventory-row-head" role="row">
                    <span role="columnheader">Unidad</span>
                    <span role="columnheader">Estado</span>
                    <span role="columnheader">Precio</span>
                    <span role="columnheader">Consultas</span>
                    <span role="columnheader">Acciones</span>
                  </div>
                  {filteredProducts.length === 0 ? (
                    <AdminEmptyState onCreate={() => openEditor()} compact />
                  ) : (
                    filteredProducts.map((item) => (
                      <button
                        className={`inventory-row ${selectedId === item.id ? "selected" : ""}`}
                        key={item.id}
                        onClick={() => {
                          setSelectedId(item.id);
                          setDraft(buildDraft(item));
                        }}
                        role="row"
                        type="button"
                      >
                        <span className="item-main" role="cell">
                          <span className="item-thumb">{item.image ? <img src={item.image} alt="" /> : <ImageOff size={20} />}</span>
                          <span className="item-name">
                            <strong>{item.title}</strong>
                            <small>
                              {item.stockCode} / {item.type} / {item.meta}
                            </small>
                          </span>
                        </span>
                        <span className={`status ${item.status.toLowerCase()}`} role="cell">
                          {statusIcon(item.status)} {item.status}
                        </span>
                        <strong role="cell">{item.price}</strong>
                        <span role="cell">{item.leads} consultas</span>
                        <span className="row-actions" role="cell">
                          <button
                            aria-label={`Editar ${item.title}`}
                            onClick={(event) => {
                              event.stopPropagation();
                              openEditor(item);
                            }}
                            type="button"
                          >
                            <Pencil size={17} />
                          </button>
                        </span>
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>

            <aside className="detail-panel" aria-label="Detalle de publicacion">
              {selectedProduct ? (
                <>
                  <div className="detail-image">
                    {selectedProduct.image ? <img src={selectedProduct.image} alt={selectedProduct.title} /> : <ImageOff size={34} />}
                  </div>
                  <div className="detail-header">
                    <span className={`status ${selectedProduct.status.toLowerCase()}`}>
                      {statusIcon(selectedProduct.status)} {selectedProduct.status}
                    </span>
                    <button onClick={() => openEditor(selectedProduct)} type="button">
                      <Pencil size={16} /> Editar
                    </button>
                  </div>
                  <h2>{selectedProduct.title}</h2>
                  <p>{selectedProduct.description}</p>
                  <dl>
                    <div>
                      <dt>Precio</dt>
                      <dd>{selectedProduct.price}</dd>
                    </div>
                    <div>
                      <dt>Codigo</dt>
                      <dd>{selectedProduct.stockCode}</dd>
                    </div>
                    <div>
                      <dt>Ultimo cambio</dt>
                      <dd>{selectedProduct.updatedAt}</dd>
                    </div>
                  </dl>
                </>
              ) : (
                <AdminEmptyState onCreate={() => openEditor()} compact />
              )}
            </aside>
          </section>
        </div>

        {isEditorOpen && (
          <section className="editor-panel" aria-labelledby="editor-title" role="dialog" aria-modal="true">
            <div className="editor-card">
              <div className="editor-head">
                <div>
                  <span>PUBLICACION</span>
                  <h2 id="editor-title">{selectedId === 0 ? "Nueva unidad" : "Editar unidad"}</h2>
                </div>
                <button aria-label="Cerrar editor" onClick={() => setIsEditorOpen(false)} type="button">
                  <X size={18} />
                </button>
              </div>

              {formError && (
                <p className="form-error" role="alert">
                  <AlertCircle size={16} /> {formError}
                </p>
              )}

              <div className="form-grid">
                <label>
                  Modelo
                  <input value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} />
                </label>
                <label>
                  Tipo
                  <select value={draft.type} onChange={(event) => setDraft({ ...draft, type: event.target.value as ProductType })}>
                    <option>Moto</option>
                    <option>Bicicleta</option>
                  </select>
                </label>
                <label>
                  Precio
                  <input value={draft.price} onChange={(event) => setDraft({ ...draft, price: event.target.value })} />
                </label>
                <label>
                  Estado
                  <select value={draft.status} onChange={(event) => setDraft({ ...draft, status: event.target.value as ProductStatus })}>
                    <option>Publicada</option>
                    <option>Reservada</option>
                    <option>Pausada</option>
                    <option>Borrador</option>
                  </select>
                </label>
                <label className="wide">
                  Datos cortos
                  <input value={draft.meta} onChange={(event) => setDraft({ ...draft, meta: event.target.value })} />
                </label>
                <label className="wide">
                  Descripcion
                  <textarea value={draft.description} onChange={(event) => setDraft({ ...draft, description: event.target.value })} rows={4} />
                </label>
              </div>

              <div className="editor-actions">
                {selectedId !== 0 && (
                  <button className="danger-action" onClick={removeSelectedProduct} type="button">
                    <Trash2 size={17} /> Eliminar
                  </button>
                )}
                <button className="ghost-action" onClick={() => setIsEditorOpen(false)} type="button">
                  Cancelar
                </button>
                <button className="save-action" onClick={saveDraft} type="button">
                  <Save size={17} /> Guardar
                </button>
              </div>
            </div>
          </section>
        )}
      </section>
    </main>
  );
}

function AdminLoadingState() {
  return (
    <div className="loading-list" aria-label="Cargando publicaciones">
      {[1, 2, 3].map((item) => (
        <div className="skeleton-row" key={item}>
          <span />
          <span />
          <span />
        </div>
      ))}
    </div>
  );
}

function AdminEmptyState({ compact = false, onCreate }: { compact?: boolean; onCreate: () => void }) {
  return (
    <div className={`admin-state${compact ? " compact" : ""}`}>
      <Package size={compact ? 22 : 30} />
      <strong>No hay publicaciones para mostrar</strong>
      <p>Cambia los filtros o carga una nueva unidad para verla en el inventario.</p>
      <button onClick={onCreate} type="button">
        <Plus size={16} /> Nueva publicacion
      </button>
    </div>
  );
}

function AdminErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="admin-state error-state">
      <AlertCircle size={30} />
      <strong>No se pudo cargar el inventario</strong>
      <p>Revisa la conexion o vuelve a intentar. Los datos locales no se perdieron.</p>
      <button onClick={onRetry} type="button">
        <RefreshCw size={16} /> Reintentar
      </button>
    </div>
  );
}

export default function App() {
  return window.location.pathname.startsWith("/admin") ? <AdminPanel /> : <Storefront />;
}
