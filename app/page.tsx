import type { Metadata } from "next";
import "./landing.css";
import Link from "next/link";
import localFont from "next/font/local";
import { DemoNotice } from "@/components/demo-notice";

const geist = localFont({
  src: "../public/fonts/geist-latin.woff2",
  display: "swap",
  weight: "100 900",
});
const LLAMPUKAQ_URL = "https://llampuakaq.com";

export const metadata: Metadata = {
  title: "OpenReply by LLampukaq - Automatización de comentarios a DM en Instagram",
  description:
    "Convierte los comentarios con palabras clave en Instagram en respuestas privadas automáticas. By LLampukaq.",
};

function ReplyPreview() {
  return (
    <figure
      className="or-preview"
      aria-label="Ejemplo de campaña: un comentario con GUÍA activa una respuesta privada con el enlace de la guía"
    >
      <div className="or-preview-top">
        <span className="or-wordmark">
          OpenReply<span aria-hidden="true">↗</span>
        </span>
        <span className="or-mono">Vista previa de campaña</span>
      </div>
      <div className="or-preview-body">
        <div className="or-preview-heading">
          <span className="or-avatar">S</span>
          <div>
            <strong>Sunday studio</strong>
            <span>@sunday.studio · Instagram</span>
          </div>
          <span className="or-active">Activa</span>
        </div>
        <div className="or-post">
          <span className="or-mono">Campaña: Nuevo lanzamiento</span>
          <p>
            Comenta GUÍA abajo
            <br />y te envío el enlace.
          </p>
          <span>Palabra clave: GUÍA</span>
          <div className="or-post-lines" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
        <div className="or-comment">
          <span className="or-avatar or-avatar-small">M</span>
          <div>
            <strong>maya.creates</strong>
            <p>¡GUÍA! la necesito 😍</p>
          </div>
        </div>
        <div className="or-match">
          <span aria-hidden="true">↓</span>
          <span>
            Palabra clave <code>GUÍA</code> detectada
          </span>
          <span className="or-match-line" />
          <span>Respuesta privada</span>
        </div>
        <div className="or-message">
          <span className="or-mono">Sunday studio → Maya</span>
          <p>¡Hola Maya! Aquí tienes el enlace 👇</p>
          <span className="or-message-link">
            Comprar el nuevo lanzamiento <span aria-hidden="true">↗</span>
          </span>
        </div>
        <div className="or-delivered">
          <span aria-hidden="true">✓</span> Enviado mediante la API oficial de
          Instagram
        </div>
      </div>
      <figcaption>
        Contenido de ejemplo. Tus palabras clave, tu mensaje, tus enlaces.
      </figcaption>
    </figure>
  );
}

const steps = [
  [
    "Conecta tu cuenta",
    "Conecta una cuenta de Instagram Business o Creator mediante tu propia app de Meta.",
  ],
  [
    "Crea una campaña",
    "Elige una publicación o reel, añade palabras clave y escribe la respuesta privada. Si lo necesitas, añade una respuesta pública o botones con enlaces rastreados.",
  ],
  [
    "OpenReply hace el resto",
    "Los eventos entrantes activan tus campañas. Un worker en segundo plano pone en cola, limita y registra cada envío, con reintentos y conciliación de comentarios.",
  ],
];
const features = [
  [
    "Mensajes de respuesta personalizados",
    "Escribe tus propios mensajes, personalízalos con el nombre de usuario y usa hasta dos botones con enlaces rastreados.",
  ],
  [
    "Múltiples disparadores",
    "Activa campañas con comentarios en publicaciones, DM entrantes y respuestas de texto a Historias.",
  ],
  [
    "Bandeja de entrada",
    "Lee conversaciones y responde desde OpenReply, dentro de la ventana de mensajería de Instagram.",
  ],
  [
    "Registros de entrega",
    "Consulta los mensajes enviados, omitidos y fallidos, con sus motivos. Rastrea los clics de los enlaces hasta cada campaña.",
  ],
];

export default function Home() {
  return (
    <div id="top" lang="es" className={`or-landing ${geist.className}`}>
      <a className="or-skip" href="#main">
        Saltar al contenido
      </a>
      <DemoNotice variant="banner" />
      <header className="or-header">
        <div className="or-container or-nav">
          <div className="or-brand">
            <a
              className="or-wordmark"
              href="#top"
              aria-label="OpenReply, inicio"
            >
              OpenReply
            </a>
            <a
              className="or-byline"
              href={LLAMPUKAQ_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              by LLampukaq
            </a>
          </div>
          <nav aria-label="Navegación principal">
            <a href="#how">Cómo funciona</a>
          </nav>
          <div className="or-nav-cta">
            <a className="or-nav-signin" href="/login">
              Iniciar sesión
            </a>
            <a className="or-button or-button-small" href="/login">
              Comenzar <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </header>
      <main id="main">
        <section className="or-container or-hero">
          <div className="or-hero-copy">
            <h1>
              Convierte los comentarios
              <br />
              de Instagram en respuestas privadas.
            </h1>
            <p className="or-lead">
              Alguien comenta una palabra clave en tu publicación o reel y
              OpenReply le envía un DM automáticamente.
            </p>
            <div className="or-actions">
              <a className="or-button or-button-primary" href="/login">
                Comenzar ahora <span aria-hidden="true">↗</span>
              </a>
              <a className="or-text-link" href="#how">
                Ver cómo funciona <span aria-hidden="true">↓</span>
              </a>
            </div>
            <p className="or-hero-note">Desarrollado por LLampukaq.</p>
          </div>
          <ReplyPreview />
        </section>
        <div className="or-container or-principles">
          <span>API oficial de Instagram</span>
          <span>Sin compartir contraseñas</span>
          <span>Tus campañas, en tu base de datos</span>
        </div>
        <div className="or-container">
          <div className="or-sheet">
            <section id="how" className="or-section or-how">
              <div>
                <h2>Cómo funciona</h2>
                <p>
                  Envía el enlace de un producto, comparte un recurso o entrega
                  tu última guía. Tú decides qué inicia la conversación y qué
                  sucede después.
                </p>
              </div>
              <ol className="or-steps">
                {steps.map(([title, description], index) => (
                  <li key={title}>
                    <span className="or-step-number">0{index + 1}</span>
                    <div>
                      <h3>{title}</h3>
                      <p>{description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
            <section id="features" className="or-section">
              <div className="or-section-intro">
                <h2>Funciones</h2>
              </div>
              <div className="or-feature-grid">
                {features.map(([title, description]) => (
                  <article key={title}>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </article>
                ))}
              </div>
            </section>
            <section className="or-section or-faq">
              <div>
                <h2>Preguntas frecuentes</h2>
              </div>
              <div>
                <details>
                  <summary>¿Puedo usar el demo público para enviar DMs?</summary>
                  <p>
                    No. El demo público solo muestra la interfaz; no es un
                    servicio de automatización alojado.
                  </p>
                </details>
                <details>
                  <summary>¿Qué cuentas de Instagram puedo conectar?</summary>
                  <p>
                    Cuentas de Instagram Business y Creator. Las cuentas
                    personales no son compatibles. Las conexiones usan la API
                    oficial y las políticas de la plataforma de Instagram
                    siguen aplicando.
                  </p>
                </details>
              </div>
            </section>
          </div>
        </div>
        <section className="or-container or-closing">
          <h2>Configura tu primera campaña</h2>
          <p>Conecta Instagram y escribe tu primera respuesta.</p>
          <div className="or-actions">
            <a className="or-button or-button-primary" href="/login">
              Comenzar ahora <span aria-hidden="true">↗</span>
            </a>
            <a
              className="or-text-link"
              href={LLAMPUKAQ_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visitar LLampukaq <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
      </main>
      <footer className="or-footer">
        <div className="or-container">
          <div className="or-footer-top">
            <div>
              <Link href="/" className="or-wordmark">
                OpenReply
              </Link>
              <p>
                Automatización de comentarios a DM en Instagram.{" "}
                <a
                  href={LLAMPUKAQ_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  by LLampukaq
                </a>
              </p>
            </div>
            <nav aria-label="Navegación de pie de página">
              <Link href="/privacy">Privacidad</Link>
              <Link href="/terms">Términos</Link>
              <Link href="/data-deletion">Eliminación de datos</Link>
            </nav>
          </div>
          <div className="or-footer-bottom">
            <span>
              by{" "}
              <a
                href={LLAMPUKAQ_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                LLampukaq
              </a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
