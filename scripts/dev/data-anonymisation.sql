alter table only authorities drop CONSTRAINT foreign_authorities_users_1;

update users set username = regexp_replace(username, '(.*)@(.*)\.(.*)', '\1@anonymous.\3') where username not in ('benjamin.pochat@gmail.com', 'benjamin.moselle@gmail.com', 'estelle.pochat@gmail.com');
update authorities set username = regexp_replace(username, '(.*)@(.*)\.(.*)', '\1@anonymous.\3') where username not in ('benjamin.pochat@gmail.com', 'benjamin.moselle@gmail.com', 'estelle.pochat@gmail.com');
update customers set email = regexp_replace(email, '(.*)@(.*)\.(.*)', '\1@anonymous.\3') where email not in ('benjamin.pochat@gmail.com', 'benjamin.moselle@gmail.com', 'estelle.pochat@gmail.com');
update breeders set email = regexp_replace(email, '(.*)@(.*)\.(.*)', '\1@anonymous.\3') where email not in ('benjamin.pochat@gmail.com', 'benjamin.moselle@gmail.com', 'estelle.pochat@gmail.com');

alter table only authorities add constraint foreign_authorities_users_1 foreign key (username) references public.users(username);