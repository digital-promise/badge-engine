import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type SendIssuedBadgeEmailInput = {
  recipientName: string;
  recipientEmail: string;
  badgeTitle: string;
  verificationUrl: string;
  imageUrl?: string | null;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendIssuedBadgeEmail(
  input: SendIssuedBadgeEmailInput
) {
  const {
    recipientName,
    recipientEmail,
    badgeTitle,
    verificationUrl,
    imageUrl,
  } = input;

  const subject = `Your badge is ready: ${badgeTitle}`;

  const safeRecipientName = escapeHtml(recipientName);
  const safeBadgeTitle = escapeHtml(badgeTitle);
  const safeVerificationUrl = escapeHtml(verificationUrl);
  const safeImageUrl = imageUrl ? escapeHtml(imageUrl) : null;

  const html = `
    <div style="font-family: Arial, Helvetica, sans-serif; line-height: 1.6; color: #222;">
      <h2>Your badge is ready</h2>
      <p>Hello ${safeRecipientName},</p>
      <p>Your <strong>${safeBadgeTitle}</strong> badge has been issued.</p>
      <p>
        You can verify your badge here:<br />
        <a href="${safeVerificationUrl}">${safeVerificationUrl}</a>
      </p>
      ${
        safeImageUrl
          ? `<p>You can also view your badge image here:<br /><a href="${safeImageUrl}">${safeImageUrl}</a></p>`
          : ""
      }
      <p>Thank you.</p>
    </div>
  `;

  const result = await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to: recipientEmail,
    subject,
    html,
  });

  return result;
}
