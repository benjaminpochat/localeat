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
    '2020-09-01',
    null,
    '2020-09-21')
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
    '2021-12-01',
    null,
    '2021-12-21')
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
    '2022-01-01',
    null,
    '2022-01-21')
;