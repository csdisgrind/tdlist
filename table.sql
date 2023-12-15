create table to_do_list (id serial primary key, name varchar(32) not null, is_archived boolean not null);
create table to_do_items (
    id serial primary key
    , to_do_list_id integer references to_do_list(id)
    , task_name varchar(255) not null
    , is_completed boolean not null
   );