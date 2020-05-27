INSERT INTO product
(name, description, price, image_url)
VALUES
($1, $2, $3, $4);

--so is this saying that whatever is passed in for name will be $1; description is $2; price $3; image_url $4?? 
--or do each of the columns now have four rows? 

