#!/usr/bin/env python3

from flask import Flask, render_template

app = Flask(__name__,
            static_url_path='',
            static_folder='web/static',
            template_folder='Templates')

@app.route('/')
def index():
    """ Serve the landing page """
    return render_template('index.html')

if __name__ == '__main__':
    app.debug = True
    app.run()
