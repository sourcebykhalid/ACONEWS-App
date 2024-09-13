Overview
AcoNews is a news aggregation platform that fetches and displays the latest news articles from various sources using the GNews API. Users can search for news by keywords, filter results by region or language, and navigate through paginated results. The frontend is built using React, while the backend leverages Node.js/Express and is deployed as a Firebase Cloud Function.

The platform is designed to be responsive, with a modern UI built using Tailwind CSS and Material Tailwind.

Approach
API Integration:

The GNews API was used to fetch articles dynamically based on user inputs. The backend manages API requests and filters, ensuring that the app adheres to API rate limits by implementing pagination.
Frontend Development:

Built using React for managing the UI and state.
Designed with Tailwind CSS and Material Tailwind to ensure responsiveness across devices and maintain a visually appealing design.
Integrated React Icons for a polished look.
Backend Logic:

The backend is a simple Node.js/Express setup deployed as a Firebase Cloud Function.
It manages API requests, handles search queries, and returns paginated results to the frontend.
Challenges & Solutions
API Rate Limits:

The free GNews API limits the number of requests and results. To manage this, pagination was implemented both on the backend and frontend, allowing for efficient use of the API without exceeding limits.
Handling Pagination:

Managing pagination across the frontend and backend required careful state management. This was achieved using React’s state hooks, dynamically adjusting the page number in API requests.
Firebase Hosting Configuration:

Initial deployment resulted in Firebase rendering the default "Welcome" page instead of the app. This issue was resolved by properly configuring the deployment to push the correct build files to Firebase Hosting.
Tailwind Customization:

Ensuring a cohesive design across multiple devices required careful testing with Tailwind’s responsive utilities. Adjustments were made to breakpoints and layout structures to ensure an optimal user experience on both mobile and desktop.
