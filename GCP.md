# Google Cloud Platform

## Check project from VM

Using `curl`:

```sh
curl --header "Metadata-Flavor: Google" "http://metadata.google.internal/computeMetadata/v1/project/project-id"
```

Using `gcloud`:

```sh
gcloud config list --format 'value(core.project)'
```
