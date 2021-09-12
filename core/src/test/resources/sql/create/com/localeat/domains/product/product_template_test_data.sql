insert into product_templates (
    id,
    name,
    description,
    photo_id,
    unit_price,
    farm_id,
    net_weight)
values (
    next value for product_template_id_seq,
    'colis ''tutti frutti''',
    'un assortiment de steaks, de rotis, et de morceaux a bouillir',
    null,
    13.5,
    1,
    10)
;

insert into product_template_elements (
    product_id,
    piece_category,
    shaping)
values (
    1,
    'FAUX_FILET',
    'TRANCHE'
)
;

insert into product_template_elements (
    product_id,
    piece_category,
    shaping)
values (
    1,
    'COTE',
    'TRANCHE'
)
;

insert into product_template_elements (
    product_id,
    piece_category,
    shaping)
values (
    1,
    'BASSE_COTE',
    'STEAK_HACHE'
)
;