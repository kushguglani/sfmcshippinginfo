const express = require('express')
const app = express()
const port =  process.env.PORT || 3000;
var xml = require('xml');

const payment_method = `<payment_method>
<item name="paypal" detail="" amount="12.00" suffix="" email="Lxxxx@xxxx"/>
<item name="giftcard" detail="" amount="31.00" suffix="*******1234" email="" />
<item name="credit card" detail="VISA" amount="31.00" suffix="*******1234" email=""/>
<item name="credit card" detail="MasterCard" amount="31.00" suffix="*******1234" email=""/>
</payment_method>`;

app.get('/', (req, res) => {
    res.type('application/xml');
    // res.set('Content-Type', 'text/xml');
    // res.send(<shipping_info>
    //     <item address1="Corso Buenos Aires" address2="" city="London" country="GB" first_name="Pluto" last_name="Qui" middle_name="" organization_name="" postal_code="WC2H 0JN" ship_mode_description="Standard delivery" state=""/>
    //     <item address1="Corso Buenos Aires" address2="" city="London" country="GB" first_name="Pluto" last_name="Qui" middle_name="" organization_name="" postal_code="WC2H 0JN" ship_mode_description="Standard delivery" state=""/>
    // </shipping_info>);
    // res.send('Hello World!')
    res.send(`<shipping_info>
    <item address1="Corso Buenos Aires" address2="" city="London" country="GB" first_name="Pluto" last_name="Qui" middle_name="" organization_name="" postal_code="WC2H 0JN" ship_mode_description="Standard delivery" state=""/>
    <item address1="Corso1" address2="" city="xyz" country="IN" first_name="John" last_name="martin" middle_name="" organization_name="" postal_code="WC2H 0JN2" ship_mode_description="Standard delivery" state=""/>
</shipping_info>`)
})

app.get('/payment_method',(req,res)=>{
    res.type('application/xml');
    res.send(payment_method)

})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))