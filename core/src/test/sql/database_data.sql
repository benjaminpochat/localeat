-- BCryptPasswordEncoder

delete from authorities;
delete from users ;

insert into users (username, password, enabled) values ('benjamin', '$2a$10$GAFeu1ig0iTKUXM3nNVuCevYrmPrK2Vh4wosSr5TzqODJ7tsujDKW', true); --1501
insert into authorities (username, authority) values ('benjamin', 'BREEDER');

insert into users (username, password, enabled) values ('estelle', '$2a$10$Y3xy/sKEG4gzkM9.L3YbR.egYLJ300vzJx9h00KtYOzemWX.OMTem', true);  --0607
insert into authorities (username, authority) values ('estelle', 'BREEDER');

