import Link from "next/link";

export default function Home() {
  return (
    <main className="home">
      <nav className="navbar">
        <Link href="/" className="logo">
          <span className="logo-mark">S</span>
          <span>SolveBridge</span>
        </Link>

        <div className="nav-links">
          <a href="#how">DISCOVER</a>
          <a href="#ecosystem">CONNECT</a>
          <a href="#impact">BUILD</a>
          <a href="#impact">MEASURE</a>
        </div>

        <Link href="/login" className="sign-in">
          Sign in →
        </Link>
      </nav>

      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow">
            <span></span>
            A COLLABORATIVE INNOVATION PLATFORM
          </div>

          <h1>
            Problems
            <br />
            deserve
            <br />
            <span>pathways.</span>
          </h1>

          <p>
            SolveBridge connects societal challenges with the people,
            knowledge and resources capable of turning them into measurable
            solutions.
          </p>

          <div className="hero-actions">
            <Link href="/login" className="primary-button">
              Enter SolveBridge <span>↗</span>
            </Link>

            <a href="#how" className="secondary-button">
              Explore the process <span>→</span>
            </a>
          </div>

          <div className="keywords">
            DISCOVER <i>•</i> CONNECT <i>•</i> BUILD <i>•</i> MEASURE
          </div>
        </div>

        <div className="hero-visual">
          <div className="glow glow-one"></div>
          <div className="glow glow-two"></div>

          <div className="orbit orbit-one"></div>
          <div className="orbit orbit-two"></div>
          <div className="orbit orbit-three"></div>

          <div className="core">
            <div className="core-symbol">✦</div>
            <small>SOLVEBRIDGE</small>
            <strong>CONNECT</strong>
          </div>

          <div className="floating-card card-one">
            <span>01</span>
            <b>CHALLENGES</b>
            <small>Real-world problems</small>
          </div>

          <div className="floating-card card-two">
            <span>02</span>
            <b>CAPABILITIES</b>
            <small>Universities & industry</small>
          </div>

          <div className="floating-card card-three">
            <span>03</span>
            <b>IMPACT</b>
            <small>Track measurable outcomes</small>
          </div>
        </div>
      </section>

      <section className="process" id="how">
        <div className="section-heading">
          <span>HOW IT WORKS</span>
          <h2>From problem to impact.</h2>
        </div>

        <div className="process-grid">
          <div className="process-card">
            <div className="number">01</div>
            <h3>Crowdsource</h3>
            <p>
              Citizens, institutions and local bodies bring real societal
              challenges onto the platform.
            </p>
          </div>

          <div className="process-card">
            <div className="number">02</div>
            <h3>Collaborate</h3>
            <p>
              Universities contribute students, faculty and research while
              industry contributes expertise and resources.
            </p>
          </div>

          <div className="process-card">
            <div className="number">03</div>
            <h3>Match & Build</h3>
            <p>
              AI-assisted matching connects challenges with relevant
              capabilities and solution teams.
            </p>
          </div>

          <div className="process-card">
            <div className="number">04</div>
            <h3>Track Impact</h3>
            <p>
              Milestones, evidence, funding and progress are tracked through
              the complete solution lifecycle.
            </p>
          </div>
        </div>
      </section>

      <section className="ecosystem" id="ecosystem">
        <div className="section-heading">
          <span>THE ECOSYSTEM</span>
          <h2>One platform. Four perspectives.</h2>
        </div>

        <div className="role-grid">
          <div className="role-card citizen">
            <div className="role-icon">♙</div>
            <h3>Citizen</h3>
            <p>
              Report and track real-world challenges and see their journey
              toward solutions.
            </p>
          </div>

          <div className="role-card university">
            <div className="role-icon">◇</div>
            <h3>University</h3>
            <p>
              Discover matched challenges, build teams and submit practical
              solutions.
            </p>
          </div>

          <div className="role-card industry">
            <div className="role-icon">▣</div>
            <h3>Industry</h3>
            <p>
              Discover solution proposals, support projects and track
              contribution impact.
            </p>
          </div>

          <div className="role-card admin">
            <div className="role-icon">⌂</div>
            <h3>Admin / Government</h3>
            <p>
              Verify challenges, allocate support and monitor projects and
              impact.
            </p>
          </div>
        </div>
      </section>

      <section className="impact" id="impact">
        <div>
          <span className="section-label">THE OUTCOME</span>
          <h2>
            More relevant ideas.
            <br />
            Faster collaboration.
            <br />
            Measurable impact.
          </h2>
        </div>

        <Link href="/login" className="impact-button">
          Enter the ecosystem →
        </Link>
      </section>

      <footer>
        <div className="footer-logo">
          <span className="logo-mark">S</span>
          SolveBridge
        </div>

        <span>DISCOVER • CONNECT • BUILD • MEASURE</span>

        <span>Matrix Masters · SIH 2026</span>
      </footer>
    </main>
  );
}