# DevPulse - Issue & Bug Tracker

DevPulse is a simple 3-tier full-stack web application built to create, view, update, and delete software bugs and task tickets during a project sprint.

## Tech Stack

- **Frontend:** React, Vite, Axios, CSS
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL (Running inside Docker)

## Features

- **Create Tickets:** Add new bug/task tickets with specific priority levels (Low, Medium, High).
- **View Tickets:** Read all stored tickets fetched directly from the PostgreSQL database.
- **Update Status:** Toggle ticket state between `Open` and `Resolved`.
- **Delete Tickets:** Remove unwanted or completed tickets permanently.

## Project Structure

```text
DevPulse/
├── docker-compose.yml
├── backend/
│   ├── server.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── App.jsx
    │   └── App.css
    ├── index.html
    └── package.json