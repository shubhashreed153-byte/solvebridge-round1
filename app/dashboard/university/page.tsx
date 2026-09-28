"use client";

import { useEffect, useState } from "react";

const challenges = [
  ["Rural Drinking Water Monitoring","Kalaburagi, Karnataka","Water & Environment",92,"Villages need low-cost drinking-water quality monitoring.","IoT, Sensors, Embedded Systems"],
  ["Smart Waste Segregation","Bengaluru, Karnataka","Environment",86,"Improve recyclable and non-recyclable waste segregation.","AI, Computer Vision, IoT"],
  ["Reliable Rural Energy","Raichur, Karnataka","Energy",81,"Monitor renewable-energy systems in rural areas.","Sensors, Embedded Systems, Power Electronics"],
];

const industries = ["AquaTech Solutions","GreenGrid Industries","TechNova Systems"];
const supports = ["Equipment","Mentorship","Technical Expertise"];

export default function UniversityDashboard() {
  const [tab,setTab]=useState("matches");
  const [projects,setProjects]=useState<any[]>([]);
  const [selected,setSelected]=useState<any>(null);
  const [industry,setIndustry]=useState("");
  const [support,setSupport]=useState<string[]>([]);
  const [profile,setProfile]=useState({
    university:"",department:"",labs:"",skills:"",experience:"",capacity:""
  });

  useEffect(()=>{
    const p=localStorage.getItem("solvebridge_uni_v4_projects");
    const r=localStorage.getItem("solvebridge_uni_v4_profile");
    if(p)setProjects(JSON.parse(p));
    if(r)setProfile({...profile,...JSON.parse(r)});
  },[]);

  function save(p:any[]){
    setProjects(p);
    localStorage.setItem("solvebridge_uni_v4_projects",JSON.stringify(p));
  }

  function accept(c:any){
    if(projects.some(p=>p.id===c.id))return alert("Already accepted.");
    save([...projects,{
      id:c.id,title:c.title,location:c.location,problem:c.problem,
      team:[],solution:"",milestones:[],submitted:false,
      industry:"",support:[],impact:""
    }]);
    setSelected(null);setTab("projects");
  }

  function update(id:number,data:any){
    save(projects.map(p=>p.id===id?{...p,...data}:p));
  }

  function toggle(x:string){
    setSupport(s=>s.includes(x)?s.filter(a=>a!==x):[...s,x]);
  }

  function sendSupport(p:any){
    if(!p.submitted)return alert("Submit the solution first.");
    if(!industry)return alert("Select an industry.");
    if(!support.length)return alert("Select support required.");

    update(p.id,{industry,support});

    const old=JSON.parse(
      localStorage.getItem("solvebridge_industry_requests")||"[]"
    );

    localStorage.setItem(
      "solvebridge_industry_requests",
      JSON.stringify([...old,{
        project:p.title,solution:p.solution,industry,support,
        status:"Awaiting Industry Review"
      }])
    );

    setIndustry("");setSupport([]);
    alert("✓ Support request sent.");
  }

  function saveProfile(){
    localStorage.setItem(
      "solvebridge_uni_v4_profile",
      JSON.stringify(profile)
    );
    alert("✓ Profile saved.");
  }

  return(
    <main>
      <header>
        <div>
          <h1>University Dashboard</h1>
          <p>Discover • Collaborate • Build • Create Impact</p>
        </div>
        <button onClick={()=>location.href="/login"}>Sign Out</button>
      </header>

      <nav>
        {[
          ["matches","Challenges"],
          ["projects","My Projects"],
          ["workspace","Workspace"],
          ["industries","Industries"],
          ["support","Support & Impact"],
          ["profile","Capability Profile"]
        ].map(x=>
          <button key={x[0]} onClick={()=>setTab(x[0])}>{x[1]}</button>
        )}
      </nav>

      {tab==="matches"&&
        <section>
          <h2>AI-Matched Challenges</h2>
          <div className="grid">
            {challenges.map((c:any,i)=>
              <article key={i}>
                <small>{c[2]}</small>
                <h3>{c[0]}</h3>
                <p>{c[1]}</p>
                <strong>{c[3]}% Match</strong>
                <p>{c[4]}</p>
                <button onClick={()=>setSelected(c)}>View Challenge</button>
              </article>
            )}
          </div>
        </section>
      }

      {tab==="projects"&&
        <section>
          <h2>My Projects</h2>
          {!projects.length&&<p>No projects yet.</p>}
          {projects.map(p=>
            <article key={p.id}>
              <h3>{p.title}</h3>
              <p>{p.location}</p>
              <p>✓ Challenge accepted</p>
              <p>{p.team.length?"✓":"○"} Team formation</p>
              <p>{p.submitted?"✓":"○"} Solution development</p>
              <p>{p.industry?"✓":"○"} Industry support</p>
              <button onClick={()=>setTab("workspace")}>Open Project</button>
            </article>
          )}
        </section>
      }

      {tab==="workspace"&&
        <section>
          <h2>Solution Workspace</h2>
          {projects.map(p=>
            <article key={p.id}>
              <h3>{p.title}</h3>
              <p><b>Problem:</b> {p.problem}</p>
              <input placeholder="Team members"/>
              <textarea
                placeholder="Describe proposed solution..."
                value={p.solution}
                onChange={e=>update(p.id,{solution:e.target.value})}
              />
              <input placeholder="Milestone"/>
              <button onClick={()=>{
                if(!p.solution.trim())return alert("Enter solution.");
                update(p.id,{submitted:true});
                alert("✓ Solution submitted.");
              }}>
                {p.submitted?"✓ Submitted":"Submit Solution"}
              </button>
            </article>
          )}
        </section>
      }

      {tab==="industries"&&
        <section>
          <h2>Industry Partners</h2>
          <div className="grid">
            {industries.map(x=>
              <article key={x}>
                <h3>{x}</h3>
                <p>Collaborate on university projects.</p>
                <button onClick={()=>alert(x+"\n\nIndustry Partner")}>
                  View Opportunity
                </button>
              </article>
            )}
          </div>
        </section>
      }

      {tab==="support"&&
        <section>
          <h2>Support & Impact</h2>
          {projects.map(p=>
            <article key={p.id}>
              <h3>{p.title}</h3>
              <p>{p.solution||"Solution not submitted."}</p>

              <select value={industry} onChange={e=>setIndustry(e.target.value)}>
                <option value="">Select Industry</option>
                {industries.map(x=><option key={x}>{x}</option>)}
              </select>

              <b>Support Required</b>
              {supports.map(x=>
                <label key={x}>
                  <input
                    type="checkbox"
                    checked={support.includes(x)}
                    onChange={()=>toggle(x)}
                  /> {x}
                </label>
              )}

              <button onClick={()=>sendSupport(p)}>
                Send Support Request
              </button>

              {p.industry&&
                <p>
                  ✓ Request Sent<br/>
                  Industry: {p.industry}<br/>
                  Support: {p.support.join(", ")}
                </p>
              }
            </article>
          )}
        </section>
      }

      {tab==="profile"&&
        <section>
          <h2>Capability Profile</h2>
          <article>
            {Object.keys(profile).map(k=>
              <div key={k}>
                <label>
                  {k==="university"?"College / University Name":
                   k==="experience"?"Past Projects":
                   k.replace(/^\w/,x=>x.toUpperCase())}
                </label>
                <input
                  value={profile[k as keyof typeof profile]}
                  onChange={e=>setProfile({...profile,[k]:e.target.value})}
                />
              </div>
            )}
            <button onClick={saveProfile}>Save Capability Profile</button>
          </article>
        </section>
      }

      {selected&&
        <div className="overlay">
          <article className="modal">
            <h2>{selected[0]}</h2>
            <p>{selected[1]}</p>
            <p>{selected[4]}</p>
            <p><b>Skills:</b> {selected[5]}</p>
            <strong>{selected[3]}% Match</strong>
            <button onClick={()=>accept({
              id:Date.now(),title:selected[0],location:selected[1],
              problem:selected[4]
            })}>Accept Challenge</button>
            <button onClick={()=>setSelected(null)}>Close</button>
          </article>
        </div>
      }

      <style jsx>{`
        main{min-height:100vh;padding:28px;color:#f7f2ff;background:
        radial-gradient(circle at 10% 10%,#321650,transparent 35%),
        #100b19;font-family:Arial}
        header,nav,section{max-width:1100px;margin:auto}
        header{display:flex;justify-content:space-between}
        nav{display:flex;gap:7px;flex-wrap:wrap;margin:25px auto}
        button{padding:10px 14px;border:1px solid #9d8ab8;border-radius:9px;
        background:#292039;color:white;cursor:pointer}
        .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(270px,1fr));gap:15px}
        article{padding:20px;margin-bottom:15px;border-radius:16px;
        background:#ffffff0d;border:1px solid #ffffff1c}
        input,textarea,select{width:100%;box-sizing:border-box;padding:11px;
        margin:6px 0 12px;border-radius:8px;border:1px solid #ffffff20}
        textarea{min-height:100px}
        label{display:block;margin:10px 0}
        .overlay{position:fixed;inset:0;background:#000b;display:flex;
        align-items:center;justify-content:center;padding:20px}
        .modal{max-width:550px;width:100%;background:#21142d}
      `}</style>
    </main>
  );
}