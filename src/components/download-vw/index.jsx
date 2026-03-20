import React, { useMemo } from "react";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";

function niceOs(os) {
  if (os === "windows") return "Windows";
  if (os === "macos") return "macOS";
  if (os === "linux") return "Linux";
  return os || "Other";
}

function artifactLabel(a) {
  const os = niceOs(a.os);
  const arch = a.arch ? ` ${a.arch}` : "";
  return `${os}${arch}`;
}

function formatBytes(n) {
  if (n === null || n === undefined) return "";
  const mb = n / (1024 * 1024);
  if (mb < 1024) return `${Math.round(mb)} MB`;
  return `${(mb / 1024).toFixed(1)} GB`;
}

function dateFromRelease(r) {
  if (r && r.date) return r.date;
  const ms = (r?.artifacts || [])
    .map((a) => Date.parse(a.modified_at || ""))
    .filter((x) => Number.isFinite(x));
  if (!ms.length) return "";
  const d = new Date(Math.max(...ms));
  return d.toISOString().slice(0, 10);
}

function PillLink({ href, children, primary }) {
  return (
    <a
      href={href}
      style={{
        display: "inline-block",
        padding: primary ? "10px 14px" : "7px 10px",
        borderRadius: 999,
        textDecoration: "none",
        fontWeight: primary ? 700 : 600,
        background: primary ? "#44A340" : "transparent",
        color: primary ? "white" : "inherit",
        border: primary ? "1px solid transparent" : "1px solid rgba(0,0,0,.18)",
      }}
    >
      {children}
    </a>
  );
}

function SubtleDetails({ summary, children }) {
  return (
    <details style={{ marginTop: 10 }}>
      <summary style={{ cursor: "pointer", opacity: 0.85, fontWeight: 600 }}>
        {summary}
      </summary>
      <div style={{ marginTop: 8 }}>{children}</div>
    </details>
  );
}

function ReleaseCard({ title, release, isLatest }) {
  const date = dateFromRelease(release);
  const artifacts = release?.artifacts || [];
  const notes = (release?.release_notes || "").trim();
  const hasSha = artifacts.some((a) => (a.sha256 || "").trim());

  return (
    <section
      style={{
        marginTop: "1rem",
        padding: "1rem",
        border: "1px solid rgba(0,0,0,.12)",
        borderRadius: 14,
        background: "white",
      }}
    >
      <div style={{ display: "flex", gap: 12, justifyContent: "space-between", flexWrap: "wrap" }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 800 }}>
            {title}{release?.version ? ` · ${release.version}` : ""}
          </div>
          <div style={{ opacity: 0.8, fontSize: 14, marginTop: 4 }}>
            {date ? `Date ${date}` : "Date unknown"}
            {" · "}
            {artifacts.length} file{artifacts.length === 1 ? "" : "s"}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14 }}>
        {artifacts.map((a) => (
          <PillLink key={a.url} href={a.url} primary={isLatest}>
            {isLatest ? `Download for ${artifactLabel(a)}` : artifactLabel(a)}
          </PillLink>
        ))}
      </div>

      {notes ? (
        <SubtleDetails summary="Release notes">
          <div style={{ whiteSpace: "pre-wrap" }}>{notes}</div>
        </SubtleDetails>
      ) : null}

      {hasSha ? (
        <SubtleDetails summary="Checksums (sha256)">
          <div style={{ display: "grid", gap: 12 }}>
            {artifacts
              .filter((a) => (a.sha256 || "").trim())
              .map((a) => (
                <div key={a.url} style={{ borderTop: "1px solid rgba(0,0,0,.08)", paddingTop: 10 }}>
                  <div style={{ fontWeight: 700 }}>
                    {artifactLabel(a)}{" "}
                    <span style={{ opacity: 0.75, fontWeight: 600 }}>
                      · {a.filename}
                      {a.size_bytes ? ` · ${formatBytes(a.size_bytes)}` : ""}
                    </span>
                  </div>
                  <div
                    style={{
                      marginTop: 6,
                      fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                      fontSize: 13,
                      overflowWrap: "anywhere",
                      wordBreak: "break-word",
                      lineHeight: 1.35,
                      opacity: 0.95,
                    }}
                  >
                    {a.sha256}
                  </div>
                </div>
              ))}
          </div>
        </SubtleDetails>
      ) : null}
    </section>
  );
}

export default function DownloadVWPage({ releasesData }) {
  const data = releasesData && releasesData.default ? releasesData.default : releasesData;

  const vw = data?.releases?.vw;

  const items = useMemo(() => {
    if (Array.isArray(vw)) return vw;
    if (vw && Array.isArray(vw.items)) return vw.items;
    return [];
  }, [vw]);

  const latestVersion = !Array.isArray(vw) ? vw?.latest_version : null;

  const latest =
    (latestVersion && items.find((r) => r.version === latestVersion)) ||
    items[0] ||
    null;

  const older = latest ? items.filter((r) => r !== latest) : items;

  return (
    <Layout title="Download VisualWorks Cormas" description="VisualWorks releases of Cormas">
      <Head>
        <meta name="robots" content="noindex" />
      </Head>

      <main style={{ maxWidth: 980, margin: "0 auto", padding: "2rem 1rem" }}>
        <h1>VisualWorks Cormas downloads</h1>

        {latest ? (
          <ReleaseCard title="Latest release" release={latest} isLatest />
        ) : (
          <p style={{ marginTop: "1rem" }}>No releases found.</p>
        )}

        <h2 style={{ marginTop: "2rem" }}>Older releases</h2>

        {older.length ? (
          older.map((r) => <ReleaseCard key={r.version} title="Release" release={r} isLatest={false} />)
        ) : (
          <div style={{ opacity: 0.75 }}>No older releases.</div>
        )}

        <div style={{ marginTop: "1.5rem", opacity: 0.75, fontSize: 13 }}>
          Data source: files.cormas.org/releases.json (generated at {data?.generated_at || "unknown"}).
        </div>
      </main>
    </Layout>
  );
}