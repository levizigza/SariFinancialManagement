import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const dynamic = "force-static";
export const alt = "Sari Financial Management — Calgary, Alberta";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Default Open Graph / social share image (no photography required).
 * Brand navy + gold; verified business name and location only.
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#011428",
          padding: "64px 72px",
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        <div
          style={{
            display: "flex",
            height: 4,
            width: 160,
            background: "#cea15d",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 54,
              fontWeight: 600,
              color: "#f7f4ed",
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              maxWidth: 920,
            }}
          >
            Sari Financial Management
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#e8cf9c",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            More Than Numbers
          </div>
          <div
            style={{
              fontSize: 24,
              color: "rgba(247, 244, 237, 0.78)",
              fontFamily: "system-ui, sans-serif",
              maxWidth: 800,
              lineHeight: 1.4,
            }}
          >
            Bookkeeping · Payroll · Tax Services · Business Advisory
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontFamily: "system-ui, sans-serif",
            fontSize: 22,
            color: "rgba(247, 244, 237, 0.7)",
          }}
        >
          <span>Calgary, Alberta</span>
          <span>sarifinancial.com</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
