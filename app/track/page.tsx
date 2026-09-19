"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function TrackPage() {
  const [challenge, setChallenge] = useState<any>(null);

  useEffect(() => {
    const id = localStorage.getItem("solvebridge_last_challenge");
    const data = JSON.parse(
      localStorage.getItem("solvebridge_challenges") || "[]"
    );

    const found = data.find((c:any) => String(c.id) === id);
    if (found) setChallenge(found);
  }, []);

  if (!challenge) {
    return (
      <main className="page">
        <style>{`
          .page{
            min-height:100vh;background:#090713;color:white;
            display:flex;align-items:center;justify-content:center;
            font-family:Arial;padding:30px
          }
          .box{
            padding:40px;background:#151127;border:1px solid #30274a;
            border-radius:22px;text-align:center
          }
          a{
            display:inline-block;margin-top:20px;padding:13px 20px;
            background:#ffe7d1;color:#17111d;border-radius:10px;
            text-decoration:none;font-weight:bold
          }
        `}</style>

        <div className="box">
          <h2>No challenge selected</h2>
          <p>Submit a challenge first to track its status.</p>
          <Link href="/report">Report a Challenge →</Link>
        </div>
      </main>
    );
  }

  const steps = [
    ["✓","Challenge Submitted","Your problem was received.","done"],
    ["2","AI Analysis","Problem structure and requirements are identified.","current"],
    ["3","Duplicate Detection","Related challenges are checked.",""],
    ["4","Verification","Challenge is reviewed before collaboration.",""],
    ["5","University Matching","Relevant university capabilities are identified.",""],
    ["6","Solution Development","A selected team works toward a solution.",""],
    ["7","Impact","Implementation and measurable results are tracked.",""]
  ];

  return (
    <main className="page">
      <style>{`
        *{box-sizing:border-box}
        .page{
          min-height:100vh;
          background:radial-gradient(circle at 80% 5%,#392064,transparent 32%),#090713;
          color:white;padding:35px 7%;font-family:Arial
        }
        .top{
          display:flex;justify-content:space-between;align-items:center;
          margin-bottom:55px
        }
        .brand{font-size:21px;font-weight:bold}
        .back{color:#aaa5b8;text-decoration:none}
        .tag{color:#a994ff;font-size:12px;letter-spacing:2px;font-weight:bold}
        h1{font-size:48px;margin:12px 0}
        .intro p{color:#aaa5b8;line-height:1.6}
        .info{
          margin-top:30px;padding:25px;background:#151127;
          border:1px solid #30274a;border-radius:20px
        }
        .info h2{margin-top:0}
        .meta{color:#aaa5b8;font-size:14px}
        .timeline{
          margin-top:25px;padding:25px;background:#151127;
          border:1px solid #30274a;border-radius:20px
        }
        .step{
          display:flex;gap:18px;padding:20px 0;
          border-bottom:1px solid #29223d
        }
        .step:last-child{border-bottom:0}
        .circle{
          width:35px;height:35px;border-radius:50%;
          display:flex;align-items:center;justify-content:center;
          background:#292240;flex:none;font-weight:bold
        }
        .done .circle{background:#b9a8ff;color:#17111d}
        .current .circle{background:#ffe7d1;color:#17111d}
        .step h3{margin:0 0 5px}
        .step p{margin:0;color:#aaa5b8;font-size:13px;line-height:1.5}
        .bottom{margin-top:25px}
        .btn{
          display:inline-block;padding:13px 20px;background:#ffe7d1;
          color:#17111d;border-radius:10px;text-decoration:none;font-weight:bold
        }
        @media(max-width:600px){h1{font-size:38px}}
      `}</style>

      <header className="top">
        <div className="brand">✦ SolveBridge</div>
        <Link className="back" href="/dashboard/citizen">
          ← Citizen Dashboard
        </Link>
      </header>

      <div className="tag">CHALLENGE TRACKING</div>

      <h1>Track your challenge</h1>

      <div className="info">
        <h2>{challenge.title}</h2>
        <div className="meta">
          {challenge.location} · {challenge.category} · {challenge.urgency} urgency
        </div>
      </div>

      <section className="timeline">
        {steps.map((s,i)=>(
          <div className={`step ${s[3]}`} key={i}>
            <div className="circle">{s[0]}</div>

            <div>
              <h3>{s[1]}</h3>
              <p>{s[2]}</p>
            </div>
          </div>
        ))}
      </section>

      <div className="bottom">
        <Link className="btn" href="/dashboard/citizen">
          Back to Dashboard
        </Link>
      </div>
    </main>
  );
}