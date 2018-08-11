create table mer(
name text,
sku integer,
pri integer,
img text,
rel text,
cat text,
des text
);
create unique index mer_sku on mer(sku);
