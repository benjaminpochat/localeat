insert into products (
    id,
    name,
    description,
    photo_id,
    unit_price,
    farm_id,
    net_weight)
values (
    next value for product_id_seq,
    'colis ''tutti frutti''',
    'un assortiment de steaks, de rotis, et de morceaux a bouillir',
    null,
    13.5,
    1,
    10)
;

