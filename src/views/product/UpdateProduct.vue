<script>

import { mapGetters } from "vuex";
import { Axios } from '../../http';
import YandexMap from '../../components/common/map.vue';


export default {
    computed: {
        ...mapGetters(["isLoggedIn", "getFirstname", "getAccessToken"])
    },
    components: { YandexMap },
    data() {
        return {
            showCategoriesLoading: true,
            selectedRootCategory: '',

            categoriesData: null,

            productId: 0,
            category: '',
            name: '',
            description: '',
            price: null,
            address: '',
            images: []
        }
    },
    methods: {
        showCurrentCategory(category) {
            let categories = []
            for (let cat in this.categories) {
                categories.push(cat)
            }
            categories = categories.filter(cat => cat != category)
            for (let cat of categories) {
                this.categories[cat] = false
            }
            this.categories[category] = true
        },
        toggleCategoriesLoading() {
            this.showCategoriesLoading = !this.showCategoriesLoading
        },
        setCategoriesData(categoriesData) {
            this.categoriesData = categoriesData
        },
        setAddress(address) {
            this.address = address
        },
        setProductId() {
            this.productId = parseInt(this.$route.params.id)
            if (!this.productId) this.$router.push('/')
        },
        setProduct(data) {
            this.productId = data.id
            this.category = data.category.name
            this.selectedRootCategory = data.category.parentCategory.name
            this.name = data.name
            this.description = data.description
            this.price = data.price
            this.address = data.address
            this.images = data.images
        },
        fetchProduct() {
            Axios
                .get(`/products/${this.productId}`)
                .then(res => {
                    this.setProduct(res.data)
                    this.loadImageFiles()
                })
                .catch(e => {
                })
        },
        fetchCategories() {
            if (this.categoriesData) return
            Axios
                .get('/categories')
                .then(res => {
                    this.setCategoriesData(res.data)
                    this.toggleCategoriesLoading()
                })
                .catch(e => {
                })
        },
        rootCategoryChange(event) {
            this.selectedRootCategory = event.target.value
            this.category = ''
        },
        uploadImages() {
            this.images = Array.prototype.slice.call(this.$refs.imagesInput.files, 0, 5)
            console.log(this.images)
        },
        updateProduct(e) {
            let formData = new FormData()
            e.preventDefault()

            formData.append('category', this.category)
            formData.append('name', this.name)
            formData.append('description', this.description)
            formData.append('price', this.price)
            formData.append('address', this.address)
            const images = document.querySelector('#imagesId').files;
            for (let image of images) {
                formData.append('images', image, image.filename)
            }

            Axios
                .patch(`/products/${this.productId}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${this.getAccessToken}`
                    }
                })
                .then(res => {
                    this.$router.push('/profile')
                })
                .catch(e => {
                    console.log(e.response)
                })
        },
        loadImageFiles() {
            let container = new DataTransfer()
            for (let image of this.images) {
                this.getImgURL(image.path, (imgBlob) => {
                    let imageType = image.filename.split(' ').slice(-1)
                    let file = new File([imgBlob], image.filename, {
                        type: `image/${imageType}`,
                        lastModified: new Date().getTime()
                    }, 'utf-8')
                    container.items.add(file)
                    if (container.files.length == this.images.length) {
                        document.querySelector('#imagesId').files = container.files
                    }
                })
            }
        },
        getImgURL(url, callback) {
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                callback(xhr.response);
            };
            xhr.open('GET', url);
            xhr.responseType = 'blob';
            xhr.send();
        }
    },
    mounted() {
        this.setProductId()
        this.fetchProduct()
        this.fetchCategories()
    }
}
</script>


<template>
    <div class="row">
        <div class="col-2"></div>
        <div class="col-8">
            <form @submit.prevent="updateProduct">
                <div class="mb-3">
                    <label for="categoryId" class="form-label">Select category</label>
                    <select v-model="selectedRootCategory" @change="rootCategoryChange($event)" class="form-select"
                        id="categoryId" required>
                        <option disabled selected value> -- select an option -- </option>
                        <option v-for="(_, category) in categoriesData" :value="category">{{ category }}</option>
                    </select>
                </div>
                <div v-if="selectedRootCategory" class="mb-3">
                    <label for="subCategoryId" class="form-label">Select sub category</label>
                    <select v-model="category" class="form-select" id="subCategoryId" required>
                        <option disabled selected value> -- select an option -- </option>
                        <option v-for="childCategory in categoriesData[selectedRootCategory]" :value="childCategory">{{
                            childCategory }}</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="nameId" class="form-label">Name</label>
                    <input v-model="name" type="text" class="form-control" id="nameId" maxlength="128">
                </div>
                <div class="mb-3">
                    <label for="descriptionId" class="form-label">Description</label>
                    <textarea v-model="description" class="form-control" id="descriptionId" rows="3"
                        maxlength="512"></textarea>
                </div>
                <div class="mb-3">
                    <label for="priceId" class="form-label">Price</label>
                    <input v-model="price" type="number" class="form-control" id="priceId" min="1">
                </div>
                <div class="mb-3">
                    <label for="addressId" class="form-label">Address</label>
                    <input v-model="address" type="text" class="form-control" id="addressId" maxlength="64">
                </div>
                <div class="mb-3">
                    <YandexMap @address-set="setAddress" />
                </div>
                <div class="mb-3">
                    <label for="imagesId" class="form-label">Images</label>
                    <input v-on:change="uploadImages" class="form-control" type="file" accept="image/*" id="imagesId"
                        multiple ref="imagesInput">
                </div>
                <div class="mb-3">
                    <div id="carouselExample" class="carousel slide">
                        <div class="carousel-inner">
                            <div v-if="images.length" class="carousel-item active">
                                <img :src="images.length ? images[0].path : 'https://placehold.co/150x125'"
                                    class="rounded preview-image">
                            </div>
                            <div v-for="image in images.slice(1)" class="carousel-item">
                                <img :src="image.path ? image.path : 'https://placehold.co/150x125'"
                                    class="rounded preview-image">
                            </div>
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample"
                            data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExample"
                            data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary">Save</button>
            </form>
        </div>
        <div class="col-2"></div>
    </div>
</template>


<style scoped>
.preview-image {
    cursor: pointer;
    max-height: 700px;
    width: 100%;
    object-fit: contain;
}
</style>