# Tinyproxy

Setup a HTTP proxy using docker compose.
Adjust config as needed by editing `tinyproxy.conf`.

```sh
docker compose up
```

Test it with curl:

```sh
curl --proxy http://localhost:8888 --proxy-user user:password ifconfig.me
```

Expose it with ngrok if needed:

```sh
ngrok tcp 8888
```
