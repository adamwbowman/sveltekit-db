
<script>
    let { data, type } = $props();
</script>



<div class="alert alert-warning d-flex align-items-center" role="alert">
    <i class="bi bi-exclamation-diamond-fill fs-3 me-2"></i>
    <strong>Error:</strong> {data}
</div>