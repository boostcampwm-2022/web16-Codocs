#!/bin/bash
 
# Blue 를 기준으로 현재 떠있는 컨테이너를 체크한다.
EXIST_BLUE=$(docker-compose -p codocs-blue -f docker-compose.blue.yaml ps | grep Up)
 
# 컨테이너 스위칭
if [ -z "$EXIST_BLUE" ]; then
    echo "blue up"
    docker-compose -p codocs-blue -f docker-compose.blue.yaml up -d --build
    BEFORE_COMPOSE_COLOR="green"
    AFTER_COMPOSE_COLOR="blue"
else
    echo "green up"
    docker-compose -p codocs-green -f docker-compose.green.yaml up -d --build
    BEFORE_COMPOSE_COLOR="blue"
    AFTER_COMPOSE_COLOR="green"
fi
 
sleep 10
 
# 새로운 컨테이너가 제대로 떴는지 확인
EXIST_AFTER=$(docker-compose -p codocs-${AFTER_COMPOSE_COLOR} -f docker-compose.${AFTER_COMPOSE_COLOR}.yaml ps | grep Up)
if [ -n "$EXIST_AFTER" ]; then
    # nginx.config를 컨테이너에 맞게 변경해주고 reload 한다
    sudo cp ./conf.d/nginx.${AFTER_COMPOSE_COLOR}.conf /etc/nginx/conf.d/default.conf
    sudo systemctl restart nginx
    # docker-compose -f docker-compose.nginx.yaml restart
    # 이전 컨테이너 종료
    docker-compose -p codocs-${BEFORE_COMPOSE_COLOR} -f docker-compose.${BEFORE_COMPOSE_COLOR}.yaml down
    echo "$BEFORE_COMPOSE_COLOR down"
fi