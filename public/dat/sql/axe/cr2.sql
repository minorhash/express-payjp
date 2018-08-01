create table axe2(
type text,
lang text,
tit text,
body text,
t INTEGER DEFAULT (datetime('now', 'localtime')),
dat text
);
create unique index axe2_tit on axe2(tit);
