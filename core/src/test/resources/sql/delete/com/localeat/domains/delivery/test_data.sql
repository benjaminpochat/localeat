delete from delivery_available_products;
delete from products;
update slaughters set delivery_id = null;
delete from deliveries;
delete from addresses;
