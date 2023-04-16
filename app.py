import base64, json, requests
from flask import Flask, render_template, redirect, request

app = Flask(__name__)
session = requests.session()

HTML = {
    'main': 'slider',
    'search': 'slider',
    'info': 'info',
    'video': 'video',
}

@app.route('/reload/')
def reload():
    global modules
    modules = json.load(open('./static/modules.json', 'r+', encoding='utf-8'))
    try: return redirect(request.headers['Referer'])
    except: return redirect('/')
    

@app.route('/requestURL/', methods=['POST'])
def requestURL():
    url = base64.b64decode(request.form['url']).decode()
    headers = dict(list(request.form.items())[1:-1])
    return session.get(url=url, headers=headers).text


@app.route('/')
def index(): return render_template('slider.html', modules=modules, js_file='index')

@app.route('/<type>/<site>/<page>/', methods=['GET'])
def page(type, site, page):
    title = f'{request.args.get("s")} | {site}'.replace('None | ', '')
    return render_template(f'{HTML[page]}.html', modules=modules, site=site, title=title, js_file=page)

if __name__ == '__main__':
    reload()
    app.run(port=5000, debug=True)