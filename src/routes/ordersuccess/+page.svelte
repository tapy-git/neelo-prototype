<script>
	import { onMount } from 'svelte';

	const cartItems = loadCartFromLocalStorage();
	const shipping = 5.0;
	const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
	const total = subtotal + shipping;

	function loadCartFromLocalStorage() {
		const savedCart = localStorage.getItem('cartItems');
		return savedCart ? JSON.parse(savedCart) : [];
	}
	let isMobile = false;

	onMount(() => {
		isMobile = window.innerWidth <= 768;

		// Eventlistener, um die Größe des Fensters zu überwachen
		const resizeHandler = () => {
			isMobile = window.innerWidth <= 768;
		};

		window.addEventListener('resize', resizeHandler);

		// Bereinigen des Eventhandlers bei der Zerstörung des Components
		return () => {
			window.removeEventListener('resize', resizeHandler);
		};
	});
</script>

{#if !isMobile}
	<div id="non-mobile-message">
		<img src="/favicon.png" alt="Neelo Icon" class="neelo-icon" />
		<p>Please use a mobile device to try the neelo prototype.</p>
	</div>
{:else}
	<div class="order-success-container">
		<div class="order-success-header">
			<img src="/icons/ordersuccess.png" alt="Success" class="success-icon" />
			<h1>Thank you for your order!</h1>
			<p>Your order has been successfully placed. You will receive a confirmation email shortly.</p>
		</div>

		<div class="order-details">
			<h2>Order Summary</h2>
			<ul>
				{#each cartItems as item}
					<li>
						<span class="item-name">{item.name}</span>
						<span class="item-price">{item.price.toFixed(2)}€</span>
					</li>
				{/each}
			</ul>
			<div class="order-total">
				<p>Subtotal: <span>{subtotal.toFixed(2)}€</span></p>
				<p>Shipping: <span>{shipping.toFixed(2)}€</span></p>
				<p>Total: <span>{total.toFixed(2)}€</span></p>
			</div>
		</div>

		<div class="order-info">
			<h2>Shipping Details</h2>
			<p>Name: Aaron Doe</p>
			<p>Address: 424 Raustjes Street, Springfield, USA</p>
			<p>Delivery estimate: 3-5 business days</p>
		</div>

		<div class="order-actions">
			<a href="/" class="back-to-home">Continue Shopping</a>
		</div>
	</div>
{/if}

<style>
	:global(body) {
		margin: 0;
		font-family: IBM, sans-serif;
		background-color: #f9f9f9;
	}

	@font-face {
		font-family: 'IBM';
		font-style: normal;
		font-weight: 500;
		src:
			local(''),
			url('/fonts/IBMPlexSans-Regular.ttf') format('truetype');
	}

	#non-mobile-message {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
		text-align: center;
		font-size: 20px;
		background-color: #f9f9f9;
	}

	.neelo-icon {
		width: 700px;
		height: 400px;
		margin-bottom: 10px;
	}

	.order-success-container {
		max-width: 600px;
		padding-top: 100px;
		padding-left: 20px;
		padding-right: 20px;
		padding-bottom: 30px;
		background-color: white;
		border-radius: 10px;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
		text-align: center;
	}

	.order-success-header {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-bottom: 20px;
	}

	.success-icon {
		width: 80px;
		height: 80px;
		margin-bottom: 10px;
	}

	.order-success-header h1 {
		font-size: 24px;
		color: #6970af;
		margin-bottom: 5px;
		font-weight: 600;
	}

	.order-success-header p {
		font-size: 16px;
		color: #666;
	}

	.order-details {
		margin-bottom: 20px;
		text-align: left;
	}

	.order-details h2 {
		font-size: 20px;
		margin-bottom: 10px;
		color: #333;
	}

	.order-details ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.order-details li {
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid #ddd;
		padding: 8px 0;
	}

	.order-details .item-name {
		font-weight: bold;
		color: #333;
	}
	.order-details .item-price {
		color: #888;
	}

	.order-total p {
		display: flex;
		justify-content: space-between;
		margin: 5px 0;
		font-weight: 600;
	}

	.order-info {
		text-align: left;
		margin-bottom: 20px;
	}

	.order-info h2 {
		font-size: 20px;
		margin-bottom: 10px;
		color: #333;
	}

	.order-info p {
		margin: 5px 0;
		color: #555;
	}

	.order-actions {
		display: flex;
		gap: 10px;
		justify-content: center;
		margin-top: 20px;
	}

	.order-actions a {
		text-decoration: none;
		padding: 10px 20px;
		border-radius: 15px;
		font-weight: bold;
	}

	.back-to-home {
		background-color: #6970af;
		color: white;
	}
</style>
