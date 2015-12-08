#!/usr/bin/perl
=begin comment
Decodes all the LLRP messages of a raw Wireshark dump using Perl LLRP Toolkit.
=cut
use strict;
use warnings;
use RFID::LLRP::Builder qw(encode_message decode_message);
use File::Slurp;

# the raw Wireshark dump must be passed as argument
my $filename = shift or die "Usage: $0 FILENAME\n";
my $full_bmsg = read_file($filename);
my $bmsg = $full_bmsg;
my $message_index = 0;
while (length($bmsg) > 0) {
	print "\n========== Message index $message_index ==========\n";
	# computes message length
	my ($msg_hdr, $ndx) = RFID::LLRP::Builder::parse_msg_head($bmsg);
	my $bmsg_length = $msg_hdr->{MessageLength};
	# decodes message
	print decode_message($bmsg)->toString(1);
	$bmsg = substr($bmsg, $bmsg_length);
	$message_index++;
}
