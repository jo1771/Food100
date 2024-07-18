const productList = [
    {
        name: 'plainBurger',
        price: 10000,
        kkal: 500,
        amount: 0,
        get Summa(){
            return this.price * this.amount;
        },
        get Kkal(){
            return this.kkal * this.amount;
        }
    },
    {
        name: 'freshBurger',
        price: 20500,
        kkal: 700,
        amount: 0,
        get Summa(){
            return this.price * this.amount;
        },
        get Kkal(){
            return this.kkal * this.amount;
        }
    },
    {
        name: 'freshCombo',
        price: 31900,
        kkal: 1200,
        amount: 0,
        get Summa(){
            return this.price * this.amount;
        },
        get Kkal(){
            return this.kkal * this.amount;
        }
    }
]

const extraProduct = {
    doubleMayonnaise: {
        price: 2000,
        name: 'Двойной майонез',
        kkal: 300
    },
    lettuce: {
        price: 1000,
        name: 'Салатный лист',
        kkal: 30
    },
    cheese: {
        price: 3000,
        name: 'Сыр',
        kkal: 350
    }
}

const   btnPlusMinus    = document.querySelectorAll('.main__product-btn'),
        checkExtra      = document.querySelectorAll('.main__product-checkbox'),
        productCheck    = document.querySelectorAll(".main__product-label"),
        orderBtn        = document.querySelector(".addCart"),
        receipt         = document.querySelector('.receipt'),
        outTotalPrice   = document.querySelector('.receipt__window-out-tota-item')

        let totalPrice = 0

    btnPlusMinus.forEach((el)=>{
        el.addEventListener('click', ()=>{
            const parent = el.closest(".main__product"),
                id = parent.getAttribute('id'),
                cardNum = parent.querySelector(".main__product-num"),
                cardPrice = parent.querySelector(".main__product-price span"),
                attribute = el.getAttribute('data-symbol'),
                productCall = parent.querySelector(".main__product-call span")

            if (attribute === "+") {
                cardNum.innerHTML++ 
                
                productList.forEach(item => {
                    if (item.name === id) {
                        item.amount = cardNum.innerHTML
                        cardPrice.innerHTML = item.Summa.toLocaleString()
                        productCall.innerHTML = item.Kkal.toLocaleString()
                    }
                }); 
            }else if(attribute === "-"){
                if (cardNum.innerHTML > 0) {
                    cardNum.innerHTML--

                productList.forEach(item=>{
                    if (item.name === id) {
                        item.amount = cardNum.innerHTML
                        cardPrice.innerHTML = item.Summa.toLocaleString()
                        productCall.innerHTML = item.Kkal.toLocaleString()
                    }
                })
                }
            }
        })
    })
    

    const checkboxes = document.querySelectorAll('.main__product-checkbox')

    checkboxes.forEach(function (checkbox) {
        const data   = checkbox.getAttribute('data-extra'),
            parent   = checkbox.closest(".main__product"),
            parentId = parent.getAttribute('id'),
            price    = parent.querySelector('.main__product-price span'),
            outKkal  = parent.querySelector('.main__product-call span')
        checkbox.addEventListener('change', function () {
                Object.entries(extraProduct).forEach(([key, value])=>{
                    productList.forEach((el)=>{
                        if (this.checked) {
                            if (el.name === parentId) {
                                if (key === data) {
                                    el.price += value.price
                                    price.innerHTML = el.Summa.toLocaleString()
                                    el.kkal += value.kkal
                                    outKkal.innerHTML = el.Kkal.toLocaleString()
                                }
                            }
                        }else{
                            if (el.name === parentId) {
                                if (key === data) {
                                    el.price -= value.price
                                    price.innerHTML = el.Summa.toLocaleString()
                                    el.kkal -= value.kkal
                                    outKkal.innerHTML = el.Kkal.toLocaleString()
                                }
                            }
                        }
                    })
                    
                })        
        })
    })


orderBtn.addEventListener('click', ()=>{
    receipt.classList.add('active')
    const chek = receipt.querySelector('.receipt__window-out')
    productList.forEach(item=>{
        totalPrice += item.Summa
        outTotalPrice.innerHTML = totalPrice.toLocaleString() + ' сум'
    })
    productList.forEach((product)=>{
        if (product.amount !== 0) {
            chek.innerHTML += `
                <div class="receipt__window-out-card">
                    <h3 class="receipt__window-out-card-title">${product.name}</h3>
                    <div class="receipt__window-out-card-item">
                        <p class="receipt__window-out-card-item-amount">${product.amount}шт</p>
                        <p class="receipt__window-out-card-item-price">${product.Summa.toLocaleString()} сум</p>
                    </div>
                </div>`
        }
    })
})
