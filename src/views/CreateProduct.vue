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
            map: null
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
        init() {
            var myPlacemark,
                myMap = new ymaps.Map('map', {
                    center: [55.753994, 37.622093],
                    zoom: 9
                }, {
                    searchControlProvider: 'yandex#search'
                });

            this.map = myMap

            // Слушаем клик на карте.
            myMap.events.add('click', function (e) {
                var coords = e.get('coords');

                // Если метка уже создана – просто передвигаем ее.
                if (myPlacemark) {
                    myPlacemark.geometry.setCoordinates(coords);
                }
                // Если нет – создаем.
                else {
                    myPlacemark = createPlacemark(coords);
                    myMap.geoObjects.add(myPlacemark);
                    // Слушаем событие окончания перетаскивания на метке.
                    myPlacemark.events.add('dragend', function () {
                        getAddress(myPlacemark.geometry.getCoordinates());
                    });
                }
                getAddress(coords);
            });

            // Создание метки.
            function createPlacemark(coords) {
                return new ymaps.Placemark(coords, {
                    iconCaption: 'поиск...'
                }, {
                    preset: 'islands#violetDotIconWithCaption',
                    draggable: true
                });
            }

            // Определяем адрес по координатам (обратное геокодирование).
            function getAddress(coords) {
                myPlacemark.properties.set('iconCaption', 'поиск...');
                ymaps.geocode(coords).then(function (res) {
                    var firstGeoObject = res.geoObjects.get(0);

                    myPlacemark.properties
                        .set({
                            // Формируем строку с данными об объекте.
                            iconCaption: [
                                // Название населенного пункта или вышестоящее административно-территориальное образование.
                                firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
                                // Получаем путь до топонима, если метод вернул null, запрашиваем наименование здания.
                                firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
                            ].filter(Boolean).join(', '),
                            // В качестве контента балуна задаем строку с адресом объекта.
                            balloonContent: firstGeoObject.getAddressLine()
                        });
                });
            }
        }

    },
    mounted() {
        this.fetchCategories()

        document.getElementById('map').replaceChildren()

        // let ymapsScript = document.createElement('script')
        // ymapsScript.setAttribute('src', 'https://api-maps.yandex.ru/2.1/?apikey=cc2220de-d942-4b1c-8798-fb61c28d42b8&lang=ru-RU')
        // document.head.appendChild(ymapsScript)

        // ymaps.ready(this.init)
        setTimeout(this.init, 1000)
    },
    beforeUnmount() {
        // document.getElementById('map').remove()
        // this.map.destroy()
    }
}
</script>


<template>
    <div class="row">
        <div class="col-2"></div>
        <div class="col-8">
            <form>
                <div class="mb-3">
                    <label for="categoryId" class="form-label">Select category</label>
                    <select @change="rootCategoryChange($event)" class="form-select" id="categoryId" required>
                        <option disabled selected value> -- select an option -- </option>
                        <option v-for="(_, category) in categoriesData" :value="category">{{ category }}</option>
                    </select>
                </div>
                <div v-if="selectedRootCategory" class="mb-3">
                    <label for="subCategoryId" class="form-label">Select sub category</label>
                    <select class="form-select" id="subCategoryId" required>
                        <option disabled selected value> -- select an option -- </option>
                        <option v-for="childCategory in categoriesData[selectedRootCategory]" :value="childCategory">{{
                            childCategory }}</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="nameId" class="form-label">Name</label>
                    <input type="text" class="form-control" id="nameId" maxlength="128" name="name">
                </div>
                <div class="mb-3">
                    <label for="descriptionId" class="form-label">Description</label>
                    <textarea class="form-control" id="descriptionId" rows="3" maxlength="512"></textarea>
                </div>
                <div class="mb-3">
                    <label for="priceId" class="form-label">Price</label>
                    <input type="number" class="form-control" id="priceId" min="1">
                </div>
                <div class="mb-3">
                    <label for="addressId" class="form-label">Address</label>
                    <input type="text" class="form-control" id="addressId" maxlength="64">
                </div>

                <div class="mb-3">
                    <div id="map" style="height: 400px"></div>
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