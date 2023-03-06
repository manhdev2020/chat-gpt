Đo hiệu suất với K6:  k6 run -d 60s -u 60 C:\Ecommerce\ecommerce-server\k6\k6-testscripts.js

Chạy tập tin docker-compose.yml với chế độ swarm:
+ docker swarm init # khởi tạo swarm
+ docker stack deploy -c docker-compose.yml ecommerce-server # tạo stack

stackname = ecommerce-server

Tắt chế độ swarm:
+ docker stack rm ecommerce-server

token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hbmhAZ21haWwuY29tIiwiaWQiOjEsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjc1ODI1NjUyLCJleHAiOjE2Nzc2MjU2NTJ9.qQWlVOvDJlQqNYB_3uVJ-12MgfZry28dT9pXq4dl7_o

Để tạo cả hai file, bạn có thể chạy lệnh sau::
$ kubectl apply -f deployment.yaml
$ kubectl apply -f service.yaml

Có thể sử dụng lệnh kubectl get service để xem thông tin về Service:
$ kubectl get service

Để tắt Service ecommerce-backend, bạn có thể sử dụng lệnh sau:
kubectl delete service ecommerce-backend