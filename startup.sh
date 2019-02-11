#take down all node ser vers
killall node

#startup node servers
PORTS_FILE="ports_directory.info"

printf "CONFIG FILE: %s \n" ${PORTS_FILE}

while read p; do
    strArr=($p)
    printf "STARTING: %s on port %d \n" ${strArr[0]} ${strArr[1]}
    pushd ${strArr[0]}
    nohup npm start ${strArr[1]} &
    popd

done < ${PORTS_FILE}

nodemon
