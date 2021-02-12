import math
import csv

def main():
    numCols = 4
    columns = ["<div class=\"column\">\n"] * numCols
    
    with open('grid_data.csv', 'r') as csvfile:
        spamreader = csv.reader(csvfile, delimiter=',', quotechar='|')
        for index, row in enumerate(spamreader):
            container = createContainer(row)
            columns[index % 4] += container
            
    for i in range(0, numCols):
        columns[i] += "</div>\n"
        print(columns[i])

def createContainer(line):
    container = "<div class=\"container\">\n<div class=\"border\" onclick=\"fadeIn(\'"
    container += line[0]
    container += "\')\">\n<img src=\"album-artwork/"
    container += line[1]
    container += "\">\n<div class=\"middle\">\n<div class=\"title\">"
    container += line[2]
    container += "</div>\n</div>\n</div>\n</div>\n"

    return container

main()
