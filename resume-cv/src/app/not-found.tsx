export default function NotFound() {
  return (
    <div
      style={{
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        background: "#f5f7fa",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        color: "#1a1a2e",
      }}
    >
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <div style={{ fontSize: "7rem", fontWeight: 800, color: "#0a66c2", lineHeight: 1 }}>
          404
        </div>
        <h1 style={{ fontSize: "1.5rem", margin: "0.5rem 0 1rem", color: "#1a1a2e" }}>
          Page Not Found
        </h1>
        <p style={{ color: "#5a6373", marginBottom: "2rem" }}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <a
          href="/"
          style={{
            display: "inline-block",
            background: "#0a66c2",
            color: "white",
            padding: "0.65rem 1.8rem",
            borderRadius: "30px",
            textDecoration: "none",
            fontWeight: 600,
            fontSize: "0.9rem",
          }}
        >
          Back to Resume
        </a>
      </div>
    </div>
  );
}
