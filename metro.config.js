// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.resolver.unstable_enablePackageExports = false;

config.resolver.unstable_enableSymlinks = false;

// Ensure we have all platform-specific extensions in the correct order
config.resolver.sourceExts = [
  ...config.resolver.sourceExts,
  // Add platform-specific extensions - web versions should come first
  'web.tsx', 'web.ts', 'web.jsx', 'web.js',
  // Then regular extensions
  'tsx', 'ts', 'jsx', 'js',
  'cjs'
];

// config.resolver.assetExts.push('riv');

// Ensure we resolve platform-specific modules correctly
config.resolver.resolverMainFields = ['browser', 'react-native', 'main'];

// Blacklist problematic native modules on web
if (process.env.PLATFORM === 'web') {
  config.resolver.blacklistRE = [
    /.*react-native-gesture-handler.*/
  ];
}

module.exports = config; 