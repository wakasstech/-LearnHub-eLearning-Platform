# 📚 Learnify – eLearning Platform
Learnify is a full-stack eLearning platform built with the MERN stack. It enables students to enroll in courses, watch video lessons, take quizzes, and track progress. Instructors can create and manage courses, while admins oversee the platform.

# 🚀 Features
✅ User Authentication – Secure login/signup using JWT authentication
✅ Role-Based Access – Separate roles for Admins, Instructors, and Students
✅ Course Management – Instructors can create, update, and delete courses
✅ Video Lessons – Courses include embedded video content
✅ Quizzes & Assessments – Interactive quizzes to test knowledge
✅ Progress Tracking – Users can track course completion status
✅ Payment Integration – (Optional) Add Stripe/PayPal for paid courses
✅ Cloudinary Integration – Upload and manage course images and videos
✅ Admin Dashboard – Manage users, courses, and platform settings

# ⚙️ Setup Instructions 

# Create a config.env file 
PORT=8000
SECRET_lINKKEY=PAKISTANISMYLOVEDCOUNTRYFORNOREASON
JWT_SECRET=PAKISTANISMYLOVEDCOUNTRYFORNOREASONBESURE
MONGODB_URI=your-mongo-url
TOKEN_EXPIRE_TIME="1d"
ADMIN_EMAIL=your-email
OUR_EMAIL=your-email
EMAIL_PASSWORD=your-pass
INTEGRATION_KEY=your-key
CLOUDINARY_CLOUD_NAME=your-secret
CLOUDINARY_API_KEY=your-secret
CLOUDINARY_API_SECRET=your-secret
