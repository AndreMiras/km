# Perl LLRP encoder/decoder

## Overview
The LLRP Perl tookkit (LTKPerl) gives access to a LLRP encoder/decoder.

## Run simple_encode_decode.pl example
From the downloaded LTKPerl directory:

    perl ./Examples/simple_encode_decode.pl

## Install instructions
### Download
At the time of writing the latest version is [LTKPerl-1.0.0.5](http://sourceforge.net/projects/llrp-toolkit/files/llrp-toolkit/ltkperl/1.0.0.5/).


### Dependencies

#### Perl dependencies (with package manager)
On Ubuntu 12.04 (Precise), this is what is needed.

    sudo apt-get install libxml-libxml-perl libsub-exporter-perl libclone-perl libxml-libxslt-perl

#### Additional dependencies
Some of the dependencies are not available from APT.

[HexDump.pm](http://search.cpan.org/dist/Data-HexDump/lib/Data/HexDump.pm) is available for direct download in its version [Data-HexDump-0.02](http://cpansearch.perl.org/src/FTASSIN/Data-HexDump-0.02/lib/Data/HexDump.pm).
It can be deployed in ./LTKPerl/Data/ directory (mkdir LTKPerl/Data/).

ReaderDef.xml is missing from LTKPerl-1.0.0.5, but can be found in [LTKPerl-1.0.0.beta](http://sourceforge.net/projects/llrp-toolkit/files/llrp-toolkit/ltkperl/LTKPERL_1_0_0_beta/).
It must be deployed in the ./LTKPerl/RFID/LLRP/ directory.