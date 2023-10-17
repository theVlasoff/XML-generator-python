import pandas as pd
from flask import Flask, render_template

app = Flask(__name__)

df = pd.read_excel('ISO messages/ExcelExample.xlsx', sheet_name='Full_View', usecols=[2,4, 14])

# формируем список для передачи данных в HTML
rows = df.values.tolist()
print(rows)



@app.route('/')
def index():
    # читаем файл Excel
    df = pd.read_excel('ISO messages/ExcelExample.xlsx', sheet_name='Full_View', usecols=[2, 14])

    # формируем список для передачи данных в HTML
    rows = df.values.tolist()
    print(rows)

    return render_template('start.html', rows=rows)



# # отображаем названия элементов всегда
# for row in range(len(df)):
#     print(df.iloc[row][0])
#
#     # проверяем, нужно ли отображать строку ввода
#     if pd.isna(df.iloc[row][1]):
#         # отображаем строку ввода
#         print('<input type="text" name="element{}">'.format(row))
#     else:
#         # отображаем значение элемента
#         print(df.iloc[row][1])
