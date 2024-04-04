-- create user for access from the api
create user 'api'@'172.%.%.%' identified by 'api4x';
grant all on *.* to 'api'@'172.%.%.%' with grant option;
flush privileges;

-- create user for access from the web
create user 'web'@'172.%.%.%' identified by 'web4x';
grant all on *.* to 'web'@'172.%.%.%' with grant option;
flush privileges;

-- create user for access from dbeaver
create user 'dbeaver'@'192.168.65.1' identified by 'dbeaver4x';
grant all on *.* to 'dbeaver'@'192.168.65.1' with grant option;
flush privileges;