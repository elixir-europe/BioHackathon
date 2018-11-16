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

#COUNT_CHECK
my $topurl='https://bio.tools/api/tool/?format=xml&page=1';
my $topsource=get($topurl);
my $maxcount="0";
my $maxpage=0;
print "Counting entries and pages\.\.\.\n";
if ($topsource=~/\<count\>.+?\<\/count\>/){
 $maxcount="$&";
 $maxcount=~s/<.+?>//g;
# $maxpage=int($maxcount/25);#20181114 changed 25->10
 $maxpage=int($maxcount/10);
  $maxpage=$maxpage+1;
 print "All entries\: $maxcount\n";
 print "All pages\: $maxpage\n";
}

#CRAWL
$maxpage=1;#TESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTEST
my $pagecount=1;
my $urlbase='https://bio.tools/api/tool/?format=xml&page=';
my $eachurl="";
my $eachsource="";
print "Downloading page ";
while($pagecount<=$maxpage){
 if (!open(XML,">>:encoding(cp932)","Alldata.xml")) { &error(bad_file); }
 print "$pagecount ";
 $eachurl="$urlbase"."$pagecount";
 $eachsource=get($eachurl);
 $eachsource=~s/\n/ /g;
 print XML "$eachsource\n";
 $pagecount++;
 close(XML);
}
print "\n Finished";
exit;