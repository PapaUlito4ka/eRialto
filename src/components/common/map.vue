<script>


export default {
    data() {
        return {
            address: ''
        }
    },
    methods: {
        setAddress(address) {
            this.address = address
            this.$emit('address-set', address)
        },
        initMap() {
            var self = this
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
                self.setAddress(address)
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
    },
    mounted() {
        this.clearMap()
        setTimeout(this.initMap, 1000)
    }
}
</script>


<template>
    <div id="map" style="height: 400px"></div>
</template>

<style></style>