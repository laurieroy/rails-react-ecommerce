// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import Rails from '@rails/ujs'
import Turbolinks from 'turbolinks'
import * as ActiveStorage from '@rails/activestorage'
import 'channels'

Rails.start()
Turbolinks.start()
ActiveStorage.start()

import 'bootstrap/dist/js/bootstrap'
import 'bootstrap/dist/css/bootstrap'
require('stylesheets/application.scss')
require('stylesheets/custom.css')

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import App from '../containers/App'

document.addEventListener('DOMContentLoaded', () => {
  const root =   document.getElementById('root')

  ReactDOM.render(<App />, root)
})