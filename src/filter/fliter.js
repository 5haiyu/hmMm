import Vue from 'vue'
import moment from 'moment'

Vue.filter('time',function(str){{
    return moment(str).format('YYYY-MM-DD');
}})