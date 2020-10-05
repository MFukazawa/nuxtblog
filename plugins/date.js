import Vue from 'vue'
import { DateTime } from 'luxon'

Vue.filter('toJpDate', function(value) {
  if (!value) return ''
  return DateTime.fromISO(value).toLocaleString()
})
