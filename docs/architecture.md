# IgnouCompass Architecture

This document outlines the architecture of the IgnouCompass platform, detailing the frontend, backend, database, and AI/ML components.

## High-Level Overview

IgnouCompass is a modern, full-stack web application built with a focus on performance, scalability, and user experience. It leverages a microservices-inspired architecture for the backend, with a monolithic Next.js frontend.

## Frontend Architecture

The frontend is a Next.js 15 application with React 19, utilizing concurrent features for a highly interactive and responsive UI.

*   **Framework:** Next.js 15
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS with Shadcn/ui for a consistent and customizable design system. Framer Motion is used for animations.
*   **State Management:** Zustand is used for simple, global state management, while React Query (TanStack Query) handles server state, caching, and data fetching.
*   **Forms:** React Hook Form with Zod for validation ensures type-safe and robust forms.
*   **Data Visualization:** Recharts and D3.js are used to create interactive and insightful charts for academic and wellness data.
*   **Real-time Features:** Socket.io and Server-Sent Events (SSE) provide real-time updates for notifications, chat, and collaborative features.

## Backend Architecture

The backend is built using Next.js API routes, tRPC for type-safe APIs, and a combination of serverless functions and long-running services.

*   **API:** tRPC is the primary choice for building type-safe APIs between the Next.js frontend and backend. REST APIs are used for external integrations.
*   **Authentication:** NextAuth.js provides a secure and flexible authentication system with support for multiple providers and 2FA.
*   **Database ORM:** Prisma is used as the Object-Relational Mapper (ORM) for interacting with the PostgreSQL database, ensuring type safety and ease of use.
*   **Background Jobs:** Bull.js is used for managing background jobs and queues, such as sending emails, processing data, and generating reports.
*   **File Storage:** AWS S3 or Vercel Blob is used for storing user-uploaded files, such as assignments, profile pictures, and other media.

## Database Architecture

The database strategy is designed to handle a variety of data types and workloads.

*   **Primary Database:** PostgreSQL is the primary relational database for structured data, such as user information, academic records, and course content.
*   **Caching:** Redis is used for caching frequently accessed data, session management, and real-time features.
*   **Content Management:** MongoDB is used for flexible and unstructured content, such as blog posts, articles, and other dynamic content.

## AI & Machine Learning Integration

AI and ML are integral to the IgnouCompass platform, providing personalized and intelligent features.

*   **Primary AI:** Google Gemini Pro is used for the AI-powered tutor, personalized recommendations, and content generation.
*   **Analytics Engine:** Custom machine learning models are used for predictive analytics, such as grade prediction and performance forecasting.
*   **Computer Vision:** TensorFlow.js is used for features like habit tracking and progress visualization.
*   **Natural Language Processing:** The OpenAI API is used for content summarization, Q&A, and other NLP tasks.

## Deployment & DevOps

The platform is designed for a multi-cloud, scalable, and resilient deployment.

*   **Hosting:** The frontend is hosted on Vercel, while the backend services are deployed on AWS or another cloud provider.
*   **Containerization:** Docker and Kubernetes are used for containerizing and orchestrating backend microservices.
*   **CI/CD:** GitHub Actions are used for continuous integration and continuous deployment, with automated testing, security scanning, and deployment pipelines.
*   **Monitoring:** Prometheus, Grafana, and Sentry are used for comprehensive monitoring, logging, and error tracking.
*   **CDN:** Cloudflare is used as a global Content Delivery Network (CDN) for fast content delivery and DDoS protection.
