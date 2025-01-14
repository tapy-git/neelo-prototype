<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	let product = {
		name: 'ONSFRED T-Shirt',
		images: [
			'/pictures/t-shirt picture green.png',
			'/pictures/t-shirt picture white.png',
			'/pictures/t-shirt picture black.png'
		],
		colors: [
			{ name: 'Grün', code: '#B6C5AB', price: '24,00 €' },
			{ name: 'Weiß', code: '#FFFFFF', price: '24,00 €' },
			{ name: 'Schwarz', code: '#000000', price: '24,00 €' }
		]
	};

	let sizes = ['S', 'M', 'L', 'XL', 'XXL'];
	let selectedColor = product.colors[0];
	let selectedSize = sizes[0];

	function selectColor(color) {
		selectedColor = color;
	}

	let showPopup = false;

	function addToCart() {
		showPopup = true;

		setTimeout(() => {
			showPopup = false;
		}, 5000);
	}

	function goToCheckout() {
		goto('/checkout');
	}

	let isMobile = false;
	onMount(() => {
		// Überprüfen, ob es ein mobiles Gerät ist
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
		<p>Please use a mobile device to try the Neelo prototype.</p>
	</div>
{:else}
	<div class="container">
		<h1>{product.name}</h1>

		<!-- Slider -->
		<div class="slider">
			<div
				class="slider-images"
				style="transform: translateX(-{product.colors.indexOf(selectedColor) * 100}%);"
			>
				{#each product.images as image}
					<img src={image} alt="T-Shirt Bild" />
				{/each}
			</div>
		</div>

		<!-- Farb- und Preis-Auswahl -->

		<div class="container-bottom">
			<div class="headlines">
				<p>Color</p>
				<p>Price (incl. VAT)</p>
			</div>
			<div class="color-row">
				<div class="color-options">
					{#each product.colors as color}
						<div
							class="color-circle {color === selectedColor ? 'selected' : ''} {color.code ===
								'#000000' && 'black-selected'}"
							style="background-color: {color.code};"
							on:click={() => selectColor(color)}
						>
							{#if color === selectedColor}
								<span class="color-label">{color.name}</span>
							{/if}
						</div>
					{/each}
				</div>
				<div class="price">{selectedColor.price}</div>
			</div>

			<div class="recommendation-container">
				<img src="/icons/sparkles.png" alt="Icon" class="icon-sparkles" />
				<span class="recommendation-text"
					>This product runs large, we recommend going down a size</span
				>
			</div>

			<div class="sizes">
				{#each sizes as size}
					<button
						class="size-button {size === selectedSize ? 'selected' : ''}"
						on:click={() => (selectedSize = size)}
					>
						{size}
					</button>
				{/each}
			</div>

			<!-- Warenkorb-Button -->
			<button class="cart-button" on:click={addToCart}> Add to Bag </button>
		</div>
	</div>
{/if}

{#if showPopup}
	<div class="popup">
		<div class="popup-content">
			<h2>Added to Bag ✅</h2>
			<p>{product.name} - Size: {selectedSize}</p>
			<button class="checkout-button" on:click={goToCheckout}> Go to checkout</button>
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
		left: 0;
		right: 0;
		top: 0;
		background-color: #ebecf0;
		margin: 0;
	}

	.container-bottom {
		height: auto;
		background: linear-gradient(180deg, #ffffff 0%, #eceff2 50%, #ffffff 100%);
		padding: 20px;
		position: fixed;
		border-top: 20px;
		min-height: 300px;
		border-radius: 30px 30px 0 0;
		left: 0;
		right: 0;
		bottom: 0;
	}

	h1 {
		font-size: 24px;
		text-align: center;
		position: relative;
		top: 50px;
		font-weight: 600;
	}

	.slider {
		position: relative;
		width: 100%;
		overflow: hidden;
		height: auto;
	}

	.recommendation-container {
		display: flex;
		align-items: left;
		gap: 10px;
	}

	.recommendation-text {
		font-size: 14px;
	}

	.icon-sparkles {
		width: 24px;
		height: 24px;
		object-fit: contain;
	}

	.slider-images {
		display: flex;
		transition: transform 0.3s ease;
		width: 100%;
	}

	.slider-images img {
		width: 100%;
		flex-shrink: 0;
		height: auto;
		object-fit: contain;
	}

	.color-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 16px;
		padding-right: 72px;
	}

	.headlines {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 17px;
		margin-bottom: 5px;
		padding-right: 13px;
		margin-top: 10px;
	}

	.color-options {
		display: flex;
		gap: 10px;
	}

	.color-circle {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		border: 2px solid transparent;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.color-circle.selected {
		width: 80px;
		border: 1.5px solid #ebebeb;
		border-radius: 15px;
		font-size: 17px;
		font-weight: 600;
		box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
	}

	.color-circle.selected .color-label {
		color: black;
	}

	.color-circle.selected.black-selected .color-label {
		color: white;
	}

	.color-label {
		font-size: 14px;
		color: #333;
	}

	.sizes {
		display: flex;
		gap: 10px;
		justify-content: left;
		margin-bottom: 16px;
		margin-top: 10px;
	}

	.size-button {
		padding: 8px 12px;
		font-size: 14px;
		border: 1px solid #ccc;
		border-radius: 40px;
		cursor: pointer;
		font-weight: 600;
		background-color: white;
		transition: all 0.3s ease;
	}

	.size-button.selected {
		background-color: black;
		color: white;
		border-color: #ebebeb;
	}

	.cart-button {
		background-color: #ffffff;
		display: flex;
		color: black;
		border: 2px solid #ccc;
		padding: 12px;
		font-size: 16px;
		border-radius: 15px;
		font-weight: 600;
		cursor: pointer;
		width: 100%;
		position: relative;
		text-align: center;
		justify-content: center; /* Zentriere den Text */
		align-items: center; /* Vertikale Zentrierung */
	}

	.cart-button:hover {
		background-color: #f0f2f5;
	}

	.icon-arrow {
		position: absolute;
		left: 30px;
		width: 24px;
		height: 24px;
		object-fit: contain;
	}

	.price {
		font-size: 17px;
		font-weight: 600;
	}

	.container {
		left: 0;
		right: 0;
		top: 0;
		background-color: #ebecf0;
		margin: 0;
	}

	.container-bottom {
		height: auto;
		background: linear-gradient(180deg, #ffffff 0%, #eceff2 50%, #ffffff 100%);
		padding: 20px;
		position: fixed;
		border-top: 20px;
		min-height: 300px;
		border-radius: 30px 30px 0 0;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.slider {
		position: relative;
		width: 100%;
		overflow: hidden;
		height: auto;
	}

	.sizes {
		display: flex;
		gap: 10px;
		justify-content: left;
		margin-bottom: 16px;
		margin-top: 10px;
	}

	.size-button {
		padding: 8px 12px;
		font-size: 14px;
		border: 1px solid #ccc;
		border-radius: 40px;
		cursor: pointer;
		font-weight: 600;
		background-color: white;
		transition: all 0.3s ease;
	}

	.size-button.selected {
		background-color: #6970af;
		color: white;
		border-color: #ebebeb;
	}

	.cart-button {
		background-color: #6970af;
		display: flex;
		color: white;
		border: none;
		padding: 12px;
		font-size: 16px;
		border-radius: 15px;
		cursor: pointer;
		width: 100%;
		position: relative;
		text-align: center;
		justify-content: center;
		align-items: center;
	}

	.popup {
		position: fixed;
		top: 20px;
		left: 50%;
		transform: translateX(-50%);
		background-color: #f5f3ff;
		padding: 20px;
		border-radius: 10px;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
		z-index: 1000;
		width: 90%;
		text-align: center;
		animation: popupAnimation 0.3s ease-out;
	}

	.popup h2 {
		font-size: 20px;
		margin-bottom: 10px;
		font-weight: 600;
	}

	.popup p {
		font-size: 16px;
		margin-bottom: 20px;
	}

	.checkout-button {
		background-color: #6970af;
		display: flex;
		color: white;
		border: none;
		padding: 12px;
		font-size: 16px;
		font-weight: 600;
		border-radius: 15px;
		cursor: pointer;
		width: 100%;
		position: relative;
		text-align: center;
		justify-content: center;
		align-items: center;
	}

	@keyframes popupAnimation {
		0% {
			opacity: 0;
			transform: translateX(-50%) translateY(-20px);
		}
		100% {
			opacity: 1;
			transform: translateX(-50%) translateY(0);
		}
	}
</style>
