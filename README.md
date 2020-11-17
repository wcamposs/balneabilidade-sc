# Balneabilidade SC

![](https://media.giphy.com/media/spU79MwHnEjVzWxHPy/giphy.gif)

## Description

The bathing map of Santa Catarina is an application developed in Ionic 3 and typescript aimed at the conclusion of the bachelor's degree in Information Science from the Universidade Federal de Santa Catarina.

The purpose of the application is to make available to the population the bathing data of the beach points on the Santa Catarina coast. Using data from the Instituto do Meio Ambiente (IMA), users can view the beach spots, their bathing information, weather forecast and wind direction, as well as the list of beach spots.

## Requirements

To run the application, you will need to have the following technologies installed on your machine:
- [NodeJs](https://nodejs.org/en/)
- [NPM (Node Package Manager)](https://www.npmjs.com/)
- [Ionic 3](https://ionicframework.com/docs)
- [Cordova](https://cordova.apache.org/)
- ADB (Android Debug Bridge)
- Android (or IOS) emulator or a physical device)

## Installing Requirements

- To install Node and NPM, follow [this tutorial](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- To install Ionic and Cordova, follow [this tutorial](https://ionicframework.com/docs/v1/guide/installation.html)
Reminder: Make sure to install ionic version 3.20.1, replacing the ionic installation command with this one
```
npm install -g ionic@3.20.1
```
- To run ionic and cordova without *sudo* command prefix, [this could be useful](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally)

#### Using Android Emulator

- To use an Android emulator, you will need Android Studio, install it through [this tutorial](https://developer.android.com/studio/install)
- To install ADB (Android Debug Bridge), follow [this tutorial](https://developer.android.com/studio/command-line/adb?hl=pt-br)
- To create and manage AVDS (Android virtual devices) follow [this tutorial](https://developer.android.com/studio/run/managing-avds)

#### Using iOS Emulator

- To use an iOS emulator, you will need an MacOS. Install and configure through [this tutorial](https://medium.com/@LondonAppBrewery/how-to-download-and-setup-xcode-10-for-ios-development-b63bed1865c)

## Cloning the repository

Considering that you have Git installed on your machine, access a terminal and type the following command:

```
git clone git@github.com:wcamposs/balneabilidade-sc.git
```

## Installing Dependencies

Considering that NPM is being used as a package manager, access the project root via terminal and type:

```
npm install
```

## Running Project

To run the project, you can choose to run on the web (browser), an Android emulator (or iOS) or on a physical device. Once at the root of the project via terminal, type the commands according to your need

#### Running with Web Browser

```
ionic serve
``` 

#### Running in Emulator or physical Device:

To run the project on a device (whether physical or virtual), it will be necessary to have the device connected to the machine and that it is being detected via adb (in the case of an emulator, it must be initialized).

Once the device is initialized, to detect the device through adb, execute the following command in the terminal:

```
adb devices
```

Once the device is detected, run the application using the following commands (according to the desired platform):

Android device:
```
ionic cordova run android
```

iOS device:

```
ionic cordova run ios
```

