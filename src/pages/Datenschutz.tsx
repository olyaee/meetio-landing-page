import React from 'react';

const Datenschutz: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-24 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8 text-center">Datenschutzerklärung</h1>

      <h2 className="text-2xl font-semibold mb-4">1. Einleitung</h2>
      <p className="mb-4">
        Wir freuen uns über Ihr Interesse an unserer Website. Der Schutz Ihrer persönlichen Daten ist uns ein wichtiges Anliegen. Nachfolgend informieren wir Sie ausführlich über den Umgang mit Ihren Daten.
      </p>

      <h2 className="text-2xl font-semibold mb-4">2. Verantwortliche Stelle</h2>
      <p className="mb-4">
        Verantwortlich für die Datenverarbeitung auf dieser Website ist:
        <br />
        meetio.ai
        <br />
        81549 München
        <br />
        founders@meetio.ai
      </p>

      <h2 className="text-2xl font-semibold mb-4">3. Datenerfassung auf unserer Website</h2>
      <h3 className="text-xl font-semibold mb-3">3.1. Server-Log-Dateien</h3>
      <p className="mb-4">
        Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
      </p>
      <ul className="list-disc list-inside mb-4 pl-4">
        <li>Browsertyp und Browserversion</li>
        <li>verwendetes Betriebssystem</li>
        <li>Referrer URL</li>
        <li>Hostname des zugreifenden Rechners</li>
        <li>Uhrzeit der Serveranfrage</li>
        <li>IP-Adresse</li>
      </ul>
      <p className="mb-4">
        Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Grundlage für die Datenverarbeitung ist Art. 6 Abs. 1 lit. f DSGVO, der die Verarbeitung von Daten zur Erfüllung eines Vertrags oder vorvertraglicher Maßnahmen gestattet.
      </p>

      <h3 className="text-xl font-semibold mb-3">3.2. Kontaktformular</h3>
      <p className="mb-4">
        Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
      </p>

      <h2 className="text-2xl font-semibold mb-4">4. Ihre Rechte</h2>
      <p className="mb-4">
        Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung, Sperrung oder Löschung dieser Daten zu verlangen. Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden.
      </p>

      <h2 className="text-2xl font-semibold mb-4">5. Widerspruch gegen Werbe-E-Mails</h2>
      <p className="mb-4">
        Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten zur Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit widersprochen. Die Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung von Werbeinformationen, etwa durch Spam-E-Mails, vor.
      </p>
    </div>
  );
};

export default Datenschutz;
