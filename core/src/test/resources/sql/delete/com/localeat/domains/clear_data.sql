-- order domain
delete from order_items;
delete from payments;
delete from orders;
alter sequence order_item_id_seq restart with 1;
alter sequence order_id_seq restart with 1;

-- delivery domain
delete from delivery_available_batches;
delete from batches;
delete from products;
update slaughters set delivery_id = null;
delete from deliveries;
delete from addresses;

-- slaughter domain
delete from slaughters;
delete from animals;
alter sequence slaughter_id_seq restart with 1;
alter sequence animal_id_seq restart with 1;

-- actor domain
delete from breeders ;
delete from customers ;

-- product domain
delete from products;
delete from product_templates;

-- farm domain
delete from farms;

-- security domain
delete from authorities;
delete from users ;
delete from accounts;
