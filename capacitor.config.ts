import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'brz-capacitor',
  webDir: 'www',
  cordova: {
    preferences: {
      'com.braze.api_key': '22557026-f73f-44dd-9664-1683b7b0b756',
      'com.braze.android_api_endpoint': 'sdk.iad-06.braze.com',
      'com.braze.ios_api_endpoint': 'sdk.iad-06.braze.com',
      'com.braze.android_log_level': "0"
    },
    staticPlugins: ['cordova-plugin-braze'],
  },
};

export default config;
