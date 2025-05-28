# Career Fair 2025 Website

A modern web application for managing and showcasing the VGU Career Fair 2025.  
Built with ReactJS, Firebase, and TailwindCSS.


# Project Structure

```
career_fair_2025_website/
│
├── public/
│   └── index.html
├── src/
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   ├── index.css
│   ├── firebase-config.js
│   ├── components/
│   │   ├── HomePage.js
│   │   ├── Dashboard.js
│   │   ├── HeaderBar.js
│   │   ├── Footer.js
│   │   ├── SideNavBar.js
│   │   ├── EffectComponents/
│   │   │   └── useLenis.js
│   │   ├── Login-SignUp-Components/
│   │   │   ├── LoginSection.js
│   │   │   └── RegisterSection.js
│   │   ├── HomePageComponents/
│   │   │   ├── IntroSection.js
│   │   │   └── RecapSection.js
│   │   ├── DashboardComponents/
│   │   │   └── AdminDisplay.js
│   │   └── TestPage.js
│   └── images/
│       └── intro-section.webp
└── .ssh/
    └── config
```


# UI & Styling

- Uses **TailwindCSS** utility classes for layout and responsiveness.
- Custom fonts loaded via `index.css`.
- Animated cursor and smooth scrolling effects.
- FontAwesome icons can be used by including the CDN link in `public/index.html`.


# Component Descriptions

## Homepage

**Role:**  
The Homepage serves as the landing page for the Career Fair 2025 website.

**Functionalities:**
- Presents an overview of the event, including date, time, and venue.
- Features a hero section with a prominent image or banner.
- Includes sections like the event recap, statistics (e.g., number of businesses, sponsors, interviewers, and students), and a recap video link.
- Displays a scrolling marquee of sponsor or partner logos.
- **Responsive design:** On screens smaller than 600px, main sections stack vertically for better mobile usability.


## HeaderBar and SideNavBar

**Role:**  
The HeaderBar is the top navigation bar, and the SideNavBar is a collapsible sidebar for additional navigation, especially in small screens.

**Functionalities:**

**HeaderBar:**
- Shows the site logo and main navigation links.
- Displays login/logout buttons based on user authentication status.
- Include a hamburger menu icon to toggle the SideNavBar on mobile devices.

**SideNavBar:**
- SideNavBar is another version of HeaderBar when the screen is too small (mobile screen).
- Provides quick access to dashboard sections and other authenticated features.
- Can be shown or hidden, especially on smaller screens, for a clean and user-friendly interface.


## Login and Registration

**Role:**  
These components handle user authentication.

**Functionalities:**

**LoginSection:**
- Allows users to log in using their email and password.
- Integrates with Firebase Authentication for secure login.
- Provides error messages and feedback for failed login attempts.

**RegisterSection:**
- Enables new users to create an account.
- Collects necessary information and validates input.
- Registers users with Firebase Authentication and stores additional user data as needed.
- Provides feedback for registration errors or success.


## Dashboards

**Role:**  
The Dashboard area is accessible to authenticated users and provides event management and participation features.

**Functionalities:**
- Displays user-specific information and actions (e.g., event participation, check-in status).
- For admins, shows event data such as:
  - Lists of current attendees, lucky draw eligible users, rewarded participants, and photobooth participants.
  - Counts the number of booths each student has visited (using the `boothCollected` map).
  - Handles and displays reward status and timestamps.
- Allows navigation between different dashboard sections via the HeaderBar or SideNavBar.
- Ensures data is fetched securely from Firebase and updates in real-time as needed.


# Development

## Install dependencies

```bash
npm install
```

## Run locally

```bash
npm start
```

## Build for production

```bash
npm run build
```


# Notes

- Make sure to configure your Firebase project in `src/firebase-config.js`.
- For FontAwesome icons, add the CDN link to `public/index.html` as described in the documentation.
- SSH config in `.ssh/config` is for server access and not related to the web app.
