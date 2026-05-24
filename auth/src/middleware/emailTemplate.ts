type AuthEmailTemplateParams = {
  title: string
  heading: string
  message: string
  codeLabel?: string
  code?: string
  highlight?: string
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

export const buildAuthEmailTemplate = ({
  title,
  heading,
  message,
  codeLabel,
  code,
  highlight,
}: AuthEmailTemplateParams) => {
  const safeHeading = escapeHtml(heading)
  const safeMessage = escapeHtml(message)
  const safeCode = code ? escapeHtml(code) : ''
  const safeHighlight = highlight ? escapeHtml(highlight) : ''

  return `
    <div style="margin:0;background:#f3f4f6;padding:32px 0;font-family:Arial,Helvetica,sans-serif;color:#0f172a;">
      <div style="max-width:640px;margin:0 auto;padding:0 20px;">
        <div style="border-radius:24px;overflow:hidden;background:#ffffff;border:1px solid #e5e7eb;box-shadow:0 18px 50px rgba(15,23,42,0.08);">
          <div style="padding:28px 32px;background:linear-gradient(135deg,#0f172a,#155e75);color:#f8fafc;">
            <div style="font-size:12px;letter-spacing:.2em;text-transform:uppercase;opacity:.8;">${escapeHtml(title)}</div>
            <h1 style="margin:10px 0 0;font-size:28px;line-height:1.15;letter-spacing:-0.04em;">${safeHeading}</h1>
          </div>
          <div style="padding:32px;">
            <p style="margin:0 0 20px;font-size:16px;line-height:1.7;color:#334155;">${safeMessage}</p>
            ${code ? `
              <div style="margin:24px 0;padding:18px 20px;border-radius:18px;background:#eff6ff;border:1px solid #bfdbfe;text-align:center;">
                <div style="font-size:12px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#1d4ed8;margin-bottom:8px;">${escapeHtml(codeLabel ?? 'Verification code')}</div>
                <div style="font-size:32px;font-weight:800;letter-spacing:.18em;color:#0f172a;">${safeCode}</div>
              </div>
            ` : ''}
            ${highlight ? `
              <div style="margin:24px 0;padding:18px 20px;border-radius:18px;background:#f8fafc;border:1px solid #e2e8f0;color:#0f172a;font-weight:600;">
                ${safeHighlight}
              </div>
            ` : ''}
            <p style="margin:0;font-size:14px;line-height:1.6;color:#64748b;">
              If you did not request this email, you can ignore it.
            </p>
          </div>
        </div>
      </div>
    </div>
  `
}
