import React from 'react';

const AGBs: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-24 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8 text-center">Allgemeine Geschäftsbedingungen (AGB)</h1>

      <h2 className="text-2xl font-semibold mb-4">1. Geltungsbereich</h2>
      <p className="mb-4">
        Diese Allgemeinen Geschäftsbedingungen (nachfolgend „AGB“) gelten für alle Verträge, die über die Website [Ihre Website-Adresse] zwischen meetio.ai (nachfolgend „Anbieter“) und Ihnen als Kunden (nachfolgend „Kunde“) geschlossen werden.
      </p>

      <h2 className="text-2xl font-semibold mb-4">2. Vertragspartner</h2>
      <p className="mb-4">
        Der Vertrag kommt zustande mit:
        <br />
        meetio.ai
        <br />
        81549 München
        <br />
        founders@meetio.ai
      </p>

      <h2 className="text-2xl font-semibold mb-4">3. Angebot und Vertragsschluss</h2>
      <p className="mb-4">
        Die Darstellung der Produkte und Dienstleistungen auf der Website stellt kein rechtlich bindendes Angebot, sondern einen unverbindlichen Online-Katalog dar. Durch Anklicken des Buttons „zahlungspflichtig bestellen“ geben Sie eine verbindliche Bestellung der im Warenkorb enthaltenen Waren ab. Die Bestätigung des Zugangs Ihrer Bestellung erfolgt zusammen mit der Annahme der Bestellung unmittelbar nach dem Absenden durch automatisierte E-Mail. Mit dieser E-Mail-Bestätigung ist der Kaufvertrag zustande gekommen.
      </p>

      <h2 className="text-2xl font-semibold mb-4">4. Preise und Zahlungsbedingungen</h2>
      <p className="mb-4">
        Alle angegebenen Preise sind Endpreise und enthalten die gesetzliche Mehrwertsteuer. Die Zahlung erfolgt wahlweise per [Zahlungsmethoden, z.B. Vorkasse, PayPal, Kreditkarte].
      </p>

      <h2 className="text-2xl font-semibold mb-4">5. Lieferung und Versandkosten</h2>
      <p className="mb-4">
        Die Lieferung erfolgt innerhalb von [Anzahl] Werktagen. Die Versandkosten betragen [Betrag] Euro. Ab einem Bestellwert von [Betrag] Euro liefern wir versandkostenfrei.
      </p>

      <h2 className="text-2xl font-semibold mb-4">6. Widerrufsrecht</h2>
      <p className="mb-4">
        Verbrauchern steht ein Widerrufsrecht nach Maßgabe der folgenden Belehrung zu:
        <br />
        Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie oder ein von Ihnen benannter Dritter, der nicht der Beförderer ist, die Waren in Besitz genommen haben bzw. hat.
      </p>

      <h2 className="text-2xl font-semibold mb-4">7. Gewährleistung</h2>
      <p className="mb-4">
        Es gelten die gesetzlichen Gewährleistungsrechte.
      </p>

      <h2 className="text-2xl font-semibold mb-4">8. Haftung</h2>
      <p className="mb-4">
        Wir haften für Vorsatz und grobe Fahrlässigkeit. Für leichte Fahrlässigkeit haften wir nur bei Verletzung einer wesentlichen Vertragspflicht, deren Erfüllung die ordnungsgemäße Durchführung des Vertrags überhaupt erst ermöglicht und auf deren Einhaltung der Vertragspartner regelmäßig vertrauen darf.
      </p>

      <h2 className="text-2xl font-semibold mb-4">9. Schlussbestimmungen</h2>
      <p className="mb-4">
        Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts. Gerichtsstand ist [Ihr Gerichtsstand], sofern der Kunde Kaufmann ist.
      </p>
    </div>
  );
};

export default AGBs;
