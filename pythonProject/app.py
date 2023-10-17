from flask import Flask, render_template
import pandas as pd

app = Flask(__name__)
df = pd.read_excel('ISO messages/Example.xlsx',
                   sheet_name='Full_View', usecols=[1, 2, 3, 4, 5, 13, 14])


@app.route('/')
def index():
    # Pass the DataFrame to the template as a list of dictionaries
    return render_template('index.html', rows=df.to_dict(orient='records'))


if __name__ == '__main__':
    app.run(debug=True)
