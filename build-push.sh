#!/bin/bash
if ping -q -c 1 -W 1 8.8.8.8 >/dev/null; then
  echo "Internet is up and running"
else
  echo "Internet is down"
  exit
fi

images=('ripme' 'gdl' 'ytdl')
paths=('./ripme' './gallery-dl' './youtube-dl')
repo='localhost:5000/'
MISC="jq"

for pkg in $MISC; do
    if dpkg --get-selections | grep -q "^$pkg[[:space:]]*install$" >/dev/null; then
        echo -e "$pkg is already installed"
    else
      if apt-get -qq install $pkg; then
        echo "Successfully installed $pkg"
      else
        echo "Error installing $pkg"
      fi
    fi
done
function tagAndPush() {
	if [ -n "$1" ] && [ -n "$2" ]; then
		echo "Pushing docker image to hub tagged as $2"
		docker build -t $2 $1
    docker image tag $2 $repo$2
    docker image push $repo$2
	fi
}
function swarmMode(){
    if [ "$(docker info | grep Swarm | sed 's/Swarm: //g')" == "inactive" ]; then
        echo "Already in Swarm mode"
    else
        docker swarm init
    fi
}

swarmMode
docker run -d -p 5000:5000 --restart=always --name registry registry:2
for (( i = 0; i < ${#images[@]}; ++i )); do
    echo "Building IMAGE with path: ${images[i]} ${paths[i]}"
    tagAndPush ${paths[i]} ${images[i]}
    docker service create --replicas $(jq ".${images[i]}.replicas" config.json) -d -t --name ${images[i]} --mount type=bind,source=$(pwd)'/data/'${images[i]},destination='/app' ${repo}${images[i]}
done
