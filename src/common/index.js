import moment from 'moment'


export const formatDate = function (value) {
    return moment(value).format('DD.MM.YYYY')
}