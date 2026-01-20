import { Resend } from "resend";

const resend = new Resend(process.env.VITE_RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { to, subject, html } = req.body;

  try {
    const data = await resend.emails.send({
      from: "KarLink <onboarding@resend.dev>", // Default testing domain
      to: [to],
      subject: subject,
      html: html,
    });

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
