create table usr(
email text not null,
usr text not null,
kat text,
phn integer not null
);
create unique index usr_phn on usr(phn);

create table dat(
age integer not null,
cnt integer not null,
ltv integer not null,
mnt integer not null,
at integer not null
);
create unique index usr_phn on usr(phn);

create table ite(
id integer not null,
uni integer not null,
pri integer not null
);
create unique index ite_id on ite(id);

create table adr(
ln1 text,
ln2 text,
city text,
sta text,
zip integer not null
);
create unique index ite_id on ite(id);


