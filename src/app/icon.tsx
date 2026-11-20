import { ImageResponse } from "next/og";

// Foundrio favicon — warm brick square with the stylised "F" lettermark
// matching the brand mark uploaded at /public/foundrio-logo.jpg.
// The "F" is rendered as the geometric double-line shape visible in the logo.

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#16171A",
          borderRadius: 4,
        }}
      >
        {/* Stylised "F" lettermark in Foundrio terra-cotta */}
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
        >
          {/* Vertical left bar */}
          <rect x="3" y="3" width="3.5" height="16" fill="#B5472B" />
          {/* Top horizontal bar */}
          <rect x="6.5" y="3" width="12" height="3.5" fill="#B5472B" />
          {/* Middle horizontal bar */}
          <rect x="6.5" y="9.25" width="8" height="3" fill="#B5472B" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
