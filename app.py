import base64, json, requests
from flask import Flask, render_template, redirect, request

app = Flask(__name__)
session = requests.session()

MODULES_PATH = './static/modules.json'
LNK_TO_FILE = {
    'main': 'sections',
    'search': 'sections',
    'info': 'info',
    'video': 'video',
}

def open_module_file():
    global modules
    modules = json.load(open(MODULES_PATH, 'r+', encoding='utf-8'))

@app.route('/')
def index(): return render_template('index.html', modules=modules)

@app.route('/<type>/<site>/<page>/', methods=['GET'])
def page(type, site, page):
    return render_template(f'{LNK_TO_FILE[page]}.html', modules=modules, site=site, file=LNK_TO_FILE[page])
    
@app.route('/requestURL/', methods=['POST'])
def requestURL():
    url = base64.b64decode(request.form['url']).decode()
    headers = dict(list(request.form.items())[1:-1])
    return session.get(url=url, headers=headers).text


@app.route('/reload/')
def reload():
    open_module_file()
    for type, sites in modules.items():
        for site, link in sites.items():
            modules[type][site] = session.get(link).json()
    try: return redirect(request.headers['Referer'])
    except: return redirect('/')

@app.route('/doc/')
def doc(): return render_template('doc.html', modules=modules)

@app.route('/upload/', methods=['POST'])
def upload():
    if (site := request.form['site'].title()) not in modules[request.form['type']]:
        open_module_file()
        modules[request.form['type']][site] = request.form['link']
        open(MODULES_PATH, 'w+', encoding='utf-8').write(json.dumps(modules, indent=2, ensure_ascii=False))
        reload()
    return redirect(f'/{request.form["type"]}/{site}/main/')

if __name__ == '__main__':
    reload()
    app.run(host='0.0.0.0', port=8080, debug=True)