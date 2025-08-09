💬 ChatterBox - A Modern MERN Stack Forum
ChatterBox is a full-featured forum web application built with the MERN stack. It offers user authentication, real-time announcements, a voting and commenting system, membership via Stripe, and admin moderation tools. It's scalable, secure, and visually appealing with TailwindCSS and DaisyUI.

Admin : jack@fruite.com
Password : jackFruite$


⚙️ Tech Stack
Frontend: React 19, TailwindCSS 4, DaisyUI, React Router 7, Axios, Recharts
Backend: Express.js, MongoDB Atlas, Stripe API
Authentication: Firebase Auth (Email/Password + Social Login), JWT
State Management: React Context
Form Handling: react-hook-form
Additional Libraries:
react-share for sharing posts
react-hot-toast, react-toastify for notifications
react-icons, react-select, dayjs, moment
recharts for data visualization


📦 Features
✅ General Features
Responsive UI using TailwindCSS & DaisyUI
Full authentication system with JWT & social login
Private & admin routes using route protection


🏠 Homepage
Navbar with logo, Home, Membership, Notification
Profile dropdown (Dashboard, Logout)
Banner with search bar & dynamic result display
Tag list for filtering posts
Announcement section (conditionally visible)
Post list sorted by newest or popularity
Pagination (5 posts per page)

📝 Posts
Post schema includes: title, description, tags, author, upVote, downVote
Sort by Popularity: based on (upVote - downVote)
Each post displays:
Author info, post time
Vote count, comment count, share button
Post Detail Page:
Full view of post with voting & commenting
Uses react-share for share button
Upvote/downvote toggling logic (YouTube-style — optional)

💬 Comment System
Authenticated users can comment
Comments stored in separate collection with postId
Comments page supports:
Reporting with feedback dropdown
Modal to show full comment if > 20 chars
Server updates for reported comment status

💳 Membership Page
Users can become a member by paying via Stripe
Members get a Gold badge and can post unlimited times
Normal users can post up to 5 times

👤 User Dashboard
Private route with Dashboard layout. Includes:
My Profile: name, email, image, badge, 3 recent posts
Badges:
Bronze: all registered users
Gold: paid members
Add Post: form with tag selection (react-select)
Limits based on membership
My Posts:
Table format with delete & comment view
Toggle visibility (optional)
Comment management (reporting + read more modal)

🔐 Admin Dashboard
Private route with layout. Includes:
Admin Profile
Name, image, email
Add new tags (saved to tag collection)
Manage Users
Table of all users (pagination enabled)
Promote user to admin
View membership status
Server-side search
Reported Comments/Activities
Table of reported feedback with:
Post & user info
Feedback
Actions: delete comment / resolve / block user
Make Announcement
Form to submit announcements
Stores in announcement collection
Visible only if announcement exists
Triggers icon notification with count


| **Category**    | **Technology / Package**   | **Purpose**                        |
| --------------- | -------------------------- | ---------------------------------- |
| **Frontend**    | React.js                   | UI development                     |
|                 | Vite                       | Fast development build tool        |
|                 | Tailwind CSS               | Styling and responsive design      |
|                 | React Router DOM           | Client-side routing                |
|                 | TanStack Query             | Data fetching and state management |
|                 | Axios                      | API requests                       |
|                 | React Icons / Lucide Icons | UI icons                           |
|                 | Recharts                   | Charts and analytics               |
|                 | ShadCN UI                  | Modern UI components               |
| **Backend**     | Node.js                    | Server-side runtime                |
|                 | Express.js                 | Backend framework                  |
|                 | MongoDB                    | NoSQL database                     |
|                 | Mongoose                   | MongoDB object modeling            |
|                 | JWT (jsonwebtoken)         | Authentication                     |
|                 | bcryptjs                   | Password hashing                   |
|                 | Stripe                     | Payment processing                 |
|                 | cookie-parser              | Handling cookies                   |
|                 | dotenv                     | Environment variable management    |
|                 | cors                       | Cross-origin requests handling     |
| **Other Tools** | Git & GitHub               | Version control                    |
|                 | Vercel / Netlify           | Frontend hosting                   |
|                 | Render / Railway / Heroku  | Backend hosting                    |
|                 | MongoDB Atlas              | Cloud database                     |
|                 | Postman                    | API testing                        |
|                 | ESLint & Prettier          | Code quality and formatting        |


