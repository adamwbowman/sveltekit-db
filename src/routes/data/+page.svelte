

<script>
	import { onMount } from "svelte";
	import { transactionsAPI } from '$lib/data/utils';
	import Loading from "$lib/components/general/Loading.svelte";
	import Error from "$lib/components/general/Error.svelte";

	let transactions = $state([]);
	let formData = $state({name: ''});

	let filteredTransactions = $derived(
		transactions
			// .filter(t => selectedCategory === "" || t.category === selectedCategory)
			// .filter(t => selectedSubcategory === "" || t.subCategory === selectedSubcategory)
			// .filter(t => !searchQuery || t.merchant.toLowerCase().includes(searchQuery.toLowerCase()))
			// .sort((a, b) => new Date(b.transactionDate) - new Date(a.transactionDate))
	);

	async function handleAddTransaction() {
		try {
			await transactionsAPI.add(formData);
			transactions = await transactionsAPI.fetch();
			formData = { name: ''};
		} catch (error) {
			console.error('Error adding transaction:', error);
		}
	}

	async function handleDeleteTransaction(transactionId) {
		try {
			await transactionsAPI.delete(transactionId);
			// Make sure you're using the correct property name (_id instead of id)
			transactions = transactions.filter(t => t._id !== transactionId);
		} catch (error) {
			console.error('Error deleting transaction:', error);
		}
	}

	onMount(async () => {
		transactions = await transactionsAPI.fetch();
	});
</script>



{#await transactions}
	<Loading />
{:then transactions}
	<ul>
		{#each transactions as t}
			<li>
				{t.name}
				<button type="button"
					class="btn btn-sm btn-outline-secondary"
					onclick={() => handleDeleteTransaction(t._id)}
				>
					delete
				</button>
			</li>
		{/each}
	</ul>
	<form 
		onsubmit={handleAddTransaction}
		class="d-flex align-items-center gap-2"
	>
	<div class="col-md-4">
		<input
			type="text"
			class="form-control form-control-sm"
			placeholder="Name"
			bind:value={formData.name}
			required
		>
	</div>
	<div class="col-md-2">
		<button type="submit" class="btn btn-sm btn-primary">Add</button>
	</div>
	</form>
{:catch error}
	<Error data={error.message} />
{/await}



<style>

</style>