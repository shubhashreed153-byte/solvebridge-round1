"use client";

import { useState } from "react";
import Link from "next/link";

const items = [
  {
    title:"Rural Drinking Water Monitoring",
    university:"MVJ Engineering Innovation Lab",
    category:"Water & Sanitation",
    solution:"Low-cost sensors monitor water quality and alert communities when contamination is detected.",
    need:"Sensors, technical expertise and industry collaboration",
    impact:"Faster detection of unsafe drinking water."
  },
  {
    title:"Smart Waste Segregation",
    university:"Karnataka University Innovation Cell",
    category:"Waste Management",
    solution:"A smart system helps identify and separate different types of waste.",
    need:"Equipment and engineering mentorship",
    impact:"Better waste segregation and recycling."
  },
  {
    title:"Reliable Rural Energy",
    university:"Bengaluru Energy Research Team",
    category:"Energy",
    solution:"An intelligent energy system designed for reliable rural power usage.",
    need:"IoT expertise, equipment and industry collaboration",
    impact:"Improved local energy reliability."
  }
];

export default function IndustryDashboard(){
  const [tab,setTab]=useState("opportunities");
  const [selected,setSelected]=useState<any>(null);
  const [projects,setProjects]=useState<any[]>([]);

  function acceptProject(x:any){
    if(projects.some(p=>p.title===x.title)){
      alert("Project already accepted.");
      return;
    }

    setProjects([
      ...projects,
      {
        title:x.title,
        university:x.university,
        status:"Accepted",
        funding:"Government Contract / Funding Required"
      }
    ]);

    setSelected(null);
    setTab("projects");
    alert("✓ Project accepted. Government contract/funding is now required.");
  }

  return(
    <main className="page">
      <style>{`
      *{box-sizing:border-box}
      .page{min-height:100vh;background:radial-gradient(circle at 80% 5%,#392064,transparent 32%),#090713;color:white;padding:35px 7%;font-family:Arial}
      .top{display:flex;justify-content:space-between;margin-bottom:55px}
      .brand{font-size:21px;font-weight:bold}.sign{color:#aaa5b8;text-decoration:none}
      .tag{color:#a994ff;font-size:12px;letter-spacing:2px;font-weight:bold}
      h1{font-size:46px;margin:12px 0}.intro{max-width:800px}
      .muted{color:#aaa5b8;line-height:1.6}
      .tabs{display:flex;gap:10px;flex-wrap:wrap;margin:30px 0}
      .tab{padding:11px 17px;border-radius:20px;border:1px solid #39304f;background:#151127;color:#aaa5b8;cursor:pointer}
      .active{background:#ded4ff;color:#17111d}
      .grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
      .card{background:#151127;border:1px solid #30274a;border-radius:20px;padding:23px}
      .pill{display:inline-block;margin:6px 5px 0 0;padding:6px 9px;border-radius:15px;background:#292240;color:#ddd7ff;font-size:11px}
      .btn{margin-top:18px;padding:11px 16px;border:0;border-radius:9px;background:#ffe7d1;color:#17111d;font-weight:bold;cursor:pointer}
      .full{grid-column:1/-1}.notice{margin-bottom:20px;padding:14px;border-radius:12px;background:#1b1531;color:#aaa5b8;font-size:12px}
      .modal{position:fixed;inset:0;background:#000b;display:flex;align-items:center;justify-content:center;padding:20px;z-index:10}
      .modalbox{width:min(700px,100%);max-height:90vh;overflow:auto;background:#171229;border:1px solid #7564b5;border-radius:22px;padding:30px}
      .close{background:#292240;color:white;margin-left:8px}
      @media(max-width:850px){.grid{grid-template-columns:1fr 1fr}}
      @media(max-width:600px){.grid{grid-template-columns:1fr}h1{font-size:37px}}
      `}</style>

      <header className="top">
        <div className="brand">✦ SolveBridge</div>
        <Link className="sign" href="/login">Sign out</Link>
      </header>

      <section className="intro">
        <div className="tag">INDUSTRY DASHBOARD</div>
        <h1>Turn innovation into impact.</h1>
        <p className="muted">
          Discover verified challenges, university solutions and
          opportunities to collaborate through technology, mentorship
          and industry expertise.
        </p>
      </section>

      <div className="tabs">
        {[
          ["opportunities","Opportunities"],
          ["solutions","University Solutions"],
          ["funds","Government Contracts"],
          ["projects","Active Projects"],
          ["history","Acceptance History"]
        ].map(x=>(
          <button
            key={x[0]}
            className={`tab ${tab===x[0]?"active":""}`}
            onClick={()=>setTab(x[0])}
          >
            {x[1]}
          </button>
        ))}
      </div>

      {tab==="opportunities"&&(
        <>
          <div className="notice">
            PROTOTYPE SEED DATA — Demonstration opportunities.
          </div>

          <section className="grid">
            {items.map(x=>(
              <div className="card" key={x.title}>
                <h3>{x.title}</h3>
                <p className="muted">{x.university}</p>
                <span className="pill">{x.category}</span>
                <span className="pill">Business Opportunity</span>
                <p className="muted">
                  Industry can review and accept projects for
                  collaboration and deployment.
                </p>

                <button
                  className="btn"
                  onClick={()=>setSelected(x)}
                >
                  View Opportunity →
                </button>
              </div>
            ))}
          </section>
        </>
      )}

      {tab==="solutions"&&(
        <section className="grid">
          {items.map(x=>(
            <div className="card" key={x.title}>
              <h3>{x.title}</h3>
              <p className="muted">
                Proposed by: {x.university}
              </p>

              <span className="pill">University Solution</span>
              <span className="pill">{x.category}</span>

              <p className="muted">{x.solution}</p>

              <button
                className="btn"
                onClick={()=>setSelected(x)}
              >
                Review Solution →
              </button>
            </div>
          ))}
        </section>
      )}

      {tab==="funds"&&(
        <section className="grid">
          <div className="card full">
            <div className="tag">GOVERNMENT CONTRACT</div>

            <h2>Government-funded project pipeline</h2>

            <p className="muted">
              Industry does not directly fund projects through this
              dashboard. Accepted projects can move forward through
              government contracts or administrative funding.
            </p>

            <span className="pill">Government Funding</span>
            <span className="pill">Contract Based</span>
            <span className="pill">Admin Review</span>
          </div>
        </section>
      )}

      {tab==="projects"&&(
        <section className="grid">
          {projects.length===0?
            <div className="card full">
              <h2>No accepted projects yet</h2>
              <p className="muted">
                Projects accepted by industry will appear here.
              </p>
            </div>
            :
            projects.map(x=>(
              <div className="card" key={x.title}>
                <h3>{x.title}</h3>

                <p className="muted">
                  University: {x.university}
                </p>

                <span className="pill">Industry Accepted</span>
                <span className="pill">Government Contract</span>

                <p className="muted">
                  <b>Status:</b> {x.status}
                </p>

                <p className="muted">
                  <b>Funding:</b> {x.funding}
                </p>
              </div>
            ))
          }
        </section>
      )}

      {tab==="history"&&(
        <section className="card">
          <div className="tag">PROJECT RECORD</div>

          <h2>Acceptance History</h2>

          {projects.length===0?
            <p className="muted">
              No projects accepted yet.
            </p>
            :
            projects.map(x=>(
              <p className="muted" key={x.title}>
                ✓ {x.title} — Industry accepted
              </p>
            ))
          }
        </section>
      )}

      {selected&&(
        <div className="modal">
          <div className="modalbox">
            <div className="tag">SOLUTION REVIEW</div>

            <h2>{selected.title}</h2>

            <p className="muted">
              <b>University:</b> {selected.university}
            </p>

            <p className="muted">
              <b>Category:</b> {selected.category}
            </p>

            <h3>Proposed Solution</h3>
            <p className="muted">
              {selected.solution}
            </p>

            <h3>Industry Support Needed</h3>
            <p className="muted">
              {selected.need}
            </p>

            <h3>Expected Impact</h3>
            <p className="muted">
              {selected.impact}
            </p>

            <span className="pill">Industry Review</span>
            <span className="pill">Government Contract</span>
            <span className="pill">Government Funding</span>

            <br/>

            <button
              className="btn"
              onClick={()=>acceptProject(selected)}
            >
              Accept Project →
            </button>

            <button
              className="btn close"
              onClick={()=>setSelected(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}