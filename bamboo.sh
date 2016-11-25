#!/usr/bin/env bash

source ~/.bashrc

export NODE_ENV=production
export BABEL_ENV=production

error () {
  echo "Error: $1"
  exit ${2:-1}
}

install_deps() {
  env yarn --no-lockfile --no-emoji --no-progress --prefer-offline || env yarn --no-lockfile --no-emoji --no-progress
}

build() {
  VUE_ROUTER_BASE=/charity/ npm run gulp -- build
}

doc() {
  echo "No documents yet!"
}

lint() {
  npm run gulp -- eslint --ci
}

ut() {
  npm test
}

fail() {
  `exit -1`
}

show_help() {
  echo "This is a simple script for Bamboo."
  echo "Usage: ./bamboo.sh (install|doc|build|lint|ut)"
  exit -1
}

if [[ -z `which npm` ]]; then error "npm not found"; fi

if [[ -z `which yarn` ]]; then error "yarn not found"; fi

case "$1" in
  install)
    install_deps
    ;;
  build)
    build
    ;;
  doc)
    doc
    ;;
  lint)
    lint
    ;;
  ut)
    ut
    ;;
  fail)
    fail
    ;;
  *)
    show_help
    ;;
esac
