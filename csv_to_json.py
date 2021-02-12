import math
import csv

DOUBLE_QUOTE = "\""
SINGLE_QUOTE = "\'"

START = "data = "

def main():
    
    array = "[" ## Begin string

    ## open csv file
    with open('grid_data.csv', 'r') as csvfile:
            spamreader = csv.reader(csvfile, delimiter=',', quotechar='|')
            
            ## for each row in the file
            for index, row in enumerate(spamreader):

                ## add the new JSON object to the array
                array += makeJSON(row)
                array += ", " ## add trailing comma

    ## concatonate full javascript string
    toReturn = START + SINGLE_QUOTE + array[:-2] + "]" + SINGLE_QUOTE + ";"


    ## write to file
    f = open("data.json", "w")
    f.write(toReturn)
    f.close()
    ## print(toReturn) ## optional print

## make a JSON object from a csv row
def makeJSON(row):
    
    ## create each key/value pair
    link = makePair("link", row[0])
    image = makePair("image", row[1])
    title = makePair("title", row[2])

    ## concatonate full JSON object string
    return "{ " + link + ", " + image + ", " + title + "}"

## make a key value pair
def makePair(key, value):

    ## wrap each string in quotes
    wrapped_key = quoteWrap(key)
    wrapped_value = quoteWrap(value)

    ## concatonate full string 
    return wrapped_key + " : " + wrapped_value

## wrap a string in double quotes
def quoteWrap(string):
    return DOUBLE_QUOTE + string + DOUBLE_QUOTE

main()
