import { menuArray } from '/data.js'

const menu = document.getElementById('menu')
const paymentTab = document.getElementById('payment-tab')
const cardHolder = document.getElementById('name')
const orderDetails = document.getElementById('order-details')

let order_items = []

const renderMenuItems = function (menuItems) {
    return menuItems.map((foodItem) => {
        return `
        <div class="container">
            <div class="menu-item">
                <div class="food-img">${foodItem.emoji}</div>
                <div class="food-desc">
                    <h3 class="food-name">${foodItem.name}</h3>
                    <p class="food-ingredients">${foodItem.ingredients.join(', ')}</p>
                    <p class="food-price">$${foodItem.price}</p>
                </div>
                <button class="add-to-cart-btn" data-id=${foodItem.id}>+</button>
            </div>
            <div class="hline"></div>
        </div>
        `
    }).join('')
}
menu.innerHTML = renderMenuItems(menuArray)

const renderOrder = function (){
    '<h2 class="order-title">Your order</h2>'
    return order_items.map(orderItem => {
        return `
        <div class="ordered-items">
            <div class="ordered-items-inner">
                <h3 class="food-name">${orderItem.name}</h3>
                <button class="remove-btn" data-remove=${orderItem.id}>remove</button>
            </div>
            <p class="food-price">$${orderItem.price}</p>
        </div>        
        `
    }).join('')
}

const renderTotal = function () {
    const total = order_items.reduce((sum, item) =>
        sum + item.price, 0
    )
    return `
        <div class="total">
            <div class="hline darken-line"></div>
            <div class="amount-details">
                <p class="total-price-tag">Total price:</p>
                <p class="food-price">$${total}</p>
            </div>
        </div>
        <button class="complete-order-btn" id="complete-order-btn">Complete order</button>
    `
}
const renderPurchased = () =>
    orderDetails.innerHTML = '<h2 class="order-title">Your order</h2>' + renderOrder() + renderTotal()

const addOrder = function (id) {
    const targetItem = menuArray.filter(function (item) {
        return item.id === Number(id)
    })[0]
    order_items.push(targetItem)
    renderPurchased()
    const completeOrderBtn = document.getElementById('complete-order-btn')
    completeOrderBtn.addEventListener('click', function () {
        const cancelBtn = document.getElementById('cancel-btn')
        paymentTab.style.display = 'block'
        if (paymentTab.style.display == 'block') {
            cancelBtn.addEventListener('click', function () {
                paymentTab.style.display = 'none'
            })
        }
    })
}

const removeOrder = (id) => {
    order_items = order_items.filter(item => 
        item.id !== Number(id)
    )
    if (order_items.length > 0){
        renderPurchased()
    }
    else {
        orderDetails.innerHTML = ''
    }
}

document.addEventListener('click', function (e) {
    if (e.target.dataset.id){
        addOrder(e.target.dataset.id)
    }
    else if (e.target.dataset.remove){
        removeOrder(e.target.dataset.remove)
    }
})

document.getElementById('payment-form').addEventListener('submit', function(e){
    e.preventDefault()
    const orderDetails = document.getElementById('order-details')
    paymentTab.style.display = 'none'
    orderDetails.innerHTML = `
        <div class="appreciation-msg">
            <p>Thanks, ${cardHolder.value}! Your order is on its way!</p>
        </div>`
    order_items = []
})
