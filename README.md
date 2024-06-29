# CodeX

CodeX is a collaborative platform for running and posting code snippets. Users can share their code snippets with the
community and use playgrounds to run code in various languages such as Java, Python, JavaScript, and C++.

## Features

### Collaborative Code Sharing

- **Post and Share Code Snippets**: Users can easily post their code snippets, making them visible to the entire
  community. This feature fosters collaboration, learning, and sharing of best practices.
- **View**: Engage with the community by viewing on other's code snippets.

### Interactive Playgrounds

- **Multi-Language Support**: Run code in various languages such as Java, Python, JavaScript, and C++. This is
  especially useful for learning new languages and comparing code behavior across different languages.
- **Real-Time Execution**: Execute code in real-time using the integrated Judge0 API, providing instant feedback and
  results.

### User Management and Authentication

- **Secure Authentication**: Clerk provides robust user authentication, ensuring that only authorized users can post and
  run code snippets.
- **User Profiles**: Each user has a profile where they can manage their posted snippets and view their activity.

### Advanced Code Editing

- **CodeMirror Integration**: Enjoy a powerful and versatile code editing experience with CodeMirror. Features like
  syntax highlighting, auto-completion, and error detection enhance the coding experience.

### Reliable Data Management

- **Convex Database**: All data, including user profiles, code snippets, and comments, are securely stored and managed
  using Convex, ensuring data integrity and reliability.

## Technologies Used

- **Next.js**: React framework for server-side rendering and generating static websites.
- **Judge0**: Open-source API to execute code in various programming languages.
- **Convex**: Backend-as-a-service for managing your database.
- **CodeMirror**: Versatile code editor implemented in JavaScript.
- **Clerk**: User authentication and management.

## Installation and Usage

### Prerequisites

Ensure you have the following installed on your local development environment:

- Node.js (v14.x or later)
- npm (v6.x or later)

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/kanish-10/codex
    cd CodeX
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Log in to Convex database with CLI:**

    ```bash
    npx convex login
    ```

4. **Set up environment variables:**

   Create a `.env.local` file in the root directory and add the following environment variables:

    ```env
    CONVEX_DEPLOYMENT=<your-api-key>
    NEXT_PUBLIC_CONVEX_URL=<your-api-key>
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your-api-key>
    CLERK_SECRET_KEY=<your-api-key>
    NEXT_PUBLIC_RAPID_API_KEY=<your-api-key>
    ```

5. **Run the development server:**

    ```bash
    npm run dev
    ```

6. **Run Convex development server:**

    ```bash
    npx convex dev
    ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Made By

[Kanish Chheda](https://github.com/kanish-10)
