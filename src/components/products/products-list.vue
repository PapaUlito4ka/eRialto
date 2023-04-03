<script>
import ProductItem from './product-item.vue';

export default {
    components: {
        ProductItem
    },
    props: {
        products: Array
    },
    mounted() { }
}

</script>


<template>
    <div v-for="(product, idx) in products" class="mb-3">
        <ProductItem :idx="idx" :title="'Жилет Stone Island Hidden Reflective'"
            :description="'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce facilisis nisl neque, et vestibulum dui sollicitudin eu. Sed imperdiet tellus nec lacus accumsan euismod. Sed faucibus, enim ac sagittis rhoncus, ligula libero tincidunt elit, id bibendum quam ipsum in ipsum. Pellentesque odio dui, convallis nec vehicula vitae, consectetur id mauris. Vestibulum nec ipsum et neque interdum commodo. Integer in maximus quam. Etiam efficitur ultrices urna, eu volutpat mauris sollicitudin at. Etiam pretium risus non ipsum facilisis, vitae finibus tellus tempus. Nam vel odio ac massa placerat dictum eget vel mauris. Praesent quis posuere lacus, nec viverra ligula. Cras venenatis ultrices lectus, sit amet vehicula felis vulputate semper. Phasellus imperdiet magna non metus suscipit, ut dignissim lacus facilisis. Sed iaculis lectus leo, lacinia placerat orci mollis quis.'"
            :price="10499" :address="'Санкт-Петербург, Ладожская'" :timestamp="'12.03.2023'" />
    </div>
    <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
            <li class="page-item disabled">
                <a class="page-link">Previous</a>
            </li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item">
                <a class="page-link" href="#">Next</a>
            </li>
        </ul>
    </nav>
</template>