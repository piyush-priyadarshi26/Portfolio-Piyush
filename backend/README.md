# Portfolio Backend

A FastAPI-based backend for the portfolio website.

## Folder Structure

```
backend/
├── main.py                  # Entry point — registers all routers
├── requirements.txt         # Python dependencies
├── app/
│   ├── __init__.py
│   ├── models.py            # Pydantic request/response models
│   ├── utils.py             # Shared JSON file read/write helpers
│   └── routes/
│       ├── __init__.py
│       ├── visits.py        # GET/POST /api/visits
│       └── contact.py       # POST /api/contact
└── data/
    ├── visits.json          # Persistent visit counter
    └── contact_messages.json # All submitted contact form messages
```

## Running the server

```bash
# Install dependencies
pip install -r requirements.txt

# Start the development server
uvicorn main:app --reload --port 8000
```

## API Endpoints

| Method | Endpoint        | Description                        |
|--------|-----------------|------------------------------------|
| GET    | /api/visits     | Get the current visit count        |
| POST   | /api/visits     | Increment the visit count by 1     |
| POST   | /api/contact    | Save a contact form submission     |

## Reading contact messages

All contact form submissions are saved to `data/contact_messages.json`.
Open this file in any text editor to read messages from visitors.
