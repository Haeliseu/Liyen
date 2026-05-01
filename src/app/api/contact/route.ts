import { type NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/schemas/contact-schema";

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const TO_EMAIL = process.env.CONTACT_EMAIL ?? "contact@liyen.fr";
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Corps de requête invalide." }, { status: 400 });
  }

  const result = contactSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: "Données invalides.", details: result.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  const { name, email, phone, message } = result.data;

  try {
    await resend.emails.send({
      from: "Liyen Contact <noreply@liyen.fr>",
      to: TO_EMAIL,
      replyTo: email,
      subject: `Nouveau message de ${name}`,
      text: [
        `Nom : ${name}`,
        `Email : ${email}`,
        phone ? `Téléphone : ${phone}` : null,
        ``,
        `Message :`,
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    });
  } catch {
    return NextResponse.json(
      { error: "Impossible d'envoyer l'email. Veuillez réessayer." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
