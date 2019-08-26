#!/usr/bin/env python3

from flask import Flask
from jinja2 import Environment, FileSystemLoader
import os

env = Environment(loader=FileSystemLoader(searchpath="%s/Templates" % os.path.dirname((os.path.realpath(__file__)))), trim_blocks=True)
app = Flask(__name__,
            static_url_path='',
            static_folder='web/static',
            template_folder='Templates')

@app.route('/')
def index():
    """ Serve the landing page """
    template = env.get_template('index.html')
    return(template.render())

if __name__ == '__main__':
    app.debug = True
    app.run()
