# Remove docker containers

1. Delete all containers

        $ docker ps -q -a | xargs docker rm

-q prints only the container IDs
-a prints all containers

Notice that it uses xargs to issue a remove container command for each container ID.

2. Delete all untagged images

        $ docker rmi $(docker images | grep "^<none>" | awk '{print $3}')

awk must use a single quote (this filters all image IDs).
