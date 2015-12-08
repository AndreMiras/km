# Perl LLRP encoder/decoder

## Overview
The LLRP Perl tookkit (LTKPerl) gives access to a LLRP encoder/decoder.

## Run simple_encode_decode.pl example
From the downloaded LTKPerl directory:

    perl ./Examples/simple_encode_decode.pl

## Use the decode_message subroutine
From the shell (mind the single quotes):

    perl -MRFID::LLRP::Builder=decode_message -e '
    print decode_message ("" .
    "\x{04}\x{14}\x{00}\x{00}\x{00}\x{61}\x{00}\x{00}" .
    "\x{00}\x{00}\x{00}\x{b1}\x{00}\x{57}\x{00}\x{00}" .
    "\x{00}\x{01}\x{00}\x{00}\x{00}\x{b2}\x{00}\x{12}" .
    "\x{00}\x{b3}\x{00}\x{05}\x{00}\x{00}\x{b6}\x{00}" .
    "\x{09}\x{00}\x{00}\x{00}\x{00}\x{00}\x{00}\x{b7}" .
    "\x{00}\x{2e}\x{00}\x{04}\x{00}\x{01}\x{00}\x{02}" .
    "\x{00}\x{03}\x{00}\x{04}\x{00}\x{b8}\x{00}\x{19}" .
    "\x{03}\x{00}\x{00}\x{75}\x{30}\x{00}\x{b9}\x{00}" .
    "\x{10}\x{01}\x{00}\x{00}\x{64}\x{00}\x{00}\x{27}" .
    "\x{10}\x{00}\x{00}\x{75}\x{30}\x{00}\x{ba}\x{00}" .
    "\x{07}\x{00}\x{01}\x{01}\x{00}\x{ed}\x{00}\x{0d}" .
    "\x{01}\x{01}\x{f4}\x{00}\x{ee}\x{00}\x{06}\x{17}" .
    "\x{c0}")->toString(1)
    '

That will output the following:

    <?xml version="1.0"?>
    <llrp:ADD_ROSPEC xmlns:llrp="http://www.llrp.org/ltk/schema/core/encoding/xml/1.0" Version="1" MessageID="0">
      <llrp:ROSpec>
        <llrp:ROSpecID>1</llrp:ROSpecID>
        <llrp:Priority>0</llrp:Priority>
        <llrp:CurrentState>Disabled</llrp:CurrentState>
        <llrp:ROBoundarySpec>
          <llrp:ROSpecStartTrigger>
            <llrp:ROSpecStartTriggerType>Null</llrp:ROSpecStartTriggerType>
          </llrp:ROSpecStartTrigger>
          <llrp:ROSpecStopTrigger>
            <llrp:ROSpecStopTriggerType>Null</llrp:ROSpecStopTriggerType>
            <llrp:DurationTriggerValue>0</llrp:DurationTriggerValue>
          </llrp:ROSpecStopTrigger>
        </llrp:ROBoundarySpec>
        <llrp:AISpec>
          <llrp:AntennaIDs>1 2 3 4</llrp:AntennaIDs>
          <llrp:AISpecStopTrigger>
            <llrp:AISpecStopTriggerType>Tag_Observation</llrp:AISpecStopTriggerType>
            <llrp:DurationTrigger>30000</llrp:DurationTrigger>
            <llrp:TagObservationTrigger>
              <llrp:TriggerType>Upon_Seeing_No_More_New_Tags_For_Tms_Or_Timeout</llrp:TriggerType>
              <llrp:NumberOfTags>100</llrp:NumberOfTags>
              <llrp:NumberOfAttempts>0</llrp:NumberOfAttempts>
              <llrp:T>10000</llrp:T>
              <llrp:Timeout>30000</llrp:Timeout>
            </llrp:TagObservationTrigger>
          </llrp:AISpecStopTrigger>
          <llrp:InventoryParameterSpec>
            <llrp:InventoryParameterSpecID>1</llrp:InventoryParameterSpecID>
            <llrp:ProtocolID>EPCGlobalClass1Gen2</llrp:ProtocolID>
          </llrp:InventoryParameterSpec>
        </llrp:AISpec>
        <llrp:ROReportSpec>
          <llrp:ROReportTrigger>Upon_N_Tags_Or_End_Of_AISpec</llrp:ROReportTrigger>
          <llrp:N>500</llrp:N>
          <llrp:TagReportContentSelector>
            <llrp:EnableROSpecID>false</llrp:EnableROSpecID>
            <llrp:EnableSpecIndex>false</llrp:EnableSpecIndex>
            <llrp:EnableInventoryParameterSpecID>false</llrp:EnableInventoryParameterSpecID>
            <llrp:EnableAntennaID>true</llrp:EnableAntennaID>
            <llrp:EnableChannelIndex>false</llrp:EnableChannelIndex>
            <llrp:EnablePeakRSSI>true</llrp:EnablePeakRSSI>
            <llrp:EnableFirstSeenTimestamp>true</llrp:EnableFirstSeenTimestamp>
            <llrp:EnableLastSeenTimestamp>true</llrp:EnableLastSeenTimestamp>
            <llrp:EnableTagSeenCount>true</llrp:EnableTagSeenCount>
            <llrp:EnableAccessSpecID>true</llrp:EnableAccessSpecID>
          </llrp:TagReportContentSelector>
        </llrp:ROReportSpec>
      </llrp:ROSpec>
    </llrp:ADD_ROSPEC>

You may also want to decode from a Wireshark dump (LLRP body only).

    perl -MRFID::LLRP::Builder=decode_message -MFile::Slurp -e '
    print decode_message (read_file("dump.raw"))->toString(1)
    '

Last but not least, use [llrp_dump_decoder.pl](https://raw.github.com/AndreMiras/km/master/attachments/llrp_dump_decoder.pl) if you need to decode multiple messages of a raw Wireshark dump.

    ./llrp_dump_decoder.pl wireshark_dump.raw


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
