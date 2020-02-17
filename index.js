const express = require('express')
const app = express()
const port =  process.env.PORT || 3000;
var xml = require('xml');

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

app.listen(port, () => console.log(`Example app listening on port ${port}!`))