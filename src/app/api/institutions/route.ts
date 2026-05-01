import { type NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { institutionSchema } from "@/lib/schemas/institution-schema";

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const TO_EMAIL = process.env.CONTACT_EMAIL ?? "contact@liyen.fr";
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Corps de requête invalide." }, { status: 400 });
  }

  const result = institutionSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: "Données invalides.", details: result.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  const { institution, contact_name, role, email, phone, message } = result.data;

  try {
    await resend.emails.send({
      from: "Liyen Institutions <noreply@liyen.fr>",
      to: TO_EMAIL,
      replyTo: email,
      subject: `Demande partenariat — ${institution}`,
      text: [
        `Structure : ${institution}`,
        `Contact : ${contact_name} (${role})`,
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
