---
title: "MySQL Users"
date: 2024-10-28T12:38:00-04:00
summary: "How to add or modify users in MySQL to use mysql_native_password"
tags:
  - sysadmin
  - mysql
  - user
  - database
---

# Create a User
To create a user using `mysql_native_password`, run the following commands from the MySQL commandline.  

Replace `user` with the name you want to create.  
Replace `password` with the password being set.

```mysql
CREATE USER '[user]'@'%' IDENTIFIED WITH mysql_native_password BY '[password]';
GRANT USAGE ON *.* TO '[user]'@'%';
GRANT SELECT, INDEX, INSERT, CREATE TEMPORARY TABLES, EXECUTE ON *.* TO '[user]'@'%';
```

# Modify a User
To modify a user to use `mysql_native_password`, run the follwing commands from the MySQL commandline.

Replace `user` with the name you want to create.  
Replace `password` with the password being set.  

```mysql
ALTER USER '[user]'@'%' IDENTIFIED WITH mysql_native_password BY '[password]';
```
