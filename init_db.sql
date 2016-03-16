-- this init the database and drop current one if present

drop table if exists users;
create table users (
    id integer primary key autoincrement,
    name text not null
);

insert into users (name) values
    ("jiayu"),
    ("logan"),
    ("mike"),
    ("john");

drop table if exists tasks;
create table tasks (
    id integer primary key autoincrement,
    title text not null,
    userId id not null references user (id)
);

insert into tasks (title, userId) values
    ("run errands", 4),
    ("code", 1),
    ("buy milk", 2),
    ("send flowers", 3);

