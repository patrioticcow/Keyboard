'use strict'

var arr = ['other', 'textarea', 'text', 'password', 'color', 'date', 'datetime', 'datetime-local', 'email', 'month', 'number', 'range', 'search', 'tel', 'time', 'url', 'week']
var val = ''

for (var i = 0; i < arr.length; i++) {
  var local = typeof localStorage[arr[i]] === 'undefined' ? false : localStorage[arr[i]]
  var bool = false

  if (local === 'true') {
    bool = true

    if (arr[i] === 'other') {
      val += ', input'
    } else if (arr[i] === 'textarea') {
      val += ', textarea'
    } else {
      val += ', input[type="' + arr[i] + '"]'
    }
  }

  $('.' + arr[i]).prop('checked', bool)

}

$('.email_me').on('click', function () {
  $('.show_email').show()
})

$('input').on('click', function () {
  var val = $(this).val()
  localStorage[val] = $(this).prop('checked')
})

document.addEventListener('DOMContentLoaded', function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { object: val.slice(1) }, function (response) {
    })
  })
})
