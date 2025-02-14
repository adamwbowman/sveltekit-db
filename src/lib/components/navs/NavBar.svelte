
<script>
	let activePage = $state([]);

	function navTo(page) {
		activePage = page;
	}
</script>



<nav class="navbar navbar-expand-lg navbar-light bg-white">
	<div class="container-fluid d-flex justify-content-between align-items-center">

		<!-- Left Section: Logo and Transactions Button -->
		<div class="d-flex align-items-center">
			<a class="navbar-brand" href="/">Brand</a>
			{@render navMainBtn('Page', '/page', 'bi bi-plus-circle-dotted')}
			{@render navMainBtn('Data', '/data', 'bi bi-plus-circle-dotted')}
		</div>

		<!-- Right Section: Dropdown Menu -->
		<div class="btn-group">
			<button type="button" class="btn btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
				<i class="bi bi-gear"></i>&nbsp;
				Admin
			</button>
			<ul class="dropdown-menu dropdown-menu-end">
				{@render navAdminBtn('Edit Data', '/admin/edit/data', 'bi bi-pencil-square')}
			</ul>
		</div>

	</div>
</nav>



{#snippet navMainBtn(btnName, btnRoute, btnIcon)}
	<a href={btnRoute}
		class="btn {activePage === btnName ? 'btn-secondary' : 'btn-outline-secondary'} me-2"
		onclick={() => navTo(btnName)}
	>
		<i class={btnIcon}></i>&nbsp;
		{btnName}
	</a>
{/snippet}

{#snippet navAdminBtn (btnName, btnRoute, btnIcon)}
	<li>
		<a href={btnRoute}
			class="dropdown-item" 
			onclick={() => navTo('Admin')}
		>
			<i class={btnIcon}></i>&nbsp;
			{btnName}
		</a>
	</li>
{/snippet}