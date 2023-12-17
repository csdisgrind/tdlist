create table lists (id serial primary key, name varchar(32) not null, is_archived boolean not null);
create table items (
    id serial primary key
    , lists_id integer references lists(id)
    , task_name varchar(255) not null
    , is_completed boolean not null
   );

alter table items alter column lists_id set not null;