import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'brz-capacitor',
  webDir: 'www',
  cordova: {
    preferences: {
      'com.braze.api_key': '${apiKey}',
      'com.braze.android_api_endpoint': 'sdk.iad-06.braze.com',
      'com.braze.ios_api_endpoint': 'sdk.iad-06.braze.com',
      'com.braze.android_log_level': '0',
      'com.braze.firebase_cloud_messaging_registration_enabled': 'true',
      'com.braze.firebase_cloud_messaging_sender_id': '532682567621',
    }
  },
};

export default config;
