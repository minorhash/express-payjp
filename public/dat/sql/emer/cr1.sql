create table emer(
name text,
sku integer,
pri integer,
img text,
rel text,
cat text,
des text
);
create unique index emer_sku on emer(sku);
