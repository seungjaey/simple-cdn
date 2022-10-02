# Varnish
```
docker run \
	-v $(pwd)/varnish/default.vcl:/etc/varnish/default.vcl:ro \
	--tmpfs /var/lib/varnish/varnishd:exec \
	-p 8080:80 \
	varnish
```