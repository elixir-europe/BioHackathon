A [PublicationVolume](https://schema.org/PublicationVolume) [is part](https://schema.org/isPartOf) of a Journal and comprises a collection of (i.e., [has Part](https://schema.org/hasPart)) 
[PublicationIssue](https://schema.org/PublicationIssue) which is a collection of [ScholarlyArticle](https://schema.org/ScholarlyArticle). Please bear in mind that some times from PublicationVolume you go directly to ScholarlyArticle without passing by a PublicationIssue. Meaning that all these paths are possible:
* Journal -> ScholarlyArticle
* Journal -> PublicationIssue -> ScholarlyArticle
* Journal -> PublicationVolumne -> ScholarlyArticle
* Journal -> PublicationVolume -> PublicationIssue -> ScholarlyArticle

Please get familiar with [Biotea model](https://drive.google.com/drive/folders/1AYKXrowHpsF9cstn0FeJhpbgfi9T_MeC), 
then get familiar with [schema:PublicationVolume](https://schema.org/PublicationVolume), and then copy and use the [template provided by Bioshemas](./PublicationVolume Mapping 0.1.xlsx) 
in order to choose you minimum, recommended and optional properties with cardinalities and suggestions on controlled vocabularies. 
Once you are happy with it, please upload it to the [PublicationVolume folder](../PublicationVolume/), 
use your name as part of the file name to avoid overlapping.