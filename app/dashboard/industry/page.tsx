"use client";

import { useState } from "react";
import Link from "next/link";

const items = [
  {
    title:"Rural Drinking Water Monitoring",
    university:"MVJ Engineering Innovation Lab",
    category:"Water & Sanitation",
    solution:"Low-cost sensors monitor water quality and alert communities when contamination is detected.",
    need:"Sensors, technical expertise and CSR support",
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
    need:"IoT expertise, equipment and CSR support",
    impact:"Improved local energy reliability."
  }
];

export default function IndustryDashboard(){
  const [tab,setTab]=useState("opportunities");
  const [selected,setSelected]=useState<any>(null);
  const [support,setSupport]=useState(false);
  const [amount,setAmount]=useState("");
  const [method,setMethod]=useState("UPI");
  const [projects,setProjects]=useState<string[]>([]);
  const [paid,setPaid]=useState(false);

  function startSupport(x:any){
    setSelected(x);
    setSupport(true);
    setPaid(false);
  }

  function completeSupport(){
    if(!amount || Number(amount)<=0){
      alert("Enter a valid support amount.");
      return;
    }

    setPaid(true);

    if(!projects.includes(selected.title)){
      setProjects([...projects,selected.title]);
    }
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
      input,select{width:100%;padding:12px;margin-top:7px;border-radius:9px;border:1px solid #40365b;background:#0e0b1b;color:white}
      label{display:block;margin-top:15px;font-size:13px;font-weight:bold}
      .close{background:#292240;color:white;margin-left:8px}
      @media(max-width:850px){.grid{grid-template-columns:1fr 1fr}}
      @media(max-width:600px){.grid{grid-template-columns:1fr}h1{font-size:37px}}
      `}</style>

      <header className="top">
        <div className="brand">✦ SolveBridge</div>
        <Link className="sign" href="/login">Sign out</Link>
      </header>

      <section className="intro">
        <div className="tag">INDUSTRY & CSR DASHBOARD</div>
        <h1>Turn innovation into impact.</h1>
        <p className="muted">
          Discover verified challenges, university solutions and opportunities
          to contribute funding, technology, mentorship and expertise.
        </p>
      </section>

      <div className="tabs">
        {[
          ["opportunities","Opportunities"],
          ["solutions","University Solutions"],
          ["funds","CSR Fund Pool"],
          ["projects","Active Projects"],
          ["history","Contribution History"]
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
                  Industry can provide mentors, tools or domain expertise.
                </p>
                <button className="btn" onClick={()=>setSelected(x)}>
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
              <p className="muted">Proposed by: {x.university}</p>
              <span className="pill">University Solution</span>
              <span className="pill">{x.category}</span>
              <p className="muted">{x.solution}</p>
              <button className="btn" onClick={()=>setSelected(x)}>
                Review Solution →
              </button>
            </div>
          ))}
        </section>
      )}

      {tab==="funds"&&(
        <section className="grid">
          <div className="card full">
            <div className="tag">CSR FUND POOL</div>
            <h2>Support urgent innovation projects</h2>
            <p className="muted">
              Companies can allocate CSR support toward verified projects.
              This prototype demonstrates the pledge and payment workflow.
            </p>
            <span className="pill">CSR Funding</span>
            <span className="pill">Auditable Support</span>
            <span className="pill">Project Impact</span>
            <br/>
            <button className="btn" onClick={()=>setSelected(items[0])}>
              Allocate CSR Support →
            </button>
          </div>
        </section>
      )}

      {tab==="projects"&&(
        <section className="grid">
          {projects.length===0?
            <div className="card full">
              <h2>No active projects yet</h2>
              <p className="muted">
                Supported university projects will appear here with
                milestones and impact tracking.
              </p>
            </div>
            :
            projects.map(x=>(
              <div className="card" key={x}>
                <h3>{x}</h3>
                <span className="pill">Supported</span>
                <span className="pill">Active</span>
                <p className="muted">
                  Funding/support initiated. Milestones and implementation
                  evidence can be tracked here.
                </p>
              </div>
            ))
          }
        </section>
      )}

      {tab==="history"&&(
        <section className="card">
          <div className="tag">IMPACT RECORD</div>
          <h2>Contribution History</h2>
          {projects.length===0?
            <p className="muted">No contributions recorded yet.</p>
            :
            projects.map(x=>(
              <p className="muted" key={x}>
                ✓ {x} — CSR/support initiated
              </p>
            ))
          }
        </section>
      )}

      {selected&&!support&&(
        <div className="modal">
          <div className="modalbox">
            <div className="tag">SOLUTION REVIEW</div>
            <h2>{selected.title}</h2>
            <p className="muted"><b>University:</b> {selected.university}</p>
            <p className="muted"><b>Category:</b> {selected.category}</p>

            <h3>Proposed Solution</h3>
            <p className="muted">{selected.solution}</p>

            <h3>Industry Support Needed</h3>
            <p className="muted">{selected.need}</p>

            <h3>Expected Impact</h3>
            <p className="muted">{selected.impact}</p>

            <span className="pill">CSR Funding</span>
            <span className="pill">Equipment</span>
            <span className="pill">Mentorship</span>
            <span className="pill">Technical Expertise</span>

            <br/>
            <button className="btn" onClick={()=>setSupport(true)}>
              Support This Solution →
            </button>
            <button className="btn close" onClick={()=>setSelected(null)}>
              Close
            </button>
          </div>
        </div>
      )}

      {selected&&support&&(
        <div className="modal">
          <div className="modalbox">
            <div className="tag">CSR SUPPORT</div>
            <h2>{selected.title}</h2>

            {!paid?(
              <>
                <p className="muted">
                  Select the support amount and payment method.
                  This is a prototype payment flow.
                </p>

                <label>Support Amount (₹)</label>
                <input
                  value={amount}
                  onChange={e=>setAmount(e.target.value)}
                  placeholder="Example: 25000"
                  type="number"
                />

                <label>Payment Method</label>
                <select
                  value={method}
                  onChange={e=>setMethod(e.target.value)}
                >
                  <option>UPI</option>
                  <option>Corporate Card</option>
                  <option>Net Banking</option>
                  <option>CSR Fund Pool</option>
                </select>

                <button className="btn" onClick={completeSupport}>
                  Confirm Support & Pay →
                </button>

                <button
                  className="btn close"
                  onClick={()=>{setSelected(null);setSupport(false)}}
                >
                  Cancel
                </button>
              </>
            ):(
              <>
                <h2>✓ Support Recorded</h2>
                <p className="muted">
                  CSR support of ₹{amount} has been recorded for this
                  prototype project.
                </p>
                <span className="pill">Payment: Simulated</span>
                <span className="pill">Method: {method}</span>
                <span className="pill">Project: Active</span>
                <br/>
                <button
                  className="btn"
                  onClick={()=>{
                    setSelected(null);
                    setSupport(false);
                    setTab("projects");
                  }}
                >
                  View Active Project →
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}