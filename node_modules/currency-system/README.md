# Templates
This will go through all functions with example's
See https://github.com/BIntelligent/currency-system/tree/main/ExampleBot for a example bot
## Add-Money
### Example
```js
const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;
    let user;
    if (message.mentions.users.first()) {
        user = message.mentions.users.first();
    } else if (args[0]) {
        user = message.guild.members.cache.get(args[0]).user;
    } else if (!args[0]) {
        return message.channel.send("Specify a user!");
    }
    // This is where  we check if the person who is running command is admin or no.
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("You do not have requied permissions.");
    // This is where money that admin add's will go default is wallet. 
    let wheretoPutMoney = args[2] || "wallet"; //or bank
    //This is where we specify amount to add.
    let amount = args[1];
    //IF no amount return.
    if (!amount) return message.channel.send("Enter amount of money to add.");
    // when you will use it from discord , it will a string but parseInt() will convert that string into a <Number>
    let money = parseInt(amount);
    // Adding the money to user.
    let result = await cs.addMoney(settings = {
        user: user,
        guild: message.guild,
        amount: money,
        wheretoPutMoney: wheretoPutMoney
    });
    //IF the package send's a response.
    if (result) return message.channel.send(`Successfully added $${money} to ${user.username}, ( in ${wheretoPutMoney} )`);
    // IF there was a error.
    else return message.channel.send("There was a unexpeted error.");
```
## Balance
### Example
```js
    const CurrencySystem = require("currency-system");
    const cs = new CurrencySystem;
    let user;
    if (message.mentions.users.first()) {
        user = message.mentions.users.first();
    } else if (args[0]) {
        user = message.guild.members.cache.get(args[0]).user;
    } else if (!args[0]) {
        user = message.author;
    }

    let result = await cs.balance(settings = {
        user: user,
        guild: message.guild
    });
    message.channel.send(`${user.tag}, \n have $${result.wallet} in you wallet and $${result.bank} in there bank.`);

```
## Deposite
### Example
```js
    const CurrencySystem = require("currency-system");
    const cs = new CurrencySystem;
    let money = args.join(" ");
    if (!money) return message.channel.send("Enter the amount you want to deposite.");

    let result = await cs.deposite(settings = {
        user: message.author,
        guild: message.guild,
        amount: money
    });
    message.channel.send(result);
```
## Gamble
### Example
```js
    const CurrencySystem = require("currency-system");
    const cs = new CurrencySystem;
    let money = args.join(" ");
    if (isNaN(money)) return message.channel.send("Amount is not a number.");

    let result = await cs.gamble(settings = {
        user: message.author,
        guild: message.guild,
        amount: money,
        minAmount: 1,
        cooldown: 25 //25 seconds
    });
    message.channel.send(result);
```
## Rob
### Example
```js
    const CurrencySystem = require("currency-system");
    const cs = new CurrencySystem;
 let user;
    if (message.mentions.users.first()) {
        user = message.mentions.users.first();
    } else if (args[0]) {
        user = message.guild.members.cache.get(args[0]).user;
    }

    if (user.bot || user === client.user) return message.channel.send("This user is a bot.");
    if (!user) return message.channel.send('Sorry, you forgot to mention somebody.');
    
    let result = await cs.rob(settings = {
        user: message.author,
        user2: user,
        guild: message.guild,
        minAmount: 100,
        successPercentage: 5,
        cooldown: 25 //25 seconds
    });

    message.channel.send(result);
```
## Transfer Money
### Example
```js
    const CurrencySystem = require("currency-system");
    const cs = new CurrencySystem;
    let user;
    if (message.mentions.users.first()) {
        user = message.mentions.users.first();
    } else if (args[0]) {
        user = message.guild.members.cache.get(args[0]).user;
    } else {
        user.id = "1"
    }

    if (user.bot || user === client.user) return message.channel.send("This user is a bot.");
    if (!client.users.cache.get(user.id) || !user) return message.channel.send('Sorry, you forgot to mention somebody.');

    let amount = args[1];
    if (!amount) return message.channel.send("Enter amount of money to add.");
    if (amount.includes("-")) return message.channel.send("You can't send negitive money.")
    let money = parseInt(amount);

    let result = await cs.transferMoney(settings = {
        user: message.author,
        user2: user,
        guild: message.guild,
        amount: money
    });
    message.channel.send(result);
```
## Withdraw
### Example
```js
    const CurrencySystem = require("currency-system");
    const cs = new CurrencySystem;
   let money = args.join(" ");
    if (!money) return message.channel.send("Enter the amount you want to withdraw.");

    let result = await cs.withdraw(settings = {
        user: message.author,
        guild: message.guild,
        amount: money
    });
    message.channel.send(result);
```
## Work
### Example
```js
    const CurrencySystem = require("currency-system");
    const cs = new CurrencySystem;
    let result = await cs.work(settings = {
        user: message.author,
        guild: message.guild,
        maxAmount: 100,//The max amount of moneyy you get when you work.
        replies: ['Programmer', 'Builder', 'Waiter', 'Busboy', 'Chief', 'Mechanic'],
        cooldown: 25 //25 seconds,

    });

    message.channel.send(result);
```
# Todo list
1. Add ability to cuztomize the replies. (in v2 ofc.)
2. Add inventory system 
# Coming Soon
1. Documention :)
2. Version 2
# Change Logs
## Version: v1.0.3
1. Added Readme File (I mean that's alot in itself. **lol**)
2. Removed documentation files. 