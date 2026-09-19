"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const roles = [
  {
    id: "Citizen",
    title: "Citizen",
    text: "Report challenges & track impact",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "University",
    title: "University",
    text: "Research, collaborate & build solutions",
    image:
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "Industry",
    title: "Industry",
    text: "Support innovation through expertise & CSR",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "Admin / Government",
    title: "Admin / Government",
    text: "Verify, coordinate & monitor impact",
    image:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=900&q=80",
  },
];

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  function login() {
    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    if (!role) {
      setError("Please select your pathway.");
      return;
    }

    localStorage.setItem(
      "solvebridge_user",
      JSON.stringify({
        email,
        role,
        loggedIn: true,
      })
    );

    const paths: Record<string, string> = {
      Citizen: "/dashboard/citizen",
      University: "/dashboard/university",
      Industry: "/dashboard/industry",
      "Admin / Government": "/dashboard/admin",
    };

    router.push(paths[role]);
  }

  return (
    <main className="page">
      <div className="bgGlow" />

      <div className="wrap">
        <header>
          <button className="back" onClick={() => router.push("/")}>
            ← Back
          </button>

          <div className="brand">
            Solve<span>Bridge</span>
          </div>
        </header>

        <section className="heading">
          <div className="eyebrow">SOLVEBRIDGE PLATFORM</div>
          <h1>Sign in to your pathway</h1>
          <p>
            One platform. Four pathways. One bridge from real-world problems
            to meaningful solutions.
          </p>
        </section>

        <section className="form">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
          />
        </section>

        <div className="choose">CHOOSE YOUR PATHWAY</div>

        <section className="cards">
          {roles.map((r) => (
            <button
              key={r.id}
              className={`card ${role === r.id ? "active" : ""}`}
              onClick={() => {
                setRole(r.id);
                setError("");
              }}
            >
              <img src={r.image} alt={r.title} />

              <div className="overlay" />

              <div className="cardContent">
                <div className="number">
                  0{roles.indexOf(r) + 1}
                </div>

                <div>
                  <h2>{r.title}</h2>
                  <p>{r.text}</p>
                </div>

                <div className="arrow">
                  {role === r.id ? "✓" : "↗"}
                </div>
              </div>
            </button>
          ))}
        </section>

        {error && <div className="error">{error}</div>}

        <button className="continue" onClick={login}>
          {role
            ? `CONTINUE AS ${role.toUpperCase()}  →`
            : "SELECT A PATHWAY  →"}
        </button>

        <p className="bottom">
          Your pathway determines the workspace and tools you can access.
        </p>
      </div>

      <style jsx>{`
        .page {
          min-height: 100vh;
          background:
            radial-gradient(
              circle at 50% 15%,
              rgba(93, 65, 125, 0.28),
              transparent 38%
            ),
            linear-gradient(135deg, #0c0911, #171020 50%, #0b0810);
          color: #f6f1fb;
          padding: 28px 24px 45px;
          box-sizing: border-box;
          overflow-x: hidden;
        }

        .bgGlow {
          position: fixed;
          width: 500px;
          height: 500px;
          left: 50%;
          top: 5%;
          transform: translateX(-50%);
          background: #73519b;
          opacity: 0.08;
          filter: blur(120px);
          pointer-events: none;
        }

        .wrap {
          position: relative;
          z-index: 2;
          max-width: 1050px;
          margin: auto;
        }

        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 55px;
        }

        .back {
          border: 0;
          background: transparent;
          color: #aaa0b8;
          cursor: pointer;
          font-size: 14px;
        }

        .brand {
          font-size: 22px;
          font-weight: 800;
        }

        .brand span {
          color: #a995bd;
        }

        .heading {
          text-align: center;
          max-width: 720px;
          margin: auto;
        }

        .eyebrow {
          font-size: 10px;
          letter-spacing: 3px;
          font-weight: 700;
          color: #a891bb;
          margin-bottom: 14px;
        }

        h1 {
          margin: 0;
          font-size: clamp(34px, 5vw, 52px);
          letter-spacing: -1.8px;
          line-height: 1.05;
        }

        .heading p {
          color: #aaa0b5;
          line-height: 1.6;
          margin: 18px auto 28px;
          max-width: 600px;
        }

        .form {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          max-width: 650px;
          margin: auto;
        }

        input {
          width: 100%;
          box-sizing: border-box;
          padding: 14px 16px;
          border-radius: 12px;
          border: 1px solid #4d4059;
          background: rgba(24, 17, 31, 0.9);
          color: #fff;
          outline: none;
        }

        input:focus {
          border-color: #8e79a5;
          box-shadow: 0 0 18px rgba(130, 100, 160, 0.12);
        }

        input::placeholder {
          color: #817688;
        }

        .choose {
          margin: 30px 0 13px;
          font-size: 10px;
          letter-spacing: 2px;
          color: #91849b;
          font-weight: 700;
        }

        .cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }

        .card {
          position: relative;
          height: 185px;
          overflow: hidden;
          border-radius: 17px;
          border: 1px solid #3d3248;
          padding: 0;
          cursor: pointer;
          text-align: left;
          background: #18111f;
          transition: 0.25s ease;
        }

        .card:hover {
          transform: translateY(-3px);
          border-color: #79668c;
        }

        .card.active {
          border-color: #b09bc5;
          box-shadow:
            0 0 0 1px rgba(176, 155, 197, 0.3),
            0 15px 45px rgba(90, 60, 115, 0.2);
          transform: translateY(-3px);
        }

        .card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: saturate(0.65);
          transition: 0.4s;
        }

        .card:hover img,
        .card.active img {
          transform: scale(1.04);
          filter: saturate(0.8);
        }

        .overlay {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(
              90deg,
              rgba(10, 7, 14, 0.92),
              rgba(17, 11, 24, 0.58),
              rgba(15, 10, 20, 0.3)
            );
        }

        .cardContent {
          position: absolute;
          inset: 0;
          padding: 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .number {
          font-size: 11px;
          color: #c0aecb;
          letter-spacing: 1px;
        }

        .card h2 {
          margin: 0 0 5px;
          font-size: 22px;
          color: white;
        }

        .card p {
          margin: 0;
          color: #d0c6d6;
          font-size: 12px;
          max-width: 280px;
          line-height: 1.45;
        }

        .arrow {
          position: absolute;
          right: 18px;
          bottom: 18px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid #8d789d;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #eee7f3;
          background: rgba(20, 14, 27, 0.45);
        }

        .error {
          text-align: center;
          color: #ffaaaa;
          font-size: 13px;
          margin-top: 18px;
        }

        .continue {
          display: block;
          margin: 22px auto 0;
          padding: 14px 27px;
          border-radius: 12px;
          border: 1px solid #9d8ab8;
          background: #292039;
          color: #f4efff;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.4px;
          cursor: pointer;
          transition: 0.2s;
        }

        .continue:hover {
          background: #3a2c50;
          transform: translateY(-1px);
        }

        .bottom {
          text-align: center;
          color: #70677a;
          font-size: 11px;
          margin-top: 15px;
        }

        @media (max-width: 700px) {
          .cards,
          .form {
            grid-template-columns: 1fr;
          }

          .card {
            height: 155px;
          }

          header {
            margin-bottom: 40px;
          }
        }
      `}</style>
    </main>
  );
}