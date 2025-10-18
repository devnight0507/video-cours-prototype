# Quick Start Guide

## Installation

```bash
cd course-platform
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Demo Accounts

### Option 1: Admin Access
```
Email: admin@example.com
Password: (any value)
```
**You'll see:**
- Full admin dashboard
- User management panel
- Course CRUD operations
- Payment approval system
- Statistics overview

### Option 2: Paid User
```
Email: john@example.com
Password: (any value)
```
**You'll see:**
- User dashboard
- 2 enrolled courses with progress
- Video player access
- Progress tracking

### Option 3: Pending User
```
Email: bob@example.com
Password: (any value)
```
**You'll see:**
- Payment pending banner
- Locked courses
- Payment flow
- Stripe/Bank transfer options

## Key Workflows to Test

### 1. Complete User Journey (5 minutes)

1. **Login as pending user** (bob@example.com)
   - See payment banner
   - Notice locked courses

2. **Go to payment page**
   - Click "Complete Payment" banner
   - Choose Stripe payment
   - Click "Pay $99.99"
   - See success animation

3. **Open new tab as admin** (admin@example.com)
   - Scroll to "User Management" section
   - Find Bob Johnson
   - Click "Approve" button
   - See status change to "Paid"

4. **Back to Bob's tab**
   - Refresh the page
   - Now has full course access!
   - Click on a course
   - Watch videos

### 2. Admin Dashboard Tour (3 minutes)

1. **Login as admin** (admin@example.com)

2. **View Statistics**
   - See 4 stat cards at top
   - Total users, revenue, courses, enrollments

3. **Manage Users**
   - Scroll to "User Management"
   - Try approving/revoking access
   - See real-time badge updates

4. **Manage Courses**
   - Click "View All" in Courses section
   - See course grid
   - Try "Publish/Unpublish" toggle
   - Click "Create Course" (see form)
   - Try "Delete" (see confirmation)

### 3. Video Player Experience (3 minutes)

1. **Login as paid user** (john@example.com)

2. **Open a course**
   - Click "Complete Next.js 14 Masterclass"

3. **Use video player**
   - Click Play button
   - See mock timer animation
   - Try seek bar
   - Adjust volume
   - Try fullscreen
   - Wait for auto-complete (or seek to end)
   - See auto-advance to next video

4. **Check progress**
   - See progress bar update
   - See checkmarks on completed videos
   - See overall course progress

### 4. Notification System (1 minute)

1. **Login as any user**

2. **Click bell icon** (top right)
   - See notification dropdown
   - Notice unread indicator
   - See different notification types
   - Read timestamps

## Features Showcase

### Animations to Notice

- **Login page**: Logo scale animation
- **Dashboard**: Staggered card animations
- **Hover effects**: Cards lift on hover
- **Progress bars**: Animate from 0 to value
- **Notifications**: Slide in/out
- **Success**: Checkmark spring animation
- **Payment**: Processing spinner

### Responsive Design

Try resizing browser:
- Mobile view (< 640px)
- Tablet view (640-1024px)
- Desktop view (> 1024px)

### UI Components Variety

Notice different:
- Button variants (primary, outline, danger, ghost)
- Badge colors (success, warning, danger, info)
- Card styles (standard, colored backgrounds)
- Input states (normal, focus, error)

## Test Scenarios

### Scenario 1: New User Onboarding
```
1. Login as alice@example.com
2. See payment banner
3. Go to payment
4. Try bank transfer option
5. Get bank details
```

### Scenario 2: Admin Approval Workflow
```
1. Login as admin
2. Find pending users
3. Approve one user
4. Check payment status changes
5. Revoke access to test
```

### Scenario 3: Course Progress Tracking
```
1. Login as john@example.com
2. Open enrolled course
3. Watch multiple videos
4. See progress update
5. Complete all videos
6. See 100% completion badge
```

### Scenario 4: Course Management
```
1. Login as admin
2. Go to Courses page
3. Create new course
4. Fill all fields
5. Add multiple videos
6. Submit (see success alert)
```

## Common Actions

### As Admin

**Approve Payment:**
1. Find user in User Management table
2. Click "Approve" button
3. Status changes to "Paid"

**Publish Course:**
1. Go to Courses page
2. Find draft course
3. Click "Publish"
4. Badge changes to "Published"

**Delete Course:**
1. Go to Courses page
2. Click "Delete" on any course
3. Confirm in dialog

### As User

**Enroll in Course:**
- Automatic when payment is approved
- Can access all published courses

**Track Progress:**
1. Click on enrolled course
2. Watch videos
3. See progress bar update
4. Get completion badge at 100%

**Make Payment:**
1. Click payment banner
2. Choose method
3. Complete mock payment

## Tips

1. **Use multiple browser tabs** to test admin approving users while logged in as user
2. **Check localStorage** in DevTools to see stored auth data
3. **Watch console** for any errors (should be none)
4. **Test mobile view** using browser DevTools
5. **Try keyboard navigation** - all interactive elements are accessible

## Common Issues

**Q: Page shows loading spinner forever**
- Clear localStorage
- Refresh page
- Login again

**Q: Videos don't play**
- This is a mock player - it shows a timer animation
- Click play to see it work
- Real videos would load here in production

**Q: Changes don't persist after refresh**
- This is expected - mock data resets
- Only auth (localStorage) persists
- In production, Firestore would persist data

**Q: Can't approve users**
- Make sure you're logged in as admin@example.com
- Check you're clicking the right button
- State updates are in-memory only

## Next Steps

After testing the prototype:

1. **Review code** in `/app`, `/components`, `/lib`
2. **Check types** in `/lib/types.ts`
3. **See mock data** in `/lib/mock/data.ts`
4. **Read README.md** for full documentation
5. **Check FEATURES.md** for complete feature list

## Quick Links

- **Login Page**: http://localhost:3000/login
- **Admin Dashboard**: http://localhost:3000/admin (requires admin login)
- **User Dashboard**: http://localhost:3000/user (requires user login)
- **Payment Page**: http://localhost:3000/user/payment (requires user login)
- **Courses**: http://localhost:3000/admin/courses (requires admin login)

---

**Enjoy testing the prototype! All features are fully functional with mock data.**
