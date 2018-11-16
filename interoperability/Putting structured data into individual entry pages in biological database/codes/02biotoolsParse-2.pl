#!/usr/bin/perl --


#INITIALIZE
use LWP::Simple;
$ua=LWP::UserAgent->new(agent => 'user agent');
$ua->timeout(30);#default:180
my $enc_os = 'cp932';
#my $enc_os = 'utf8';
binmode STDIN, ":encoding($enc_os)";
binmode STDOUT, ":encoding($enc_os)";
binmode STDERR, ":encoding($enc_os)";

#PARSE
my $line="";
if (!open(XML, "Alldata.xml")) { &error(bad_file); }
if (!open(PARSED,">>:encoding(cp932)","AlldataParsed.txt")) { &error(bad_file); }
while($line=<XML>){
 chomp($line);
 $line=~s/\<\?xml version\=\"1\.0\"\?\> \<root\>\<count\>[0-9]+\<\/count\>\<previous\>\<\/previous\>\<list\>//g;
 $line=~s/\<\?xml version\=\"1\.0\"\?\> \<root\>\<count\>[0-9]+\<\/count\>\<previous\>\?page\=[0-9]+\<\/previous\>\<list\>//g;
 $line=~s/\<\/list\-item\>\<\/list\>\<next\>\?page\=[0-9]+\<\/next\>\<\/root\>//g;
# $line=~s/\<\/latest\>/\<\/latest\>\n/g;#20181031mistake
 $line=~s/\<list\-item\>\<collectionID\>/\n\<list\-item\>\<collectionID\>/g;#20181031changed

 print PARSED "$line";
}
close(PARSED);
close(XML);

print "\n Finished";
exit;