# SportSphere - Sports Event Management System

SportSphere is a comprehensive web application for managing sports events, teams, participants, and results.

## Features

- User authentication and authorization
- Event creation and management
- Team management
- Participant registration
- Schedule viewing
- Results tracking
- Admin dashboard

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MySQL
- **ORM**: Prisma
- **Authentication**: NextAuth.js

## Getting Started

### Prerequisites

- Node.js 16.x or later
- MySQL database

### Database Setup

1. Create a MySQL database using the SQL script provided in the project.
2. Update the `.env.local` file with your database connection details.

\`\`\`bash
# Example .env.local file
DATABASE_URL="mysql://username:password@localhost:3306/SportsEventManagement"
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
\`\`\`

### Installation

1. Clone the repository:

\`\`\`bash
git clone https://github.com/yourusername/sportsphere.git
cd sportsphere
\`\`\`

2. Install dependencies:

\`\`\`bash
npm install
\`\`\`

3. Generate Prisma client:

\`\`\`bash
npx prisma generate
\`\`\`

4. Start the development server:

\`\`\`bash
npm run dev
\`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Connection

When setting up the application locally, you'll need to update the database connection URL in the `.env.local` file. This is where you'll specify your MySQL database credentials:

\`\`\`
DATABASE_URL="mysql://username:password@localhost:3306/SportsEventManagement"
\`\`\`

Replace:
- `username` with your MySQL username
- `password` with your MySQL password
- `localhost:3306` with your MySQL host and port if different
- `SportsEventManagement` with the name of your database

## Project Structure

\`\`\`
sportsphere/
├── app/                  # Next.js app directory
│   ├── api/              # API routes
│   ├── dashboard/        # Dashboard pages
│   ├── login/            # Authentication pages
│   └── register/         # User registration
├── components/           # Reusable UI components
├── lib/                  # Utility functions and libraries
├── prisma/               # Prisma ORM configuration
└── public/               # Static assets
\`\`\`

## Deployment

1. Build the application:

\`\`\`bash
npm run build
\`\`\`

2. Start the production server:

\`\`\`bash
npm start
\`\`\`

## License

This project is licensed under the MIT License.
