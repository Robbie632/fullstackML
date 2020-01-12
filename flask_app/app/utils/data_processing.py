def encode_cabin(row):
    
    '''
    function for pandas.apply
    encodes cabin
    '''
    
    if row["Cabin"] == None:
        return 0
    else:
        try:
            return 'abcdefghijklmnopqrstuvwxyz'.index(str(row["Cabin"])[0].lower())
        except:
            return(0)



def extract_cabin_number(row):
    
    '''
    function for pandas.apply
    extracts cabin number
    '''
    num = ''
    
    for i in str(row["Cabin"]):
        if i.isnumeric():
            num += i
            
    if num == '':
        return 0
            
    return int(num)
    

def encode_title(row):
    
    '''
    function for pandas.apply
    encodes title
    '''
    
    if "master" in row["Name"].lower():
        return 1
    elif "mr." in row["Name"].lower():
        return 2
    elif "mrs." in row["Name"].lower():
        return 3
    elif "miss." in row["Name"].lower():
        return 3
    else:
        return 0
    
def ensure_correct_order(data_in):
    
    data = data_in.copy()
    cols = ['Pclass', 'Name', 'Sex', 'Age', 'SibSp', 'Parch', 'Ticket', 'Fare', 'Cabin', 'Embarked']
    data = data[cols]
    
    return(data)


def checkColumns(data):
    
    '''
    quality control: checks all columns to be expected are present
    '''
    
    data_copy = data.copy()
    columns_for_testing = ['PassengerId','Survived', 'Pclass', 'Name', 'Sex', 'Age', 'SibSp', 'Parch', 'Ticket', 'Fare', 'Cabin', 'Embarked']
    for col in columns_for_testing:
        if col not in data_copy.columns.values:
            data_copy[col] = 0
        else:
            continue
            
    return(data_copy)