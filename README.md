# Mental-and-Physical-Health-Management


## VitalTrackServer

### Testing Instructions
Run the following command in your command line:

```pip install -U pytest```

run ```pytest``` in command line


### Formatting
Run the following command in your command line:

```pip install black ```

After that you specify ```black filename.py``` in the terminal and black automatically formats your code. 
If you want to format the whole directory, you can run ```black ./VitalTrackServer``` in the VitalTrack Directory

## MongoDB Connection Setup

To connect to MongoDB for this project, follow these steps:

### 1. Install Required Python Packages

Ensure you have Python installed. Then, install the project dependencies using the `requirements.txt` file:

```bash
pip install -r requirements.txt
```

### Setting Up Environment Variables

1. Copy the `example.env` file to `.env`:

```bash
cp example.env .env
```

2. Follow instructions in the env file
3. Add your IP address to mongo dashboard



## VitalTrackApp

### Install Dependencies

Ensure you have the necessary dependencies installed for the React Native app. If you haven't already installed them, run the following command in your terminal:

```bash
npm install
```


### Set Up Android Emulator

1. Install Android Studio if you haven't already: [Download Android Studio](https://developer.android.com/studio) 
2. Set up your Android development environment as per the requirements of Android Studio.
3. Create and configure an emulator from Android Studio through the Virtual Device Configuration (using AVD Manager).
   
   
### Testing Instructions
1. Start the Metro Bundler
Run the following command to start the Metro Bundler from the VitalTrackApp directory:

```bash
npx react-native start
```

2. Run the Android App:
After the Metro Bundler is running, open another terminal and run the following command to launch the Android app on your device or emulator:

```bash
npx react-native run-android
```




