# Comments

I think that inside CategoryCode, the cardinality of name, codeValue,
and url should be `ONE` and not `MANY` as could be expected to have multiple
ontologies associated to a value, but not to have multiple
fields inside it.
For this reason I'm going to update the sample_schema.json file
to reflect this