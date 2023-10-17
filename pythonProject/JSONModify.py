import pandas as pd
import json

# read the Excel file
df = pd.read_excel('ISO messages/Example.xlsx',
                   sheet_name='Full_View', usecols=[1, 2, 3, 4, 5, 13, 14])

# get the name of the root node from the first row of the dataframe
root_name = df.loc[0, 'Name']

# create the initial dictionary with the root node
nested_dict = {'name': root_name, 'children': []}

# keep track of the last node of each level
last_nodes = {0: nested_dict}

# iterate over the rows of the dataframe (skip the first row)
for _, row in df.iloc[1:].iterrows():
    # get the level and name of the current row
    level = row['Lvl']
    name = row['Name']

    # create a new node for the current row
    new_node = {'name': name, 'children': []}

    # add the new node to the parent node
    if level - 1 in last_nodes:
        last_nodes[level - 1]['children'].append(new_node)
    else:
        nested_dict['children'].append(new_node)

    # update the last node for the current level
    last_nodes[level] = new_node

# convert the nested dictionary to JSON
json_data = json.dumps(nested_dict, indent=4)
# wrap the JSON string with square brackets
json_array_string = f"[{json_data}]"

# write the JSON data to a file
with open('nested_data.json', 'w') as f:
    f.write(json_array_string)
