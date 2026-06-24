import { useEffect, useState } from "react";
import "./App.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

function App() {
  const [incidents, setIncidents] = useState([]);
  const [health, setHealth] = useState("unknown");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadDashboard() {
    try {
      setLoading(true);
      setError("");

      const [healthResponse, incidentsResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/health/ready`),
        fetch(`${API_BASE_URL}/api/incidents`)
      ]);

      if (!healthResponse.ok) {
        throw new Error("Backend readiness check failed");
      }

      if (!incidentsResponse.ok) {
        throw new Error("Incidents API request failed");
      }

      const healthData = await healthResponse.json();
      const incidentsData = await incidentsResponse.json();

      setHealth(healthData.status);
      setIncidents(incidentsData.data || []);
    } catch (err) {
      setError(err.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  return (
    <main className="app-shell">
      <section className="hero">
        <div>
          <p className="eyebrow">OpsDesk DevSecOps Platform</p>
          <h1>Incident Operations Dashboard</h1>
          <p className="subtitle">
            A production-style three-tier platform for incident tracking,
            containerization, observability, and Kubernetes deployment practice.
          </p>
        </div>

        <button onClick={loadDashboard}>Refresh</button>
      </section>

      <section className="status-grid">
        <article className="card">
          <span className="label">Backend readiness</span>
          <strong className={health === "ready" ? "good" : "bad"}>{health}</strong>
        </article>

        <article className="card">
          <span className="label">Incident count</span>
          <strong>{incidents.length}</strong>
        </article>

        <article className="card">
          <span className="label">API base URL</span>
          <strong className="small">{API_BASE_URL}</strong>
        </article>
      </section>

      <section className="card">
        <div className="section-header">
          <h2>Active incidents</h2>
          <span>{loading ? "Loading..." : `${incidents.length} records`}</span>
        </div>

        {error && <p className="error">{error}</p>}

        {!error && incidents.length === 0 && !loading && (
          <p className="empty">No incidents found.</p>
        )}

        <div className="incident-list">
          {incidents.map((incident) => (
            <article className="incident" key={incident._id}>
              <div>
                <h3>{incident.title}</h3>
                <p>Owner: {incident.owner}</p>
              </div>

              <div className="incident-meta">
                <span className={`severity ${incident.severity?.toLowerCase()}`}>
                  {incident.severity}
                </span>
                <span>{incident.status}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;
