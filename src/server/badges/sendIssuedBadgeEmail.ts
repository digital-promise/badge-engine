import { Resend } from "resend";

import { env } from "~/env";

const resend = new Resend(env.RESEND_API_KEY);

type SendIssuedBadgeEmailInput = {
  recipientName: string;
  recipientEmail: string;
  badgeTitle: string;
  verificationUrl: string;
  imageUrl?: string | null;
};

export async function sendIssuedBadgeEmail(
  input: SendIssuedBadgeEmailInput
) {
  const { recipientName, recipientEmail, badgeTitle, verificationUrl, imageUrl } =
    input;

  const subject = `Your badge is ready: ${badgeTitle}`;

  const html = `
    <div style="font-family: Arial, Helvetica, sans-serif; line-height: 1.6; color: #222;">
      <h2>Your badge is ready</h2>
      <p>Hello ${recipientName},</p>
      <p>Your <strong>${badgeTitle}</strong> badge has been issued.</p>
      <p>
        You can verify your badge here:<br />
        <a href="${verificationUrl}">${verificationUrl}</a>
      </p>
      ${
        imageUrl
          ? `<p>You can also view your badge image here:<br /><a href="${imageUrl}">${imageUrl}</a></p>`
          : ""
      }
      <p>Thank you.</p>
    </div>
  `;

  const result = await resend.emails.send({
    from: env.EMAIL_FROM,
    to: recipientEmail,
    subject,
    html,
  });

  return result;
}
