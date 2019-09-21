'use strict'

$(document).ready(function () {
  if (chrome.runtime) {
    chrome.runtime.onMessage.addListener(function (data) {
      if (typeof data.object !== 'undefined') {
        localStorage['patrioticcow_chrcom_data'] = data.object
      }
    })
  }

  var inputElement = 'textarea, input, input[type="text"], input[type="password"], input[type="color"], input[type="date"], input[type="datetime"], input[type="datetime-local"], input[type="email"], input[type="month"], input[type="number"], input[type="range"], input[type="search"], input[type="tel"], input[type="time"], input[type="url"], input[type="week"]'
  var className = 'patrioticcow_chrcom_keyboard'
  var classContName = 'patrioticcow_chrcom_keyboard_container'
  var iEl = localStorage['patrioticcow_chrcom_data'] ? localStorage['patrioticcow_chrcom_data'] : inputElement
  var inputs = $(document).find(iEl)
  var img = chrome.extension ? chrome.extension.getURL('images/keyboard.png') : '';
  var keyboardHtml = chrome.extension ? chrome.extension.getURL('keyboard.html') : '';

  $.each(inputs, function (k, el) {
    if ($(el).prop('type') !== 'hidden') {
      $(el).on('click', function (e) {
        $('.' + className).remove()
        $('.' + classContName).remove()

        var mouseX = e.pageX + 15
        var mouseXM = (e.pageX + 15) / 2
        var mouseY = e.pageY + 15
        var mouseYM = e.pageY + 30

        var html = '<div class="' + classContName + '" style="top: ' + mouseYM + 'px; left: ' + mouseXM + 'px;"></div>' +
          '<button class="' + className + '" style="top: ' + mouseY + 'px; left: ' + mouseX + 'px; background: #ffffff url(' + img + ') no-repeat"></button>'

        $('body').append(html)

        keyboard($(this))
      })

      $(document).on('click', '.' + className, function () {
        $.get(keyboardHtml, function (data) {
          $('.' + className).remove()
          $('.' + classContName).html(data)
        }, 'html')
      })

      $(document).on('click', '.patrioticcow_letter_close', function () {
        $('.' + classContName).remove()
      })
    }
  })

  dom()
})

function dom () {
  var tag = '&tag=tvshowreminders-20'
  var links = document.getElementsByTagName('a')

  for (var i = 0; i < links.length; i++) {
    if (links[i].href.startsWith('https://www.amazon')) {
      var href = links[i].href
      href = href.replace('tag=', 'oldtag=')
      links[i].href = href + tag
    }
  }
}

function keyboard (el) {

  var $write = el,
    shift = false,
    capslock = false

  $(document).off('click', '#patrioticcow_keyboard li')

  $(document).on('click', '#patrioticcow_keyboard li', function () {
    var $this = $(this),
      character = $this.html() // If it's a lowercase letter, nothing happens to this variable

    // Shift keys
    if ($this.hasClass('patrioticcow_left-shift') || $this.hasClass('patrioticcow_right-shift')) {
      $('.patrioticcow_letter').toggleClass('patrioticcow_uppercase')
      $('.patrioticcow_symbol span').toggle()

      shift = shift !== true
      capslock = false
      return false
    }

    // Caps lock
    if ($this.hasClass('patrioticcow_capslock')) {
      $('.patrioticcow_letter').toggleClass('patrioticcow_uppercase')
      capslock = true
      return false
    }

    // Delete
    if ($this.hasClass('patrioticcow_delete')) {
      var html = $write.val()

      $write.val(html.substr(0, html.length - 1))
      return false
    }

    // Special characters
    if ($this.hasClass('patrioticcow_symbol')) character = $('span:visible', $this).html()
    if ($this.hasClass('patrioticcow_space')) character = ' '
    if ($this.hasClass('patrioticcow_letter_close')) character = ''
    if ($this.hasClass('patrioticcow_tab')) character = '\t'
    if ($this.hasClass('patrioticcow_return')) {
      character = '\n'
      if (!$write.is('textarea')) {
        $write.closest('form')[0].submit()
      }
    }

    // Uppercase letter
    if ($this.hasClass('patrioticcow_uppercase')) character = character.toUpperCase()

    // Remove shift once a key is clicked.
    if (shift === true) {
      $('.symbol span').toggle()
      if (capslock === false) $('.patrioticcow_letter').toggleClass('patrioticcow_uppercase')

      shift = false
    }

    // Add the character
    $write.val($write.val() + character)
  })
}
