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

insert into delivery_available_products (
    available_products_id,
    delivery_id)
values (
    1,
    1)
;

insert into delivery_available_products (
    available_products_id,
    delivery_id)
values (
    1,
    2)
;

