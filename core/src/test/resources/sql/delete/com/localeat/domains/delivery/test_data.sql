delete from delivery_available_batches;
delete from batches;
delete from products;
update slaughters set delivery_id = null;
delete from deliveries;
delete from addresses;
