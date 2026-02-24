cd python-bin
set PATH=%PATH%;"%CD%";
curl -O https://bootstrap.pypa.io/get-pip.py
ren python.exe py.exe
py get-pip.py
cd Scripts
set PATH=%PATH%;"%CD%";
cd ..
cd ..

cd py
py -m pip install setuptools
py -m pip install -r requirements.txt