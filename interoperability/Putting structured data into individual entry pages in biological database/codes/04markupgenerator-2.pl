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

#GENERATE
my $line="";
my @meta=('number','collectionID','downtime','accessibility','additionDate','owner','cost','download','validated','availablitily','publication','maturity','canonicalID','id','version','homepage','function','lastUpdate','description','toolType','editPermission','language','versionId','link','elixirInfo','topic','name','license','documentation','credit','contact','version_hash','operatingSystem','latest0');
my $filenum=0;
my $padfilenum="000000";
my $parts01='<div vocab="http://schema.org/" typeof="SoftwareApplication">';
my $parts02='<span property="name">';
my $parts03='</span>';
my $parts04='<span property="operatingSystem">';
my $parts05='<span property="featureList">';
my $parts06='<span property="description">';
my $parts07='<span property="url">';
my $parts08='<span property="softwareVersion">';
my $parts09='<span property="citation">';
my $parts10='';
my $parts11='';
my $parts99='</div>';

if (!open(SPLIT,"AlldataSplit.txt")) { &error(bad_file); }
while($line=<SPLIT>){
 chomp($line);
 @meta=split(/\t/,$line);
 if (!open(MARKUP,">>:encoding(cp932)","$padfilenum.txt")) { &error(bad_file); } 

 #head
 print MARKUP "$parts01\n";

 #id
 print MARKUP " $parts02";
 $meta[13]=~s/<.+?>//g;
 print MARKUP "$meta[13]";
 print MARKUP "$parts03\n";

 #OS
 my $osparts01='<operatingSystem><list-item>';
 my $osparts02='</list-item><list-item>';
 my $osparts03='</list-item></operatingSystem>';
 print MARKUP " $parts04";
 $meta[32]=~s/$osparts01//g;
 $meta[32]=~s/$osparts02/\,/g;
 $meta[32]=~s/$osparts03//g;
 print MARKUP "$meta[32]";
 print MARKUP "$parts03\n";

 #FeatureList
 my $funcparts01='</term><uri>';
 my $funcparts02='</uri></list-item>';
 my $funcparts03='</uri></list-item></operation>';
 my $funcparts04='<comment>';
 my $funcparts05='</comment>';
 my $funcparts06='';
 my $funcparts07='';
 print MARKUP " $parts05";
 $meta[16]=~s/\<comment\>.+?\<\/comment\>//g;
 $meta[16]=~s/\<input\>.+?\<\/input\>//g;
 $meta[16]=~s/\<output\>.+?\<\/output\>//g;
 $meta[16]=~s/$funcparts01/\(/g;
 $meta[16]=~s/$funcparts03/\)/g;
 $meta[16]=~s/$funcparts02/\)\,/g;
 $meta[16]=~s/\<.+?\>//g;
 print MARKUP "$meta[16]";
 print MARKUP "$parts03\n";

 #Description
 print MARKUP " $parts06";
 $meta[18]=~s/\<.+?\>//g;
 print MARKUP "$meta[18]";
 print MARKUP "$parts03\n";

 #Url
 print MARKUP " $parts07";
 $meta[15]=~s/\<.+?\>//g;
 print MARKUP "$meta[15]";
 print MARKUP "$parts03\n";

 #Softwarevarsion
 print MARKUP " $parts08";
 $meta[14]=~s/\<.+?\>//g;
 print MARKUP "$meta[14]";
 print MARKUP "$parts03\n";

 #Citation
 print MARKUP " $parts09";
 # need to distinguish DOI, Pubmed ID, Pubmed Central ID
 $meta[10]=~s/\<.+?\>//g;
 print MARKUP "$meta[10]";
 print MARKUP "$parts03\n";

 #foot
 print MARKUP "$parts99\n";
 close (MARKUP);
 $filenum++;
 $padfilenum=sprintf("%06d",$filenum);
}

print "$filenum finished\n";
close(SPLIT);
exit;
