# MeetioAI Canvas Flow

Eine moderne React-Anwendung für Meeting Intelligence und Workflow-Automatisierung.

## Entwicklung

**Lokale Entwicklung**

Klone dieses Repository und starte die Entwicklungsumgebung:

```bash
npm install
npm run dev
```

Der Entwicklungsserver läuft auf http://localhost:8080

## Befehle

- `npm run dev` - Startet den Entwicklungsserver
- `npm run build` - Erstellt die Produktionsversion
- `npm run build:dev` - Erstellt die Entwicklungsversion
- `npm run lint` - Führt ESLint aus
- `npm run preview` - Zeigt die erstellte Anwendung an

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui
- **Animation**: Framer Motion, CSS-Animationen
- **Icons**: Lucide React
- **Formulare**: React Hook Form mit Zod-Validierung

## Projektstruktur

```
src/
├── components/          # React-Komponenten
├── pages/              # Seiten-Komponenten
├── lib/                # Utility-Funktionen
└── styles/             # Globale Styles
```

## Deployment

Das Projekt kann auf jeder modernen Web-Plattform deployed werden, die statische Seiten unterstützt:

- Vercel
- Netlify  
- GitHub Pages
- AWS S3 + CloudFront

Führe `npm run build` aus, um die Produktionsversion im `dist/` Ordner zu erstellen.

## Custom Domain

Für eine benutzerdefinierte Domain, konfiguriere deinen DNS-Provider entsprechend der gewählten Hosting-Plattform.