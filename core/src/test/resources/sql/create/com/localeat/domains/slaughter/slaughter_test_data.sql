insert into animals (
    id,
    animal_type,
    final_farm_id,
    identification_number,
    live_weight,
    meat_weight)
values (
    1,
    null,
    1,
    '1234',
    850,
    400)
;

insert into slaughters (
    id,
    animal_id,
    cutting_date,
    delivery_id,
    slaughter_date)
values (
    1,
    1,
    '20200901',
    1,
    '20200921')
;

