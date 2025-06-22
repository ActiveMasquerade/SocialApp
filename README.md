# 📸 SocialApp

A modern Instagram-inspired social media application where users can create, browse, save, and search for posts.

🌐 [Live Demo](https://social-app-tusm.vercel.app/)

## ✨ Features

- 🔐 User authentication (via Appwrite)
- 📝 Create and upload posts with images and captions
- ♾️ Infinite scrolling for seamless post browsing
- 💾 Save posts to your personal collection
- 🔍 Search posts by tags
- 🧑 View and explore user profiles
- 📱 Fully responsive design

## 🛠 Tech Stack

- **Frontend**: React + TypeScript + Vite
- **UI**: TailwindCSS+ Shadcn
- **State Management**: React Query
- **Backend**: Appwrite (BaaS)
- **Deployment**: Vercel

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/ActiveMasquerade/SocialApp.git
cd SocialApp
```
### 2. Install Dependencies
```bash
npm install
```
### 3. Configure Environment Variables

Create a .env file in the root of the project and add your Appwrite configuration:
```env
VITE_APPWRITE_PROJECT_ID=""
VITE_APPWRITE_URL=""
VITE_APPWRITE_STORAGE_ID=""
VITE_APPWRITE_DATABASE_ID=""
VITE_APPWRITE_USER_COLLECTION_ID=""
VITE_APPWRITE_SAVE_COLLECTION_ID=""
VITE_APPWRITE_POST_COLLECTION_ID=""
```
    💡 You can find these values in your Appwrite project dashboard.

### 4. Start the Development Server
```bash
npm run dev
```
## The app will be available at http://localhost:5173
🧩 Project Structure

src/
├── components/      # Shared UI components
├── constants/       # Route and config constants
├── lib/             # Appwrite services and setup
├── pages/           # Application views and routes
├── utils/           # Helper utilities
├── hooks/           # Custom React Query hooks

🚧 Future Improvements

    ✅ Commenting system

    ✅ Like & reaction support

    📩 Direct messaging

    📽️ Reels or Stories feature

    🛠️ Admin moderation tools

    ➕👥 Follow users (only ui is implemented)
