export default function Home() {
  return (
    <main className="wrap">
      <header className="nav">
        <span className="logo">AIM Intelligence</span>
        <a className="btn ghost" href="#contact">Contact</a>
      </header>

      <section className="hero">
        <h1>Intelligence, aimed at what matters.</h1>
        <p>
          This is the starting point for the AIM Intelligence website. Replace this copy with
          your story, services and proof.
        </p>
        <a className="btn" href="#contact">Get in touch</a>
      </section>

      <section className="grid">
        <article>
          <h2>Strategy</h2>
          <p>Describe your first offering here.</p>
        </article>
        <article>
          <h2>Build</h2>
          <p>Describe your second offering here.</p>
        </article>
        <article>
          <h2>Scale</h2>
          <p>Describe your third offering here.</p>
        </article>
      </section>

      <footer id="contact" className="footer">
        <p>© {new Date().getFullYear()} AIM Intelligence</p>
      </footer>
    </main>
  );
}
