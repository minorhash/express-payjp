create table axe(
type text,
lang text,
tit text,
body text,
t REAL DEFAULT (datetime('now', 'localtime')),
dat text
);
create unique index axe_tit on axe(tit);
