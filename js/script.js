let userBasket = []
let allData = []
let allPay = document.getElementById("checkout")
let loginstatus = true


const newProductLoad = () => {
	fetch('https://fakestoreapi.com/products')
		.then(res => res.json())
		.then(json => {
			let data = json
			allData = json

			let product = document.querySelector(".product")

			data.forEach(Element => {
				product.insertAdjacentHTML('beforebegin', `
				<div class="product" id="${Element.id}"> ${Element.id}
				<div class="info-large">
						<h4>PRINTED DRESS</h4>
						<div class="sku">
							PRODUCT SKU: <strong>89356</strong>
						</div>
						 
						<div class="price-big">
							<span>$43</span> $39
						</div>
						 
						<h3>COLORS</h3>
						<div class="colors-large">
							<ul>
								<li><a href="" style="background:#222"><span></span></a></li>
								<li><a href="" style="background:#6e8cd5"><span></span></a></li>
								<li><a href="" style="background:#9b887b"><span></span></a></li>
								<li><a href="" style="background:#44c28d"><span></span></a></li>
							</ul> 
						</div>
			
						<h3>SIZE</h3>
						<div class="sizes-large">
							 <span>XS</span>
							<span>S</span>
							<span>M</span>
							<span>L</span>
							<span>XL</span>
							<span>XXL</span>
						</div>
					                 
						<button class="add-cart-large">Add To Cart</button>                          
									 
					</div>
					<div class="make3D">
						<div class="product-front" id="${Element.id}">
							<div class="shadow"></div>
							<img src="${Element.image}" alt="" />
							<div class="image_overlay"></div>
							<div onclick="addProductBasketArray(${Element.id})" class="add_to_cart">Add to cart</div>
							<div class="view_gallery">View gallery</div>
							<div class="stats">        	
								<div class="stats-container">
									<span class="product_price">$${Element.price}</span>
									<span class="product_name">${Element.title}</span>    
									<p>${Element.category}</p>                                            
									
									<div class="product-options">
									<strong>SIZES</strong>
									<span>XS, S, M, L, XL, XXL</span>
									<strong>COLORS</strong>
									<div class="colors">
										<div class="c-blue"><span></span></div>
										<div class="c-red"><span></span></div>
										<div class="c-white"><span></span></div>
										<div class="c-green"><span></span></div>
									</div>
								</div>                       
								</div>                         
							</div>
						</div>
						
						<div class="product-back">
							<div class="shadow"></div>
							<div class="carousel">
								<ul class="carousel-container">
								<li><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/8.jpg" alt="" /></li>
								<li><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/7.jpg" alt="" /></li>
								</ul>
								<div class="arrows-perspective">
								<div class="carouselPrev">
										<div class="y"></div>
										<div class="x"></div>
										</div>
									<div class="carouselNext">
									<div class="y"></div>
									<div class="x"></div>
									</div>
									</div>
									</div>
									<div class="flip-back">
								<div class="cy"></div>
								<div class="cx"></div>
								</div>
						</div>	  
						</div>	
						</div>  
				 `)
			});

			$(document).ready(function () {

				$(".largeGrid").click(function () {
					$(this).find('a').addClass('active');
					$('.smallGrid a').removeClass('active');

					$('.product').addClass('large').each(function () {});
					setTimeout(function () {
						$('.info-large').show();
					}, 200);
					setTimeout(function () {

						$('.view_gallery').trigger("click");
					}, 400);

					return false;
				});

				$(".smallGrid").click(function () {
					$(this).find('a').addClass('active');
					$('.largeGrid a').removeClass('active');

					$('div.product').removeClass('large');
					$(".make3D").removeClass('animate');
					$('.info-large').fadeOut("fast");
					setTimeout(function () {
						$('div.flip-back').trigger("click");
					}, 400);
					return false;
				});

				$(".smallGrid").click(function () {
					$('.product').removeClass('large');
					return false;
				});

				$('.colors-large a').click(function () {
					return false;
				});


				$('.product').each(function (i, el) {

					// Lift card and show stats on Mouseover
					$(el).find('.make3D').hover(function () {
						$(this).parent().css('z-index', "20");
						$(this).addClass('animate');
						$(this).find('div.carouselNext, div.carouselPrev').addClass('visible');
					}, function () {
						$(this).removeClass('animate');
						$(this).parent().css('z-index', "1");
						$(this).find('div.carouselNext, div.carouselPrev').removeClass('visible');
					});

					// Flip card to the back side
					$(el).find('.view_gallery').click(function () {

						$(el).find('div.carouselNext, div.carouselPrev').removeClass('visible');
						$(el).find('.make3D').addClass('flip-10');
						setTimeout(function () {
							$(el).find('.make3D').removeClass('flip-10').addClass('flip90').find('div.shadow').show().fadeTo(80, 1, function () {
								$(el).find('.product-front, .product-front div.shadow').hide();
							});
						}, 50);

						setTimeout(function () {
							$(el).find('.make3D').removeClass('flip90').addClass('flip190');
							$(el).find('.product-back').show().find('div.shadow').show().fadeTo(90, 0);
							setTimeout(function () {
								$(el).find('.make3D').removeClass('flip190').addClass('flip180').find('div.shadow').hide();
								setTimeout(function () {
									$(el).find('.make3D').css('transition', '100ms ease-out');
									$(el).find('.cx, .cy').addClass('s1');
									setTimeout(function () {
										$(el).find('.cx, .cy').addClass('s2');
									}, 100);
									setTimeout(function () {
										$(el).find('.cx, .cy').addClass('s3');
									}, 200);
									$(el).find('div.carouselNext, div.carouselPrev').addClass('visible');
								}, 100);
							}, 100);
						}, 150);
					});

					// Flip card back to the front side
					$(el).find('.flip-back').click(function () {

						$(el).find('.make3D').removeClass('flip180').addClass('flip190');
						setTimeout(function () {
							$(el).find('.make3D').removeClass('flip190').addClass('flip90');

							$(el).find('.product-back div.shadow').css('opacity', 0).fadeTo(100, 1, function () {
								$(el).find('.product-back, .product-back div.shadow').hide();
								$(el).find('.product-front, .product-front div.shadow').show();
							});
						}, 50);

						setTimeout(function () {
							$(el).find('.make3D').removeClass('flip90').addClass('flip-10');
							$(el).find('.product-front div.shadow').show().fadeTo(100, 0);
							setTimeout(function () {
								$(el).find('.product-front div.shadow').hide();
								$(el).find('.make3D').removeClass('flip-10').css('transition', '100ms ease-out');
								$(el).find('.cx, .cy').removeClass('s1 s2 s3');
							}, 100);
						}, 150);

					});

					makeCarousel(el);
				});

				$('.add-cart-large').each(function (i, el) {
					$(el).click(function () {
						var carousel = $(this).parent().parent().find(".carousel-container");
						var img = carousel.find('img').eq(carousel.attr("rel"))[0];
						var position = $(img).offset();

						var productName = $(this).parent().find('h4').get(0).innerHTML;

						$("body").append('<div class="floating-cart"></div>');
						var cart = $('div.floating-cart');
						$("<img src='" + img.src + "' class='floating-image-large' />").appendTo(cart);

						$(cart).css({
							'top': position.top + 'px',
							"left": position.left + 'px'
						}).fadeIn("slow").addClass('moveToCart');
						setTimeout(function () {
							$("body").addClass("MakeFloatingCart");
						}, 800);

						setTimeout(function () {
							$('div.floating-cart').remove();
							$("body").removeClass("MakeFloatingCart");


							var cartItem = "<div class='cart-item'><div class='img-wrap'><img src='" + img.src + "' alt='' /></div><span>" + productName + "</span><strong>$39</strong><div class='cart-item-border'></div><div class='delete-item'></div></div>";
							$("#cart .empty").hide();
							$("#cart").append(cartItem);
							$("#checkout").fadeIn(500);

							$("#cart .cart-item").last()
								.addClass("flash")
								.find(".delete-item").click(function () {
									$(this).parent().fadeOut(300, function () {
										$(this).remove();
										if ($("#cart .cart-item").size() == 0) {
											$("#cart .empty").fadeIn(500);
											$("#checkout").fadeOut(500);
										}
									})
								});
							setTimeout(function () {
								$("#cart .cart-item").last().removeClass("flash");
							}, 10);

						}, 1000);


					});
				})

				/* ----  Image Gallery Carousel   ---- */
				function makeCarousel(el) {


					var carousel = $(el).find('.carousel ul');
					var carouselSlideWidth = 315;
					var carouselWidth = 0;
					var isAnimating = false;
					var currSlide = 0;
					$(carousel).attr('rel', currSlide);

					// building the width of the casousel
					$(carousel).find('li').each(function () {
						carouselWidth += carouselSlideWidth;
					});
					$(carousel).css('width', carouselWidth);

					// Load Next Image
					$(el).find('div.carouselNext').on('click', function () {
						var currentLeft = Math.abs(parseInt($(carousel).css("left")));
						var newLeft = currentLeft + carouselSlideWidth;
						if (newLeft == carouselWidth || isAnimating === true) {
							return;
						}
						$(carousel).css({
							'left': "-" + newLeft + "px",
							"transition": "300ms ease-out"
						});
						isAnimating = true;
						currSlide++;
						$(carousel).attr('rel', currSlide);
						setTimeout(function () {
							isAnimating = false;
						}, 300);
					});

					// Load Previous Image
					$(el).find('div.carouselPrev').on('click', function () {
						var currentLeft = Math.abs(parseInt($(carousel).css("left")));
						var newLeft = currentLeft - carouselSlideWidth;
						if (newLeft < 0 || isAnimating === true) {
							return;
						}
						$(carousel).css({
							'left': "-" + newLeft + "px",
							"transition": "300ms ease-out"
						});
						isAnimating = true;
						currSlide--;
						$(carousel).attr('rel', currSlide);
						setTimeout(function () {
							isAnimating = false;
						}, 300);
					});
				}

				$('.sizes a span, .categories a span').each(function (i, el) {
					$(el).append('<span class="x"></span><span class="y"></span>');

					$(el).parent().on('click', function () {
						if ($(this).hasClass('checked')) {
							$(el).find('.y').removeClass('animate');
							setTimeout(function () {
								$(el).find('.x').removeClass('animate');
							}, 50);
							$(this).removeClass('checked');
							return false;
						}

						$(el).find('.x').addClass('animate');
						setTimeout(function () {
							$(el).find('.y').addClass('animate');
						}, 100);
						$(this).addClass('checked');
						return false;
					});
				});

				$('.add_to_cart').click(function () {
					var productCard = $(this).parent();
					var position = productCard.offset();
					var productImage = $(productCard).find('img').get(0).src;
					var productName = $(productCard).find('.product_name').get(0).innerHTML
					var productPrice = $(productCard).find('.product_price').get(0).innerHTML
					var productId = $(productCard).find('id')
					// console.log(productId)

					$("body").append('<div class="floating-cart"></div>');
					var cart = $('div.floating-cart');
					productCard.clone().appendTo(cart);
					$(cart).css({
						'top': position.top + 'px',
						"left": position.left + 'px'
					}).fadeIn("slow").addClass('moveToCart');
					setTimeout(function () {
						$("body").addClass("MakeFloatingCart");
					}, 800);
					setTimeout(function () {
						$('div.floating-cart').remove();
						$("body").removeClass("MakeFloatingCart");


						// var cartItem = "<div class='cart-item'><div class='img-wrap'><img src='" + productImage + "' alt='' /></div><span>" + productName + "</span><strong>" + productPrice + "</strong><div class='cart-item-border'></div><div  onclick='deleteItem(" + productId + ")' class='delete-item'></div></div>";

						$("#cart .empty").hide();
						// $("#cart").append(cartItem);
						$("#checkout").fadeIn(500);
						$("#cart .cart-item").last()
							.addClass("flash")
							.find(".delete-item").click(function () {
								$(this).parent().fadeOut(300, function () {
									$(this).remove();
									if ($("#cart .cart-item").size() == 0) {
										$("#cart .empty").fadeIn(500);
										$("#checkout").fadeOut(500);
									}
								})
							});
						setTimeout(function () {
							$("#cart .cart-item").last().removeClass("flash");
						}, 10);

					}, 1000);
				});
			});
		})
	return
}

document.addEventListener('DOMContentLoaded', newProductLoad())

function addProductBasketArray(productId) {
	if (userBasket.some(e => e.id === productId)) {
		console.log("Item exists")
	} else {
		console.log("Item does not exist")
		userBasket.push(allData[productId - 1])
		console.log(userBasket)
		var payPrice = 0
		payPrice = userBasket.forEach(element => {
			payPrice += element.price
			allPay.innerHTML = payPrice
			console.log(payPrice)
		});
		addToCart()
	}
}

function deleteItem(productId) {
	userBasket = userBasket.filter(Element => {
		return Element.id !== productId
	})
	var payPrice = 0
	payPrice = userBasket.forEach(element => {
		payPrice -= element.price
		allPay.innerHTML = payPrice
		console.log(payPrice)
	});
	addToCart()
	console.log(userBasket)
}

function addToCart() {
	let cartItem = document.querySelector(".cart-item")
	let cart = document.getElementById("cart")
	let allCart = document.querySelectorAll(".cart-item")
	let emptyCard = document.createElement("div")
	emptyCard.classList.add("cart-item")
	setTimeout(() => {
		allCart.forEach(e => {
			e.remove()
		});
	}, );
	userBasket.forEach(Element => {
		cart.appendChild(emptyCard)
		cartItem.insertAdjacentHTML('beforebegin', `
		<div class="cart-item">
		<div class="img-wrap"><img src="${Element.image}" alt=""></div>
		<span>${Element.title}</span><strong>$${Element.price}</strong>
		<div class="cart-item-border"></div>
		<div onclick="deleteItem(${Element.id})" class="delete-item"></div>
		</div>
		`)

	})
}

function pay (){
if (loginstatus === false) {
		alert("You are not login")
} else {
	allPay.removeAttribute("disabled")
	console.log("on")
}
}

function login(){
var myHeaders = new Headers();
myHeaders.append("Content-Type", "Access-Control-Allow-Origin");

var raw = JSON.stringify({
  "userName": "John Wick",
  "password": "Jardani",
  "verified": true,
  "blocked": false,
  "delay": 20
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://myfakeapi.com/api/login", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}
