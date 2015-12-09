# GDB ImportError: No module named libstdcxx.v6.printers

On Ubuntu 14.04, edit /usr/share/gdb/auto-load/usr/lib/x86_64-linux-gnu/libstdc++.so.6.0.19-gdb.py file.
Comment lines:

    if not os.path.basename(os.path.dirname(__file__)).startswith('lib'):
        backdirs += 1 # multiarch subdir

See https://bugs.launchpad.net/ubuntu/+source/gcc-4.8/+bug/1473599 for more info.
