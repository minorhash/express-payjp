create table 
tmp(
usr text,
sku text,
uni integer
);
create unique index sku_index on tmp(sku);
