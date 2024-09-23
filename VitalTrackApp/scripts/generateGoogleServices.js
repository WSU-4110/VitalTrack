require('dotenv').config();
const fs = require('fs');

const config = {
  project_info: {
    project_number: '313418201604',
    project_id: process.env.FIREBASE_PROJECT_ID,
    storage_bucket: 'vitaltrack-7b035.appspot.com',
  },
  client: [
    {
      client_info: {
        mobilesdk_app_id: process.env.FIREBASE_MOBILESDK_APP_ID,
        android_client_info: {
          package_name: 'com.vitaltrackapp',
        },
      },
      oauth_client: [],
      api_key: [
        {
          current_key: process.env.FIREBASE_API_KEY,
        },
      ],
      services: {
        appinvite_service: {
          other_platform_oauth_client: [],
        },
      },
    },
  ],
  configuration_version: '1',
};

const filePath = 'VitalTrackApp/android/app/google-services.json';
fs.writeFileSync(filePath, JSON.stringify(config, null, 2));
