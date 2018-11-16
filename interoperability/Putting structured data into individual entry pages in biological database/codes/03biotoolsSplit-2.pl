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
my @meta=('collectionID','downtime','accessibility','additionDate','owner',
          'cost','download','validated','availablitily','publication',
          'maturity','canonicalID','id','version','homepage',
          'function','lastUpdate','description','toolType','editPermission',
          'language','versionId','link','elixirInfo','topic',
          'name','license','documentation','credit','contact',
          'version_hash','operatingSystem','latest');
my $metacount=0;
#my $linecount=1;#20181031changed
my $linecount=0;#20181031changed
my $meta1='<collectionID>';#
my $meta2='</collectionID>';#
#my $meta1='</collectionID>';#
#my $meta2='<collectionID/>';#
if (!open(PARSED,"AlldataParsed.txt")) { &error(bad_file); }
if (!open(SPLIT,">>:encoding(cp932)","AlldataSplit.txt")) { &error(bad_file); }
#print SPLIT "number\tcollectionID\tdowntime\taccessibility\tadditionDate\towner\tcost\tdownload\tvalidated\tavailablitily\tpublication\tmaturity\tcanonicalID\tid\tversion\thomepage\tfunction\tlastUpdate\tdescription\ttoolType\teditPermission\tlanguage\tversionId\tlink\telixirInfo\ttopic\tname\tlicense\tdocumentation\tcredit\tcontact\tversion_hash\toperatingSystem\tlatest\n";#20181031
print SPLIT "number\tcollectionID\tdowntime\taccessibility\tadditionDate\towner\tcost\tdownload\tvalidated\tavailablitily\tpublication\tmaturity\tcanonicalID\tid\tversion\thomepage\tfunction\tlastUpdate\tdescription\ttoolType\teditPermission\tlanguage\tversionId\tlink\telixirInfo\ttopic\tname\tlicense\tdocumentation\tcredit\tcontact\tversion_hash\toperatingSystem\tlatest";#20181031

while($line=<PARSED>){
 chomp($line);
 print SPLIT "$linecount\t";
 while($metacount<33){
  $meta1="\<"."$meta[$metacount]"."\>";
  $meta2="\<\/"."$meta[$metacount]"."\>";
  $line=~s/$meta1.+?$meta2//g;
  print SPLIT "$&\t";
  $metacount++;
 }
 print SPLIT "\n";
 $metacount=0;
 $linecount++;
}

close(PARSED);
close(SPLIT);

print "\n Finished";
exit;
