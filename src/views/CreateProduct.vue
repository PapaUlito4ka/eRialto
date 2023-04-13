<script>


</script>


<template>
    <div class="row">
        <div class="col-2"></div>
        <div class="col-8">
            <form>
                <div class="mb-3">
                    <label for="categoryId" class="form-label">Select category</label>
                    <select class="form-select" id="categoryId">
                        <option selected>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="titleId" class="form-label">Title</label>
                    <input type="text" class="form-control" id="titleId" maxlength="128">
                </div>
                <div class="mb-3">
                    <label for="descriptionId" class="form-label">Description</label>
                    <textarea class="form-control" id="descriptionId" rows="3" maxlength="512"></textarea>
                </div>
                <div class="mb-3">
                    <label for="priceId" class="form-label">Price</label>
                    <input type="number" class="form-control" id="priceId">
                </div>
                <div class="mb-3">
                    <label for="addressId" class="form-label">Address</label>
                    <input type="text" class="form-control" id="addressId" maxlength="64">
                </div>
                <div class="mb-3">
                    <label for="imagesId" class="form-label">Images</label>
                    <input class="form-control" type="file" accept="image/*" id="imagesId" multiple>
                </div>


                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
        <div class="col-2"></div>
    </div>
</template>