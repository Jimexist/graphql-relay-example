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
    userId integer not null references user (id)
);

insert into tasks (title, userId) values
    ("run errands", 4),
    ("code", 1),
    ("buy milk", 2),
    ("send flowers", 3);

drop table if exists followings;
create table followings (
    fromId integer not null references users (id),
    toId integer not null references users (id),
    primary key (fromId, toId)
);

insert into followings (fromId, toId) values
    (1, 2),
    (2, 1),
    (3, 4),
    (2, 4),
    (2, 3);

