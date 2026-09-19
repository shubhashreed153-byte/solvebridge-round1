"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Challenge = {
  id: number;
  title: string;
  location: string;
  category: string;
  urgency: string;
  status: string;
};

const publicChallenges = [
  ["Rural drinking water contamination","Karnataka","Water & Sanitation","High"],
  ["School waste segregation","Karnataka","Waste Management","Medium"],
  ["Reliable rural energy","Karnataka","Energy","High"],
];

export default function CitizenDashboard() {
  const [tab, setTab] = useState("overview");
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  useEffect(() => {
    try {
      const data = localStorage.getItem("solvebridge_challenges");
      if (data) setChallenges(JSON.parse(data));
    } catch {}
  }, []);

  return (
    <main className="citizenPage">
      <style>{`
        .citizenPage{
          min-height:100vh!important;
          width:100%!important;
          padding:38px 7%!important;
          background:
            radial-gradient(circle at 80% 10%,#382064,transparent 32%),
            #090713!important;
          color:#fff!important;
          font-family:Arial,sans-serif!important;
        }

        .citizenPage *{box-sizing:border-box}

        .citizenTop{
          display:flex!important;
          justify-content:space-between!important;
          align-items:center!important;
          margin-bottom:60px!important;
        }

        .citizenBrand{
          font-size:21px!important;
          font-weight:700!important;
        }

        .citizenSign{
          color:#aaa5b8!important;
          text-decoration:none!important;
        }

        .citizenHero{
          display:block!important;
          width:100%!important;
          max-width:1000px!important;
        }

        .citizenTag{
          color:#a994ff!important;
          font-size:12px!important;
          letter-spacing:2px!important;
          font-weight:700!important;
        }

        .citizenTitle{
          display:block!important;
          width:100%!important;
          max-width:900px!important;
          margin:14px 0!important;
          font-family:Arial,sans-serif!important;
          font-size:52px!important;
          line-height:1.12!important;
          font-weight:700!important;
          letter-spacing:-1px!important;
          white-space:normal!important;
          word-break:normal!important;
          overflow-wrap:normal!important;
        }

        .citizenHeroText{
          max-width:720px!important;
          color:#aaa5b8!important;
          line-height:1.7!important;
          font-size:16px!important;
        }

        .citizenBanner{
          margin:35px 0 25px!important;
          padding:28px!important;
          border:1px solid #493b70!important;
          border-radius:22px!important;
          background:linear-gradient(110deg,#17122d,#21174a)!important;
          display:flex!important;
          justify-content:space-between!important;
          align-items:center!important;
          gap:25px!important;
        }

        .citizenBanner h2{
          margin:0 0 8px!important;
          font-size:24px!important;
        }

        .citizenBanner p{
          margin:0!important;
          color:#aaa5b8!important;
        }

        .citizenBtn{
          display:inline-block!important;
          background:#ffe7d1!important;
          color:#17111d!important;
          padding:14px 20px!important;
          border-radius:11px!important;
          text-decoration:none!important;
          font-weight:700!important;
          white-space:nowrap!important;
        }

        .citizenTabs{
          display:flex!important;
          gap:10px!important;
          margin:25px 0!important;
        }

        .citizenTab{
          border:1px solid #39304f!important;
          background:#151127!important;
          color:#aaa5b8!important;
          padding:11px 19px!important;
          border-radius:20px!important;
          cursor:pointer!important;
          font-size:14px!important;
        }

        .citizenTabActive{
          background:#ded4ff!important;
          color:#17111d!important;
        }

        .citizenSection{
          margin-top:20px!important;
          padding:30px!important;
          border:1px solid #30274a!important;
          border-radius:22px!important;
          background:#121022!important;
        }

        .citizenSection h2{
          margin-top:0!important;
          font-size:26px!important;
        }

        .citizenMuted{
          color:#aaa5b8!important;
          line-height:1.7!important;
        }

        .citizenJourney{
          display:grid!important;
          grid-template-columns:repeat(5,1fr)!important;
          gap:12px!important;
          margin-top:25px!important;
        }

        .citizenStep{
          padding:20px!important;
          border:1px solid #30274a!important;
          border-radius:16px!important;
          background:#171329!important;
        }

        .citizenStep b{
          display:block!important;
          margin-bottom:9px!important;
        }

        .citizenStep span{
          color:#aaa5b8!important;
          font-size:13px!important;
          line-height:1.5!important;
        }

        .citizenCards{
          display:grid!important;
          grid-template-columns:repeat(3,1fr)!important;
          gap:15px!important;
          margin-top:20px!important;
        }

        .citizenCard{
          padding:22px!important;
          border:1px solid #30274a!important;
          border-radius:18px!important;
          background:#151127!important;
        }

        .citizenCard h3{
          margin-top:0!important;
          line-height:1.4!important;
        }

        .citizenSmall{
          color:#aaa5b8!important;
          font-size:13px!important;
        }

        .citizenPill{
          display:inline-block!important;
          margin:12px 5px 0 0!important;
          padding:6px 9px!important;
          border-radius:15px!important;
          background:#292240!important;
          color:#d9d0ee!important;
          font-size:11px!important;
        }

        .citizenEmpty{
          text-align:center!important;
          padding:40px 20px!important;
          border:1px dashed #403657!important;
          border-radius:18px!important;
          margin-top:20px!important;
        }

        .citizenEmpty p{
          color:#aaa5b8!important;
        }

        @media(max-width:850px){
          .citizenJourney{grid-template-columns:1fr 1fr!important}
          .citizenCards{grid-template-columns:1fr 1fr!important}
        }

        @media(max-width:600px){
          .citizenPage{padding:25px 5%!important}
          .citizenBanner{
            flex-direction:column!important;
            align-items:flex-start!important;
          }
          .citizenJourney,.citizenCards{
            grid-template-columns:1fr!important;
          }
          .citizenTitle{
            font-size:40px!important;
          }
        }
      `}</style>

      <header className="citizenTop">
        <div className="citizenBrand">✦ SolveBridge</div>
        <Link className="citizenSign" href="/login">Sign out</Link>
      </header>

      <section className="citizenHero">
        <div className="citizenTag">CITIZEN DASHBOARD</div>

        <h1 className="citizenTitle">
          Your problems deserve a pathway.
        </h1>

        <p className="citizenHeroText">
          Report real-world challenges and follow their journey from
          community discovery to verification, collaboration and impact.
        </p>
      </section>

      <section className="citizenBanner">
        <div>
          <h2>Have a problem in your community?</h2>
          <p>
            Tell us what is happening and let SolveBridge structure the
            challenge for collaboration.
          </p>
        </div>

        <Link className="citizenBtn" href="/report">
          Report a Challenge →
        </Link>
      </section>

      <nav className="citizenTabs">
        <button
          className={`citizenTab ${tab === "overview" ? "citizenTabActive" : ""}`}
          onClick={() => setTab("overview")}
        >
          Overview
        </button>

        <button
          className={`citizenTab ${tab === "mine" ? "citizenTabActive" : ""}`}
          onClick={() => setTab("mine")}
        >
          My Challenges
        </button>

        <button
          className={`citizenTab ${tab === "public" ? "citizenTabActive" : ""}`}
          onClick={() => setTab("public")}
        >
          Public Feed
        </button>
      </nav>

      {tab === "overview" && (
        <section className="citizenSection">
          <h2>How SolveBridge works</h2>

          <p className="citizenMuted">
            SolveBridge takes a real-world problem and creates a pathway
            toward people and institutions that can help solve it.
          </p>

          <div className="citizenJourney">
            <div className="citizenStep">
              <b>01 · Report</b>
              <span>Describe the real-world problem.</span>
            </div>

            <div className="citizenStep">
              <b>02 · Analyse</b>
              <span>Identify the problem and requirements.</span>
            </div>

            <div className="citizenStep">
              <b>03 · Verify</b>
              <span>Review the challenge before collaboration.</span>
            </div>

            <div className="citizenStep">
              <b>04 · Match</b>
              <span>Find relevant university capabilities.</span>
            </div>

            <div className="citizenStep">
              <b>05 · Impact</b>
              <span>Track progress toward implementation.</span>
            </div>
          </div>

          <div style={{marginTop:30}}>
            <h2>Start with a real problem</h2>

            <p className="citizenMuted">
              Water, healthcare, education, waste, energy, agriculture,
              infrastructure and other community challenges can be submitted.
            </p>

            <Link className="citizenBtn" href="/report">
              Report Your Challenge →
            </Link>
          </div>
        </section>
      )}

      {tab === "mine" && (
        <section className="citizenSection">
          <h2>My Challenges</h2>

          <p className="citizenMuted">
            Challenges you submit will appear here.
          </p>

          {challenges.length === 0 ? (
            <div className="citizenEmpty">
              <h3>No challenges submitted yet</h3>
              <p>Start by reporting a problem from your community.</p>

              <Link className="citizenBtn" href="/report">
                Report a Challenge →
              </Link>
            </div>
          ) : (
            <div className="citizenCards">
              {challenges.map((c) => (
                <div className="citizenCard" key={c.id}>
                  <h3>{c.title}</h3>
                  <div className="citizenSmall">{c.location}</div>

                  <span className="citizenPill">{c.category}</span>
                  <span className="citizenPill">{c.urgency} urgency</span>

                  <div>
                    <span className="citizenPill">{c.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {tab === "public" && (
        <section className="citizenSection">
          <h2>Public Challenge Feed</h2>

          <p className="citizenMuted">
            Explore community problems that can be taken forward through
            university and industry collaboration.
          </p>

          <div className="citizenCards">
            {publicChallenges.map((c) => (
              <div className="citizenCard" key={c[0]}>
                <h3>{c[0]}</h3>
                <div className="citizenSmall">{c[1]}</div>

                <span className="citizenPill">{c[2]}</span>
                <span className="citizenPill">{c[3]} urgency</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}