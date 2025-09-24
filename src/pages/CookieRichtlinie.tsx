import React from 'react';

const CookieRichtlinie: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-24 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8 text-center">Cookie-Richtlinie</h1>

      <h2 className="text-2xl font-semibold mb-4">1. Was sind Cookies?</h2>
      <p className="mb-4">
        Cookies sind kleine Textdateien, die von Websites, die Sie besuchen, auf Ihrem Computer oder Mobilgerät abgelegt werden. Sie werden häufig verwendet, um Websites funktionsfähig zu machen oder effizienter zu arbeiten, sowie um den Betreibern der Website Informationen bereitzustellen.
      </p>

      <h2 className="text-2xl font-semibold mb-4">2. Wie verwenden wir Cookies?</h2>
      <p className="mb-4">
        Wir verwenden Cookies, um die Funktionalität unserer Website zu gewährleisten, die Nutzung unserer Website zu analysieren und unsere Marketingbemühungen zu unterstützen. Dies umfasst:
      </p>
      <ul className="list-disc list-inside mb-4 pl-4">
        <li><strong className="font-semibold">Essenzielle Cookies:</strong> Diese Cookies sind für den Betrieb unserer Website unbedingt erforderlich. Ohne diese Cookies können bestimmte Dienste nicht bereitgestellt werden.</li>
        <li><strong className="font-semibold">Analyse- und Performance-Cookies:</strong> Diese Cookies sammeln Informationen darüber, wie Besucher unsere Website nutzen, z.B. welche Seiten am häufigsten besucht werden und ob Fehlermeldungen angezeigt werden. Diese Cookies sammeln keine Informationen, die einen Besucher identifizieren. Alle Informationen, die diese Cookies sammeln, sind aggregiert und daher anonym. Sie werden nur verwendet, um die Funktionsweise einer Website zu verbessern.</li>
        <li><strong className="font-semibold">Funktionalitäts-Cookies:</strong> Diese Cookies ermöglichen es der Website, sich an von Ihnen getroffene Auswahlen zu erinnern (wie z.B. Ihren Benutzernamen, Ihre Sprache oder die Region, in der Sie sich befinden) und erweiterte, persönlichere Funktionen bereitzustellen.</li>
        <li><strong className="font-semibold">Marketing-Cookies:</strong> Diese Cookies werden verwendet, um Werbung anzuzeigen, die für Sie und Ihre Interessen relevanter ist. Sie werden auch verwendet, um die Häufigkeit zu begrenzen, mit der Sie eine Anzeige sehen, sowie um die Wirksamkeit von Werbekampagnen zu messen.</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">3. Ihre Cookie-Einstellungen</h2>
      <p className="mb-4">
        Sie haben das Recht zu entscheiden, ob Sie Cookies akzeptieren oder ablehnen möchten. Sie können Ihre Cookie-Einstellungen ändern, indem Sie die Einstellungen in Ihrem Webbrowser anpassen. Die meisten Webbrowser ermöglichen eine gewisse Kontrolle über die meisten Cookies über die Browsereinstellungen. Beachten Sie jedoch, dass das Deaktivieren von Cookies die Funktionalität dieser und vieler anderer Websites, die Sie besuchen, beeinträchtigen kann.
      </p>

      <h2 className="text-2xl font-semibold mb-4">4. Änderungen an unserer Cookie-Richtlinie</h2>
      <p className="mb-4">
        Wir können diese Cookie-Richtlinie von Zeit zu Zeit aktualisieren, um beispielsweise Änderungen an den von uns verwendeten Cookies oder aus anderen betrieblichen, rechtlichen oder regulatorischen Gründen widerzuspiegeln. Bitte besuchen Sie diese Cookie-Richtlinie daher regelmäßig, um über unsere Verwendung von Cookies und verwandten Technologien auf dem Laufenden zu bleiben.
      </p>
    </div>
  );
};

export default CookieRichtlinie;
