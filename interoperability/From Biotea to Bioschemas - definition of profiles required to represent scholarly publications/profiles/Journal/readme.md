A Journal comprises a collection of (i.e., [has part](https://schema.org/hasPart)) 
[PublicationVolume](https://schema.org/PublicationVolume) which is a collection of [PublicationIssue](https://schema.org/PublicationIssue) which is a collection of [ScholarlyArticle](https://schema.org/ScholarlyArticle). We have chosen to use [Dataset](https://schema.org/Dataset) as the seed for our Journal profile 
(it extends [CreativeWork](https://schema.org/CreativeWork) and includes the propery [issn](https://schema.org/issn) which 
is commonly used by Journals). Please bear in mind that some times you can go from Journal directly to ScholarlyArticle without passing by a PublicationVolume or PublicationIssue. Meaning that all these paths are possible:
* Journal -> ScholarlyArticle
* Journal -> PublicationIssue -> ScholarlyArticle
* Journal -> PublicationVolumne -> ScholarlyArticle
* Journal -> PublicationVolume -> PublicationIssue -> ScholarlyArticle

Please get familiar with the [Biotea model](https://drive.google.com/drive/folders/1AYKXrowHpsF9cstn0FeJhpbgfi9T_MeC), 
then get familiar with [schema:Collection](https://schema.org/Collection), and then copy and use the [template provided by Bioshemas](./Journal Mapping 0.1.xlsx) 
in order to choose you minimum, recommended and optional properties with cardinalities and suggestions on controlled vocabularies. 
Once you are happy with it, please upload it to the [Journal folder](../Journal/), 
use your name as part of the file name to avoid overlapping.
As a collection of articles, a journal could also be modelled as a Dataset of articles. If you want to go this way, please go to [schema:Dataset](https://schema.org/Dataset) and add the properties you find useful.
