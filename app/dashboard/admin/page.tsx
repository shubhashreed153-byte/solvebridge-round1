"use client";

import { useState } from "react";

type Challenge = {
  id: number;
  title: string;
  category: string;
  location: string;
  urgency: string;
  status: string;
  description: string;
};

const DATA: Challenge[] = [
  {
    id: 1,
    title: "Rural Drinking Water Monitoring",
    category: "Water & Environment",
    location: "Karnataka",
    urgency: "High",
    status: "Pending",
    description:
      "Villages need a low-cost system to monitor drinking-water quality and alert local authorities."
  },
  {
    id: 2,
    title: "Smart Waste Segregation",
    category: "Environment",
    location: "Bengaluru",
    urgency: "Medium",
    status: "Verified",
    description:
      "Improve waste segregation using sensors and simple guidance for households."
  },
  {
    id: 3,
    title: "Reliable Rural Energy",
    category: "Energy",
    location: "Kalaburagi",
    urgency: "High",
    status: "Matched",
    description:
      "Explore affordable energy harvesting and monitoring solutions for rural infrastructure."
  }
];

const UNIVERSITIES = [
  {
    name: "MVJ College of Engineering",
    skills: "IoT • Embedded Systems • Electronics",
    values: [94, 92, 88, 82, 90, 85]
  },
  {
    name: "University Innovation Lab",
    skills: "AI • Data Analytics • Smart Systems",
    values: [89, 94, 86, 88, 78, 91]
  },
  {
    name: "Regional Engineering Institute",
    skills: "Energy • Sensors • Hardware",
    values: [91, 87, 95, 84, 82, 86]
  }
];

const FACTORS = [
  "Vector similarity",
  "Department match",
  "Lab capability",
  "Past experience",
  "Proximity",
  "Capacity"
];

const DOMAINS = [
  "Water & Environment",
  "Energy",
  "Waste Management",
  "Education",
  "Healthcare",
  "Transport",
  "Agriculture",
  "Public Safety",
  "Infrastructure",
  "Community Services"
];

function getScore(v: number[]) {
  return Math.round(
    v[0] * 0.4 +
      v[1] * 0.2 +
      v[2] * 0.15 +
      v[3] * 0.1 +
      v[4] * 0.1 +
      v[5] * 0.05
  );
}

export default function AdminPage() {
  const [tab, setTab] = useState("overview");
  const [challenges, setChallenges] = useState(DATA);
  const [review, setReview] = useState<Challenge | null>(null);
  const [matching, setMatching] = useState<Challenge | null>(null);
  const [allocated, setAllocated] = useState(0);
  const [toast, setToast] = useState("");

  const pending = challenges.filter(x => x.status === "Pending").length;
  const verified = challenges.filter(
    x => x.status === "Verified" || x.status === "Matched"
  ).length;
  const matched = challenges.filter(x => x.status === "Matched").length;

  function notify(text: string) {
    setToast(text);
    setTimeout(() => setToast(""), 2200);
  }

  function verify(id: number) {
    setChallenges(old =>
      old.map(x =>
        x.id === id ? { ...x, status: "Verified" } : x
      )
    );
    setReview(null);
    notify("✓ Challenge verified");
  }

  function matchUniversity(id: number) {
    setChallenges(old =>
      old.map(x =>
        x.id === id ? { ...x, status: "Matched" } : x
      )
    );
    setMatching(null);
    notify("✓ University match confirmed");
  }

  const tabs = [
    ["overview", "Overview"],
    ["verification", "Verification"],
    ["matching", "AI Matching"],
    ["csr", "CSR Fund Pool"],
    ["impact", "Deployment & Impact"],
    ["analytics", "Analytics"]
  ];

  return (
    <main style={S.page}>
      <header style={S.header}>
        <div>
          <div style={S.logo}>SOLVEBRIDGE • ADMIN</div>
          <h1 style={S.title}>Admin / Government Command Center</h1>
          <p style={S.sub}>
            Verify challenges, coordinate capability matching and track impact.
          </p>
        </div>

        <button
          style={S.logout}
          onClick={() => (window.location.href = "/login")}
        >
          Sign Out
        </button>
      </header>

      <nav style={S.nav}>
        {tabs.map(t => (
          <button
            key={t[0]}
            onClick={() => setTab(t[0])}
            style={{
              ...S.navButton,
              ...(tab === t[0] ? S.active : {})
            }}
          >
            {t[1]}
          </button>
        ))}
      </nav>

      {toast && <div style={S.toast}>{toast}</div>}

      {tab === "overview" && (
        <>
          <div style={S.stats}>
            <Stat title="Total Challenges" value={challenges.length} />
            <Stat title="Pending Verification" value={pending} />
            <Stat title="Verified" value={verified} />
            <Stat title="University Matches" value={matched} />
          </div>

          <section style={S.card}>
            <div style={S.head}>
              <div>
                <h2>Challenge Pipeline</h2>
                <p style={S.muted}>
                  Problem discovery → verification → matching → solution → impact
                </p>
              </div>
              <Badge text="PROTOTYPE DATA" />
            </div>

            <div style={S.pipeline}>
              <Stage name="Submitted" value={challenges.length} />
              <Stage name="Verified" value={verified} />
              <Stage name="Matched" value={matched} />
              <Stage name="Solutions" value={1} />
              <Stage name="Impact" value={0} />
            </div>
          </section>

          <section style={S.card}>
            <h2>Recent Challenges</h2>

            {challenges.map(c => (
              <ChallengeRow
                key={c.id}
                data={c}
                onClick={() => setReview(c)}
              />
            ))}
          </section>
        </>
      )}

      {tab === "verification" && (
        <section style={S.card}>
          <div style={S.head}>
            <div>
              <h2>Challenge Verification</h2>
              <p style={S.muted}>
                Review submitted challenges before they enter collaboration.
              </p>
            </div>
            <Badge text="AI-ASSISTED" />
          </div>

          {challenges.map(c => (
            <ChallengeRow
              key={c.id}
              data={c}
              onClick={() => setReview(c)}
            />
          ))}
        </section>
      )}

      {tab === "matching" && (
        <section style={S.card}>
          <div style={S.head}>
            <div>
              <h2>AI-Assisted Capability Matching</h2>
              <p style={S.muted}>
                Explainable hybrid matching between challenges and university
                capabilities.
              </p>
            </div>
            <Badge text="EXPLAINABLE AI" />
          </div>

          <div style={S.formula}>
            <b>Match Score</b>
            <span>
              0.40 × VectorSim + 0.20 × DeptMatch + 0.15 × LabMatch +
              0.10 × PastExp + 0.10 × Proximity + 0.05 × Capacity
            </span>
          </div>

          {challenges.map(c => (
            <ChallengeRow
              key={c.id}
              data={c}
              button="View Matches"
              onClick={() => setMatching(c)}
            />
          ))}
        </section>
      )}

      {tab === "csr" && (
        <section style={S.card}>
          <div style={S.head}>
            <div>
              <h2>CSR Fund Pool</h2>
              <p style={S.muted}>
                Prototype representation of industry / CSR support.
              </p>
            </div>
            <Badge text="SIMULATED" />
          </div>

          <Money title="Prototype Fund Pool" value={1000000} />
          <Money title="Allocated" value={allocated} />
          <Money title="Available" value={1000000 - allocated} />

          <button
            style={S.button}
            onClick={() => {
              setAllocated(x => Math.min(x + 100000, 1000000));
              notify("✓ Prototype CSR allocation recorded");
            }}
          >
            Allocate ₹1,00,000
          </button>

          <p style={S.note}>
            No real payment or fund transfer occurs in this prototype.
          </p>
        </section>
      )}

      {tab === "impact" && (
        <section style={S.card}>
          <div style={S.head}>
            <div>
              <h2>Deployment & Impact</h2>
              <p style={S.muted}>
                Track the solution lifecycle toward implementation.
              </p>
            </div>
            <Badge text="LIFECYCLE" />
          </div>

          <ImpactRow
            title="Challenge"
            value="Rural Drinking Water Monitoring"
            status="Verified"
          />

          <ImpactRow
            title="University"
            value="MVJ College of Engineering"
            status="Solution Development"
          />

          <ImpactRow
            title="Industry"
            value="CSR / Technical Support"
            status="Support Pending"
          />

          <ImpactRow
            title="Deployment"
            value="Local Implementation Partner"
            status="Not Started"
          />

          <button
            style={S.button}
            onClick={() => notify("✓ Deployment status updated")}
          >
            Update Deployment
          </button>
        </section>
      )}

      {tab === "analytics" && (
        <section style={S.card}>
          <div style={S.head}>
            <div>
              <h2>Impact Analytics</h2>
              <p style={S.muted}>
                Metrics derived from the current prototype dataset.
              </p>
            </div>
            <Badge text="DEMO METRICS" />
          </div>

          <div style={S.stats}>
            <Stat title="Submitted" value={challenges.length} />
            <Stat title="Verified" value={verified} />
            <Stat title="Matched" value={matched} />
            <Stat title="Reached Impact" value={0} />
          </div>

          <div style={S.info}>
            <b>Key Prototype Metric</b>
            <p>
              Percentage of verified challenges reaching a tested solution or
              implementation partner.
            </p>
            <strong>0% in current demo dataset</strong>
          </div>
        </section>
      )}

      {review && (
        <div style={S.overlay}>
          <div style={S.modal}>
            <button style={S.close} onClick={() => setReview(null)}>
              ×
            </button>

            <Badge text="CHALLENGE REVIEW" />

            <h2>{review.title}</h2>
            <p style={S.muted}>{review.description}</p>

            <div style={S.details}>
              <Info title="Category" value={review.category} />
              <Info title="Location" value={review.location} />
              <Info title="Urgency" value={review.urgency} />
              <Info title="Status" value={review.status} />
            </div>

            <div style={S.ai}>
              <b>AI-Assisted Structured Analysis</b>
              <p>
                Domain: {review.category}
                <br />
                Skill tags: sensors • data collection • system design
                <br />
                Duplicate screening: related-submission check completed
                <br />
                Similarity threshold: prototype representation of the proposed
                &gt;0.82 screening rule
              </p>
            </div>

            <div style={S.taxonomy}>
              <b>Controlled Domain Taxonomy</b>
              <div style={S.chips}>
                {DOMAINS.map(d => (
                  <span key={d}>{d}</span>
                ))}
              </div>
            </div>

            {review.status === "Pending" ? (
              <button
                style={S.button}
                onClick={() => verify(review.id)}
              >
                Verify Challenge
              </button>
            ) : (
              <div style={S.verified}>
                ✓ This challenge is already {review.status.toLowerCase()}.
              </div>
            )}
          </div>
        </div>
      )}

      {matching && (
        <div style={S.overlay}>
          <div style={S.modal}>
            <button style={S.close} onClick={() => setMatching(null)}>
              ×
            </button>

            <Badge text="CAPABILITY PROFILES" />

            <h2>University Matches</h2>

            <p style={S.muted}>
              Profiles are shown because their prototype capabilities align
              with the challenge.
            </p>

            {UNIVERSITIES.map(u => {
              const total = getScore(u.values);

              return (
                <div style={S.match} key={u.name}>
                  <div style={S.matchTop}>
                    <div style={S.rowText}>
                      <b>{u.name}</b>
                      <small>{u.skills}</small>
                    </div>

                    <strong style={S.score}>{total}%</strong>
                  </div>

                  <div style={S.factors}>
                    {u.values.map((v, i) => (
                      <span key={FACTORS[i]}>
                        {FACTORS[i]}: {v}
                      </span>
                    ))}
                  </div>

                  <button
                    style={S.button}
                    onClick={() => matchUniversity(matching.id)}
                  >
                    Confirm University Match
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </main>
  );
}

function Stat({
  title,
  value
}: {
  title: string;
  value: number;
}) {
  return (
    <div style={S.stat}>
      <span>{title}</span>
      <strong>{value}</strong>
    </div>
  );
}

function Stage({
  name,
  value
}: {
  name: string;
  value: number;
}) {
  return (
    <div style={S.stage}>
      <strong>{value}</strong>
      <span>{name}</span>
    </div>
  );
}

function Badge({ text }: { text: string }) {
  return <span style={S.badge}>{text}</span>;
}

function Money({
  title,
  value
}: {
  title: string;
  value: number;
}) {
  return (
    <div style={S.money}>
      <span>{title}</span>
      <strong>₹{value.toLocaleString("en-IN")}</strong>
    </div>
  );
}

function Info({
  title,
  value
}: {
  title: string;
  value: string;
}) {
  return (
    <div style={S.infoSmall}>
      <small>{title}</small>
      <b>{value}</b>
    </div>
  );
}

function ImpactRow({
  title,
  value,
  status
}: {
  title: string;
  value: string;
  status: string;
}) {
  return (
    <div style={S.row}>
      <div style={S.rowText}>
        <b>{title}</b>
        <small>{value}</small>
      </div>
      <span style={S.status}>{status}</span>
    </div>
  );
}

function ChallengeRow({
  data,
  onClick,
  button = "Review"
}: {
  data: Challenge;
  onClick: () => void;
  button?: string;
}) {
  return (
    <div style={S.row}>
      <div style={S.rowText}>
        <b>{data.title}</b>
        <small>
          {data.category} &nbsp;•&nbsp; {data.location} &nbsp;•&nbsp;
          {data.urgency} urgency
        </small>
      </div>

      <div style={S.rowRight}>
        <span style={S.status}>{data.status}</span>

        <button style={S.button} onClick={onClick}>
          {button}
        </button>
      </div>
    </div>
  );
}

const S: any = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at top right,#281642 0,#0c0813 48%,#07050b 100%)",
    color: "#f4efff",
    padding: "32px",
    fontFamily: "Arial,sans-serif"
  },

  header: {
    maxWidth: 1200,
    margin: "0 auto 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20
  },

  logo: {
    color: "#bda7ff",
    fontWeight: 800,
    letterSpacing: 2,
    fontSize: 12
  },

  title: {
    fontSize: 30,
    margin: "8px 0"
  },

  sub: {
    color: "#a9a0b8",
    margin: 0
  },

  logout: {
    background: "#21182f",
    color: "#eee7ff",
    border: "1px solid #62527c",
    padding: "10px 18px",
    borderRadius: 10,
    cursor: "pointer"
  },

  nav: {
    maxWidth: 1200,
    margin: "0 auto 24px",
    display: "flex",
    gap: 9,
    flexWrap: "wrap"
  },

  navButton: {
    background: "#17111f",
    color: "#bdb2cb",
    border: "1px solid #30253d",
    padding: "11px 15px",
    borderRadius: 10,
    cursor: "pointer"
  },

  active: {
    background: "#302244",
    color: "#fff",
    borderColor: "#9278bd"
  },

  stats: {
    maxWidth: 1200,
    margin: "0 auto 18px",
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    gap: 14
  },

  stat: {
    background: "#15101c",
    border: "1px solid #30263a",
    borderRadius: 14,
    padding: 20,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 15
  },

  card: {
    maxWidth: 1200,
    margin: "0 auto 18px",
    background: "#12101a",
    border: "1px solid #30263a",
    borderRadius: 16,
    padding: 22
  },

  head: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 18,
    marginBottom: 18
  },

  badge: {
    background: "#21182f",
    border: "1px solid #55426d",
    color: "#cdbfff",
    padding: "5px 9px",
    borderRadius: 7,
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: 1,
    whiteSpace: "nowrap"
  },

  pipeline: {
    display: "grid",
    gridTemplateColumns: "repeat(5,1fr)",
    gap: 12
  },

  stage: {
    background: "#1a1422",
    border: "1px solid #292131",
    borderRadius: 12,
    padding: 16,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 18,
    padding: "16px 0",
    borderBottom: "1px solid #292231"
  },

  rowText: {
    display: "flex",
    flexDirection: "column",
    gap: 7
  },

  rowRight: {
    display: "flex",
    alignItems: "center",
    gap: 12
  },

  button: {
    background: "#2a2039",
    color: "#f5efff",
    border: "1px solid #8d78aa",
    padding: "9px 14px",
    borderRadius: 9,
    cursor: "pointer",
    whiteSpace: "nowrap"
  },

  muted: {
    color: "#a49aaa",
    lineHeight: 1.6
  },

  status: {
    color: "#cbb9ff",
    fontSize: 13,
    whiteSpace: "nowrap"
  },

  formula: {
    background: "#191421",
    border: "1px solid #352943",
    borderRadius: 11,
    padding: 14,
    marginBottom: 15,
    display: "flex",
    flexDirection: "column",
    gap: 7,
    color: "#c9bfd3"
  },

  money: {
    background: "#191421",
    border: "1px solid #30263b",
    padding: 18,
    borderRadius: 12,
    marginBottom: 10,
    display: "flex",
    justifyContent: "space-between",
    gap: 15
  },

  note: {
    color: "#80778a",
    fontSize: 12,
    marginTop: 12
  },

  info: {
    marginTop: 20,
    padding: 18,
    background: "#191421",
    borderRadius: 12,
    border: "1px solid #30263b"
  },

  infoSmall: {
    background: "#191421",
    border: "1px solid #30263b",
    padding: 13,
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    gap: 6
  },

  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(4,2,8,.80)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    zIndex: 20
  },

  modal: {
    width: "min(780px,100%)",
    maxHeight: "90vh",
    overflowY: "auto",
    background: "#110d17",
    border: "1px solid #49385b",
    borderRadius: 18,
    padding: 26,
    position: "relative"
  },

  close: {
    position: "absolute",
    top: 10,
    right: 15,
    background: "transparent",
    border: 0,
    color: "#aaa",
    fontSize: 25,
    cursor: "pointer"
  },

  details: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
    margin: "18px 0"
  },

  ai: {
    background: "#1b1524",
    border: "1px solid #3b2d49",
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    lineHeight: 1.7
  },

  taxonomy: {
    background: "#17121f",
    border: "1px solid #30263b",
    borderRadius: 12,
    padding: 15,
    marginBottom: 18
  },

  chips: {
    display: "flex",
    flexWrap: "wrap",
    gap: 7,
    marginTop: 10
  },

  factors: {
    display: "flex",
    flexWrap: "wrap",
    gap: 7,
    margin: "12px 0"
  },

  match: {
    background: "#18121f",
    border: "1px solid #352943",
    borderRadius: 12,
    padding: 15,
    marginTop: 12
  },

  matchTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 15
  },

  score: {
    color: "#d5c5ff",
    fontSize: 22
  },

  verified: {
    padding: 12,
    background: "#171d20",
    border: "1px solid #40544a",
    borderRadius: 9,
    color: "#bfe0c9"
  },

  toast: {
    position: "fixed",
    bottom: 25,
    right: 25,
    background: "#302244",
    border: "1px solid #9278bd",
    padding: "12px 18px",
    borderRadius: 10,
    zIndex: 50
  }
};