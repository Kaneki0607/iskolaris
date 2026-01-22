# Iskolaris 🎓

Iskolaris is a modern, mobile-first educational platform designed to streamline classroom management, assessment creation, and teacher-student communication. Built with Expo and React Native, it provides a premium experience for both educators and students.

## 🚀 Key Features

### For Teachers
- **Advanced Assessment Suite**: Create interactive quizzes with Multiple Choice, Matching, Identification, Pattern, and Essay questions.
- **AI Question Generator**: Generate assessments instantly using AI, including automatic Text-to-Speech scripts.
- **Live Monitoring**: Track student progress and accuracy in real-time during ongoing assessments.
- **Public Exercise Library**: Share and discover high-quality exercises categorized by subject and topic.
- **Classroom Management**: Organize students into classes (e.g., Grade 10 - Rizal) and track their performance over time.
- **Direct Communication**: Integrated chat system to stay connected with students and parents.

### For Students (In Development)
- **Interactive Quizzes**: Take assessments with a gamer-friendly UI, audio support, and immediate feedback.
- **Progress Tracking**: View grades and performance history.

## 🛠️ Tech Stack
- **Framework**: [Expo](https://expo.dev) / [React Native](https://reactnative.dev)
- **Navigation**: [Expo Router](https://docs.expo.dev/router/introduction/) (File-based routing)
- **Icons**: [Ionicons](https://icons.expo.fyi/)
- **State Management**: React Hooks (useState, useEffect, useLocalSearchParams)

## 📦 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npx expo start
   ```

3. **View the app**:
   - Use the **Expo Go** app on your phone.
   - Or run on an **Android Emulator** / **iOS Simulator**.

## 📁 Project Structure
- `app/`: Expo Router directory containing the screens and layouts.
  - `(auth)/`: Authentication flow (Login, Register).
  - `(teacher)/`: Teacher-specific dashboard and tools.
  - `(student)/`: Student-specific dashboard.
- `src/`: Shared components, constants, and utilities.
  - `components/`: UI components (Cards, Buttons, Inputs, Layouts).
  - `constants/`: Color palettes, spacing, and typography tokens.
- `assets/`: App icons, images, and fonts.

---
Built with ❤️ by the Iskolaris Team.
