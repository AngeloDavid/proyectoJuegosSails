
echo "Iniciando servidor Web apache"

start \xampp\apache_start.bat
start \xampp\mysql_start.bat


echo "Abriendo carpeta del servidor"
cd D:\Systeltronik\playzone-pry\anuglar5pry

echo "iniciando websocket_server"
php server/websocket_server.php