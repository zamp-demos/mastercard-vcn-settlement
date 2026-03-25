"use client";
import { useState } from "react";

type Step = "list" | "detail" | "paymethod" | "vcndetail" | "success";
type PayMethod = "vcn" | "sepa" | "wire" | null;

/* ─── Mastercard logo ─── */
function MastercardLogo({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.62} viewBox="0 0 38 24" fill="none">
      <circle cx="14" cy="12" r="12" fill="#EB001B" />
      <circle cx="24" cy="12" r="12" fill="#F79E1B" />
      <path d="M19 4.8a12 12 0 0 1 0 14.4A12 12 0 0 1 19 4.8z" fill="#FF5F00" />
    </svg>
  );
}

/* ─── Sidebar ─── */
function Sidebar() {
  const topNav = ["Mastercom", "My Company Manager", "Support Case Management", "Technical Resource Center"];
  const iccp = ["Invoice Settlement", "Virtual Cards", "Purchase Templates", "Spend Controls", "Reports"];
  return (
    <div style={{ width: 240, background: "#1a1a1a", minHeight: "100vh", display: "flex", flexDirection: "column", flexShrink: 0 }}>
      <div style={{ padding: "18px 16px", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid #2e2e2e" }}>
        <MastercardLogo size={38} />
        <span style={{ color: "#fff", fontSize: 13, fontWeight: 500, letterSpacing: 0.5 }}>connect</span>
      </div>
      <nav style={{ flex: 1, padding: "12px 0" }}>
        {topNav.map((item) => (
          <div key={item} style={{ padding: "10px 20px", color: "#aaa", fontSize: 13, cursor: "pointer" }}>{item}</div>
        ))}
        <div style={{ margin: "20px 20px 6px", color: "#555", fontSize: 10, textTransform: "uppercase", letterSpacing: 1.2, fontWeight: 700 }}>ICCP</div>
        {iccp.map((item) => (
          <div key={item} style={{
            padding: "9px 20px 9px 28px", fontSize: 13, cursor: "pointer",
            color: item === "Invoice Settlement" ? "#eb5c2e" : "#888",
            borderLeft: item === "Invoice Settlement" ? "3px solid #eb5c2e" : "3px solid transparent",
            background: item === "Invoice Settlement" ? "rgba(235,92,46,0.07)" : "transparent",
            fontWeight: item === "Invoice Settlement" ? 600 : 400,
          }}>{item}</div>
        ))}
      </nav>
      <div style={{ padding: "14px 20px", borderTop: "1px solid #2e2e2e", display: "flex", gap: 18 }}>
        {["✉", "◎", "⚙"].map(icon => (
          <span key={icon} style={{ color: "#666", fontSize: 17, cursor: "pointer" }}>{icon}</span>
        ))}
      </div>
    </div>
  );
}

/* ─── Top bar (Mastercard Connect style, no SAP/Taulia) ─── */
function TopBar() {
  return (
    <div style={{ background: "#fff", borderBottom: "1px solid #e8e8e8", padding: "0 28px", display: "flex", alignItems: "center", height: 50, gap: 8 }}>
      <span style={{ fontSize: 12, color: "#888", marginRight: 4 }}>In Control for Commercial Payments</span>
      <span style={{ color: "#d0d0d0", marginRight: 4 }}>|</span>
      <span style={{ fontSize: 12, color: "#555", fontWeight: 500 }}>DLA Piper Spain</span>
      <div style={{ flex: 1 }} />
      <span style={{ fontSize: 12, color: "#eb5c2e", fontWeight: 600, cursor: "pointer" }}>Help</span>
      <span style={{ color: "#e0e0e0", margin: "0 8px" }}>|</span>
      <span style={{ fontSize: 12, color: "#555", cursor: "pointer" }}>Settings</span>
      <span style={{ color: "#e0e0e0", margin: "0 8px" }}>|</span>
      <span style={{ width: 28, height: 28, background: "#1a1a1a", borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 11, fontWeight: 700 }}>DP</span>
    </div>
  );
}

/* ─── Yellow announcement banner ─── */
function AnnouncementBanner({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div style={{ background: "#FFF9E6", border: "1px solid #F0C030", borderRadius: 6, padding: "14px 18px", marginBottom: 22, display: "flex", gap: 12, alignItems: "flex-start" }}>
      <span style={{ fontSize: 16, marginTop: 1, color: "#b45309" }}>⚠</span>
      <div style={{ flex: 1 }}>
        <p style={{ fontWeight: 700, fontSize: 13.5, marginBottom: 4, color: "#1a1a1a" }}>
          ICCP: Invoice settlement via Virtual Card Network now live
        </p>
        <p style={{ fontSize: 12.5, color: "#555", lineHeight: 1.55 }}>
          Single-use VCNs are now available for invoice settlement. Reconciliation references are automatically posted to DLA Madrid ERP on confirmation.
          See <span style={{ color: "#eb5c2e", cursor: "pointer", textDecoration: "underline" }}>GLB 12637</span> for details.
        </p>
      </div>
      <button onClick={onDismiss} style={{ background: "none", border: "none", fontSize: 17, cursor: "pointer", color: "#999", lineHeight: 1 }}>✕</button>
    </div>
  );
}

/* ─── Greeting card ─── */
function GreetingCard() {
  return (
    <div style={{ background: "#1a1a1a", borderRadius: 8, padding: "22px 28px", marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div>
        <p style={{ color: "#888", fontSize: 13, marginBottom: 4 }}>Good morning,</p>
        <p style={{ color: "#fff", fontSize: 26, fontWeight: 600, letterSpacing: -0.5 }}>DLA Piper Spain</p>
      </div>
      <div style={{ textAlign: "right" }}>
        <p style={{ color: "#eb5c2e", fontSize: 12.5, fontWeight: 700, marginBottom: 3 }}>HSBC · ICCP</p>
        <p style={{ color: "#aaa", fontSize: 12.5 }}>Madrid, ESP</p>
        <p style={{ color: "#eb5c2e", fontSize: 12, cursor: "pointer", marginTop: 4 }}>My Company ›</p>
      </div>
    </div>
  );
}


/* ─── Invoice list ─── */
function InvoiceList({ onSelect, settled }: { onSelect: () => void; settled: boolean }) {
  return (
    <div style={{ background: "#fff", borderRadius: 8, overflow: "hidden", border: "1px solid #e4e4e4" }}>
      {/* Search panel */}
      <div style={{ padding: "20px 24px", borderBottom: "1px solid #ececec" }}>
        <div style={{ background: "#f8f8f8", border: "1px solid #e8e8e8", borderRadius: 6, padding: "16px 20px" }}>
          <p style={{ fontSize: 12.5, fontWeight: 700, color: "#333", marginBottom: 14, textTransform: "uppercase", letterSpacing: 0.5 }}>Search Invoices</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 28px" }}>
            {[["Invoice Number", "INV-INDRA-2026-0298"], ["Purchase Order", "PO-DLA-2026-ES-0441"]].map(([label, val]) => (
              <div key={label}>
                <label style={{ fontSize: 11.5, color: "#666", display: "block", marginBottom: 4 }}>{label}</label>
                <input defaultValue={val} style={{ width: "100%", border: "1px solid #ddd", borderRadius: 4, padding: "6px 10px", fontSize: 12.5, color: "#333", outline: "none" }} />
              </div>
            ))}
            <div>
              <label style={{ fontSize: 11.5, color: "#666", display: "block", marginBottom: 4 }}>Invoice Status</label>
              <select style={{ width: "100%", border: "1px solid #ddd", borderRadius: 4, padding: "6px 10px", fontSize: 12.5, color: "#333", background: "#fff" }}>
                <option>Ready for Settlement</option>
                <option>Pending Approval</option>
                <option>Settled</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 11.5, color: "#666", display: "block", marginBottom: 4 }}>Supplier</label>
              <select style={{ width: "100%", border: "1px solid #ddd", borderRadius: 4, padding: "6px 10px", fontSize: 12.5, color: "#333", background: "#fff" }}>
                <option>Indra Sistemas S.A.</option>
              </select>
            </div>
            <div style={{ gridColumn: "span 2", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", gap: 20 }}>
                {["Invoice", "Credit Note", "All"].map((opt) => (
                  <label key={opt} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12.5, cursor: "pointer", color: "#444" }}>
                    <input type="radio" name="filterBy" defaultChecked={opt === "All"} style={{ accentColor: "#eb5c2e" }} /> {opt}
                  </label>
                ))}
              </div>
              <button style={{ background: "#eb5c2e", color: "#fff", border: "none", borderRadius: 4, padding: "7px 22px", fontSize: 12.5, fontWeight: 600, cursor: "pointer", letterSpacing: 0.3 }}>
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div style={{ background: "#1a1a1a", padding: "9px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 12.5, color: "#ccc" }}>Showing 1–1 of 1 Invoice</span>
        <div style={{ display: "flex", gap: 16 }}>
          <span style={{ fontSize: 12, color: "#888", cursor: "pointer" }}>↓ Download List</span>
          <span style={{ fontSize: 12, color: "#888", cursor: "pointer" }}>↺ Refresh</span>
        </div>
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #ececec", background: "#fafafa" }}>
            {["Invoice #", "Inv. Date ↑", "PO #", "Due Date", "Amount", "Status", "Payment", "Actions"].map((h) => (
              <th key={h} style={{ textAlign: "left", padding: "10px 14px", color: "#555", fontWeight: 600, fontSize: 11.5, textTransform: "uppercase", letterSpacing: 0.4 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: "1px solid #f2f2f2" }}>
            <td style={{ padding: "13px 14px" }}>
              <button onClick={onSelect} style={{ color: "#eb5c2e", background: "none", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 5 }}>
                <span style={{ fontSize: 14 }}>📄</span> INV-INDRA-2026-0298
              </button>
            </td>
            <td style={{ padding: "13px 14px", fontSize: 13, color: "#444" }}>01 Mar 2026</td>
            <td style={{ padding: "13px 14px", fontSize: 13, color: "#444" }}>PO-DLA-2026-ES-0441</td>
            <td style={{ padding: "13px 14px", fontSize: 13, color: "#444" }}>22 Mar 2026</td>
            <td style={{ padding: "13px 14px", fontSize: 13, fontWeight: 600, color: "#1a1a1a" }}>€14,000.00</td>
            <td style={{ padding: "13px 14px" }}>
              {settled ? (
                <span style={{ display: "inline-flex", alignItems: "center", gap: 5, color: "#2e7d32", fontWeight: 600, fontSize: 12.5 }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#2e7d32", flexShrink: 0, display: "inline-block" }} /> Settled
                </span>
              ) : (
                <span style={{ color: "#b45309", fontWeight: 500, fontSize: 12.5 }}>Ready for Settlement</span>
              )}
            </td>
            <td style={{ padding: "13px 14px", fontSize: 12.5, color: settled ? "#eb5c2e" : "#bbb", fontWeight: settled ? 500 : 400 }}>
              {settled ? "Card Charged" : "—"}
            </td>
            <td style={{ padding: "13px 14px" }}>
              <button style={{ background: "#1a1a1a", color: "#fff", border: "none", borderRadius: 4, padding: "4px 10px", fontSize: 11, cursor: "pointer" }}>⚙</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div style={{ padding: "9px 14px", fontSize: 11.5, color: "#999" }}>1 | Total items: 1</div>
    </div>
  );
}


/* ─── Invoice detail panel ─── */
function InvoiceDetailPanel({ onInitiate, onClose }: { onInitiate: () => void; onClose: () => void }) {
  return (
    <div className="slide-in" style={{ width: 520, background: "#fff", borderLeft: "1px solid #e4e4e4", minHeight: "100%", display: "flex", flexDirection: "column", flexShrink: 0 }}>
      <div style={{ background: "#1a1a1a", color: "#fff", padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 14.5, fontWeight: 600 }}>Invoice — INV-INDRA-2026-0298</span>
        <button onClick={onClose} style={{ background: "none", border: "none", color: "#aaa", fontSize: 18, cursor: "pointer", lineHeight: 1 }}>✕</button>
      </div>

      <div style={{ padding: "22px", overflowY: "auto", flex: 1 }}>
        <p style={{ fontSize: 10.5, fontWeight: 700, color: "#999", letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 14 }}>Invoice Information</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px 14px", marginBottom: 22, paddingBottom: 22, borderBottom: "1px solid #efefef" }}>
          {[
            ["Supplier", "Indra Sistemas S.A.", false],
            ["Invoice Number", "INV-INDRA-2026-0298", false],
            ["Invoice Date", "01 Mar 2026", false],
            ["Due Date", "22 Mar 2026", false],
            ["Currency", "EUR (€)", false],
            ["Budget Code", "ES-IT-2026-Q1", false],
            ["PO Match", "✓ Confirmed", true],
            ["Goods Receipt", "✓ Confirmed", true],
            ["Approver", "DLA Finance Madrid", false],
          ].map(([label, val, green]) => (
            <div key={label as string}>
              <p style={{ fontSize: 10.5, color: "#999", marginBottom: 3 }}>{label as string}</p>
              <p style={{ fontSize: 12.5, fontWeight: 600, color: green ? "#2e7d32" : "#1a1a1a" }}>{val as string}</p>
            </div>
          ))}
        </div>

        <p style={{ fontSize: 10.5, fontWeight: 700, color: "#999", letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 12 }}>Line Items</p>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12.5 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #e8e8e8" }}>
              {["#", "Description", "Period", "Qty", "Unit Price", "Amount"].map((h) => (
                <th key={h} style={{ textAlign: h === "#" || h === "Qty" ? "center" : "left", padding: "8px 10px", fontSize: 10.5, color: "#999", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ["1", "IT Infrastructure Services Q1 2026", "Jan–Mar 2026", "1", "€12,000.00", "€12,000.00"],
              ["2", "Network Security Monitoring — Q1", "Jan–Mar 2026", "1", "€2,000.00", "€2,000.00"],
            ].map(([num, desc, period, qty, price, amt]) => (
              <tr key={num} style={{ borderBottom: "1px solid #f5f5f5" }}>
                <td style={{ padding: "11px 10px", textAlign: "center", color: "#888" }}>{num}</td>
                <td style={{ padding: "11px 10px", color: "#1a1a1a" }}>{desc}</td>
                <td style={{ padding: "11px 10px", color: "#666" }}>{period}</td>
                <td style={{ padding: "11px 10px", textAlign: "center", color: "#666" }}>{qty}</td>
                <td style={{ padding: "11px 10px", color: "#666" }}>{price}</td>
                <td style={{ padding: "11px 10px", fontWeight: 600, color: "#1a1a1a" }}>{amt}</td>
              </tr>
            ))}
            <tr>
              <td colSpan={5} style={{ padding: "12px 10px", textAlign: "right", fontWeight: 700, color: "#666", fontSize: 12 }}>Total</td>
              <td style={{ padding: "12px 10px", fontWeight: 700, fontSize: 15, color: "#1a1a1a" }}>€14,000.00</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ padding: "16px 20px", borderTop: "1px solid #efefef", display: "flex", gap: 10 }}>
        <button onClick={onInitiate} style={{ background: "#eb5c2e", color: "#fff", border: "none", borderRadius: 5, padding: "10px 0", fontSize: 13, fontWeight: 700, cursor: "pointer", flex: 1 }}>
          Initiate Settlement
        </button>
        <button style={{ background: "none", border: "1px solid #ddd", borderRadius: 5, padding: "10px 14px", fontSize: 12.5, cursor: "pointer", color: "#555" }}>Download</button>
        <button style={{ background: "none", border: "1px solid #ddd", borderRadius: 5, padding: "10px 14px", fontSize: 12.5, cursor: "pointer", color: "#555" }}>Audit Trail</button>
      </div>
    </div>
  );
}


/* ─── Payment Method Modal ─── */
function PayMethodModal({ selected, setSelected, onContinue, onCancel }: {
  selected: PayMethod; setSelected: (m: PayMethod) => void;
  onContinue: () => void; onCancel: () => void;
}) {
  const methods: { id: PayMethod; label: string; desc: string; recommended: boolean; iconBg: string; icon: string }[] = [
    { id: "vcn",  label: "Mastercard Virtual Card (VCN)", desc: "Single-use card · instant settlement · full audit trail", recommended: true,  iconBg: "#fff3ee", icon: "💳" },
    { id: "sepa", label: "SEPA Bank Transfer",            desc: "Standard transfer · 1–3 business days",                recommended: false, iconBg: "#f5f5f5", icon: "🏦" },
    { id: "wire", label: "Wire Transfer",                  desc: "Same-day · additional fees may apply",                 recommended: false, iconBg: "#f5f5f5", icon: "⚡" },
  ];

  return (
    <div className="modal-overlay">
      <div className="fade-in" style={{ background: "#fff", borderRadius: 10, width: 500, overflow: "hidden", boxShadow: "0 24px 64px rgba(0,0,0,0.28)" }}>
        <div style={{ background: "#1a1a1a", color: "#fff", padding: "15px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 14.5, fontWeight: 600 }}>Select Payment Method</span>
          <button onClick={onCancel} style={{ background: "none", border: "none", color: "#aaa", fontSize: 18, cursor: "pointer" }}>✕</button>
        </div>

        <div style={{ padding: "22px" }}>
          {/* Summary pill */}
          <div style={{ background: "#f8f8f8", border: "1px solid #e8e8e8", borderRadius: 6, padding: "12px 16px", marginBottom: 20, display: "flex", justifyContent: "space-between" }}>
            <div>
              <p style={{ fontSize: 10, color: "#999", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 3 }}>Invoice</p>
              <p style={{ fontSize: 13, fontWeight: 600, color: "#1a1a1a" }}>INV-INDRA-2026-0298 · Indra Sistemas S.A.</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: 10, color: "#999", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 3 }}>Amount</p>
              <p style={{ fontSize: 16, fontWeight: 700, color: "#1a1a1a" }}>€14,000.00</p>
            </div>
          </div>

          <p style={{ fontSize: 10.5, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>Choose Payment Method</p>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {methods.map((m) => (
              <div key={m.id} onClick={() => setSelected(m.id)} style={{
                border: selected === m.id ? "2px solid #eb5c2e" : "1px solid #e0e0e0",
                borderRadius: 8, padding: "14px 16px", cursor: "pointer",
                display: "flex", alignItems: "center", gap: 14,
                background: selected === m.id ? "#fff8f5" : "#fff",
              }}>
                <div style={{ width: 40, height: 40, background: m.iconBg, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
                  {m.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 13.5, fontWeight: 600, color: "#1a1a1a", marginBottom: 2 }}>{m.label}</p>
                  <p style={{ fontSize: 12, color: "#777" }}>{m.desc}</p>
                </div>
                {m.recommended && (
                  <span style={{ background: "#eb5c2e", color: "#fff", fontSize: 10, fontWeight: 700, padding: "3px 9px", borderRadius: 4, letterSpacing: 0.5, flexShrink: 0 }}>
                    RECOMMENDED
                  </span>
                )}
              </div>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 22 }}>
            <button onClick={onCancel} style={{ background: "none", border: "1px solid #ddd", borderRadius: 5, padding: "9px 20px", fontSize: 13, cursor: "pointer", color: "#555" }}>Cancel</button>
            <button onClick={onContinue} disabled={!selected} style={{
              background: selected ? "#eb5c2e" : "#e0d0cc", color: "#fff", border: "none",
              borderRadius: 5, padding: "9px 22px", fontSize: 13, fontWeight: 700,
              cursor: selected ? "pointer" : "not-allowed",
            }}>Continue →</button>
          </div>
        </div>
      </div>
    </div>
  );
}


/* ─── VCN card visual — Mastercard branded ─── */
function VCNCard() {
  return (
    <div style={{
      background: "linear-gradient(135deg, #1a1a1a 0%, #2e2e2e 55%, #1a1a1a 100%)",
      borderRadius: 14, padding: "22px 24px", color: "#fff",
      position: "relative", overflow: "hidden", marginBottom: 22,
    }}>
      {/* Subtle background circles */}
      <div style={{ position: "absolute", right: -30, top: -30, width: 140, height: 140, borderRadius: "50%", background: "rgba(235,92,46,0.08)" }} />
      <div style={{ position: "absolute", right: 40, bottom: -40, width: 100, height: 100, borderRadius: "50%", background: "rgba(247,158,27,0.06)" }} />

      {/* Top row: chip + MC logo */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div style={{ width: 36, height: 26, background: "linear-gradient(135deg, #f0c030, #d4a010)", borderRadius: 5 }} />
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <MastercardLogo size={32} />
          <span style={{ fontSize: 10, color: "#aaa", letterSpacing: 0.5 }}>VCN</span>
        </div>
      </div>

      {/* Card number */}
      <p style={{ fontSize: 15.5, letterSpacing: 3, fontWeight: 500, marginBottom: 18, fontFamily: "monospace", color: "#fff" }}>
        0298 ···· ···· DLA–INDRA
      </p>

      {/* Footer row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <p style={{ fontSize: 9, opacity: 0.5, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 3 }}>Card Holder</p>
          <p style={{ fontSize: 13, fontWeight: 600 }}>DLA PIPER SPAIN</p>
        </div>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: 9, opacity: 0.5, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 3 }}>Expires</p>
          <p style={{ fontSize: 13, fontWeight: 600 }}>03/26</p>
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ fontSize: 10.5, fontWeight: 700, color: "#eb5c2e" }}>MASTERCARD</p>
          <p style={{ fontSize: 9, opacity: 0.6, marginTop: 2 }}>SINGLE USE · VCN</p>
        </div>
      </div>
    </div>
  );
}

/* ─── VCN detail + confirm modal ─── */
function VCNDetailModal({ onBack, onConfirm }: { onBack: () => void; onConfirm: () => void }) {
  return (
    <div className="modal-overlay">
      <div className="fade-in" style={{ background: "#fff", borderRadius: 10, width: 520, overflow: "hidden", boxShadow: "0 24px 64px rgba(0,0,0,0.32)" }}>
        <div style={{ background: "#1a1a1a", color: "#fff", padding: "15px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 14.5, fontWeight: 600 }}>Virtual Card Details — Confirm Settlement</span>
          <button onClick={onBack} style={{ background: "none", border: "none", color: "#aaa", fontSize: 18, cursor: "pointer" }}>✕</button>
        </div>

        <div style={{ padding: "24px" }}>
          <VCNCard />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px 22px", marginBottom: 20 }}>
            {[
              ["Card Reference", "0298-DLA-INDRA", false],
              ["Authorised Amount", "€14,000.00", true],
              ["Valid Until", "31 Mar 2026", false],
              ["Settlement Ref", "STL-2026-0318-VC0298", false],
              ["Payee", "Indra Sistemas S.A.", false],
              ["Card Type", "Single-Use VCN", false],
            ].map(([label, val, highlight]) => (
              <div key={label as string}>
                <p style={{ fontSize: 10.5, color: "#999", marginBottom: 3 }}>{label as string}</p>
                <p style={{ fontSize: 13, fontWeight: 700, color: highlight ? "#2e7d32" : "#1a1a1a" }}>{val as string}</p>
              </div>
            ))}
          </div>

          <div style={{ background: "#fffbeb", border: "1px solid #f0c030", borderRadius: 6, padding: "10px 14px", marginBottom: 22, display: "flex", gap: 8, alignItems: "flex-start" }}>
            <span style={{ color: "#b45309", fontSize: 14, flexShrink: 0 }}>⚠</span>
            <p style={{ fontSize: 12, color: "#92400e", lineHeight: 1.55 }}>
              This single-use card will be invalidated after the first charge. Reconciliation ref will be automatically logged to DLA Madrid ERP on settlement.
            </p>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
            <button onClick={onBack} style={{ background: "none", border: "1px solid #ddd", borderRadius: 5, padding: "10px 22px", fontSize: 13, cursor: "pointer", color: "#555" }}>Back</button>
            <button onClick={onConfirm} style={{ background: "#eb5c2e", color: "#fff", border: "none", borderRadius: 5, padding: "10px 26px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
              Confirm Settlement
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Success banner ─── */
function SuccessBanner() {
  return (
    <div className="fade-in" style={{ border: "1px solid #4caf50", borderRadius: 8, padding: "16px 20px", marginBottom: 22, background: "#f1faf2" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
        <span style={{ color: "#2e7d32", fontSize: 17 }}>✓</span>
        <strong style={{ color: "#2e7d32", fontSize: 14.5 }}>Settlement Processed Successfully</strong>
      </div>
      <p style={{ fontSize: 12.5, color: "#444", marginBottom: 6 }}>
        Reference: <strong>STL-2026-0318-VC0298</strong> · Reconciliation ref logged to DLA Madrid ERP
      </p>
      <div style={{ display: "flex", gap: 24, fontSize: 12.5, color: "#555", flexWrap: "wrap" }}>
        <span>Supplier: <strong>Indra Sistemas S.A.</strong></span>
        <span>Amount: <strong>€14,000.00</strong></span>
        <span>Method: <strong>Mastercard VCN</strong></span>
        <span>Date: <strong>18 Mar 2026</strong></span>
      </div>
    </div>
  );
}

/* ─── Root ─── */
export default function Home() {
  const [step, setStep] = useState<Step>("list");
  const [payMethod, setPayMethod] = useState<PayMethod>("vcn");
  const [showBanner, setShowBanner] = useState(true);
  const [settled, setSettled] = useState(false);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f2f2f2" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <TopBar />
        <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
          {/* Main content */}
          <div style={{ flex: 1, padding: "24px", overflowY: "auto" }}>
            {showBanner && <AnnouncementBanner onDismiss={() => setShowBanner(false)} />}
            {step === "success" && <SuccessBanner />}
            <GreetingCard />
            <div style={{ marginBottom: 16 }}>
              <h2 style={{ fontSize: 19, fontWeight: 700, color: "#1a1a1a", marginBottom: 3 }}>Invoice Settlement</h2>
              <p style={{ fontSize: 12.5, color: "#888" }}>Settle supplier invoices via single-use Mastercard VCN — instant, traceable, full audit trail</p>
            </div>
            <InvoiceList onSelect={() => setStep("detail")} settled={settled} />
          </div>

          {/* Detail panel */}
          {(step === "detail" || step === "paymethod" || step === "vcndetail") && (
            <InvoiceDetailPanel
              onInitiate={() => setStep("paymethod")}
              onClose={() => setStep("list")}
            />
          )}
        </div>
      </div>

      {step === "paymethod" && (
        <PayMethodModal
          selected={payMethod}
          setSelected={setPayMethod}
          onContinue={() => setStep("vcndetail")}
          onCancel={() => setStep("detail")}
        />
      )}
      {step === "vcndetail" && (
        <VCNDetailModal
          onBack={() => setStep("paymethod")}
          onConfirm={() => { setSettled(true); setStep("success"); }}
        />
      )}
    </div>
  );
}
