<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let cartItems = [
		{
			id: 1,
			name: 'ONSFRED T-Shirt',
			description: 'Farbe Grün, Größe M',
			price: 24.0,
			image: '/pictures/t-shirt picture green.png'
		},
		{
			id: 2,
			name: 'Cozy Sweatshirt',
			description: 'Farbe Schwarz, Größe L',
			price: 39.0,
			image: '/pictures/sweatshirt green.png'
		}
	];
	let suggestions = [
		{
			id: 3,
			name: 'ONSKODYL Shirt',
			price: 29.0,
			image: '/pictures/sweatshirt gray.png'
		},
		{
			id: 4,
			name: 'ONSEDGAR Hat',
			price: 15.0,
			image: '/pictures/cap black.png'
		}
	];
	let shipping = 5.0;
	let isMobile = false;

	onMount(() => {
		if (typeof window !== 'undefined' && localStorage) {
			localStorage.setItem('cartItems', JSON.stringify(cartItems));
		}

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

	function removeItem(id) {
		cartItems = cartItems.filter((item) => item.id !== id);
		if (typeof window !== 'undefined' && localStorage) {
			localStorage.setItem('cartItems', JSON.stringify(cartItems));
		}
	}

	function addSuggestionToCart(item) {
		cartItems = [...cartItems, item];
		suggestions = suggestions.filter((suggestion) => suggestion.id !== item.id);
		if (typeof window !== 'undefined' && localStorage) {
			localStorage.setItem('cartItems', JSON.stringify(cartItems));
		}
	}

	function goToOrderSuccess() {
		goto('/ordersuccess');
	}
</script>

{#if !isMobile}
	<div id="non-mobile-message">
		<img src="/favicon.png" alt="Neelo Icon" class="neelo-icon" />
		<p>Please use a mobile device to try the neelo prototype.</p>
	</div>
{:else}
	<div class="container">
		<p class="headline">Your bag</p>

		<!-- Liste der Artikel -->
		{#if cartItems.length > 0}
			{#each cartItems as item (item.id)}
				<div class="cart-item">
					<div class="item-info">
						<img src={item.image} alt={item.name} />
						<div>
							<p class="item-name">{item.name}</p>
							<p>{item.description}</p>
							<p class="item-price">{item.price.toFixed(2)}€</p>
						</div>
					</div>
					<button class="trash-icon" on:click={() => removeItem(item.id)}> 🗑️ </button>
				</div>
			{/each}
		{/if}

		<!-- Vorschläge -->
		{#if suggestions.length > 0}
			<div class="suggestions">
				<p class="suggestions-headline">
					This could be just what you're looking for.<br />Have a look!
				</p>
				<div class="suggestion-items">
					{#each suggestions as suggestion (suggestion.id)}
						<div class="suggestion-item" on:click={() => addSuggestionToCart(suggestion)}>
							<img src={suggestion.image} alt={suggestion.name} />
							<div class="suggestion-text-container">
								<p class="suggestion-name">{suggestion.name}</p>
								<p class="suggestion-price">{suggestion.price.toFixed(2)}€</p>
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/if}

		<!-- Rechnung -->
		<div class="botcontainer">
			<div class="summary">
				<div class="summary-row">
					<p>Subtotal</p>
					<p>{cartItems.reduce((total, item) => total + item.price, 0).toFixed(2)} €</p>
				</div>
				<div class="summary-row">
					<p>Shipping</p>
					<p>{shipping.toFixed(2)} €</p>
				</div>
				<div class="summary-row total">
					<p>Total</p>
					<p>
						{(cartItems.reduce((total, item) => total + item.price, 0) + shipping).toFixed(2)}
						€
					</p>
				</div>
			</div>

			<!-- Checkout-Button -->
			<button class="checkout-button" on:click={() => goToOrderSuccess()}> Buy Now </button>
		</div>
	</div>
{/if}

<style>
	:global(body) {
		margin: 0;
		font-family: IBM, sans-serif;
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
		font-size: 20px;
		text-align: center;
		background-color: #f9f9f9;
	}

	.neelo-icon {
		width: 700px;
		height: 400px;
		margin-bottom: 10px;
	}

	.container {
		padding: 20px;
		max-width: 800px;
		margin: 0 auto;
		font-family: IBM, sans-serif;
	}

	.headline {
		font-size: 24px;
		margin-bottom: 20px;
		font-weight: 700;
	}

	.cart-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #ddd;
		padding: 10px 0;
	}

	.cart-item img {
		width: 60px;
		height: 80px;
		object-fit: cover;
		border-radius: 13px;
		margin-right: 10px;
	}

	.item-info {
		display: flex;
		align-items: center;
		flex-grow: 1;
	}

	.item-info div {
		margin-left: 10px;
	}

	.item-info p {
		margin: 0;
	}

	.item-name {
		font-weight: 600;
		font-size: 17px;
		color: black;
	}

	.item-price {
		font-weight: 600;
		font-size: 16px;
		color: black;
	}

	.trash-icon {
		cursor: pointer;
		background: none;
		border: none;
		color: #888;
		font-size: 18px;
		transition: color 0.3s;
	}

	.trash-icon:hover {
		color: #e74c3c;
	}

	.summary {
		margin-top: 20px;
		border-top: 1px solid #ddd;
		padding-top: 10px;
	}

	.summary-row {
		display: flex;
		justify-content: space-between;
		margin-bottom: 10px;
	}

	.total {
		font-weight: bold;
		font-size: 18px;
	}

	.checkout-button {
		background-color: #6970af;
		color: white;
		padding: 12px;
		border: none;
		border-radius: 18px;
		cursor: pointer;
		width: 100%;
		font-weight: 600;
		font-size: 20px;
		position: relative;
		text-align: center;
		justify-content: center;
		display: flex;
		align-items: center;
		margin-top: 10px;
	}

	.icon-arrow {
		position: absolute;
		left: 10px;
		width: 50px;
		height: 50px;
		object-fit: contain;
	}

	.checkout-button:hover {
		background-color: #333;
	}

	.suggestions {
		background-color: #ebecf0;
		border-radius: 10px;
		padding: 0;
		margin: 20px 0;
		width: 100%;
	}

	.suggestions-headline {
		font-size: 15px;
		padding-top: 5px;
		padding-left: 15px;
	}

	.suggestion-items {
		display: flex;
		gap: 20px;
		align-items: center;
		justify-content: space-between;
		padding: 10px;
		box-sizing: border-box;
	}

	.suggestion-item {
		flex: 1;
		text-align: center;
		cursor: pointer;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: white;
		border-radius: 15px;
		box-sizing: border-box;
	}

	.suggestion-item img {
		width: 100px;
		height: 100px;
		object-fit: cover;
		border-radius: 8px;
		margin-top: 10px;
	}

	.suggestion-text-container {
		background-color: #f5f3ff;
		text-align: center;
		width: 100%;
		border-radius: 15px;
		padding: 5px 0;
		margin: 0;
		box-sizing: border-box;
	}

	.suggestion-name {
		font-weight: 600;
	}

	.suggestion-price {
		color: #888;
	}
</style>
