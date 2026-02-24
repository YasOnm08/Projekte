cd node-bin
set PATH=%PATH%;"%CD%";
cd ..

start /b npm start
npx electron .
