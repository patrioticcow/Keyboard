'use strict'

chrome.runtime.onInstalled.addListener(function (details) {
})

chrome.tabs.onUpdated.addListener(function (tabId) {
  if (tabId && chrome.pageAction) chrome.pageAction.show(tabId)
})

