delete from order_items;
delete from orders;
alter sequence order_item_id_seq restart with 1;
alter sequence order_id_seq restart with 1;