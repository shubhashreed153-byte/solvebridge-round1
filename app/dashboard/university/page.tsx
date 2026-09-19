"use client";

import { useEffect, useState } from "react";

const challenges = [
  {
    id: 1,
    title: "Rural Drinking Water Monitoring",
    location: "Kalaburagi, Karnataka",
    category: "Water & Environment",
    score: 92,
    problem: "Villages need low-cost drinking-water quality monitoring.",
    skills: "IoT, Sensors, Embedded Systems",
    reason: "Strong lab and project capability match",
  },
  {
    id: 2,
    title: "Smart Waste Segregation",
    location: "Bengaluru, Karnataka",
    category: "Environment",
    score: 86,
    problem: "Improve recyclable and non-recyclable waste segregation.",
    skills: "AI, Computer Vision, IoT",
    reason: "Strong department and laboratory match",
  },
  {
    id: 3,
    title: "Reliable Rural Energy",
    location: "Raichur, Karnataka",
    category: "Energy",
    score: 81,
    problem: "Monitor renewable-energy systems in rural areas.",
    skills: "Sensors, Embedded Systems, Power Electronics",
    reason: "Relevant skills and available capacity",
  },
];

const industries = [
  ["AquaTech Solutions", "Water Technology", "Mentorship + Technical Expertise"],
  ["GreenGrid Industries", "Sustainability", "CSR Funding + Equipment"],
  ["TechNova Systems", "Technology", "Technical Expertise + Mentorship"],
];

export default function UniversityDashboard() {
  const [tab, setTab] = useState("matches");
  const [projects, setProjects] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);

  const [team, setTeam] = useState("");
  const [mile, setMile] = useState("");
  const [evidence, setEvidence] = useState("");
  const [industry, setIndustry] = useState("");
  const [support, setSupport] = useState("");
  const [feedback, setFeedback] = useState("");
  const [impact, setImpact] = useState("");

  const [profile, setProfile] = useState({
    department: "",
    labs: "",
    skills: "",
    experience: "",
    capacity: "",
  });

  useEffect(() => {
    const p = localStorage.getItem("solvebridge_uni_v4_projects");
    const pr = localStorage.getItem("solvebridge_uni_v4_profile");

    if (p) setProjects(JSON.parse(p));
    if (pr) setProfile(JSON.parse(pr));
  }, []);

  function save(data: any[]) {
    setProjects(data);
    localStorage.setItem("solvebridge_uni_v4_projects", JSON.stringify(data));
  }

  function update(id: number, data: any) {
    save(projects.map(p => p.id === id ? { ...p, ...data } : p));
  }

  function accept(c: any) {
    if (projects.some(p => p.id === c.id)) {
      alert("This challenge is already accepted.");
      setSelected(null);
      return;
    }

    save([
      ...projects,
      {
        ...c,
        team: [],
        solution: "",
        milestones: [],
        evidence: [],
        submitted: false,
        industry: "",
        support: "",
        feedback: "",
        impact: "",
      },
    ]);

    setSelected(null);
    setTab("projects");
  }

  function addTeam(p: any) {
    if (!team.trim()) return alert("Enter a team member.");
    update(p.id, { team: [...p.team, team.trim()] });
    setTeam("");
  }

  function addMilestone(p: any) {
    if (!mile.trim()) return alert("Enter a milestone.");
    update(p.id, { milestones: [...p.milestones, mile.trim()] });
    setMile("");
  }

  function addEvidence(p: any) {
    if (!evidence.trim()) return alert("Enter progress/evidence.");
    update(p.id, { evidence: [...p.evidence, evidence.trim()] });
    setEvidence("");
  }

  function submit(p: any) {
    if (!p.team.length) return alert("Add a team member first.");
    if (!p.solution.trim()) return alert("Enter the proposed solution.");
    if (!p.milestones.length) return alert("Add a milestone first.");

    update(p.id, { submitted: true });
    alert("✓ Solution submitted successfully.");
  }

  function sendSupport(p: any) {
    if (!p.submitted)
      return alert("Submit the solution before requesting support.");

    if (!industry) return alert("Select an industry partner.");
    if (!support) return alert("Select support required.");

    update(p.id, { industry, support });

    const old = JSON.parse(
      localStorage.getItem("solvebridge_industry_requests") || "[]"
    );

    localStorage.setItem(
      "solvebridge_industry_requests",
      JSON.stringify([
        ...old,
        {
          project: p.title,
          problem: p.problem,
          solution: p.solution,
          industry,
          support,
          status: "Awaiting Industry Review",
        },
      ])
    );

    setIndustry("");
    setSupport("");
    alert("✓ Support request sent.");
  }

  function saveProfile() {
    localStorage.setItem(
      "solvebridge_uni_v4_profile",
      JSON.stringify(profile)
    );
    alert("✓ Capability profile saved.");
  }

  function signOut() {
    window.location.href = "/login";
  }

  return (
    <main>
      <header>
        <div>
          <h1>University Dashboard</h1>
          <p>Discover • Collaborate • Build • Create Impact</p>
        </div>
        <button onClick={signOut}>Sign Out</button>
      </header>

      <nav>
        <button onClick={() => setTab("matches")}>Challenges</button>
        <button onClick={() => setTab("projects")}>My Projects</button>
        <button onClick={() => setTab("workspace")}>Workspace</button>
        <button onClick={() => setTab("industries")}>Industries</button>
        <button onClick={() => setTab("support")}>Support & Impact</button>
        <button onClick={() => setTab("profile")}>Capability Profile</button>
      </nav>

      {tab === "matches" && (
        <section>
          <h2>AI-Matched Challenges</h2>

          <div className="grid">
            {challenges.map(c => (
              <article key={c.id}>
                <span>{c.category}</span>
                <h3>{c.title}</h3>
                <p>{c.location}</p>
                <strong>{c.score}%</strong>
                <small> Match Score</small>
                <p><b>Why:</b> {c.reason}</p>
                <button onClick={() => setSelected(c)}>
                  View Challenge
                </button>
              </article>
            ))}
          </div>
        </section>
      )}

      {tab === "projects" && (
        <section>
          <h2>My Projects</h2>

          {!projects.length && (
            <article>
              <p>No projects yet.</p>
              <button onClick={() => setTab("matches")}>
                Browse Challenges
              </button>
            </article>
          )}

          {projects.map(p => (
            <article key={p.id}>
              <h3>{p.title}</h3>
              <p>{p.location}</p>

              <div className="steps">
                ✓ Challenge accepted<br />
                {p.team.length ? "✓" : "○"} Team formation<br />
                {p.submitted ? "✓" : "○"} Solution development<br />
                {p.industry ? "✓" : "○"} Industry support<br />
                {p.impact ? "✓" : "○"} Impact tracking
              </div>

              {p.industry && (
                <div className="status">
                  Industry: {p.industry}<br />
                  Support: {p.support}<br />
                  Status: Awaiting Industry Review
                </div>
              )}

              <button onClick={() => setTab("workspace")}>
                Open Project
              </button>
            </article>
          ))}
        </section>
      )}

      {tab === "workspace" && (
        <section>
          <h2>Solution Workspace</h2>

          {projects.map(p => (
            <article key={p.id}>
              <h3>{p.title}</h3>

              <div className="problem">
                <b>Problem</b>
                <p>{p.problem}</p>
              </div>

              <h4>Team Formation</h4>
              <div className="row">
                <input
                  value={team}
                  onChange={e => setTeam(e.target.value)}
                  placeholder="Student / Faculty name"
                />
                <button onClick={() => addTeam(p)}>Add</button>
              </div>

              <p>{p.team.join(" • ")}</p>

              <h4>Proposed Solution</h4>
              <textarea
                value={p.solution}
                onChange={e => update(p.id, { solution: e.target.value })}
                placeholder="Describe your solution..."
              />

              <h4>Milestones</h4>
              <div className="row">
                <input
                  value={mile}
                  onChange={e => setMile(e.target.value)}
                  placeholder="Example: Build prototype"
                />
                <button onClick={() => addMilestone(p)}>Add</button>
              </div>

              {p.milestones.map((x: string, i: number) => (
                <p key={i}>✓ {x}</p>
              ))}

              <h4>Evidence / Progress</h4>
              <div className="row">
                <input
                  value={evidence}
                  onChange={e => setEvidence(e.target.value)}
                  placeholder="Example: Prototype tested"
                />
                <button onClick={() => addEvidence(p)}>Add</button>
              </div>

              {p.evidence.map((x: string, i: number) => (
                <p key={i}>📌 {x}</p>
              ))}

              <button disabled={p.submitted} onClick={() => submit(p)}>
                {p.submitted ? "✓ Submitted" : "Submit Solution"}
              </button>
            </article>
          ))}
        </section>
      )}

      {tab === "industries" && (
        <section>
          <h2>Industry Partners</h2>

          <div className="grid">
            {industries.map(i => (
              <article key={i[0]}>
                <span>{i[1]}</span>
                <h3>{i[0]}</h3>
                <p>{i[2]}</p>
                <button
                  onClick={() =>
                    alert(
                      i[0] +
                        "\n\nFocus: " +
                        i[1] +
                        "\n\nOpportunity: " +
                        i[2]
                    )
                  }
                >
                  View Opportunity
                </button>
              </article>
            ))}
          </div>
        </section>
      )}

      {tab === "support" && (
        <section>
          <h2>Support & Impact</h2>

          {projects.map(p => (
            <article key={p.id}>
              <h3>{p.title}</h3>

              <div className="problem">
                <b>Problem</b>
                <p>{p.problem}</p>
                <b>Solution</b>
                <p>{p.solution || "Not submitted yet."}</p>
              </div>

              {!p.industry ? (
                <>
                  <select
                    value={industry}
                    onChange={e => setIndustry(e.target.value)}
                  >
                    <option value="">Select Industry</option>
                    {industries.map(i => (
                      <option key={i[0]}>{i[0]}</option>
                    ))}
                  </select>

                  <select
                    value={support}
                    onChange={e => setSupport(e.target.value)}
                  >
                    <option value="">Select Support</option>
                    <option>CSR Funding</option>
                    <option>Equipment</option>
                    <option>Mentorship</option>
                    <option>Technical Expertise</option>
                  </select>

                  <button onClick={() => sendSupport(p)}>
                    Send Support Request
                  </button>
                </>
              ) : (
                <div className="status">
                  ✓ Request Sent<br />
                  Industry: {p.industry}<br />
                  Support: {p.support}<br />
                  Status: Awaiting Industry Review
                </div>
              )}

              <h4>Feedback</h4>
              <input
                value={feedback}
                onChange={e => setFeedback(e.target.value)}
                placeholder="Enter project feedback..."
              />

              <button
                onClick={() => {
                  if (!feedback.trim())
                    return alert("Enter feedback first.");
                  update(p.id, { feedback });
                  setFeedback("");
                  alert("✓ Feedback recorded.");
                }}
              >
                Record Feedback
              </button>

              {p.feedback && <p>💬 {p.feedback}</p>}

              <h4>Impact / Deployment</h4>
              <input
                value={impact}
                onChange={e => setImpact(e.target.value)}
                placeholder="Example: Prototype deployed in pilot"
              />

              <button
                onClick={() => {
                  if (!impact.trim())
                    return alert("Enter impact information.");
                  update(p.id, { impact });
                  setImpact("");
                  alert("✓ Impact recorded.");
                }}
              >
                Record Impact
              </button>

              {p.impact && (
                <div className="status">
                  ✓ Impact Recorded<br />
                  {p.impact}
                </div>
              )}
            </article>
          ))}
        </section>
      )}

      {tab === "profile" && (
        <section>
          <h2>Capability Profile</h2>

          <article>
            {[
              ["department", "Department"],
              ["labs", "Labs / Facilities"],
              ["skills", "Skills / Expertise"],
              ["experience", "Past Projects"],
              ["capacity", "Current Capacity"],
            ].map(x => (
              <div key={x[0]}>
                <label>{x[1]}</label>
                <input
                  value={profile[x[0] as keyof typeof profile]}
                  onChange={e =>
                    setProfile({
                      ...profile,
                      [x[0]]: e.target.value,
                    })
                  }
                  placeholder={x[1]}
                />
              </div>
            ))}

            <button onClick={saveProfile}>
              Save Capability Profile
            </button>

            <div className="status">
              <b>Saved Profile</b>
              <p>Department: {profile.department || "Not provided"}</p>
              <p>Labs: {profile.labs || "Not provided"}</p>
              <p>Skills: {profile.skills || "Not provided"}</p>
              <p>Experience: {profile.experience || "Not provided"}</p>
              <p>Capacity: {profile.capacity || "Not provided"}</p>
            </div>
          </article>
        </section>
      )}

      {selected && (
        <div className="overlay">
          <article className="modal">
            <h2>{selected.title}</h2>
            <p>{selected.location}</p>

            <h4>Problem</h4>
            <p>{selected.problem}</p>

            <h4>Required Skills</h4>
            <p>{selected.skills}</p>

            <h4>Explainable Match</h4>
            <p>{selected.reason}</p>

            <strong>{selected.score}% Match</strong>

            <button onClick={() => accept(selected)}>
              Accept Challenge
            </button>

            <button onClick={() => setSelected(null)}>
              Close
            </button>
          </article>
        </div>
      )}

      <style jsx>{`
        main {
          min-height: 100vh;
          padding: 28px;
          color: #f7f2ff;
          background:
            radial-gradient(circle at 10% 10%, #321650, transparent 35%),
            radial-gradient(circle at 90% 20%, #39153f, transparent 30%),
            #100b19;
          font-family: Arial, sans-serif;
        }

        header,
        nav,
        section {
          max-width: 1150px;
          margin: auto;
        }

        header {
          display: flex;
          justify-content: space-between;
          gap: 20px;
        }

        nav {
          display: flex;
          gap: 7px;
          flex-wrap: wrap;
          margin-top: 25px;
          margin-bottom: 25px;
        }

        button {
          padding: 10px 14px;
          border: 1px solid #9d8ab8;
          border-radius: 9px;
          background: #292039;
          color: #f4efff;
          font-weight: 600;
          cursor: pointer;
        }

        button:hover {
          background: #3a2c50;
        }

        button:disabled {
          opacity: .5;
          cursor: not-allowed;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit,minmax(280px,1fr));
          gap: 16px;
        }

        article {
          padding: 20px;
          margin-bottom: 16px;
          border-radius: 17px;
          background: #ffffff0d;
          border: 1px solid #ffffff1c;
        }

        article > span {
          padding: 6px 10px;
          border-radius: 20px;
          background: #ffffff16;
          font-size: 13px;
        }

        strong {
          display: block;
          color: #d9c8ff;
          font-size: 28px;
          margin: 10px 0;
        }

        input,
        textarea,
        select {
          width: 100%;
          box-sizing: border-box;
          padding: 11px;
          margin: 5px 0 10px;
          border: 1px solid #ffffff20;
          border-radius: 8px;
          background: #f8f5ff;
          color: #17111e;
        }

        textarea {
          min-height: 110px;
        }

        .row {
          display: flex;
          gap: 7px;
        }

        .row input {
          flex: 1;
        }

        .problem,
        .status {
          padding: 13px;
          margin: 12px 0;
          border-radius: 10px;
          background: #ffffff0b;
          border: 1px solid #ffffff12;
        }

        .steps {
          line-height: 1.9;
        }

        label {
          display: block;
          margin-top: 12px;
          font-weight: bold;
        }

        .overlay {
          position: fixed;
          inset: 0;
          z-index: 20;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: #000b;
        }

        .modal {
          max-width: 600px;
          width: 100%;
          max-height: 85vh;
          overflow: auto;
          background: #21142d;
        }

        @media(max-width:600px) {
          header { flex-direction: column; }
          .row { flex-direction: column; }
          main { padding: 18px; }
        }
      `}</style>
    </main>
  );
}