insert into orders (
    id,
    customer_id,
    delivery_id,
    status)
values (
    next value for order_id_seq,
    3,
    1,
    'BOOKED')
;

insert into order_items (
    id,
    order_id,
    batch_id,
    quantity,
    unit_price)
values (
    next value for order_item_id_seq,
    current value for order_id_seq,
    1,
    10,
    13)
;

insert into orders (
    id,
    customer_id,
    delivery_id,
    status)
values (
    next value for order_id_seq,
    3,
    2,
    'PAYED')
;

insert into order_items (
    id,
    order_id,
    batch_id,
    quantity,
    unit_price)
values (
    next value for order_item_id_seq,
    current value for order_id_seq,
    1,
    5,
    12)
;

insert into orders (
    id,
    customer_id,
    delivery_id,
    status)
values (
    next value for order_id_seq,
    4,
    1,
    'PAYED')
;

insert into order_items (
    id,
    order_id,
    batch_id,
    quantity,
    unit_price)
values (
    next value for order_item_id_seq,
    current value for order_id_seq,
    1,
    20,
    12)
;