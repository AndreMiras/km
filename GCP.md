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

```
CLOUDSDK_PYTHON=python3.11 gsutil du -sh gs://mev-eth-usdc-arbitrage-bot-log-export-bucket/
```

## Specify Python version

When the default system Python version is incompatible it's possible to specify another version using the `CLOUDSDK_PYTHON` environment variable.
For instance the following error:

```
gsutil version
Error: gsutil requires Python version 2.7 or 3.5-3.11, but a different version is installed.
You are currently running Python 3.12
Follow the steps below to resolve this issue:
1. Switch to Python 3.5-3.11 using your Python version manager or install an appropriate version.
2. If you are unsure how to manage Python versions, visit [https://cloud.google.com/storage/docs/gsutil_install#specifications] for detailed instructions.
```

Can be solved with:

```
CLOUDSDK_PYTHON=python3.11 gsutil version
gsutil version: 5.31
```
