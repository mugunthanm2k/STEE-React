// logger.js
export class Logger {
  constructor() {
    this.events = JSON.parse(localStorage.getItem("audit_logs")) || [];
    this.attemptId = "ATTEMPT_001";
  }

  log(type, data = {}) {
    const evt = {
      eventType: type,
      timestamp: new Date().toISOString(),
      attemptId: this.attemptId,
      questionId: "Q1",
      metadata: {
        browser: navigator.userAgent,
        focusState: document.hasFocus(),
        url: window.location.href,
        ...data,
      },
    };

    this.events.push(evt);
    localStorage.setItem("audit_logs", JSON.stringify(this.events));

    console.log("[AUDIT]", evt);
  }

  async batchSend() {
    if (!this.events.length) return;

    try {
      await fetch("/api/logs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.events),
      });

      // Clear after successful send
      this.events = [];
      localStorage.removeItem("audit_logs");
    } catch (err) {
      console.log("Batch send failed. Will retry.");
    }
  }
}
