import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { formationId, formationTitle, sessionId, sessionDate, sessionLocation } = body;

    // TODO: Intégrer Stripe
    // Pour l'instant, on retourne une URL de test
    // Vous devrez installer @stripe/stripe-js et créer une session Stripe Checkout
    
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    
    if (!stripeSecretKey) {
      // Mode développement : rediriger vers une page de confirmation
      return NextResponse.json({
        url: `/devis/confirmation?formationId=${formationId}&sessionId=${sessionId}`,
      });
    }

    // TODO: Implémenter la création de session Stripe Checkout
    // const stripe = require('stripe')(stripeSecretKey);
    // const session = await stripe.checkout.sessions.create({...});

    return NextResponse.json({
      error: "Stripe non configuré. Veuillez configurer STRIPE_SECRET_KEY dans les variables d'environnement.",
    }, { status: 500 });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de la session de paiement" },
      { status: 500 }
    );
  }
}
