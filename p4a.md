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
