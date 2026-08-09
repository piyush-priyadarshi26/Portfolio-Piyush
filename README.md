# Portfolio Website

A modern "Dark Executive" portfolio website built with Next.js and FastAPI.

## Project Structure

```
Portfolio Test/
│
├── frontend/                          # Next.js App (React + TypeScript + Tailwind)
│   ├── public/                        # Static assets (images, fonts, etc.)
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx             # Root layout (fonts, dark mode)
│   │   │   ├── page.tsx               # Main page (assembles all sections)
│   │   │   └── globals.css            # Global styles & CSS variables
│   │   └── components/
│   │       ├── Navbar.tsx             # Fixed top navigation bar
│   │       ├── Hero.tsx               # Landing hero section
│   │       ├── About.tsx              # About me section
│   │       ├── Projects.tsx           # Featured projects grid
│   │       ├── Experience.tsx         # Experience timeline & tech stack
│   │       ├── Contact.tsx            # Contact form section
│   │       ├── Footer.tsx             # Footer with social links & visit counter
│   │       └── ui/
│   │           ├── button.tsx         # Reusable Button component (shadcn/ui)
│   │           ├── icons.tsx          # Custom SVG icons (Github, Linkedin)
│   │           └── spotlight-cursor.tsx # Canvas-based spotlight cursor effect
│   ├── package.json
│   └── tailwind.config.ts
│
└── backend/                           # FastAPI Python API
    ├── main.py                        # Entry point — registers all routers
    ├── requirements.txt               # Python dependencies
    ├── README.md                      # Backend documentation
    ├── app/
    │   ├── models.py                  # Pydantic request models
    │   ├── utils.py                   # JSON file read/write helpers
    │   └── routes/
    │       ├── visits.py              # /api/visits endpoint
    │       └── contact.py             # /api/contact endpoint
    └── data/
        ├── visits.json                # Visit counter data
        └── contact_messages.json      # All contact form submissions
```

## Getting Started

### Frontend
```bash
cd frontend
npm install
npm run dev
# Opens at http://localhost:3000
```

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
# API runs at http://localhost:8000
```

## Deployment to Google Cloud Run

This project is configured for easy deployment to Google Cloud Run using the included `deploy.ps1` script.

### Prerequisites
1. [Google Cloud SDK (gcloud CLI)](https://cloud.google.com/sdk/docs/install) installed and authenticated.
2. A Google Cloud Project with Billing enabled.

### Quick Deploy
Run the following command from the root directory:
```powershell
.\deploy.ps1 -ProjectID your-gcp-project-id
```

### Manual Deployment
If you prefer manual steps:
1. **Deploy Backend**:
   ```bash
   cd backend
   gcloud run deploy portfolio-backend --source . --set-env-vars "ALLOWED_ORIGINS=*"
   ```
2. **Deploy Frontend**:
   Note the Backend URL from the previous step and use it as a build argument.
   ```bash
   cd ../frontend
   gcloud run deploy portfolio-frontend --source . --build-arg "NEXT_PUBLIC_API_URL=https://your-backend-url"
   ```
