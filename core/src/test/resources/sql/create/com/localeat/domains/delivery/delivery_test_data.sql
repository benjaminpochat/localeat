insert into deliveries (
    id,
    delivery_address_id,
    delivery_end,
    delivery_start)
values (
    1,
    1,
    '20200101T1800',
    '20200101T2000')
;

insert into deliveries (
    id,
    delivery_address_id,
    delivery_end,
    delivery_start)
values (
    2,
    1,
    '20200108T1800',
    '20200108T2000')
;

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
    0)
;

insert into delivery_available_batches (
    available_batches_id,
    delivery_id)
values (
    1,
    1)
;

insert into delivery_available_batches (
    available_batches_id,
    delivery_id)
values (
    1,
    2)
;

