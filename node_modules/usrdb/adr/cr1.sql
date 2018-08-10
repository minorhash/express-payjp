create table adr(
email text not null,
phn text,
ln1 text,
ln2 text,
city text,
sta text,
zip text not null
);
create unique index adr_email on adr(email);


