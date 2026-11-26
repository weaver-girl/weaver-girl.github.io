import { verifyChecks } from "../data/content";

/**
 * Four checks in one terminal surface instead of four cards: command, expected
 * answer, and what a failure usually means. Nothing here is a live status — the
 * column is explicitly labelled as the expected response.
 */
export function VerifyConsole() {
  return (
    <div className="verify-console">
      <div className="verify-console-bar">
        <span className="console-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span>weaver-girl · verify</span>
        <span className="verify-console-count">4 endpoints</span>
      </div>
      <ol className="verify-console-list">
        {verifyChecks.map((check, index) => (
          <li key={check.key}>
            <span className="verify-index">{String(index + 1).padStart(2, "0")}</span>
            <div className="verify-command">
              <b>{check.label}</b>
              <code>
                <span aria-hidden="true">$ </span>
                {check.command}
              </code>
            </div>
            <div className="verify-answer">
              <span>预期响应</span>
              <code>{check.expect}</code>
            </div>
            <p>{check.note}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
