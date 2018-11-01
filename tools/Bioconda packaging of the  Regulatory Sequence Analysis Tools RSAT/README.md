# Bioconda packaging of the  Regulatory Sequence Analysis Tools (RSAT)

### Representative: Jacques van Helden

---
## Community

ELIXIR-FR / IFB-core

---
## Leads
- Jacques van Helden
- Morgane THOMAS-CHOLLIER 

---
## Background information

The software suite Regulatory Sequence Analysis Tools (RSAT; http://rsat.eu/) aims at analysing cis-regulatory elements in genomes. This well-known, highly-cited and well-maintained ressource running without interruption since 1998, is available on 6 Web servers (including a teaching server) managed by an international team (France, Spain, Mexico). RSAT servers support 10,032 genomes from all taxa. In 2017, RSAT servers treated 117.487 Web queries, 96.219 SOAP/WSDL requests, and the stand-alone version was downloaded 234 times. The installation process is however heavy, due to the diversity of languages (Perl, C, C++, python, R) and numerous library dependencies. The goal of this BioHackathon application is to package RSAT with bioconda. 

---
## Expected outcomes

At the end of the BioHackathon the suite should become fully installable under BioConda, with a single command line: 
conda install -c bioconda rsat
The bioconda packaging will provide an effort-less installation of the RSAT suite on Linux, macOS, and Windows operating systems (via a docker image). The installed package will enable to run the tools on the command line, and we will evaluate the possibility to optionally deploy a local Web server and Web services on the user machine. 

---
## Expected audience

RSAT team: knowledge of current installation of RSAT. Potential participants: 

1. [Jacques van Helden](http://jacques.van-helden.perso.luminy.univ-amu.fr/) (Aix-Marseille Université, Marseille, France), 

Conda packaging: Unix environment, Docker images. Potential hackers (to be confirmed): 

1. [Loic Gouarin](https://www.math.u-psud.fr/~gouarin/) (Université Orsay Paris Sud, France) 
2. [Aurélien Naldi](https://www.ibens.ens.fr/spip.php?article273) (Ecole Normale Supérieure, Paris, France)

**Expected hacking days**: 4 days, 3 days

---
## Related works and references

- [RSAT Web site](http://rsat.eu/)
- [Description of RSAT in NAR Web soft issue 2018](https://www.ncbi.nlm.nih.gov/pubmed/29722874)
- [Bioconda website](https://bioconda.github.io/),

---
## GitHub or any other public repositories of your FOSS products (if any)

RSAT git repository  is currently restricted to the development team, but the source code (under aGPLv3 licence) is freely available in the form of a tarball downloadable from http://rsat.eu/. 


---
## Hackers

1. [Jacques van Helden](http://jacques.van-helden.perso.luminy.univ-amu.fr/) (Aix-Marseille Université, Marseille, France), 
2. [Loic Gouarin](https://www.math.u-psud.fr/~gouarin/) (Université Orsay Paris Sud, France) 
4. [Aurélien Naldi](https://www.ibens.ens.fr/spip.php?article273) (Ecole Normale Supérieure, Paris, France)

---
## Biohackathon presentation

- pdf: <https://goo.gl/dNoiCQ>
- Google Slides: <https://goo.gl/4a1RXe>

## Optional template for Biohackathon presentations

- Google Slides: <https://goo.gl/pS9fX3>

<!--
- Powerpoint: 
- LibreOffice: 
-->

