#!/bin/bash
 
# Blue 를 기준으로 현재 떠있는 컨테이너를 체크한다.
EXIST_BLUE=$(docker-compose -p codocs-blue -f docker-compose.blue.yaml ps | grep Up)
 
# 컨테이너 스위칭
if [ -z "$EXIST_BLUE" ]; then
    echo "blue up"
    docker-compose -p codocs-blue -f docker-compose.blue.yaml up -d --build
    BEFORE_COMPOSE_COLOR="green"    
    AFTER_COMPOSE_COLOR="blue"
    AFTER_API_PORT=8001
    AFTER_FRONTEND_PORT=3001
    AFTER_SOCKET_PORT=8101
else
    echo "green up"
    docker-compose -p codocs-green -f docker-compose.green.yaml up -d --build
    BEFORE_COMPOSE_COLOR="blue"
    AFTER_COMPOSE_COLOR="green"
    AFTER_API_PORT=8000
    AFTER_FRONTEND_PORT=3000
    AFTER_SOCKET_PORT=8100
fi
 

# HTTP/1.1
# curl -I http://localhost:3001
# 새로운 컨테이너가 제대로 떴는지 확인
# health checking
echo "> Health check 시작합니다."

for retry_count in {1..100}
do
  response_api=$(curl -I -m 2 http://localhost:$AFTER_API_PORT)
  response_front=$(curl -I -m 2 http://localhost:$AFTER_FRONTEND_PORT)
  response_socket=$(curl -I -m 2 http://localhost:$AFTER_SOCKET_PORT)

  up_count1=$(echo $response_api | grep 'Keep-Alive' | wc -l)
  up_count2=$(echo $response_front | grep 'Keep-Alive' | wc -l)
  up_count3=$(echo $response_socket | grep 'Keep-Alive' | wc -l)

  echo $(($up_count1+$up_count2+$up_count3))
  if [ $(($up_count1+$up_count2+$up_count3)) -ge 3 ]
  then
    echo "> Health check 성공"
    break
  else
    echo "> Health check: ${response_api}"
    echo "> Health check: ${response_frontend}"
    echo "> Health check: ${response_api}"
    echo "> Health check 연결 실패. 재시도..."
    docker-compose -p codocs-${AFTER_COMPOSE_COLOR} -f docker-compose.${AFTER_COMPOSE_COLOR}.yaml down
    sleep 1
  fi

  if [ $retry_count -eq 100 ]
  then
    echo "> Health check 실패. "
    echo "> Nginx에 연결하지 않고 배포를 종료합니다."
    exit 1
  fi
  
done

# nginx.config를 컨테이너에 맞게 변경해주고 reload 한다
sudo cp ./conf.d/nginx.${AFTER_COMPOSE_COLOR}.conf /etc/nginx/conf.d/default.conf
sudo systemctl restart nginx
# docker-compose -f docker-compose.nginx.yaml restart
# 이전 컨테이너 종료
docker-compose -p codocs-${BEFORE_COMPOSE_COLOR} -f docker-compose.${BEFORE_COMPOSE_COLOR}.yaml down
echo "$BEFORE_COMPOSE_COLOR down"
