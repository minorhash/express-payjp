create table pal(
email text not null,
pal text,
mnt integer
);
create unique index pal_email on pal(email);


