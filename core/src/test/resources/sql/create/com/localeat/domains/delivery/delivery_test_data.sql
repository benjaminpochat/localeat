-- delivery 1, public access control

insert into public_delivery_access_control (id) values (next value for delivery_access_control_id_seq);

insert into deliveries (
    id,
    delivery_address_id,
    delivery_start,
    delivery_end,
    access_control_id)
values (
    1,
    1,
    '2050-01-01 18:00:00',
    '2050-01-01 20:00:00',
    current value for delivery_access_control_id_seq);

update slaughters set delivery_id = 1 where id = 1;

insert into batches (
    id,
    product_id,
    quantity,
    quantity_sold
) values (
    1,
    1,
    50,
    0);

insert into delivery_available_batches (
    available_batches_id,
    delivery_id)
values (
    1,
    1);

-- delivery 2, public access control

insert into public_delivery_access_control (id) values (next value for delivery_access_control_id_seq);

insert into deliveries (
    id,
    delivery_address_id,
    delivery_start,
    delivery_end,
    access_control_id)
values (
    2,
    1,
    '2050-01-08 18:00:00',
    '2050-01-08 20:00:00',
    current value for delivery_access_control_id_seq);

update slaughters set delivery_id = 2 where id = 2;

insert into delivery_available_batches (
    available_batches_id,
    delivery_id)
values (
    1,
    2);

-- delivery 3, shared key access control

insert into shared_delivery_access_key (id, key) values (next value for delivery_access_key_id_seq, 'ACCESS');

insert into shared_key_delivery_access_control (id, shared_key_id) values (next value for delivery_access_control_id_seq, current value for delivery_access_key_id_seq);


insert into deliveries (
    id,
    delivery_address_id,
    delivery_start,
    delivery_end,
    access_control_id)
values (
    3,
    1,
    '2050-01-15 18:00:00',
    '2050-01-15 20:00:00',
    current value for delivery_access_control_id_seq);

update slaughters set delivery_id = 3 where id = 3;

insert into delivery_available_batches (
    available_batches_id,
    delivery_id)
values (
    1,
    3);





