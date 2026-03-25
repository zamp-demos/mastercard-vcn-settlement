"use client";
import { useState } from "react";

/* ─── Types ─── */
type Step = "list" | "detail" | "paymethod" | "vcndetail" | "success";
type PayMethod = "vcn" | "sepa" | "wire" | null;

/* ─── Mastercard logo SVG ─── */
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
function Sidebar({ activePage }: { activePage: string }) {
  const navItems = [
    { label: "Mastercom", icon: "⊞" },
    { label: "My Company Manager", icon: "🏢" },
    { label: "Support Case Management", icon: "🎫" },
    { label: "Technical Resource Center", icon: "📚" },
  ];
  return (
    <div style={{ width: 240, background: "#1a1a1a", minHeight: "100vh", display: "flex", flexDirection: "column", flexShrink: 0 }}>
      {/* Logo area */}
      <div style={{ padding: "18px 16px", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid #333" }}>
        <MastercardLogo size={38} />
        <span style={{ color: "#fff", fontSize: 13, fontWeight: 500, letterSpacing: 0.5 }}>connect</span>
      </div>
      {/* Nav items */}
      <nav style={{ flex: 1, padding: "12px 0" }}>
        {navItems.map((item) => (
          <div
            key={item.label}
            style={{
              padding: "11px 20px",
              color: item.label === activePage ? "#eb5c2e" : "#ccc",
              fontSize: 13.5,
              cursor: "pointer",
              fontWeight: item.label === activePage ? 600 : 400,
              borderLeft: item.label === activePage ? "3px solid #eb5c2e" : "3px solid transparent",
              background: item.label === activePage ? "rgba(235,92,46,0.08)" : "transparent",
            }}
          >
            {item.label}
          </div>
        ))}
        {/* ICCP section */}
        <div style={{ marginTop: 24, padding: "8px 20px 4px", color: "#666", fontSize: 11, textTransform: "uppercase", letterSpacing: 1 }}>
          ICCP
        </div>
        {["Invoice Settlement", "Virtual Cards", "Purchase Templates", "Spend Controls", "Reports"].map((item) => (
          <div
            key={item}
            style={{
              padding: "9px 20px 9px 28px",
              color: item === "Invoice Settlement" ? "#eb5c2e" : "#aaa",
              fontSize: 13,
              cursor: "pointer",
              borderLeft: item === "Invoice Settlement" ? "3px solid #eb5c2e" : "3px solid transparent",
              background: item === "Invoice Settlement" ? "rgba(235,92,46,0.08)" : "transparent",
            }}
          >
            {item}
          </div>
        ))}
      </nav>
      {/* Bottom icons */}
      <div style={{ padding: "16px", borderTop: "1px solid #333", display: "flex", gap: 16 }}>
        <div style={{ color: "#888", fontSize: 18, cursor: "pointer" }}>✉</div>
        <div style={{ color: "#888", fontSize: 18, cursor: "pointer" }}>◎</div>
        <div style={{ color: "#888", fontSize: 18, cursor: "pointer" }}>⚙</div>
      </div>
    </div>
  );
}

/* ─── Yellow announcement banner ─── */
function AnnouncementBanner({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div style={{ background: "#FFF3CD", border: "1px solid #F0C030", borderRadius: 6, padding: "14px 18px", marginBottom: 20, display: "flex", gap: 12, alignItems: "flex-start" }}>
      <span style={{ fontSize: 18, marginTop: 1 }}>⚠</span>
      <div style={{ flex: 1 }}>
        <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>Mastercard Connect: ICCP Invoice Settlement now available via Virtual Card Network</p>
        <p style={{ fontSize: 13, color: "#555", lineHeight: 1.5 }}>
          Suppliers enrolled in Taulia can now settle invoices instantly using single-use VCNs issued through HSBC. Reconciliation refs are automatically logged to DLA Madrid ERP on settlement.
          For details see <span style={{ color: "#eb5c2e", cursor: "pointer", textDecoration: "underline" }}>GLB 12637</span>.
        </p>
      </div>
      <button onClick={onDismiss} style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "#888", marginTop: -2 }}>✕</button>
    </div>
  );
}

/* ─── Greeting card ─── */
function GreetingCard() {
  return (
    <div style={{ background: "#1a1a1a", borderRadius: 8, padding: "24px 28px", marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div>
        <p style={{ color: "#aaa", fontSize: 13, marginBottom: 4 }}>Good morning,</p>
        <p style={{ color: "#fff", fontSize: 26, fontWeight: 600 }}>DLA Piper Spain</p>
      </div>
      <div style={{ textAlign: "right" }}>
        <p style={{ color: "#eb5c2e", fontSize: 13, fontWeight: 600 }}>HSBC · ICCP</p>
        <p style={{ color: "#ccc", fontSize: 13 }}>Madrid, ESP</p>
        <p style={{ color: "#eb5c2e", fontSize: 12, cursor: "pointer", marginTop: 2 }}>My Company ›</p>
      </div>
    </div>
  );
}


/* ─── Invoice search + list (Step 1) ─── */
function InvoiceList({ onSelect, settled }: { onSelect: () => void; settled: boolean }) {
  return (
    <div style={{ background: "#fff", borderRadius: 8, overflow: "hidden", border: "1px solid #e0e0e0" }}>
      {/* Taulia header strip */}
      <div style={{ background: "#f7f7f7", padding: "12px 20px", display: "flex", alignItems: "center", gap: 12, borderBottom: "1px solid #ddd" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ color: "#1a7ab5", fontWeight: 800, fontSize: 18 }}>SAP</span>
          <span style={{ background: "#1a7ab5", color: "#fff", fontWeight: 700, fontSize: 12, padding: "1px 6px", borderRadius: 3 }}>Taulia</span>
        </div>
        <span style={{ color: "#888", fontSize: 12 }}>Powered by</span>
        <span style={{ color: "#db0011", fontWeight: 700, fontSize: 14 }}>HSBC</span>
        <span style={{ marginLeft: "auto", color: "#555", fontSize: 12 }}>Entity: <strong>DLA Piper Spain</strong></span>
      </div>

      {/* Search form */}
      <div style={{ padding: "20px", borderBottom: "1px solid #eee" }}>
        <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 14 }}>My Invoices</h3>
        <div style={{ background: "#f9f9f9", border: "1px solid #e0e0e0", borderRadius: 6, padding: 16 }}>
          <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>Search My Invoices</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 24px" }}>
            {[
              ["Invoice Number", "INV-INDRA-2026-0298"],
              ["Purchase Order", ""],
            ].map(([label, val]) => (
              <div key={label}>
                <label style={{ fontSize: 12, color: "#555", display: "block", marginBottom: 3 }}>{label}</label>
                <input defaultValue={val} style={{ width: "100%", border: "1px solid #ccc", borderRadius: 4, padding: "5px 8px", fontSize: 13 }} />
              </div>
            ))}
            <div>
              <label style={{ fontSize: 12, color: "#555", display: "block", marginBottom: 3 }}>Invoice Status</label>
              <select style={{ width: "100%", border: "1px solid #ccc", borderRadius: 4, padding: "5px 8px", fontSize: 13 }}>
                <option>Ready for Settlement</option>
                <option>Pending</option>
                <option>Settled</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, color: "#555", display: "block", marginBottom: 3 }}>Supplier</label>
              <select style={{ width: "100%", border: "1px solid #ccc", borderRadius: 4, padding: "5px 8px", fontSize: 13 }}>
                <option>Indra Sistemas S.A.</option>
              </select>
            </div>
            <div style={{ gridColumn: "span 2" }}>
              <label style={{ fontSize: 12, color: "#555", display: "block", marginBottom: 5 }}>Filter By</label>
              <div style={{ display: "flex", gap: 16, fontSize: 13 }}>
                {["Invoice", "Credit Note", "All"].map((opt) => (
                  <label key={opt} style={{ display: "flex", alignItems: "center", gap: 5, cursor: "pointer" }}>
                    <input type="radio" name="filterBy" defaultChecked={opt === "All"} /> {opt}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results table */}
      <div>
        <div style={{ background: "#3a5a3a", color: "#fff", padding: "10px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13 }}>
          <span>Showing 1–1 of 1 Invoice</span>
          <div style={{ display: "flex", gap: 12 }}>
            <span style={{ cursor: "pointer", opacity: 0.8 }}>↓ Download List</span>
            <span style={{ cursor: "pointer", opacity: 0.8 }}>↺ Refresh</span>
          </div>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
              {["Invoice #", "Inv. Date ↑", "PO #", "Due Date", "Document Amount", "Status", "Payment", "Actions"].map((h) => (
                <th key={h} style={{ textAlign: "left", padding: "10px 12px", color: "#1a7ab5", fontWeight: 500, fontSize: 12 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid #f0f0f0", background: "#fff" }}>
              <td style={{ padding: "12px 12px" }}>
                <button onClick={onSelect} style={{ color: "#1a7ab5", background: "none", border: "none", cursor: "pointer", fontSize: 13, textDecoration: "underline", display: "flex", alignItems: "center", gap: 4 }}>
                  <span>📄</span> INV-INDRA-2026-0298
                </button>
              </td>
              <td style={{ padding: "12px 12px", color: "#333" }}>01 Mar 2026</td>
              <td style={{ padding: "12px 12px", color: "#333" }}>PO-DLA-2026-ES-0441</td>
              <td style={{ padding: "12px 12px", color: "#333" }}>22 Mar 2026</td>
              <td style={{ padding: "12px 12px", color: "#333", fontWeight: 500 }}>€14,000.00</td>
              <td style={{ padding: "12px 12px" }}>
                {settled ? (
                  <span style={{ display: "flex", alignItems: "center", gap: 5, color: "#2e7d32", fontWeight: 600 }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#2e7d32", display: "inline-block" }}></span> Settled
                  </span>
                ) : (
                  <span style={{ color: "#b45309", fontWeight: 500 }}>Ready for Settlement</span>
                )}
              </td>
              <td style={{ padding: "12px 12px", color: settled ? "#1a7ab5" : "#aaa" }}>
                {settled ? "Card Charged" : "—"}
              </td>
              <td style={{ padding: "12px 12px" }}>
                <button style={{ background: "#1a7ab5", color: "#fff", border: "none", borderRadius: 4, padding: "4px 10px", fontSize: 12, cursor: "pointer" }}>⚙</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div style={{ padding: "10px 12px", fontSize: 12, color: "#777" }}>1 | Total items: 1</div>
      </div>
    </div>
  );
}


/* ─── Invoice detail side panel ─── */
function InvoiceDetailPanel({ onInitiate, onClose }: { onInitiate: () => void; onClose: () => void }) {
  return (
    <div className="slide-in" style={{ width: 520, background: "#fff", borderLeft: "1px solid #ddd", minHeight: "100%", display: "flex", flexDirection: "column", flexShrink: 0 }}>
      {/* Header */}
      <div style={{ background: "#1a1a1a", color: "#fff", padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 15, fontWeight: 500 }}>Invoice — INV-INDRA-2026-0298</span>
        <button onClick={onClose} style={{ background: "none", border: "none", color: "#fff", fontSize: 20, cursor: "pointer", lineHeight: 1 }}>✕</button>
      </div>

      <div style={{ padding: "20px", overflowY: "auto", flex: 1 }}>
        {/* Invoice info grid */}
        <p style={{ fontSize: 11, fontWeight: 700, color: "#888", letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>Invoice Information</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "14px 12px", marginBottom: 20, paddingBottom: 20, borderBottom: "1px solid #eee" }}>
          {[
            ["Supplier", "Indra Sistemas S.A."],
            ["Invoice Number", "INV-INDRA-2026-0298"],
            ["Invoice Date", "01 Mar 2026"],
            ["Due Date", "22 Mar 2026"],
            ["Currency", "EUR (€)"],
            ["Budget Code", "ES-IT-2026-Q1"],
            ["PO Match", "✓ Confirmed"],
            ["Goods Receipt", "✓ Confirmed"],
            ["Approver", "DLA Finance Madrid"],
          ].map(([label, val]) => (
            <div key={label}>
              <p style={{ fontSize: 11, color: "#888", marginBottom: 2 }}>{label}</p>
              <p style={{ fontSize: 13, fontWeight: 500, color: val?.startsWith("✓") ? "#2e7d32" : "#1a1a1a" }}>{val}</p>
            </div>
          ))}
        </div>

        {/* Line items */}
        <p style={{ fontSize: 11, fontWeight: 700, color: "#888", letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>Line Items</p>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
              {["#", "Description", "Period", "Qty", "Unit Price", "Amount"].map((h) => (
                <th key={h} style={{ textAlign: h === "#" || h === "Qty" ? "center" : "left", padding: "8px 10px", fontSize: 11, color: "#888", fontWeight: 600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid #f5f5f5" }}>
              <td style={{ padding: "11px 10px", textAlign: "center", color: "#555" }}>1</td>
              <td style={{ padding: "11px 10px", color: "#1a1a1a" }}>IT Infrastructure Services Q1 2026</td>
              <td style={{ padding: "11px 10px", color: "#555" }}>Jan–Mar 2026</td>
              <td style={{ padding: "11px 10px", textAlign: "center", color: "#555" }}>1</td>
              <td style={{ padding: "11px 10px", color: "#555" }}>€12,000.00</td>
              <td style={{ padding: "11px 10px", fontWeight: 500 }}>€12,000.00</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #f5f5f5" }}>
              <td style={{ padding: "11px 10px", textAlign: "center", color: "#555" }}>2</td>
              <td style={{ padding: "11px 10px", color: "#1a1a1a" }}>Network Security Monitoring — Q1</td>
              <td style={{ padding: "11px 10px", color: "#555" }}>Jan–Mar 2026</td>
              <td style={{ padding: "11px 10px", textAlign: "center", color: "#555" }}>1</td>
              <td style={{ padding: "11px 10px", color: "#555" }}>€2,000.00</td>
              <td style={{ padding: "11px 10px", fontWeight: 500 }}>€2,000.00</td>
            </tr>
            <tr>
              <td colSpan={5} style={{ padding: "12px 10px", textAlign: "right", fontWeight: 700, color: "#555" }}>Total</td>
              <td style={{ padding: "12px 10px", fontWeight: 700, fontSize: 15 }}>€14,000.00</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Footer actions */}
      <div style={{ padding: "16px 20px", borderTop: "1px solid #eee", display: "flex", gap: 10 }}>
        <button onClick={onInitiate} style={{ background: "#3a5a3a", color: "#fff", border: "none", borderRadius: 5, padding: "10px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer", flex: 1 }}>
          Initiate Settlement
        </button>
        <button style={{ background: "none", border: "1px solid #ccc", borderRadius: 5, padding: "10px 14px", fontSize: 13, cursor: "pointer", color: "#444" }}>Download Invoice</button>
        <button style={{ background: "none", border: "1px solid #ccc", borderRadius: 5, padding: "10px 14px", fontSize: 13, cursor: "pointer", color: "#444" }}>View Audit Trail</button>
      </div>
    </div>
  );
}


/* ─── Payment Method Modal ─── */
function PayMethodModal({ selected, setSelected, onContinue, onCancel }: {
  selected: PayMethod; setSelected: (m: PayMethod) => void;
  onContinue: () => void; onCancel: () => void;
}) {
  const methods = [
    {
      id: "vcn" as PayMethod,
      label: "Virtual Card (Taulia VCN)",
      desc: "Single-use card · instant settlement · full audit trail",
      recommended: true,
      icon: "💳",
    },
    {
      id: "sepa" as PayMethod,
      label: "SEPA Bank Transfer",
      desc: "Standard transfer · 1–3 business days",
      recommended: false,
      icon: "🏦",
    },
    {
      id: "wire" as PayMethod,
      label: "Wire Transfer",
      desc: "Same-day · additional fees may apply",
      recommended: false,
      icon: "⚡",
    },
  ];

  return (
    <div className="modal-overlay">
      <div className="fade-in" style={{ background: "#fff", borderRadius: 10, width: 500, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
        {/* Header */}
        <div style={{ background: "#1a1a1a", color: "#fff", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 15, fontWeight: 600 }}>Select Payment Method</span>
          <button onClick={onCancel} style={{ background: "none", border: "none", color: "#fff", fontSize: 20, cursor: "pointer" }}>✕</button>
        </div>

        <div style={{ padding: "20px" }}>
          {/* Invoice summary */}
          <div style={{ background: "#f8f8f8", border: "1px solid #e5e5e5", borderRadius: 6, padding: "12px 16px", marginBottom: 18, display: "flex", justifyContent: "space-between" }}>
            <div>
              <p style={{ fontSize: 10, color: "#888", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 3 }}>Invoice</p>
              <p style={{ fontSize: 13, fontWeight: 500 }}>INV-INDRA-2026-0298 · Indra Sistemas S.A.</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: 10, color: "#888", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 3 }}>Amount</p>
              <p style={{ fontSize: 15, fontWeight: 700 }}>€14,000.00</p>
            </div>
          </div>

          <p style={{ fontSize: 11, fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Choose Payment Method</p>

          {/* Method options */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {methods.map((m) => (
              <div
                key={m.id}
                onClick={() => setSelected(m.id)}
                style={{
                  border: selected === m.id ? "2px solid #1a7ab5" : "1px solid #ddd",
                  borderRadius: 8,
                  padding: "14px 16px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  background: selected === m.id ? "#f0f7ff" : "#fff",
                }}
              >
                <span style={{ fontSize: 22 }}>{m.icon}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{m.label}</p>
                  <p style={{ fontSize: 12, color: "#666" }}>{m.desc}</p>
                </div>
                {m.recommended && (
                  <span style={{ background: "#1a7ab5", color: "#fff", fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 4, letterSpacing: 0.5 }}>
                    RECOMMENDED
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Actions */}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 20 }}>
            <button onClick={onCancel} style={{ background: "none", border: "1px solid #ccc", borderRadius: 5, padding: "9px 20px", fontSize: 13, cursor: "pointer", color: "#444" }}>Cancel</button>
            <button
              onClick={onContinue}
              disabled={!selected}
              style={{ background: selected ? "#1a7ab5" : "#b0c4d8", color: "#fff", border: "none", borderRadius: 5, padding: "9px 20px", fontSize: 13, fontWeight: 600, cursor: selected ? "pointer" : "not-allowed" }}
            >
              Continue →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


/* ─── VCN Card visual ─── */
function VCNCard() {
  return (
    <div style={{
      background: "linear-gradient(135deg, #1a3a6a 0%, #2d5fa6 60%, #1a4a8a 100%)",
      borderRadius: 12, padding: "20px 24px", color: "#fff", position: "relative", overflow: "hidden", marginBottom: 20,
    }}>
      {/* Decorative circles */}
      <div style={{ position: "absolute", right: -20, top: -20, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
      <div style={{ position: "absolute", right: 30, bottom: -30, width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />

      {/* Chip + logo */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
        <div style={{ width: 32, height: 24, background: "#f0c030", borderRadius: 4 }} />
        <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: 1, color: "#fff", opacity: 0.9 }}>TAULIA</span>
      </div>

      {/* Card number */}
      <p style={{ fontSize: 16, letterSpacing: 3, fontWeight: 500, marginBottom: 16, fontFamily: "monospace" }}>
        0298 ···· ···· DLA–INDRA
      </p>

      {/* Card holder + expiry + type */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <p style={{ fontSize: 9, opacity: 0.6, textTransform: "uppercase", letterSpacing: 1, marginBottom: 2 }}>Card Holder</p>
          <p style={{ fontSize: 13, fontWeight: 600 }}>DLA PIPER SPAIN</p>
        </div>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: 9, opacity: 0.6, textTransform: "uppercase", letterSpacing: 1, marginBottom: 2 }}>Expires</p>
          <p style={{ fontSize: 13, fontWeight: 600 }}>03/26</p>
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#f0c030" }}>TAULIA</p>
          <p style={{ fontSize: 9, opacity: 0.7, marginTop: 2 }}>VCN · SINGLE USE</p>
        </div>
      </div>
    </div>
  );
}

/* ─── VCN Details Confirmation Modal ─── */
function VCNDetailModal({ onBack, onConfirm }: { onBack: () => void; onConfirm: () => void }) {
  return (
    <div className="modal-overlay">
      <div className="fade-in" style={{ background: "#fff", borderRadius: 10, width: 520, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.35)" }}>
        {/* Header */}
        <div style={{ background: "#1a1a1a", color: "#fff", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 15, fontWeight: 600 }}>Virtual Card Details — Confirm Settlement</span>
          <button onClick={onBack} style={{ background: "none", border: "none", color: "#fff", fontSize: 20, cursor: "pointer" }}>✕</button>
        </div>

        <div style={{ padding: "24px" }}>
          <VCNCard />

          {/* Details grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px 20px", marginBottom: 18 }}>
            {[
              ["Card Reference", "0298-DLA-INDRA", false],
              ["Authorised Amount", "€14,000.00", true],
              ["Valid Until", "31 Mar 2026", false],
              ["Settlement Ref", "STL-2026-0318-VC0298", false],
              ["Payee", "Indra Sistemas S.A.", false],
              ["Card Type", "Single-Use VCN", false],
            ].map(([label, val, highlight]) => (
              <div key={label as string}>
                <p style={{ fontSize: 11, color: "#888", marginBottom: 3 }}>{label as string}</p>
                <p style={{ fontSize: 13, fontWeight: 600, color: highlight ? "#2e7d32" : "#1a1a1a" }}>{val as string}</p>
              </div>
            ))}
          </div>

          {/* Warning */}
          <div style={{ background: "#fffbeb", border: "1px solid #f0c030", borderRadius: 6, padding: "10px 14px", marginBottom: 20, display: "flex", gap: 8, alignItems: "flex-start" }}>
            <span style={{ color: "#b45309", fontSize: 14 }}>⚠</span>
            <p style={{ fontSize: 12, color: "#92400e", lineHeight: 1.5 }}>
              This single-use card will be invalidated after first charge. Reconciliation ref logged to DLA Madrid ERP on settlement.
            </p>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
            <button onClick={onBack} style={{ background: "none", border: "1px solid #ccc", borderRadius: 5, padding: "10px 20px", fontSize: 13, cursor: "pointer", color: "#444" }}>Back</button>
            <button onClick={onConfirm} style={{ background: "#1a7ab5", color: "#fff", border: "none", borderRadius: 5, padding: "10px 24px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
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
    <div className="fade-in" style={{ border: "1px solid #4caf50", borderRadius: 8, padding: "16px 20px", marginBottom: 20, background: "#f1faf2" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
        <span style={{ color: "#2e7d32", fontSize: 18 }}>✓</span>
        <strong style={{ color: "#2e7d32", fontSize: 15 }}>Settlement Processed Successfully</strong>
      </div>
      <p style={{ fontSize: 13, color: "#444", marginBottom: 6 }}>
        Reference: <strong>STL-2026-0318-VC0298</strong> · Reconciliation ref logged to DLA Madrid ERP
      </p>
      <div style={{ display: "flex", gap: 24, fontSize: 13, color: "#555" }}>
        <span>Supplier: <strong>Indra Sistemas S.A.</strong></span>
        <span>Amount: <strong>€14,000.00</strong></span>
        <span>Method: <strong>Taulia VCN</strong></span>
        <span>Date: <strong>18 Mar 2026</strong></span>
      </div>
    </div>
  );
}

/* ─── Top nav bar ─── */
function TopNav() {
  const links = ["Home", "Invoices", "Payments", "Cash Planner", "Cashflow™", "My Details", "Custom FAQs"];
  return (
    <div style={{ background: "#f7f7f7", borderBottom: "1px solid #ddd", padding: "10px 24px", display: "flex", alignItems: "center", gap: 24 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginRight: 16 }}>
        <span style={{ color: "#1a7ab5", fontWeight: 800, fontSize: 17 }}>SAP</span>
        <span style={{ background: "#1a7ab5", color: "#fff", fontWeight: 700, fontSize: 11, padding: "1px 5px", borderRadius: 3 }}>Taulia</span>
        <span style={{ color: "#888", fontSize: 11, marginLeft: 4 }}>Powered by</span>
        <span style={{ color: "#db0011", fontWeight: 700, fontSize: 13 }}>HSBC</span>
      </div>
      {links.map((l) => (
        <span key={l} style={{ fontSize: 13, color: l === "Invoices" ? "#1a7ab5" : "#444", fontWeight: l === "Invoices" ? 600 : 400, borderBottom: l === "Invoices" ? "2px solid #1a7ab5" : "none", paddingBottom: 2, cursor: "pointer" }}>
          {l}
        </span>
      ))}
    </div>
  );
}

/* ─── Main App ─── */
export default function Home() {
  const [step, setStep] = useState<Step>("list");
  const [payMethod, setPayMethod] = useState<PayMethod>("vcn");
  const [showBanner, setShowBanner] = useState(true);
  const [settled, setSettled] = useState(false);

  const handleConfirmSettlement = () => {
    setSettled(true);
    setStep("success");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f0f0f0" }}>
      {/* Sidebar */}
      <Sidebar activePage="Invoice Settlement" />

      {/* Main content area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Top nav (Taulia branding) */}
        <TopNav />

        {/* Content */}
        <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
          {/* Left: main area */}
          <div style={{ flex: 1, padding: "24px", overflowY: "auto" }}>
            {showBanner && <AnnouncementBanner onDismiss={() => setShowBanner(false)} />}
            {step === "success" && <SuccessBanner />}
            <GreetingCard />
            <div style={{ marginBottom: 6 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Invoice Settlement</h2>
              <p style={{ fontSize: 13, color: "#777" }}>Settle invoices via Virtual Card Network — instant, single-use, full audit trail</p>
            </div>
            <div style={{ marginTop: 16 }}>
              <InvoiceList
                onSelect={() => setStep("detail")}
                settled={settled}
              />
            </div>
          </div>

          {/* Right: invoice detail panel */}
          {(step === "detail" || step === "paymethod" || step === "vcndetail") && (
            <InvoiceDetailPanel
              onInitiate={() => setStep("paymethod")}
              onClose={() => setStep("list")}
            />
          )}
        </div>
      </div>

      {/* Modals */}
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
          onConfirm={handleConfirmSettlement}
        />
      )}
    </div>
  );
}
