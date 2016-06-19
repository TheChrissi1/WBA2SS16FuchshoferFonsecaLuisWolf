@echo off

echo. Welcome!
call:while



:while
	set /p name=Command:
	echo %name%
	if %name% == start (
		echo STARTING SERVERS!
		call:startServers
		goto:while		
	)
	if %name% == restart (
		echo Restart
		taskkill /im node.exe
		echo NODE SERVERS KILLED
		echo RESTARTING
		start node dienstgeber_server/server
		start node dienstnutzer_server/server
		goto:while
	)
	if %name% == stop (
		echo STOPPING SERVERS!
		echo SAVING REDIS DATABASE
		taskkill /im node.exe
		taskkill /im redis-cli.exe
		taskkill /im redis-server.exe
		exit
	)
goto:eof



:startServers
start redisDB_server/redis-server
start redisDB_server/redis-cli
start node dienstgeber_server/server.js
start node dienstnutzer_server/server.js
goto:eof

