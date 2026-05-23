import { ImageResponse } from "next/og";

export const alt = "Retrace — AI copilot for field technicians";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0b0c0e",
          display: "flex",
          flexDirection: "column",
          padding: "84px 96px",
          color: "#f2f4f6",
          fontFamily: "Inter, sans-serif",
        }}
      >
        {/* Top-left brand mark */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <svg
            width="40"
            height="40"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="13.7"
              y="50"
              width="51.3"
              height="51.3"
              rx="8.85"
              transform="rotate(-45 13.7 50)"
              stroke="#f2f4f6"
              strokeWidth="3.28"
              fill="none"
            />
            <rect
              x="35.7"
              y="50"
              width="51.3"
              height="51.3"
              rx="8.85"
              transform="rotate(-45 35.7 50)"
              fill="#f2f4f6"
              stroke="#f2f4f6"
              strokeWidth="3.28"
            />
          </svg>
          <div style={{ fontSize: 30, fontWeight: 600, letterSpacing: -0.5 }}>
            retrace
          </div>
        </div>

        <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
          <div
            style={{
              fontSize: 88,
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: -2.2,
              maxWidth: 920,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>AI copilot for</span>
            <span style={{ color: "#a8aeb6" }}>field technicians.</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 18,
            color: "#a8aeb6",
            fontFamily: "monospace",
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 999,
                background: "#ffc21c",
              }}
            />
            <span>Live on TestFlight</span>
          </div>
          <span>Record once · Coach forever</span>
        </div>
      </div>
    ),
    size,
  );
}
