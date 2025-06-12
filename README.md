This repository contains the react-native app for the Sleeved project.
You will need to have Xcode or Android Studio installed if you wish to launch it on an app simulator

Here is how to launch the project:
You can always foloow this doc link:
https://docs.expo.dev/get-started/set-up-your-environment/?platform=ios&device=simulated&mode=development-build&buildEnv=local

# Install dependencies

`npm i`

# Create the naive folders in your project

`npx expo prebuild`

# Build the project

# If you've followed the instructions in the link above, you can run the following command to build the project:

# to run iOS

`npx expo run:ios --device --port 4001`

# to run Android
- You might find that the command will throw an error during the configuration as it will not find the Adnroid SDK path, even if you have followed the documentation steps.
- To fix this problem, you will need to create the file "local.properties" at the root of your android folder and add this line (don't forget to change the "your-username" for the correct one:
  `sdk.dir=/Users/your-username/Library/Android/sdk`

- Then you might run the following line

`npx expo run:android --device --port 4001`
