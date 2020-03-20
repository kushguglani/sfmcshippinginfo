const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
var xml = require('xml');

const payment_method = `<payment_method>
<item name="paypal" detail="" amount="12.00" suffix="" email="Lxxxx@xxxx"/>
<item name="giftcard" detail="" amount="31.00" suffix="*******1234" email="" />
<item name="credit card" detail="VISA" amount="31.00" suffix="*******1234" email=""/>
<item name="credit card" detail="MasterCard" amount="31.00" suffix="*******1234" email=""/>
</payment_method>`;


const order_items = `<order_items>
<item style="VN1234567" sku="VN:1234567:a:q:1:" color="Dark Sapphire blue" image_url="http://images.timberland.com/is/image/TimberlandEU/A1RF1433-hero?$$" item_type="standard" name="Skye Peak - Men's Thermofibre™ Jacket" product_URL="https://dev.timberland.co.uk/webapp/wcs/stores/servlet/ProductDisplay?storeId=7105&amp;#38;urlLangId=-11&amp;#38;productId=171266&amp;#38;catalogId=11701&amp;#38;langId=-11" product_total="62.00" quantity="1" size="XL" unit_price="62.00" unit_price_unadjusted="62.00"/>
<item style="ODUNOQ1" color="Jester Red" image_url="http://images.timberland.com/is/image/TimberlandEU/0YH1TTR7-hero?$$" item_type="custom" name="Men’s Eastham Polo light pink" product_URL="https://dev.timberland.co.uk/webapp/wcs/stores/servlet/ProductDisplay?storeId=7105&amp;#38;urlLangId=-11&amp;#38;productId=217490&amp;#38;catalogId=11701&amp;#38;langId=-11" product_total="65.00" quantity="1" size="XL" unit_price="65.00" unit_price_unadjusted="65.00"/>
<item style="ODUNOQ123" color="Jester yellow" image_url="http://images.timberland.com/is/image/TimberlandEU/0YH1TTR7-hero?$$" item_type="standard" name="Men’s Eastham Polo Shirt green" product_URL="https://dev.timberland.co.uk/webapp/wcs/stores/servlet/ProductDisplay?storeId=7105&amp;#38;urlLangId=-11&amp;#38;productId=217490&amp;#38;catalogId=11701&amp;#38;langId=-11" product_total="653.00" quantity="2" size="L" unit_price="653.00" unit_price_unadjusted="653.00"/>
<item style="ODUNOQ12345" color="Jester green" image_url="http://images.timberland.com/is/image/TimberlandEU/0YH1TTR7-hero?$$" item_type="custom" name="Men’s Eastham Polo orange" product_URL="https://dev.timberland.co.uk/webapp/wcs/stores/servlet/ProductDisplay?storeId=7105&amp;#38;urlLangId=-11&amp;#38;productId=217490&amp;#38;catalogId=11701&amp;#38;langId=-11" product_total="651.00" quantity="2" size="M" unit_price="651.00" unit_price_unadjusted="652.00"/>
</order_items>`;

const order_items2 = `<order_items>
<item style="VN1234567" sku="VN:1234567:a:q:1:" color="Dark Sapphire blue" image_url="http://images.timberland.com/is/image/TimberlandEU/A1RF1433-hero?$$" item_type="standard" name="Skye Peak - Men's Thermofibre™ Jacket" product_URL="https://dev.timberland.co.uk/webapp/wcs/stores/servlet/ProductDisplay?storeId=7105&amp;#38;urlLangId=-11&amp;#38;productId=171266&amp;#38;catalogId=11701&amp;#38;langId=-11" product_total="62.00" quantity="1" size="XL" unit_price="62.00" unit_price_unadjusted="62.00"/>
<item style="ODUNOQ1" color="Jester Red" image_url="http://images.timberland.com/is/image/TimberlandEU/0YH1TTR7-hero?$$" item_type="standard" name="Men’s Eastham Polo light pink" product_URL="https://dev.timberland.co.uk/webapp/wcs/stores/servlet/ProductDisplay?storeId=7105&amp;#38;urlLangId=-11&amp;#38;productId=217490&amp;#38;catalogId=11701&amp;#38;langId=-11" product_total="65.00" quantity="1" size="XL" unit_price="65.00" unit_price_unadjusted="65.00"/>
<item style="ODUNOQ123" color="Jester yellow" image_url="http://images.timberland.com/is/image/TimberlandEU/0YH1TTR7-hero?$$" item_type="standard" name="Men’s Eastham Polo Shirt green" product_URL="https://dev.timberland.co.uk/webapp/wcs/stores/servlet/ProductDisplay?storeId=7105&amp;#38;urlLangId=-11&amp;#38;productId=217490&amp;#38;catalogId=11701&amp;#38;langId=-11" product_total="653.00" quantity="2" size="L" unit_price="653.00" unit_price_unadjusted="653.00"/>
<item style="ODUNOQ12345" color="Jester green" image_url="http://images.timberland.com/is/image/TimberlandEU/0YH1TTR7-hero?$$" item_type="standard" name="Men’s Eastham Polo orange" product_URL="https://dev.timberland.co.uk/webapp/wcs/stores/servlet/ProductDisplay?storeId=7105&amp;#38;urlLangId=-11&amp;#38;productId=217490&amp;#38;catalogId=11701&amp;#38;langId=-11" product_total="651.00" quantity="2" size="M" unit_price="651.00" unit_price_unadjusted="652.00"/>
</order_items>`;

// const refund_billing = `<refund_billing>
// <item amount="16.00000" expiration="" gift_card_number="1110040000364856" imageUrl="https://images.timberland.com/is/image/TimberlandEU/EGIFTCARD-HERO1?wid=720"  last_four="" type="Gift Card"/>
// </refund_billing>`;

const refund_billing = `<refund_billing><item amount="50.00" expiration="2023-03-12" gift_card_number="1110040000963659" last_four="" type="Gift Card"/>
<item amount="50.00" expiration="2023-03-12" gift_card_number="1110040000963659" last_four="" type="Gift Card"/></refund_billing>`;

const refund_billing2 = `<refund_billing></refund_billing>`;


const shipped_order_items = `
<shipped_order_items>
<item item_type="standard" style="VN1234567" sku="VN:1234567:a:q:1:" name="jacket" color="blue " size="XS " product_URL="http://images.timberland.com/is/image/TimberlandEU/0YH1TTR7-hero?$$" image_url="http://images.timberland.com/is/image/TimberlandEU/0YH1TTR7-hero?$$" carrier_code="" date_shipped="" tracking_URL="https://dev.timberland.co.uk/webapp/wcs/stores/servlet/ProductDisplay?storeId=7105&amp;#38;urlLangId=-11&amp;#38;productId=217490&amp;#38;catalogId=11701&amp;#38;langId=-11" tracking_num="09864" shipping_duration="" shipping_method="" sender_name="SHI.0000000043" sender_email="SHI.0000000044" recipient_name="SHI.0000000045" recipient_email="SHI.0000000046" gift_message="SHI.0000000047" quantity_shipped="1" unit_price="123" unit_price_unadjusted="" product_total="234.12"/>
<item item_type="standard" style="VN1234567" sku="VN:1234567:a:q:1:" name="jacket" color="blue1 " size="S "  product_URL="http://images.timberland.com/is/image/TimberlandEU/0YH1TTR7-hero?$$" image_url="http://images.timberland.com/is/image/TimberlandEU/0YH1TTR7-hero?$$" carrier_code="" date_shipped="" tracking_URL="" tracking_num="09864" shipping_duration="" shipping_method="" sender_name="SHI.0000000043" sender_email="SHI.0000000044" recipient_name="SHI.0000000045" recipient_email="SHI.0000000046" gift_message="SHI.0000000047" quantity_shipped="1" unit_price="123" unit_price_unadjusted="234.12" product_total="123"/>
</shipped_order_items>`;



const shipping_info= `<shipping_info>
<item item_type="standard" address1="Corso Buenos Aires" address2="" city="London" country="GB" first_name="Pluto" last_name="Qui" middle_name="" organization_name="" postal_code="WC2H 0JN" ship_mode_description="Standard delivery" state=""/>
<item item_type="custom" address1="Corso Buenos Aires1" address2="" city="London" country="GB" first_name="Pluto1" last_name="Qui2" middle_name="" organization_name="" postal_code="WC2H 0JN1" ship_mode_description="Standard delivery" state=""/>
</shipping_info>`;

const canceled_order_items = `<canceled_order_items>
<item item_type="standard"  sku="VN:1234567:a:q:1:" name="jacket " product_URL="https://dev.timberland.co.uk/webapp/wcs/stores/servlet/ProductDisplay?storeId=7105&amp;#38;urlLangId=-11&amp;#38;productId=171266&amp;#38;catalogId=11701&amp;#38;langId=-11" image_url="http://images.timberland.com/is/image/TimberlandEU/A1RF1433-hero?$$" color="blue " size="XS " sender_name="CAN.0000000071" sender_email="CAN.0000000072" recipient_name="CAN.0000000073" recipient_email="CAN.0000000074" gift_message="hello git mesage" quantity_canceled="1" unit_price="54" unit_price_unadjusted="54" product_total="54" reason_code="123456789" />
</canceled_order_items>`;


const pending_order_items =`<pending_order_items>
<item style="VN1234567" sku="VN:1234567:a:q:1:" name="PEN.0000000081" product_URL="PEN.0000000082" image_url="PEN.0000000083" color="PEN.0000000084" size="PEN.0000000085" sender_name="PEN.0000000086" sender_email="PEN.0000000087" recipient_name="PEN.0000000088" recipient_email="PEN.0000000089" gift_message="PEN.0000000090" quantity_pending="PEN.0000000091" unit_price="PEN.0000000092" unit_price_unadjusted="PEN.0000000093" product_total="PEN.0000000094" />
</pending_order_items>`;

app.get('/', (req, res) => {
    res.type('application/xml');
    res.send(`<shipping_info>
    <item address1="Corso Buenos Aires" address2="Aires2" city="London" country="GB" first_name="Pluto" last_name="Qui" middle_name="John" organization_name="VF International S.a.g.l." postal_code="WC2H 0JN" ship_mode_description="Standard delivery" state="New York"/>
   </shipping_info>`)
})

app.get('/payment_method', (req, res) => {
    res.type('application/xml');
    res.send(payment_method)

})
app.get('/canceled_order_items', (req, res) => {
    res.type('application/xml');
    res.send(canceled_order_items)

})
app.get('/pending_order_items', (req, res) => {
    res.type('application/xml');
    res.send(pending_order_items)

})
app.get('/refund_billing', (req, res) => {
    res.type('application/xml');
    res.send(refund_billing)

})
app.get('/refund_billing2', (req, res) => {
    res.type('application/xml');
    res.send(refund_billing2)

})
app.get('/shipping_info', (req, res) => {
    res.type('application/xml');
    res.send(shipping_info)

})
app.get('/shipped_order_items', (req, res) => {
    res.type('application/xml');
    res.send(shipped_order_items)

})
app.get('/order_items', (req, res) => {
    res.type('application/xml');
    res.send(order_items)

})
app.get('/order_items2', (req, res) => {
    res.type('application/xml');
    res.send(order_items2)

})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));


/*

"payment_method_xml": "https://sfmcshippinginfo.herokuapp.com/payment_method",
"shipping_info_xml": "https://sfmcshippinginfo.herokuapp.com/",
"order_items_xml": " https://sfmcshippinginfo.herokuapp.com/order_items",



                             "canceled_order_items_xml": " https://sfmcshippinginfo.herokuapp.com/canceled_order_items",
                             "shipped_order_items_xml": "https://sfmcshippinginfo.herokuapp.com/shipped_order_items",
                             "pending_order_items_xml": "https://sfmcshippinginfo.herokuapp.com/pending_order_items"


Shipping Info -> https://sfmcshippinginfo.herokuapp.com/   or  https://sfmcshippinginfo.herokuapp.com/

Order items -> https://sfmcshippinginfo.herokuapp.com/order_items
Shipped order items -> https://sfmcshippinginfo.herokuapp.com/shipped_order_items
Refund billing -> https://sfmcshippinginfo.herokuapp.com/refund_billing
Pending order items -> https://sfmcshippinginfo.herokuapp.com/pending_order_items
Canceled order items -> https://sfmcshippinginfo.herokuapp.com/canceled_order_items
Payment method -> https://sfmcshippinginfo.herokuapp.com/payment_method


*/