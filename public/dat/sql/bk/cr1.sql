create table node(
type text,
term text,
brand text,
title text,
link text,
body text
);
create unique index title_index on node(title);
