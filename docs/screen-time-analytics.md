# Screen Time Analytics - Technical Documentation

## Overview

The Screen Time Analytics feature provides users with insights into their digital habits, helping them understand how they spend their time on various applications and websites. This documentation outlines the technical details of the feature, including data models, API endpoints, and component implementation.

## Data Model

The core data model for Screen Time Analytics is defined as follows:

```typescript
export interface ScreenTimeData {
  userId: string;
  date: string; // ISO 8601 date string
  productiveTime: number; // in minutes
  distractingTime: number; // in minutes
  appUsage: {
    [appName: string]: number; // time in minutes
  };
}
```

*   **userId:** Unique identifier for the user.
*   **date:** Date for which the screen time data is recorded (ISO 8601 format).
*   **productiveTime:** Total time spent on productive activities (in minutes).
*   **distractingTime:** Total time spent on distracting activities (in minutes).
*   **appUsage:** An object containing the time spent on each application (in minutes).

## API Endpoint

The Screen Time Analytics data is served through the following API endpoint:

*   **Endpoint:** `/api/wellness/screen-time`
*   **Method:** GET
*   **Response:** Returns an array of `ScreenTimeData` objects.

## Component Implementation

The `ScreenTimeAnalytics` component is responsible for fetching and displaying the screen time data. It uses the `react-chartjs-2` library to render a bar chart showing productive and distracting time, and a pie chart showing app usage.

### Dependencies

*   `react-chartjs-2`
*   `chart.js`
*   `@/components/ui/card`
*   `@/lib/models/screen-time`

### Data Fetching

The component fetches data from the `/api/wellness/screen-time` endpoint using the `useEffect` hook. The data is then stored in the `screenTimeData` state variable.

### Chart Configuration

The component uses the following chart options:

*   **Bar Chart:** Displays productive and distracting time for each day of the week.
*   **Pie Chart:** Displays the usage time for each application.

## Future Enhancements

*   Implement real-time data collection.
*   Allow users to categorize applications as productive or distracting.
*   Provide personalized recommendations for improving digital wellness.
