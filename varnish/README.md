```
docker pull varnish:stable
```


```
vcl 4.1;

backend default {
    .host = "backend.example.com";
    .port = "80";
}
```

```
docker run -v $(pwd)/varnish/default.vcl:/etc/varnish/default.vcl:ro \
	--tmpfs /var/lib/varnish:exec \
	--name my-varnish-container \
	-p 8080:80 \
	-e VARNISH_SIZE=2G \
	varnish:stable
```