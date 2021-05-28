

insert into departments (dept_name)
VALUES
('Sales'),
('Engineering'),
('Infomration Technology'),
('Human Resources'),
('Board Of Directors');
ALTER TABLE roles DROP FOREIGN KEY role_ibfk_1;
insert into roles (title, salary, dept_id)
VALUES
('Sales Associate',50000,1),
('Director of Sales',175000,1),
('Junior Software Engineer',60000,2),
('Senior Software Engineer',85000,2),
('Director of Engineering',235500,2),
('Network Engineer',95000,3),
('Web Administrator',115000,3),
('Dirctor Of IT',255000,3),
('Benefits administrator',65000,4),
('Compensation specialist',95000,4),
('Director Of HR',125000,4),
('CEO',5000000,5),
('Board Of Directors',1000000,5);
ALTER TABLE roles ADD CONSTRAINT `role_ibfk_1` FOREIGN KEY (`dept_id`) REFERENCES `departments` (id) ON DELETE CASCADE;
ALTER TABLE employees DROP FOREIGN KEY `employee_ibfk_1`;
ALTER TABLE employees DROP FOREIGN KEY `employee_ibfk_2`;
insert into employees (first_name, last_name, role_id, manager_id)
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
('Paul ','Marceau',12,NULL);


ALTER TABLE employees ADD FOREIGN KEY (`manager_id`) REFERENCES `employees` (`id`) ON DELETE CASCADE;
ALTER TABLE employees ADD FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE






