# 🌐 Hotel Booking App

This project is a hotel booking application built with React, featuring a smooth user experience with hotel search, bookmarks, and authentication. A mock backend is provided by `json-server` to serve data for testing purposes.

## 🚀 Features

- **Hotel Listings:** Browse a list of available hotels.
- **Bookmarks:** Save favorite hotels for easy access.
- **Authentication:** Access protected routes after logging in.
- **Map Integration:** Visualize hotel locations using Leaflet maps.
- **Notifications:** Show user notifications with `react-hot-toast`.

## 🛠️ Tech Stack

- **Frontend:** React, React Router, React Icons, Axios
- **State Management:** Context API
- **Date Handling:** `date-fns`
- **Map Integration:** `react-leaflet`
- **Styling:** CSS
- **Backend (Mock API):** `json-server`

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/Booking-Hotel-App.git
   cd Booking-Hotel-App
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Start Mock Server:
   ```bash
   npm run server
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## 🌐 Routing

The app uses React Router v6:

- `/` - Displays location list.
- `/login` - User login page.
- `/hotels` - Lists all hotels.
- `/hotels/:id` - Shows details for a single hotel.
- `/bookmark` - Displays user's bookmarked hotels (protected).
- `/bookmark/:id` - Shows details for a bookmarked hotel.
- `/bookmark/add` - Add a new bookmark (protected).

## 📚 Dependencies

### Core
- **`axios`**: For HTTP requests.
- **`date-fns`**: Date manipulation and formatting.
- **`react-date-range`**: Date range selection for booking.
- **`react-hot-toast`**: Toast notifications.
- **`react-leaflet`**: Leaflet map integration.
