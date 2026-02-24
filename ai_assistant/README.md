# Installation Guide

In order to use this app, you need quite a lot of things, so buckle up.

## Dependencies

Install the following:

https://ollama.com/download

https://www.python.org/downloads/

https://nodejs.org/en/download/prebuilt-installer

For Linux and NodeJS, see:

https://nodejs.org/en/download/package-manager/all

## Running the project for the first time

In order to now actually run the program, you have to open a terminal in the project folder, then you can run:

```
npm install
cd py
pip install -R requirements.txt
```

In case you need a virtual environment however, we provide a custom install.sh file for GNU/Linux.

```
sh install.sh
```

From then on, you can run the project by:
1. Opening two terminal windows, one in the main project folder, and one in the py subfolder.
2. In the py subfolder, you will run: 
```
python3 api.py
```
3. In the main project folder, you will run:
```
npm run build
npm start
npx electron .
```
4. Enjoy!