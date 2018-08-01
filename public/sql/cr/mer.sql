create table mer(
item text,
sku text,
pri integer,
img text
);
create unique index sku2_index on mer(sku);
