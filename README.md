# CourseHub - Video Course Platform Prototype

A fully functional prototype of a SaaS platform for managing and selling video courses, built with Next.js 14, TailwindCSS 3.x, and Framer Motion animations.

## Features Implemented

### 1. Authentication & User Management
- **Login Page** with mock authentication
- **Email/password login** (mock - any password works)
- **Role-based access control** (admin and user roles)
- **Protected routes** with automatic redirects
- **User profiles** stored in mock database

### 2. Admin Dashboard
- **Statistics Overview**
  - Total users, revenue, courses, and enrollments
  - Visual cards with gradients and icons
  - Real-time data from mock database

- **User Management**
  - View all users with payment status
  - **Manually approve** pending payments
  - **Revoke access** for paid users
  - Payment status badges (paid, pending, manual)

- **Course Management**
  - Create, edit, and delete courses
  - Publish/unpublish courses
  - Add videos with Mux playback IDs
  - Set course pricing and thumbnails

- **Payment Tracking**
  - Recent payments list
  - Payment method indicators
  - Payment status tracking

### 3. User Dashboard
- **Course Catalog**
  - Browse all published courses
  - View enrolled courses
  - Progress tracking with percentage
  - Course thumbnails and descriptions

- **Payment Status Banner**
  - Shows pending payment status
  - Redirects to payment page

- **Course Access Control**
  - Locked courses for unpaid users
  - Full access for paid users

### 4. Video Player & Course Viewer
- **Custom Video Player** with:
  - Play/pause controls
  - Seek bar with progress
  - Volume control
  - Fullscreen toggle
  - Mock video playback (shows timer)
  - Secure playback watermark

- **Course Page Features**
  - Video playlist/sidebar
  - Auto-advance to next video
  - Progress tracking per video
  - Video completion badges
  - Overall course progress bar

### 5. Payment Flow
- **Payment Methods**
  - Stripe payment (mock interface)
  - Bank transfer option
  - Payment method selection

- **Order Summary**
  - Course details
  - Pricing breakdown
  - Benefits list

- **Payment Processing**
  - Mock Stripe checkout
  - Success confirmation
  - Admin approval workflow

### 6. UI/UX Features
- **Framer Motion Animations**
  - Page transitions
  - Card hover effects
  - Staggered list animations
  - Loading states

- **Lucide React Icons**
  - Consistent icon system
  - No SVG files needed

- **TailwindCSS 3.x Styling**
  - Responsive design
  - Custom color palette
  - Gradient backgrounds
  - Shadow and hover effects

### 7. Notifications System
- **Bell icon** with unread count
- **Notification dropdown**
- **Different notification types**:
  - Payment success
  - Access granted
  - Admin approvals

## Project Structure

```
course-platform/
├── app/
│   ├── admin/                  # Admin dashboard
│   │   ├── courses/            # Course management
│   │   │   ├── [courseId]/
│   │   │   │   └── edit/       # Edit course page
│   │   │   ├── new/            # Create course page
│   │   │   └── page.tsx        # Courses list
│   │   ├── layout.tsx          # Admin layout (auth guard)
│   │   └── page.tsx            # Admin dashboard
│   ├── user/                   # User dashboard
│   │   ├── courses/
│   │   │   └── [courseId]/     # Course player page
│   │   ├── payment/            # Payment page
│   │   ├── layout.tsx          # User layout (auth guard)
│   │   └── page.tsx            # User dashboard
│   ├── login/                  # Login page
│   ├── layout.tsx              # Root layout with AuthProvider
│   └── page.tsx                # Landing/redirect page
├── components/
│   ├── course/
│   │   └── VideoPlayer.tsx     # Custom video player
│   ├── layout/
│   │   └── Navbar.tsx          # Navigation bar
│   └── ui/                     # Reusable UI components
│       ├── Badge.tsx
│       ├── Button.tsx
│       ├── Card.tsx
│       └── Input.tsx
├── lib/
│   ├── mock/
│   │   ├── auth-context.tsx    # Mock authentication context
│   │   └── data.ts             # Mock database
│   ├── types.ts                # TypeScript types
│   └── utils.ts                # Utility functions
└── public/                     # Static assets
```

## Mock Data

### Demo Accounts

**Admin Account:**
- Email: `admin@example.com`
- Password: `any value`
- Role: admin
- Access: Full admin dashboard

**Paid User:**
- Email: `john@example.com`
- Password: `any value`
- Role: user
- Status: Paid (has course access)

**Paid User (Manual Approval):**
- Email: `jane@example.com`
- Password: `any value`
- Role: user
- Status: Paid via manual approval

**Pending User:**
- Email: `bob@example.com`
- Password: `any value`
- Role: user
- Status: Payment pending

**Another Pending User:**
- Email: `alice@example.com`
- Password: `any value`
- Role: user
- Status: Payment pending

### Mock Courses

1. **Complete Next.js 14 Masterclass** - $99.99
   - 4 videos
   - Published
   - Topics: Next.js basics, App Router, Server Components, Data Fetching

2. **Firebase for Modern Web Apps** - $79.99
   - 3 videos
   - Published
   - Topics: Authentication, Firestore, Security Rules

3. **Stripe Payment Integration** - $89.99
   - 2 videos
   - Published
   - Topics: Stripe basics, Checkout sessions

4. **Advanced TypeScript Patterns** - $119.99
   - 0 videos (draft)
   - Not published

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Navigate to the project directory:
```bash
cd course-platform
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser and go to:
```
http://localhost:3000
```

## Usage Guide

### As Admin

1. **Login** with `admin@example.com`
2. **View Dashboard** - See statistics and recent activity
3. **Manage Users**:
   - Approve pending payments by clicking "Approve"
   - Revoke access by clicking "Revoke"
4. **Manage Courses**:
   - Click "Courses" or "View All" to see course list
   - Create new course with "Create Course" button
   - Edit/delete existing courses
   - Publish/unpublish courses

### As Paid User

1. **Login** with `john@example.com`
2. **View Courses** - See enrolled and available courses
3. **Watch Videos**:
   - Click on any enrolled course
   - Select video from playlist
   - Use video controls to play/pause
   - Progress is automatically tracked
4. **Track Progress** - See completion percentage

### As Pending User

1. **Login** with `bob@example.com`
2. **See Payment Banner** - Notice payment pending message
3. **Go to Payment Page** - Click "Complete Payment"
4. **Choose Payment Method**:
   - **Stripe**: Fill mock card details and click "Pay"
   - **Bank Transfer**: Get transfer instructions
5. **Wait for Approval** - Admin needs to approve manually

## Key Features Demonstration

### 1. User Approval Flow
- Login as `bob@example.com` (pending user)
- Notice locked courses
- Login as `admin@example.com` in another tab
- Approve Bob's payment in admin dashboard
- Refresh Bob's page - now has access!

### 2. Video Player
- Login as `john@example.com`
- Click on "Complete Next.js 14 Masterclass"
- Watch the mock video player:
  - Click play to see timer animation
  - Seek through the video
  - Adjust volume
  - Videos auto-complete after timer
  - Progress saves automatically

### 3. Payment Processing
- Login as `alice@example.com`
- Click "Complete Payment" banner
- Try **Stripe payment**:
  - See mock card interface
  - Click "Pay" button
  - See success animation
- Or try **Bank Transfer**:
  - See bank details
  - Get email instructions

### 4. Animations & UI
- Notice smooth page transitions
- Hover over cards for lift effect
- See staggered list animations
- Progress bars animate on load
- Notification dropdown slides in

## Technical Implementation

### Mock Data System
All data is stored in `/lib/mock/data.ts`:
- 5 users with different roles and payment statuses
- 4 courses (3 published, 1 draft)
- 9 videos across courses
- 3 enrollments with progress tracking
- 3 payments with different methods
- 4 notifications

### Authentication Flow
1. User enters credentials on login page
2. `auth-context.tsx` validates against mock users
3. User data stored in localStorage
4. Protected routes check auth state
5. Redirects based on role (admin/user)

### State Management
- React Context for authentication
- useState for local component state
- localStorage for session persistence
- Mock "database" updates in components

### Video Player
- Custom-built with HTML5 controls
- Mock playback (timer-based, no real video)
- Simulates Mux secure playback
- Progress tracking callback
- Completion detection

### Styling
- TailwindCSS 3.x utility classes
- Custom primary color palette
- Responsive breakpoints (sm, md, lg)
- Dark mode CSS variables (optional)
- Gradient backgrounds

## Limitations (Prototype)

This is a **fully functional prototype** with mock data:

1. **No Real Backend**
   - All data is hardcoded
   - Changes don't persist across refreshes (except localStorage)
   - No actual API calls

2. **No Real Video**
   - Video player shows timer, not actual video
   - Uses thumbnail images as placeholder
   - Mux integration is simulated

3. **No Real Payments**
   - Stripe checkout is a mock interface
   - No actual payment processing
   - Bank transfer is simulated

4. **No Email Notifications**
   - Email notifications are mocked
   - No actual emails sent

## Future Implementation (Production)

To convert this to production:

1. **Backend Setup**
   - Replace mock data with Firebase Firestore
   - Add Firebase Authentication
   - Set up Stripe webhooks

2. **Video Integration**
   - Upload videos to Mux
   - Get real playback IDs
   - Implement signed URLs

3. **Payment Processing**
   - Configure real Stripe account
   - Set up webhooks for payment events
   - Handle payment verification

4. **Email Service**
   - Integrate SendGrid or Resend
   - Set up email templates
   - Trigger on events

5. **Deployment**
   - Deploy to Vercel
   - Set up environment variables
   - Configure custom domain

## Technology Stack

- **Framework**: Next.js 15.5.6
- **React**: 19.1.0
- **TypeScript**: 5.x
- **Styling**: TailwindCSS 3.4.18
- **Icons**: Lucide React 0.546.0
- **Animation**: Framer Motion 12.23.24
- **Image Handling**: Next/Image (optimized)

## Performance Optimizations

- Server Components where possible
- Image optimization with Next/Image
- Lazy loading for components
- Efficient re-renders with React Context
- TailwindCSS JIT mode
- Framer Motion performance mode

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This is a prototype project for demonstration purposes.

## Author

Built as a comprehensive prototype for a video course SaaS platform MVP.

---

**Note**: This is a fully functional prototype with mock data. All features work as demonstrated, but no data is persisted to a real database. Perfect for showcasing the complete user experience and workflow before implementing the actual backend services.
