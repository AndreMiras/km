# Pyrobuf tips

[Pyrobuf](https://github.com/appnexus/pyrobuf) is an alternative to Google's Python Protobuf library.

Here're few tips I'm using when debugging/contributing to the library.

## Run tests
```
python setup.py test
```

## Run without installing
Sometimes you want to quick test your changes and compile a .proto file, without reinstalling pyrobuf.
```
python -m pyrobuf.__main__ tests/proto/test_repeated_enum.proto
```

## Troubleshooting

### out/test_repeated_enum_proto.pxd:5:0: 'pyrobuf_list.pxd' not found
You need to build the pyrobuf_list and pyrobuf_util modules.
```
python setup.py develop
```
