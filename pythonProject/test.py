import pandas as pd

df = pd.read_excel('ISO messages/ExcelExample.xlsx', sheet_name='Full_View', usecols=[1,2,3,4,14])


dictionary = dict(orient='records')
level_dict = {}
name_dict = {}
mult_dict = {}
xmlTag_dict = {}

index = 0

for _, row in df.iterrows():
    level = int(row['Lvl'])
    name = row['Name'].strip()
    tag = row['XML Tag']
    mult = row['Mult']
    isRemoved = row['Is Removed']

    #Skip removed elements
    if type(isRemoved) == str and 'Yes' in isRemoved:
        continue

    if type(tag) != str:
        continue

    level_dict[index] = level
    name_dict[index] = name
    xmlTag_dict[index] = tag
    mult_dict[index] = mult

    index = index + 1

dictionary['Lvl'] = level_dict
dictionary['Name'] = name_dict
dictionary['XML Tag'] = xmlTag_dict
dictionary['Mult'] = mult_dict

print(dictionary)