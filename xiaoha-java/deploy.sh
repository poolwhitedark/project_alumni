mvn clean package -DskipTests
echo ' ............................. SUCCESS! 打包成功，开始发送api包到服务器 ------------------------>'
scp xiaohazhiyou-api/target/xiaohazhiyou-api-0.0.1-SNAPSHOT.jar wuyang:/root/workspace/v1.0
echo '............................. SUCCESS! 发送成功。请求前往服务器进行部署。------------------------ end!'