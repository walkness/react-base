/* eslint-disable import/prefer-default-export */
/* globals document fetch */

import 'isomorphic-fetch';

const API_ROOT = '/api/v1/';

const getCsrf = () => {
  const value = `; ${document.cookie}`;
  const parts = value.split('; csrftoken=');
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

function baseApi(fullUrl, request) {
  return fetch(fullUrl, request).then(response =>
      response.json().then(json => ({ json, response })).catch(ex => ({ ex, response }))
    ).then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json);
      }

      return json;
    }).then(
      response => ({ response }),
      error => ({ error: error || 'no error message' })
    );
}

function callApi(endpoint) {
  const fullUrl = API_ROOT + endpoint;

  const request = {
    credentials: 'same-origin',
  };
  return baseApi(fullUrl, request);
}

function callUrl(fullUrl) {
  const request = {
    credentials: 'same-origin',
  };
  return baseApi(fullUrl, request);
}

export function sendApi(endpoint, method, data) {
  const fullUrl = API_ROOT + endpoint;

  const request = {
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': getCsrf(),
    },
    method,
    body: JSON.stringify(data),
  };
  return baseApi(fullUrl, request);
}

function uploadApi(endpoint, method, data) {
  const fullUrl = API_ROOT + endpoint;

  const request = {
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'X-CSRFToken': getCsrf(),
    },
    method,
    body: data,
  };
  return baseApi(fullUrl, request);
}
