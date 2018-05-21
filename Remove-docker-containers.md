# Remove docker containers

## 1. Delete all containers
```sh
docker rm $(docker ps -a -q)
```

* -q prints only the container IDs
* -a prints all containers

## 2. Delete all untagged images
```sh
docker rmi $(docker images | grep "^<none>" | awk '{print $3}')
```

awk must use a single quote (this filters all image IDs).

## 3. Delete all images
```sh
docker rmi $(docker images -q)
```
