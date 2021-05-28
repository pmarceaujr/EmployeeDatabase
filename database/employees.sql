ALTER TABLE employees DROP FOREIGN KEY employee_ibfk_2;
insert into employees (first_name, last_name, role_id)
VALUES
('Aaron','Smith',1,1022),
('Abigail','Johnson',2,1023),
('Adam','Williams',3,1024),
('Alan','Brown',4,1022),
('Albert','Jones',5,1023),
('Alexander','Garcia',6,1024),
('Alexis','Miller',7,1022),
('Alice','Davis',1,1023),
('Amanda','Rodriguez',2,1024),
('Amber','Martinez',3,1022),
('Amy','Hernandez',4,1023),
('Andrea','Lopez',5,1024),
('Andrew','Gonzales',6,1022),
('Angela','Wilson',7,1023),
('Ann','Anderson',1,1024),
('Anna','Thomas',2,1022),
('Anthony','Taylor',3,1023),
('Arthur','Moore',4,1024),
('Ashley','Jackson',5,1022),
('Austin','Martin',6,1023),
('Barbara','Lee',7,1024),
('Benjamin','Perez',11,1026),
('Betty','Thompson',8,1026),
('Beverly','White',5,1026),
('Billy','Harris',2,1026),
('Paul ','Marceau',12,NULL)


ALTER TABLE employees ADD CONSTRAINT `employee_ibfk_2` FOREIGN KEY (`manager_id`) REFERENCES `employees` (`id`) ON DELETE CASCADE