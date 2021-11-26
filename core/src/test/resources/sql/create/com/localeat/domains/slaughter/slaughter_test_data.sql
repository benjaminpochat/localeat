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
    null,
    '20200921')
;

insert into animals (
    id,
    animal_type,
    final_farm_id,
    identification_number,
    live_weight,
    meat_weight)
values (
    2,
    null,
    1,
    '1111',
    800,
    350)
;

insert into slaughters (
    id,
    animal_id,
    cutting_date,
    delivery_id,
    slaughter_date)
values (
    2,
    2,
    '20211201',
    null,
    '20211221')
;

insert into animals (
    id,
    animal_type,
    final_farm_id,
    identification_number,
    live_weight,
    meat_weight)
values (
    3,
    null,
    1,
    '2222',
    800,
    350)
;

insert into slaughters (
    id,
    animal_id,
    cutting_date,
    delivery_id,
    slaughter_date)
values (
    3,
    3,
    '20220101',
    null,
    '20220121')
;