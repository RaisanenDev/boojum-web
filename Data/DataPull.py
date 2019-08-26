#!/usr/bin/env python3

from sickle import Sickle
import json, os

def pull():
    sickle = Sickle('https://zone.biblio.laurentian.ca/oai/request?')

    #grab boojum set
    repoSet = sickle.ListRecords(metadataPrefix='oai_dc', set='col_10219_2874')

    #assign metadata info to a list for JSON dump.
    records = []

    for record in repoSet:
        records.append(record.metadata)
    with open('jsontext.json', 'w') as f:
        json.dump(records, f, indent=4)
    return records

def edit(records):
    #Create empty lists to contain the data
    jsonNoGEO,jsonGEO = [],[]

    #keys that are not needed for project
    Notneeded = ("creator","subject","type","language","relation","format","description","publisher")
    #loops to remove all not needed data, then splits the data into two different files
    for i in records:
        for item in Notneeded:
            if item in i:
                del i[item]
        #Put in different files if coverage is there
        if "coverage" in i:
            jsonGEO.append(i)
        else:
            jsonNoGEO.append(i)
    #write to json files, splitting the data
    with open('rawGEO.json', 'w') as file:
        json.dump(jsonGEO, file, indent=4)
    with open('noGEO.json', 'w') as file:
        json.dump(jsonNoGEO, file, indent=4)

if __name__ == "__main__":
    edit(pull())
