# TechBids
## Problem
Many people want to participate in an auction, but they do not have enough time for that and also they may not be able to be in the auction place and also the inability to participate in more than one auction at the same time.
## Solution 💡
It is one of the smart solutions developed and operated by a trust company that enables those interested in auctions to participate in auctions electronically without the need to come to the auction site and complete all financial transactions safely and electronically and in accordance with the laws of holding auctions, buying and selling.

## User Journey  ✏️
The user will see the latest products offered for auction and can click on any one to see the details and also search for any product he wants using the price and also the cateory and finally he can see his profile and what was purchased from the auction and also what was offered in the auction.

## User Stories 📋
**AS a User:**
1.  I want to be able sign in/up and logout the site.
2.  I can see all bid products and it's information.
3.  I want to be able filter cars by price and Category.
4.  I want to be able buy or add product to bid any product I want.
5.  I want to be able see all products I show it to bid.
6.  1.  I want to be able see all products that i bought it.


## Prototype
#### [Our Prototype](https://www.figma.com/file/uaDPvk625l6HhLg69qnOvk/Car-rental?node-id=1%3A2) 
![](https://i.imgur.com/gNpj3su.png)


## DB schema
![](https://i.imgur.com/eeqgkcY.png)


## Technologies 💻:-
**BackEnd**: Node JS & Express JS.
**FrontEnd**: React JS,Material Ui,Type Script.
**Database**: Sequelize.

## How to Launch App Locally
 * clone this repo by typing this command in the terminal:
 ```git clone https://github.com/GSG-G10/udrive-car-rental.git```
* Run `npm i` to install the packages for the app as general.
* Run `cd client` and `npm i` to install the packages for the client- React Js.
### Database Setup 📋
* Make sure you have installed PostgreSQL and pgcli
```
CREATE DATABASE {database name};
CREATE USER {user name} WITH superuser password {password}
ALTER DATABASE {database name} OWNER TO {user name};
```
* Test DB:
 Do the same as before but make sure to change the names.
* Run the following command in the database pgcli terminal
`\i server/database/config/build.sql` .


### Start the App :-
To start the App Locally you can start the server First then start client-side or vice versa!

To run Server, In your terminal Type:

* `npm run dev` then you should be able to go to [localhost](http://localhost:5000/) 
 To run client-side, In your terminal Type:
* `cd client` => `npm start` then you will be able to run [localhost](http://localhost:3000/) 
Now you can view the app live in the Browser!



## Team Members :busts_in_silhouette::-
1.  Asmaa Alnajjar
2.  Ahmad Abo Abadi
3.  Rawand Jaradh
4.  Abdallah Abu Amra
5.  Raghad Mezied 

## Resources :-
* [Node Js](https://nodejs.org/en/)
* [React Js](https://docs.retool.com/docs?_keyword=react%20js&adgroupid=128852669435&utm_source=google&utm_medium=search&utm_campaign=14877543325&utm_term=react%20js&utm_content=550425168395&hsa_acc=7420316652&hsa_cam=14877543325&hsa_grp=128852669435&hsa_ad=550425168395&hsa_src=g&hsa_tgt=aud-917062731253:kwd-354476686967&hsa_kw=react%20js&hsa_mt=e&hsa_net=adwords&hsa_ver=3&gclid=CjwKCAjwn8SLBhAyEiwAHNTJbXUVHzWY75yJO7v8Of_mWoeT4CATwwRs_j32u9XDKNmCDVmCKsJ-whoCerAQAvD_BwE)
* [Express](https://expressjs.com/)
* [Sequelize](https://sequelize.org/)
* [Material Ui](https://mui.com/)
*  [Type Script](https://www.typescriptlang.org/)