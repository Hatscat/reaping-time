#!/bin/bash

case "$1" in

  "build")
    deno run --allow-write main.ts
    ;;

  "dev")
    deno run --watch --allow-write main.ts
    ;;

  "reload-deps")
    deno cache --reload main.ts
    ;;

  *)
    echo "available commands are \"build\", \"dev\" and \"reload-deps\""
    ;;
esac
