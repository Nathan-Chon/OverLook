-- Use SQL insert statements to add any
-- starting/dummy data to your database tables

-- EXAMPLE:

 insert into "public"."users"
   ("name", "email", "password", "phoneNumber", "managerAccount")
   values
     ('Nathan Chon', 'nchon99@gmail.com', 'somethingspecial', '6261234567', true),
     ('Justin Chang', 'theemail@gmail.com', 'infoinfo', '6261234567', false),
     ('Austin Marverick', 'email@gmail.com', 'infoinfo', '6261234567', false);

 insert into "public"."requests"
   ("title", "description", "question", "userId")
   values
     ('Do This Today', 'This is how you do this today', 'Questions or Concerns', 2),
     ('Do this Tomorrow', 'Information on how to do this tomorrow', 'I have multiple concerns', 3);
