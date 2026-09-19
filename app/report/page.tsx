"use client";

import { useState } from "react";
import Link from "next/link";

const districts = [
  "Bagalkot","Ballari","Belagavi","Bengaluru Rural","Bengaluru Urban",
  "Bidar","Chamarajanagar","Chikkaballapur","Chikkamagaluru","Chitradurga",
  "Dakshina Kannada","Davanagere","Dharwad","Gadag","Kalaburagi",
  "Hassan","Haveri","Kodagu","Kolar","Koppal","Mandya","Mysuru",
  "Raichur","Ramanagara","Shivamogga","Tumakuru","Udupi",
  "Uttara Kannada","Vijayapura","Yadgir"
];

export default function ReportPage() {
  const [title,setTitle]=useState("");
  const [description,setDescription]=useState("");
  const [district,setDistrict]=useState("");
  const [locality,setLocality]=useState("");
  const [category,setCategory]=useState("");
  const [urgency,setUrgency]=useState("");
  const [submitted,setSubmitted]=useState(false);

  function submit(e:React.FormEvent){
    e.preventDefault();
    if(!title||!description||!district||!category||!urgency)return;

    const id=Date.now();

    const challenge={
      id,title,description,
      location:`${locality ? locality+", " : ""}${district}, Karnataka`,
      category,urgency,status:"Submitted"
    };

    const old=JSON.parse(
      localStorage.getItem("solvebridge_challenges")||"[]"
    );

    localStorage.setItem(
      "solvebridge_challenges",
      JSON.stringify([challenge,...old])
    );

    localStorage.setItem("solvebridge_last_challenge",String(id));
    setSubmitted(true);
  }

  if(submitted){
    return(
      <main className="success">
        <style>{`
          .success{min-height:100vh;background:#090713;color:white;
          display:flex;align-items:center;justify-content:center;
          padding:25px;font-family:Arial}
          .box{max-width:650px;padding:45px;background:#151127;
          border:1px solid #392f55;border-radius:24px;text-align:center}
          h1{font-size:40px}
          p{color:#aaa5b8;line-height:1.7}
          a{display:inline-block;margin:8px;padding:14px 20px;
          border-radius:10px;text-decoration:none;font-weight:bold}
          .track{background:#ffe7d1;color:#17111d}
          .back{border:1px solid #4a3b70;color:white}
        `}</style>

        <div className="box">
          <h1>✓ Challenge Submitted</h1>

          <p>
            Your challenge has been recorded successfully.
            You can now follow its journey through SolveBridge.
          </p>

          <Link className="track" href="/track">
            Track Challenge Status →
          </Link>

          <Link className="back" href="/dashboard/citizen">
            Back to Dashboard
          </Link>
        </div>
      </main>
    );
  }

  return(
    <main className="page">
      <style>{`
        *{box-sizing:border-box}
        .page{min-height:100vh;background:
        radial-gradient(circle at 80% 5%,#392064,transparent 32%),#090713;
        color:white;padding:35px 7%;font-family:Arial}
        .top{display:flex;justify-content:space-between;margin-bottom:55px}
        .brand{font-size:21px;font-weight:bold}
        .back{color:#aaa5b8;text-decoration:none}
        .intro{max-width:850px}
        .tag{color:#a994ff;font-size:12px;letter-spacing:2px;font-weight:bold}
        h1{font-size:clamp(38px,5vw,58px);line-height:1.08;margin:12px 0}
        .intro p{color:#aaa5b8;line-height:1.7}
        .form{max-width:850px;margin-top:30px;padding:30px;
        background:#151127;border:1px solid #30274a;border-radius:22px}
        .grid{display:grid;grid-template-columns:1fr 1fr;gap:18px}
        .full{grid-column:1/-1}
        label{display:block;margin-bottom:7px;font-size:13px;font-weight:bold}
        input,textarea,select{width:100%;padding:13px;
        border:1px solid #3a3151;border-radius:10px;
        background:#0e0b1b;color:white;font:inherit}
        textarea{min-height:125px;resize:vertical}
        button{margin-top:20px;padding:14px 22px;border:0;
        border-radius:10px;background:#ffe7d1;color:#17111d;
        font-weight:bold;cursor:pointer}
        .note{padding:15px;border-radius:12px;background:#1c1532;
        color:#aaa5b8;font-size:13px;line-height:1.5}
        @media(max-width:650px){
          .grid{grid-template-columns:1fr}.full{grid-column:auto}
        }
      `}</style>

      <header className="top">
        <div className="brand">✦ SolveBridge</div>
        <Link className="back" href="/dashboard/citizen">
          ← Citizen Dashboard
        </Link>
      </header>

      <section className="intro">
        <div className="tag">START WITH THE PROBLEM</div>
        <h1>Report a Challenge</h1>
        <p>
          Describe a real-world problem. SolveBridge will structure it
          for analysis, verification and university collaboration.
        </p>
      </section>

      <form className="form grid" onSubmit={submit}>

        <div className="full">
          <label>Problem Title *</label>
          <input value={title}
            onChange={e=>setTitle(e.target.value)}
            placeholder="Example: Rural drinking water contamination"
            required/>
        </div>

        <div className="full">
          <label>Problem Description *</label>
          <textarea value={description}
            onChange={e=>setDescription(e.target.value)}
            placeholder="Describe the problem and who is affected..."
            required/>
        </div>

        <div>
          <label>State *</label>
          <select defaultValue="Karnataka">
            <option>Karnataka</option>
          </select>
        </div>

        <div>
          <label>District *</label>
          <select value={district}
            onChange={e=>setDistrict(e.target.value)} required>
            <option value="">Select district</option>
            {districts.map(d=><option key={d}>{d}</option>)}
          </select>
        </div>

        <div>
          <label>Locality / Area</label>
          <input value={locality}
            onChange={e=>setLocality(e.target.value)}
            placeholder="Village / Town / Area"/>
        </div>

        <div>
          <label>Category *</label>
          <select value={category}
            onChange={e=>setCategory(e.target.value)} required>
            <option value="">Select category</option>
            <option>Water & Sanitation</option>
            <option>Healthcare</option>
            <option>Education</option>
            <option>Waste Management</option>
            <option>Transportation</option>
            <option>Energy</option>
            <option>Agriculture</option>
            <option>Environment</option>
            <option>Infrastructure</option>
            <option>Public Safety</option>
          </select>
        </div>

        <div>
          <label>Urgency *</label>
          <select value={urgency}
            onChange={e=>setUrgency(e.target.value)} required>
            <option value="">Select urgency</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Critical</option>
          </select>
        </div>

        <div>
          <label>Evidence / Photo</label>
          <input type="file" accept="image/*,.pdf"/>
        </div>

        <div className="full">
          <div className="note">
            After submission: AI Analysis → Duplicate Detection →
            Verification → University Matching
          </div>

          <button type="submit">
            Submit Challenge →
          </button>
        </div>

      </form>
    </main>
  );
}