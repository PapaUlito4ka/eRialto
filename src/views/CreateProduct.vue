<script>

import { mapGetters } from "vuex";
import { Axios } from '../http';


export default {
    computed: {
        ...mapGetters(["isLoggedIn", "getFirstname", "getAccessToken"])
    },
    data() {
        return {
            showCategoriesLoading: true,
            selectedRootCategory: '',

            categoriesData: null,

            category: '',
            name: '',
            description: '',
            price: NaN,
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
        fetchCategories() {
            if (this.categoriesData) return
            Axios
                .get('/categories', {
                    headers: {
                        Authorization: `Bearer ${this.getAccessToken}`
                    }
                })
                .then(res => {
                    this.setCategoriesData(res.data)
                    this.toggleCategoriesLoading()
                })
                .catch(e => {
                })
        },
        rootCategoryChange(event) {
            console.log('Selected:', event.target.value)
            this.selectedRootCategory = event.target.value
        },
        uploadImages() {
            this.images = Array.prototype.slice.call(this.$refs.imagesInput.files, 0, 5)
            console.log(this.images)
        },
        initMap() {
            var myPlacemark,
                myMap = new ymaps.Map('map', {
                    center: [55.753994, 37.622093],
                    zoom: 9
                }, {
                    searchControlProvider: 'yandex#search'
                })

            myMap.events.add('click', function (e) {
                var coords = e.get('coords')

                if (myPlacemark) {
                    myPlacemark.geometry.setCoordinates(coords)
                } else {
                    myPlacemark = createPlacemark(coords)
                    myMap.geoObjects.add(myPlacemark)
                    myPlacemark.events.add('dragend', function () {
                        getAddress(myPlacemark.geometry.getCoordinates())
                    })
                }
                getAddress(coords)
            })

            function createPlacemark(coords) {
                return new ymaps.Placemark(coords, {
                    iconCaption: 'поиск...'
                }, {
                    preset: 'islands#violetDotIconWithCaption',
                    draggable: true
                })
            }

            function setAddress(address) {
                document.getElementById('addressId').value = address
            }

            function getAddress(coords) {
                myPlacemark.properties.set('iconCaption', 'поиск...')
                ymaps.geocode(coords).then(function (res) {
                    var firstGeoObject = res.geoObjects.get(0)
                    var address = [
                        firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
                        firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
                    ].filter(Boolean).join(', ')

                    myPlacemark.properties
                        .set({
                            iconCaption: address,
                            balloonContent: firstGeoObject.getAddressLine()
                        })
                    setAddress(firstGeoObject.getAddressLine())
                })
            }
        },
        clearMap() {
            document.getElementById('map').replaceChildren()
        },
        createProduct(e) {
            let formData = new FormData()
            e.preventDefault()

            formData.append('category', this.category)
            formData.append('name', this.name)
            formData.append('description', this.description)
            formData.append('price', this.price)
            formData.append('address', this.address)
            formData.append('images', this.images)

            Axios
                .post('/products', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${this.getAccessToken}`
                    }
                })
                .then(res => {
                    console.log(res.data)
                })
                .catch(e => {
                    console.log(e.response)
                })
        }
    },
    mounted() {
        this.clearMap()
        this.fetchCategories()
        setTimeout(this.initMap, 1000)
    }
}
</script>


<template>
    <div class="row">
        <div class="col-2"></div>
        <div class="col-8">
            <form @submit.prevent="createProduct">
                <div class="mb-3">
                    <label for="categoryId" class="form-label">Select category</label>
                    <select @change="rootCategoryChange($event)" class="form-select" id="categoryId" required>
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
                    <div id="map" style="height: 400px"></div>
                </div>
                <div class="mb-3">
                    <label for="imagesId" class="form-label">Images</label>
                    <input v-on:change="uploadImages" class="form-control" type="file" accept="image/*" id="imagesId"
                        multiple ref="imagesInput">
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
        <div class="col-2"></div>
    </div>
</template>