#!/bin/bash

cd py
source venv/bin/activate
python3 api.py &
pid_py=$!
cd ..

npm start &
pid_node=$!

sleep 2
npx electron .

kill $pid_py
kill $pid_node