# Python for Android

## Test recipes from Docker

Build the image:

```sh
docker build --tag=kivy/python-for-android .
```

Docker run (note the volume mount):

```sh
docker run -it \
  --volume $(pwd)/pythonforandroid:/home/user/app/pythonforandroid \
  --env ANDROID_NDK_HOME_LEGACY=/home/user/.android/android-ndk-legacy \
  --env ANDROID_SDK_HOME=/home/user/.android/android-sdk \
  --env ANDROID_NDK_HOME=/home/user/.android/android-ndk \
  --rm kivy/python-for-android bash
```

Build the recipe e.g. `gevent`:

```sh
. venv/bin/activate
cd testapps/on_device_unit_tests/
python setup.py apk --debug \
  --sdk-dir $ANDROID_SDK_HOME \
  --ndk-dir $ANDROID_NDK_HOME \
  --requirements python3,gevent \
  --arch=armeabi-v7a --arch=arm64-v8a
```

## Test recipes on macOS

Prepare the environment:

```sh
export PYTHONFORANDROID_PREREQUISITES_INSTALL_INTERACTIVE=0
export ANDROID_HOME=${HOME}/.android
export ANDROID_SDK_ROOT=${HOME}/.android/android-sdk
export ANDROID_SDK_HOME=${HOME}/.android/android-sdk
export ANDROID_NDK_HOME=${HOME}/.android/android-ndk
```

Install dependencies:

```sh
. venv/bin/activate
pip install -e .
python pythonforandroid/prerequisites.py
```

Build the recipe e.g. `gevent`:

```sh
cd testapps/on_device_unit_tests/
python setup.py apk --sdk-dir $ANDROID_SDK_HOME --ndk-dir $ANDROID_NDK_HOME --arch=x86_64 --requirements python3,gevent
```

## Clean recipe build

Clean recipe build between test build sessions, e.g. for `gevent`:

```sh
p4a clean_recipe_build gevent && p4a clean_dists
```
