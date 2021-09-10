# Python instalation (Windows)

- Download link: https://www.python.org/downloads/
- Check global Python 3.9.7 installed version

  `py --version`

- Install `virtualenv` globally:

  `py -m pip install virtualenv`

# Setup machine

### 1. Create virtual env

```
py -m venv .\.venv
```

### 2. Activate virtual env

- Windows:

  `.\.venv\Scripts\activate`

Verify Python 3.9.7 version: `python --version`

### 3. Run to install dependencies

```
pip install -r requirements.txt
```

Dependencies control

`pip freeze > requirements.txt`

# Start Jupyter Lab

```
jupyter lab
```
