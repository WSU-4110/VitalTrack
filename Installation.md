
# Installation Guide

## Dependencies
- Python: Version 3.8 or higher (download it from [here](https://www.python.org/downloads/)).
- Node.js: Version 14.x or higher (download it from [here](https://nodejs.org/)).
- [Android Studio](https://developer.android.com/studio).
- MongoDB: Either a local instance or an [Atlas account](https://www.mongodb.com/cloud/atlas/register).
- React Native CLI: Follow the setup instructions [here](https://reactnative.dev/docs/environment-setup).

---

## Installation Instructions

### Clone the Repository
```bash
git clone https://github.com/your-username/VitalTrack.git
cd VitalTrack
```

### Backend Installation (VitalTrackServer)

#### Navigate to the Backend Directory
```bash
cd VitalTrackServer
```

#### Install Python Dependencies
Run the following command to install all required Python packages:
```bash
pip install -r requirements.txt
```

#### Set Up Environment Variables
Copy the example `.env` file to configure your environment:
```bash
cp example.env .env
```
Update the `.env` file with your MongoDB connection string and other required variables.

#### Run the Backend Server
Start the server by running:
```bash
python app.py
```

### Testing Instructions
Run the following command in your command line:

```pip install -U pytest```

run ```pytest``` in command line


### Formatting
Run the following command in your command line:

```pip install black ```

After that you specify ```black filename.py``` in the terminal and black automatically formats your code. 
If you want to format the whole directory, you can run ```black ./VitalTrackServer``` in the VitalTrack Directory

---

### Frontend Installation (VitalTrackApp)

#### Navigate to the Frontend Directory
```bash
cd VitalTrackApp
```

#### Install Frontend Dependencies
Run the following command to install all required Node.js packages:
```bash
npm install
```

---

## Running the Android Application

### Option 1: Using Android Studio Emulator
1. Open Android Studio and configure your environment.
2. Create an emulator using the AVD Manager.
3. Start the Metro Bundler:
   ```bash
   npx react-native start
   ```
4. Launch the app on the emulator:
   ```bash
   npx react-native run-android
   ```

### Option 2: Using a Physical Device
1. Enable **Developer Options** on your Android device:
   - Go to **Settings > About Phone > Software Information**.
   - Tap on **Build Number** seven times to enable Developer Mode.
2. Enable **USB Debugging**:
   - Go to **Settings > Developer Options** and toggle **USB Debugging**.
3. Connect your phone to your PC via USB.
4. Start the Metro Bundler:
   ```bash
   npx react-native start
   ```
5. Launch the app on your device:
   ```bash
   npx react-native run-android
   ```

---

## Debugging

If you encounter issues during setup, follow these steps:

### MongoDB Connection
Ensure that your MongoDB server is running, and your IP address is whitelisted in the MongoDB Atlas dashboard.

### Node.js Cache
If you encounter frontend issues, clear the build cache:
```bash
npm start --reset-cache
```

### Python Dependencies
If the server fails to start, confirm all Python dependencies are correctly installed by re-running:
```bash
pip install -r requirements.txt
```

### Android Studio
Ensure your Android Studio installation includes the required SDKs, and your emulator is properly configured. If errors persist, clean the Gradle build by running:
```bash
cd android
./gradlew clean
```

---

## Additional Resources
- [Python Installation Guide](https://www.python.org/about/gettingstarted/)
- [Node.js Installation Guide](https://nodejs.dev/)
- [React Native Documentation](https://reactnative.dev/docs/environment-setup)
- [MongoDB Atlas Setup](https://www.mongodb.com/docs/atlas/getting-started/)
